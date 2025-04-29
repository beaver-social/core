import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zJwt } from "../../lib/zod/helpers";
import { deriveUserSalt } from "./zk.helpers";

export default new Hono()
  // zk service
  .post("/salt", zValidator("json", z.object({ jwt: zJwt })), (ctx) => {
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
  .post("/prover", (ctx) => {
    return ctx.json({
      message: "zkLogin prover service",
    });
  });
