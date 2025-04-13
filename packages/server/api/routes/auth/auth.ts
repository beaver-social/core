import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSignType, zSuiAddress } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { createIdentity } from "./auth.action";
import { generateNonce, verifyChallenge } from "./helpers";
import { authenticated } from "../../middlewares/auth";

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

  // generate nonce
  .post("/challenge", async (ctx) => {
    const nonce = generateNonce();
    return ctx.ok({ nonce }, "Challenge Generated Successfully", 200);
  })

  // verify challenge (nonce) for wallet login
  .post(
    "/challenge/verify",
    authenticated,
    zValidator(
      "json",
      z.object({ message: z.string(), signature: z.string() })
    ),
    async (ctx) => {
      const { message, signature } = ctx.req.valid("json");
      const userId = ctx.get("user").id;

      const resp = await tryCatch(verifyChallenge(message, userId, signature));

      if (resp.error) {
        return ctx.err(
          resp.error?.message || "Failed to verify challenge",
          400
        );
      }
    }
  );
