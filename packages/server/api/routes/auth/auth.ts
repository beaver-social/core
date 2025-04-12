import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSignType, zSuiAddress } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { createIdentity } from "./auth.action";

export default new Hono()
  // landing route
  .get("/", (ctx) => {
    return ctx.json({
      message: "auth service",
    });
  })

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
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { username, fullName, address, imageUrl, about } =
        ctx.req.valid("json");
      const { signature, type, userId } = ctx.req.valid("query");

      const resp = await tryCatch(
        createIdentity(
          {
            userId,
            username,
            about,
            fullName,
            imageUrl,
            receiver: address,
          },
          { type, signature }
        )
      );

      if (resp.error) {
        return ctx.err(resp.error?.message || "Failed to create identity", 400);
      }

      return ctx.ok({}, "Identity Created Successfully", 201);
    }
  )

  .post(
    "/challenge",
    zValidator("json", z.object({ address: zSuiAddress })),
    (ctx) => {
      const { address } = ctx.req.valid("json");

      return ctx.json({
        message: "challenge service",
      });
    }
  )

  .post(
    "/challenge/verify",
    zValidator(
      "json",
      z.object({ address: zSuiAddress, signature: z.string() })
    ),
    (ctx) => {
      const { address, signature } = ctx.req.valid("json");

      return ctx.json({
        message: "challenge verification service",
      });
    }
  );
