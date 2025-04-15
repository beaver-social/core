import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSuiAddress } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { createIdentity } from "./auth.action";
import { generateNonce, verifyChallenge } from "./helpers";
import { authenticated } from "../../middlewares/auth";
import db from "../../schema/db";
import { challenges } from "../../schema/misc";

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
        return ctx.err(resp.error?.message || "Failed to create identity", 400);
      }

      return ctx.ok({}, "Identity Created Successfully", 201);
    }
  )

  .use(authenticated)
  .get(
    "/challenge",
    zValidator(
      "query",
      z.object({
        route: z.string(),
      })
    ),
    async (ctx) => {
      const { route } = ctx.req.valid("query");
      const nonce = generateNonce();
      const userId = ctx.get("user").id;

      // save nonce to db
      const resp = await tryCatch(
        db.insert(challenges).values({
          nonce,
          userId,
          route,
        })
      );

      if (resp.error) {
        return ctx.err(
          resp.error?.message || "Failed to generate challenge",
          400
        );
      }

      return ctx.ok({ nonce }, "Challenge Generated Successfully", 200);
    }
  );
