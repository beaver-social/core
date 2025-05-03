import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import authenticated, { getUserFromCtx } from "../../middlewares/authenticated";
import { respond } from "../../lib/utils/respond";
import { tryCatch, tryCatchSync } from "../../lib/tryCatch";
import db from "../../lib/db";
import { eq, or } from "drizzle-orm";
import { contracts } from "../../lib/sui/contracts";
import { Transaction } from "@mysten/sui/transactions";
import { defaultAdminCapId } from "contracts/definitions";
import { findObjectIdByName } from "contracts/utils";
import suiClient, {
  executeTransaction,
  serverKeypair,
} from "../../lib/sui/client";
import {
  zJwtPayload,
  zNumberString,
  zSuiAddress,
  zSuiSignature,
} from "../../lib/zod/helpers";
import nonceManager from "../../lib/utils/nonce";
import { verifySignature } from "../../lib/utils/signature";
import { sign } from "hono/jwt";
import { JWTalgorithm, JWTexpiration, JWTPrivateKey } from "../../constants";
import { stringify } from "../../../utils";
import { getPreviousActionHash } from "../../lib/actions/helpers";
import { followUser, unfollowUser } from "./actions";

const { users } = db.schema;

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
    "/nonce",
    zValidator(
      "query",
      z.object({ address: zSuiAddress().optional() }).optional()
    ),
    async (ctx) => {
      const { address } = ctx.req.valid("query") || {};
      const { data: user } = await tryCatch(getUserFromCtx(ctx));

      if (user) {
        const { data: pointer, error: actionHashError } = await tryCatch(
          getPreviousActionHash(user.id)
        );
        if (actionHashError) {
          ctx.log(actionHashError);
          return respond.err(ctx, "Failed to get pointer", 500);
        }
        if (!pointer) {
          return respond.err(ctx, "Pointer not found", 404);
        }

        return respond.ok(
          ctx,
          { nonce: pointer },
          "Action Pointer fetched successfully",
          200
        );
      }
      if (address) {
        const nonce = nonceManager.generateNonce(address);
        return respond.ok(ctx, { nonce }, "Nonce generated", 200);
      }

      return respond.err(ctx, "Address is required", 400);
    }
  )

  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        address: zSuiAddress(),
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { address, signature } = ctx.req.valid("json");
      const userResponse = await tryCatch(db.getUserByAddress(address));

      if (userResponse.error) {
        ctx.log(userResponse.error);
        return respond.err(ctx, "Failed to find user", 500);
      }
      const user = userResponse.data;
      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }
      const nonce = nonceManager.comsumeNonceBytes(address);
      if (!nonce) {
        return respond.err(ctx, "Please request a nonce +(GET /nonce)", 400);
      }

      const { data: valid, error: validationError } = await tryCatch(
        verifySignature(nonce, signature, {
          address: user.address,
          intent: "PersonalMessage",
        })
      );

      if (validationError) {
        ctx.log(validationError);
        return respond.err(ctx, "Failed to verify signature", 500);
      }
      if (!valid) {
        return respond.err(ctx, "Invalid signature", 400);
      }

      const now = Date.now() / 1000;

      const payload: z.infer<ReturnType<typeof zJwtPayload>> = {
        app: 0,
        iss: serverKeypair.getPublicKey().toBase64(),
        sub: user.id,
        iat: now,
        exp: now + JWTexpiration,
        nbf: now + 1,
      };

      const { data: token, error } = await tryCatch(
        sign(payload, JWTPrivateKey, JWTalgorithm)
      );
      if (error || !token) {
        ctx.log(error || "token is undefined");
        return respond.err(ctx, "Failed to generate token", 500);
      }

      return respond.ok(ctx, { token }, "Login successful", 200);
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
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { signature, ...user } = ctx.req.valid("json");
      const { address } = user;

      const nonce = nonceManager.comsumeNonceBytes(address);
      if (!nonce) {
        return respond.err(ctx, "Please request a nonce +(GET /nonce)", 400);
      }

      const { data: valid, error: verificationError } = await tryCatch(
        verifySignature(nonce, signature, {
          address,
          intent: "PersonalMessage",
        })
      );

      if (verificationError) {
        ctx.log(verificationError);
        return respond.err(ctx, "Failed to verify signature", 500);
      }
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

      const { data: onchainIdentity } = await tryCatch(
        contracts.registry.read.getByOwner({ address: user.address })
      );
      const { data: collectionNft } = await tryCatch(
        contracts.posts.read.getCollectionByOwner({ address: user.address })
      );

      if (onchainIdentity && collectionNft) {
        await db.insert(users).values({
          identity: onchainIdentity.objectId,
          collectionNft: collectionNft.objectId,
          username: onchainIdentity.username,
          fullName: user.fullName,
          address: address,
        });

        return respond.err(ctx, "User already exists", 409);
      }

      const tx = new Transaction();
      contracts.admin.write.mint_for(tx, {
        adminCap: { id: defaultAdminCapId },
        about: user.about || "",
        username: user.username,
        receiver: address,
      });
      tx.setGasBudgetIfNotSet(100_000_000);

      const identityGeneration = await tryCatch(executeTransaction(tx));

      if (identityGeneration.error) {
        ctx.log(identityGeneration.error);
        return respond.err(ctx, "Failed to generate identity on chain", 500);
      }

      const { objectChanges } = await suiClient.waitForTransaction({
        digest: identityGeneration.data.digest,
        options: { showObjectChanges: true },
      });

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
          "Failed to create user : " + stringify(newUserResponse.error),
          400
        );
      }

      const [newUser] = newUserResponse.data;

      return respond.ok(ctx, newUser, "User created successfully", 201);
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

      return respond.ok(ctx, user, "User details from ID", 200);
    }
  )

  .post(
    "/:id/follow",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { id: followingId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("json");
      const user = ctx.get("user");

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      const { error: followError } = await tryCatch(
        followUser({ followingId, userId: user.id }, signature)
      );

      if (followError) {
        return respond.err(
          ctx,
          "Failed to follow user : " + followError.message,
          500
        );
      }

      return respond.ok(ctx, {}, "Followed user successfully", 200);
    }
  )

  .delete(
    "/:id/follow",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { id: followingId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("json");
      const user = ctx.get("user");

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      const { error: unfollowError } = await tryCatch(
        unfollowUser({ followingId, userId: user.id }, signature)
      );

      if (unfollowError) {
        return respond.err(
          ctx,
          "Failed to unfollow user : " + unfollowError,
          500
        );
      }

      return respond.ok(ctx, {}, "Unfollowed user successfully", 200);
    }
  );
