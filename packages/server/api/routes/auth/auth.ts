import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zSuiAddress } from "../../lib/zod/helpers";
import { checkUsernameAvailability, isAddressRegistered } from "./helpers";

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
      z.object({ address: zSuiAddress, username: z.string() })
    ),
    (ctx) => {
      const { address, username } = ctx.req.valid("json");

      const isRegistered = isAddressRegistered(address);
      if (isRegistered) {
        return ctx.json(
          {
            message: "identity already registered",
          },
          400
        );
      }

      const isUsernameAvailable = checkUsernameAvailability(username);
      if (!isUsernameAvailable) {
        return ctx.json(
          {
            message: "username not available",
          },
          400
        );
      }

      return ctx.json(
        {
          message: "identity registered",
        },
        201
      );
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
