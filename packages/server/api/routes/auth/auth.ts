import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSuiAddress } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { createIdentity } from "./auth.action";
import { generateNonce } from "./helpers";
import { authenticated } from "../../middlewares/auth";
import db from "../../schema/db";
import { challenges } from "../../schema/misc";
import { respond } from "../../../utils/respond";

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

      return ctx.json(
        { data: {}, message: "Identity Created Successfully" },
        201
      );
    }
  )

  .get(
    "/challenge",
    zValidator(
      "query",
      z.object({
        route: z.string(),
      })
    ),
    authenticated,
    async (ctx) => {
      const nonce = generateNonce();
      const userId = ctx.get("user").id;

      // save nonce to db
      const resp = await tryCatch(
        db.insert(challenges).values({
          nonce,
          userId,
        })
      );

      if (resp.error) {
        return respond.err(
          ctx,
          resp.error?.message || "Failed to generate challenge",
          400
        );
      }

      return ctx.json(
        { data: { nonce }, message: "Challenge Generated Successfully" },
        200
      );
    }
  );
