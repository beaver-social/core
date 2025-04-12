import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zNumberString, zSuiAddress } from "../../lib/zod/helpers";
import { eq } from "drizzle-orm";
import db, { DB } from "../../schema";
import * as userSchema from "../../schema/user";

export default new Hono()
  // get user id from identity, username, suinsDomainName, address
  .get(
    "/find",
    zValidator(
      "query",
      z.object({
        identity: zSuiAddress.optional(),
        username: z.string().optional(),
        suinsDomainName: z.string().optional(),
        address: zSuiAddress.optional(),
      })
    ),
    async (ctx) => {
      const { identity, username, suinsDomainName, address } =
        ctx.req.valid("query");

      let user: DB["user"] | undefined = undefined;

      if (identity) {
        const data = await db
          .select()
          .from(userSchema.users)
          .where(eq(userSchema.users.identity, identity))
          .limit(1);
        user = data[0];
      }

      if (username) {
        const data = await db
          .select()
          .from(userSchema.users)
          .where(eq(userSchema.users.username, username))
          .limit(1);
        user = data[0];
      }

      if (suinsDomainName) {
        const data = await db
          .select()
          .from(userSchema.users)
          .where(eq(userSchema.users.suinsDomainName, suinsDomainName))
          .limit(1);
        user = data[0];
      }

      if (address) {
        const data = await db
          .select()
          .from(userSchema.users)
          .where(eq(userSchema.users.address, address))
          .limit(1);
        user = data[0];
      }

      if (!user) return ctx.err("User not found", 404);

      return ctx.ok({ id: user.id }, "User id fetched", 200);
    }
  )

  // get user details by id
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString,
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const user = await db
        .select()
        .from(userSchema.users)
        .where(eq(userSchema.users.id, id));

      return ctx.ok({ user }, "User details fetched from ID successfully", 200);
    }
  )

  // get current user details
  .get("/", (ctx) => {
    return ctx.json({
      message: "get current user details",
    });
  })

  // update current user details
  .patch("/", (ctx) => {
    return ctx.json({
      message: "update current user details",
    });
  })

  // get suggested users to follow
  .get("/suggestions", (ctx) => {
    return ctx.json({
      message: "get suggested users to follow",
    });
  })

  // request account verification
  .post("/suins/request", (ctx) => {
    return ctx.json({
      message: "request account verification",
    });
  })

  // check verification status
  .get("/suins/status", (ctx) => {
    return ctx.json({
      message: "check verification status",
    });
  });
