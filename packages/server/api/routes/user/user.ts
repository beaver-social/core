import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zNumberString, zSuiAddress, zUserUpdate } from "../../lib/zod/helpers";
import { eq } from "drizzle-orm";
import db, { DB } from "../../schema";
import * as userSchema from "../../schema/user";
import { authenticated } from "../../middlewares/auth";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "./user.action";

export default new Hono()
  .use(authenticated)
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
        const data = await tryCatch(
          db
            .select()
            .from(userSchema.users)
            .where(eq(userSchema.users.identity, identity))
            .limit(1)
        );

        if (data.error) return ctx.err("User not found", 404);
        user = data.data[0];
      }

      if (username) {
        const data = await tryCatch(
          db
            .select()
            .from(userSchema.users)
            .where(eq(userSchema.users.username, username))
            .limit(1)
        );

        if (data.error) return ctx.err("User not found", 404);
        user = data.data[0];
      }

      if (suinsDomainName) {
        const data = await tryCatch(
          db
            .select()
            .from(userSchema.users)
            .where(eq(userSchema.users.suinsDomainName, suinsDomainName))
            .limit(1)
        );

        if (data.error) return ctx.err("User not found", 404);
        user = data.data[0];
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
      const { id: userId } = ctx.req.valid("param");

      const user = await tryCatch(
        db
          .select()
          .from(userSchema.users)
          .where(eq(userSchema.users.id, userId))
          .limit(1)
      );

      if (user.error) return ctx.err("User not found", 404);

      return ctx.ok(
        { user: user.data[0] },
        "User details fetched from ID successfully",
        200
      );
    }
  )

  // get current user details
  .get("/", (ctx) => {
    const user = ctx.get("user");

    return ctx.json({
      message: "get current user details",
      user,
    });
  })

  // update current user details
  .patch(
    "/",
    zValidator("json", zUserUpdate),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const body = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.updateUser({ userId, body }, signature)
      );
      if (result.error)
        return ctx.err(result.error?.message || "Failed to update user", 400);

      return ctx.ok(result.data, "User updated successfully", 200);
    }
  )

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
