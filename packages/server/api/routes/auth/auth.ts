import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSuiAddress } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { createIdentity } from "./auth.action";
import { generateNonce } from "./helpers";
import db from "../../schema/db";
import { challenges } from "../../schema/misc";
import { respond } from "../../../utils/respond";
import { eq } from "drizzle-orm";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";
import { jwt, sign } from "hono/jwt";
import { users } from "../../schema/user";

export default new Hono()
  // register identity
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        username: z.string(),
        fullName: z.string(),
        address: zSuiAddress,
        imageUrl: z.string(),
        about: z.string(),
        loginType: z.enum(["wallet", "zk"]),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { username, fullName, address, imageUrl, about, loginType } =
        ctx.req.valid("json");
      const { signature, userId } = ctx.req.valid("query");

      const resp = await tryCatch(
        createIdentity(
          {
            userId,
            username,
            about,
            fullName,
            imageUrl,
            receiver: address,
            loginType,
          },
          signature
        )
      );

      if (resp.error) {
        return respond.err(
          ctx,
          resp.error?.message || "Failed to create identity",
          400
        );
      }

      return respond.ok(
        ctx,
        { data: {} },
        "Identity Created Successfully",
        201
      );
    }
  )

  .get(
    "/challenge",
    zValidator(
      "query",
      z.object({
        address: zSuiAddress,
      })
    ),
    async (ctx) => {
      const { address } = ctx.req.valid("query");
      const nonce = generateNonce();

      // save nonce to db
      const resp = await tryCatch(
        db.insert(challenges).values({
          nonce,
          address,
        })
      );

      if (resp.error) {
        return respond.err(
          ctx,
          resp.error?.message || "Failed to generate challenge",
          400
        );
      }

      return respond.ok(
        ctx,
        { data: { nonce } },
        "Challenge Generated Successfully",
        200
      );
    }
  )

  .post(
    "/verify",
    zValidator(
      "json",
      z.object({
        address: zSuiAddress,
        message: z.string(),
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { message, signature, address } = ctx.req.valid("json");

      // fetch nonce from db
      const resp = await tryCatch(
        db
          .select()
          .from(challenges)
          .where(eq(challenges.address, address))
          .limit(1)
      );

      if (resp.error) {
        return respond.err(
          ctx,
          resp.error?.message || "Failed to fetch nonce",
          400
        );
      }

      const nonce = resp.data[0].nonce;

      if (!nonce) {
        return respond.err(ctx, "No nonce found for address", 400);
      }

      // verify signature
      const appendedMessage = `${message}${nonce}`;
      const messageBytes = new TextEncoder().encode(appendedMessage);
      const isValid = await verifyPersonalMessageSignature(
        messageBytes,
        signature,
        {
          address,
        }
      );

      if (!isValid) {
        return respond.err(ctx, "Invalid signature", 400);
      }

      if (!process.env.JWT_SECRET) {
        return respond.err(ctx, "JWT_SECRET is not set", 500);
      }

      const userResp = await tryCatch(
        db
          .select({
            id: users.id,
          })
          .from(users)
          .where(eq(users.address, address))
          .limit(1)
      );

      if (userResp.error) {
        return respond.err(
          ctx,
          userResp.error?.message || "Failed to fetch user",
          400
        );
      }

      const user = userResp.data[0];

      if (!user) {
        return respond.err(ctx, "User not found", 400);
      }

      // create jwt for user to signin
      const jwt = await sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET
      );

      // delete nonce from db
      const resp2 = await tryCatch(
        db.delete(challenges).where(eq(challenges.address, address))
      );

      if (resp2.error) {
        return respond.err(
          ctx,
          resp2.error?.message || "Failed to delete nonce",
          400
        );
      }

      return respond.ok(
        ctx,
        { data: { jwt } },
        "JWT Created Successfully",
        200
      );
    }
  );
