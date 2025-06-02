import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import authenticated, { getUserFromCtx } from "../../middlewares/authenticated";
import { respond } from "../../lib/utils/respond";
import { tryCatch, tryCatchSync } from "../../lib/tryCatch";
import db from "../../lib/db";
import { count, eq, like, or } from "drizzle-orm";
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
import { pinPost, unpinPost } from "./actions";
import env from "../../../env";
import { zUserUpdate } from "../posts/actions";

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
        type: z.enum([
          "id",
          "identity",
          "username",
          "suinsDomainName",
          "address",
        ]),
        value: z.string(),
      })
    ),
    async (ctx) => {
      const { type, value } = ctx.req.valid("query");

      let filter;
      switch (type) {
        case "id":
          filter = eq(users.id, parseInt(value));
          break;
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
        db.select().from(users).where(filter).limit(1)
      );

      if (userResponse.error) {
        ctx.log(userResponse.error);
        return respond.err(ctx, "Failed to fetch user", 500);
      }

      const [user] = userResponse.data;

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      return respond.ok(ctx, user, "User details", 200);
    }
  )

  .get(
    "/search-suggestions",
    zValidator(
      "query",
      z.object({
        search: z.string(),
        limit: zNumberString(),
      })
    ),
    async (ctx) => {
      const { search, limit } = ctx.req.valid("query");

      const userResponse = await tryCatch(
        db
          .select({
            id: users.id,
            username: users.username,
            imageUrl: users.imageUrl,
            fullName: users.fullName,
          })
          .from(users)
          .where(like(users.username, `%${search}%`))
          .limit(limit)
      );

      if (userResponse.error) {
        ctx.log(userResponse.error);
        return respond.err(ctx, "Failed to find user", 500);
      }

      return respond.ok(
        ctx,
        { users: userResponse.data },
        "User search suggestions",
        200
      );
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

      return respond.err(
        ctx,
        "Address is required in query [address: string]",
        400
      );
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
      const appId = ctx.req.header("X-Api-Key");
      let app = -1;

      if (!appId) return respond.err(ctx, "Missing AppId / Api Key", 400);

      if (appId !== env.DEFAULT_APPID) {
        const [appIdExists] = await db
          .select()
          .from(db.schema.applications)
          .where(eq(db.schema.applications.appId, appId));
        if (!appIdExists)
          return respond.err(ctx, "Invalid AppId / Api Key", 400);
        app = appIdExists.id;
      }

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
        app: app,
        iss: serverKeypair.getPublicKey().toBase64(),
        sub: user.id,
        iat: now - 2,
        exp: now + JWTexpiration,
        nbf: now - 1, //+ 1,
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
      "form",
      z.object({
        address: zSuiAddress(),
        username: z.string().min(3).max(20).toLowerCase(),
        fullName: z.string().min(3).max(50),
        about: z.string().max(255).nullable().optional(),
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { signature, ...user } = ctx.req.valid("form");
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

  .patch("/", authenticated, zValidator("json", zUserUpdate()), async (ctx) => {
    const user = ctx.get("user");
    const data = ctx.req.valid("json");

    const updatedUserResponse = await tryCatch(
      db.update(users).set(data).where(eq(users.id, user.id)).returning()
    );

    if (updatedUserResponse.error) {
      ctx.log(updatedUserResponse.error);
      return respond.err(
        ctx,
        "Failed to update user : " + stringify(updatedUserResponse.error),
        500
      );
    }

    const [newUser] = updatedUserResponse.data;

    return respond.ok(ctx, newUser, "User updated successfully", 200);
  })

  .get(
    "/:id/pin",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");

      const userResponse = await tryCatch(
        db
          .select({ pinnedPost: users.pinnedPost })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1)
      );

      if (userResponse.error) {
        return respond.err(
          ctx,
          "Failed to find user:" + userResponse.error.message,
          500
        );
      }

      const [pinnedPost] = userResponse.data;

      if (!pinnedPost) {
        return respond.ok(ctx, {}, "No pinned post", 200);
      }

      return respond.ok(
        ctx,
        pinnedPost,
        "Pinned post fetched successfully",
        200
      );
    }
  )

  .post(
    "/:id/pin",
    authenticated,
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { signature } = ctx.req.valid("json");
      const { id } = ctx.req.valid("param");
      const user = ctx.var.user;

      const { error: pinError } = await tryCatch(
        pinPost(
          {
            userId: user.id,
            postId: id,
          },
          signature
        )
      );

      if (pinError) {
        return respond.err(
          ctx,
          "Failed to follow user : " + pinError.message,
          400
        );
      }

      return respond.ok(ctx, {}, "Post pinned successfully", 200);
    }
  )

  .delete(
    "/pin",
    authenticated,
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { signature } = ctx.req.valid("json");
      const user = ctx.var.user;

      if (!user) {
        return respond.err(ctx, "User not found", 404);
      }

      if (!user.pinnedPost) {
        return respond.ok(ctx, {}, "No pinned post", 200);
      }

      const { error: unpinError } = await tryCatch(
        unpinPost(
          {
            userId: user.id,
            postId: user.pinnedPost,
          },
          signature
        )
      );

      if (unpinError) {
        return respond.err(
          ctx,
          "Failed to follow user : " + unpinError.message,
          400
        );
      }

      return respond.ok(ctx, {}, "Post unpinned successfully", 200);
    }
  );
