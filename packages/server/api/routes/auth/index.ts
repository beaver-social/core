import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zJwt, zSuiAddress } from "../../lib/zod/helpers";
import { deriveUserSalt } from "./helpers";

export default new Hono()
  .get("/", (ctx) => {
    return ctx.json({
      message: "auth service",
    });
  })

  // check username
  .get(
    "/check-username",
    zValidator("query", z.object({ username: z.string() })),
    (ctx) => {
      const { username } = ctx.req.valid("query");

      return ctx.json({
        message: "check username service",
      });
    }
  )

  // register service
  .post(
    "/register",
    zValidator("json", z.object({ address: zSuiAddress })),
    (ctx) => {
      const { address } = ctx.req.valid("json");

      return ctx.json({
        message: "register service",
      });
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
  )

  // zkLogin salt service
  .get("/zk/salt", (ctx) => {
    return ctx.json({
      message: "zkLogin salt service",
    });
  })
  .post("/zk/salt", zValidator("json", z.object({ jwt: zJwt })), (ctx) => {
    const { jwt } = ctx.req.valid("json");
    const salt = deriveUserSalt(jwt);

    return ctx.json({
      salt: {
        hex: Buffer.from(salt).toString("hex"),
        base64: Buffer.from(salt).toString("base64"),
        integer: BigInt(`0x${Buffer.from(salt).toString("hex")}`).toString(),
      },
    });
  })

  // zkLogin prover service
  .get("/zk/prover", (ctx) => {
    return ctx.json({
      message: "zkLogin prover service",
    });
  })
  .post("/zk/prover", (ctx) => {
    return ctx.json({
      message: "zkLogin prover service",
    });
  });
