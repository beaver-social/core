import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import authenticated from "../../middlewares/authenticated";
import { respond } from "../../lib/utils/respond";
import { tryCatch, tryCatchSync } from "../../lib/tryCatch";
import db from "../../lib/db";
import schema from "../../lib/db/schema";
import { eq, or } from "drizzle-orm";
import { contracts } from "../../lib/sui/contracts";
import { Transaction } from "@mysten/sui/transactions";
import { defaultAdminCapId } from "contracts/definitions";
import { findObjectIdByName } from "contracts/utils";
import suiClient, { executeTransaction } from "../../lib/sui/client";
import {
  zNumberString,
  zSuiAddress,
  zSuiSignature,
} from "../../lib/zod/helpers";
import nonceManager from "../../lib/utils/nonce";
import { verifySignature } from "../../lib/utils/signature";

const { users } = schema;

export default new Hono()

  .get("/", authenticated, (ctx) => {
    return respond.ok(ctx, ctx.var.user, "self user", 200);
  })

  .get(
    "/find",
    zValidator(
      "query",
      z.object({
        type: z.enum(["identity", "username", "suinsDomainName", "address"]),
        value: z.string(),
      })
    ),
    async (ctx) => {
      const { type, value } = ctx.req.valid("query");

      let filter;
      switch (type) {
        case "identity":
          filter = eq(users.identity, value);
          break;
        case "username":
          filter = eq(users.username, value);
          break;
        case "suinsDomainName":
          filter = eq(users.suinsDomainName, value);
          break;
        case "address":
          filter = eq(users.address, value);
          break;
      }

      if (!filter) {
        return respond.err(ctx, "Invalid search criteria", 400);
      }

      const userResponse = await tryCatch(
        db.select({ id: users.id }).from(users).where(filter).limit(1)
      );

      if (userResponse.error) {
        ctx.log(userResponse.error);
        return respond.err(ctx, "Failed to find user", 500);
      }

      const [user] = userResponse.data;

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      return respond.ok(ctx, user, "User details", 200);
    }
  )

  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");

      const userResponse = await tryCatch(
        db.select().from(users).where(eq(users.id, userId)).limit(1)
      );

      if (userResponse.error) {
        ctx.log(userResponse.error);
        return respond.err(ctx, "Failed to find user", 500);
      }

      const [user] = userResponse.data;

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      return respond.ok(
        ctx,
        user,
        "User details fetched from ID successfully",
        200
      );
    }
  )

  .post(
    "/nonce",
    zValidator("json", z.object({ address: zSuiAddress() })),
    async (ctx) => {
      const { address } = ctx.req.valid("json");

      const nonce = nonceManager.generateNonce(address);

      return respond.ok(ctx, { nonce }, "Nonce generated", 200);
    }
  )

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        address: zSuiAddress(),
        username: z.string().min(3).max(20).toLowerCase(),
        fullName: z.string().min(3).max(50),
        imageUrl: z.string().max(255).optional(),
        bannerUrl: z.string().max(255).optional(),
        about: z.string().max(255).nullable().optional(),
        loginType: z.enum(["zk", "wallet"]),
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { signature, ...user } = ctx.req.valid("json");
      const { address, loginType } = user;

      const nonce = nonceManager.comsumeNonceBytes(address);
      if (!nonce) {
        return respond.err(ctx, "Please request a nonce +(GET /nonce)", 400);
      }

      const valid = verifySignature(nonce, signature, {
        address,
        intent: "PersonalMessage",
        type: loginType,
      });
      if (!valid) {
        return respond.err(ctx, "Invalid signature", 400);
      }

      const existingResponse = await tryCatch(
        db
          .select({ id: users.id })
          .from(users)
          .where(
            or(eq(users.username, user.username), eq(users.address, address))
          )
          .limit(1)
      );

      if (existingResponse.error) {
        ctx.log(existingResponse.error);
        return respond.err(ctx, "Failed to check user availability", 500);
      }
      const [exists] = existingResponse.data;
      if (exists) {
        return respond.err(ctx, "username already taken", 409);
      }

      const tx = new Transaction();
      contracts.admin.write.mint_for(tx, {
        adminCap: { id: defaultAdminCapId },
        about: user.about || "",
        username: user.username,
        receiver: address,
      });
      tx.setGasBudget(100000000);

      const identityGeneration = await tryCatch(executeTransaction(tx));

      if (identityGeneration.error) {
        ctx.log(identityGeneration.error);
        return respond.err(ctx, "Failed to generate identity on chain", 500);
      }

      const { objectChanges } = await suiClient.waitForTransaction({
        digest: identityGeneration.data.digest,
        options: { showObjectChanges: true },
      });

      ctx.log("Object changes", objectChanges);

      const registration = tryCatchSync(() =>
        findObjectIdByName(objectChanges, "IdentityRegistration")
      );

      if (registration.error) {
        ctx.log(registration.error);
        return respond.err(
          ctx,
          "Failed to find registration object on chain",
          500
        );
      }

      const collection = tryCatchSync(() =>
        findObjectIdByName(objectChanges, "MY_BEAVER_POSTS")
      );

      if (collection.error) {
        ctx.log(collection.error);
        return respond.err(
          ctx,
          "Failed to find collection object on chain",
          500
        );
      }

      const newUserResponse = await tryCatch(
        db
          .insert(users)
          .values({
            identity: registration.data,
            collectionNft: collection.data,
            ...user,
          })
          .returning()
      );

      if (newUserResponse.error) {
        ctx.log(newUserResponse.error);
        return respond.err(
          ctx,
          "Failed to create user : " + JSON.stringify(newUserResponse.error),
          400
        );
      }

      const [newUser] = newUserResponse.data;

      return respond.ok(ctx, newUser, "User created successfully", 201);
    }
  );
