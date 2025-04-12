import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSuiAddress } from "../../lib/zod/helpers";
import { checkUsernameAvailability, isAddressRegistered } from "./helpers";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "../user/actions";

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
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { username, fullName, address, imageUrl, about } =
        ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");

      const resp = await tryCatch(
        actions.createIdentity(
          {
            userId: -1,
            username,
            about,
            fullName,
            imageUrl,
            receiver: address,
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

  // challenge service
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
