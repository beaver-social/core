import { Hono } from "hono";
import db from "../../lib/db";
import { users } from "../../lib/db/schema/user";
import { zValidator } from "@hono/zod-validator";
import { count, desc, eq, ilike, like, or, sql } from "drizzle-orm";
import { DB } from "../../lib/db/schema";
import { posts } from "../../lib/db/schema/post";
import { z } from "zod";
import { zNumberString, zSuiAddress } from "../../lib/zod/helpers";
import * as actions from "../../lib/db/actions/index";
import { tryCatch } from "../../lib/tryCatch";

export default new Hono()

  .post(
    "/new",
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

  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString.default("1"),
        limit: zNumberString.default("10"),
      })
    ),
    async (ctx) => {
      const { page, limit } = ctx.req.valid("query");

      const offset = (page - 1) * limit;
      const allUsers = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset);

      const totalUsers = await db.select({ count: count() }).from(users);

      return ctx.json(
        {
          allUsers,
          totalUsers: totalUsers[0]?.count ?? 0,
          currentPage: page,
          perPage: limit,
        },
        200
      );
    }
  )

  .get(
    "/find",
    zValidator(
      "query",
      z.object({
        id: zNumberString.optional(),
        identity: zSuiAddress.optional(),
        username: z.string().optional(),
        suins_domain_name: z.string().optional(),
        address: zSuiAddress.optional(),
      })
    ),
    async (ctx) => {
      const { id, identity, username, suins_domain_name, address } =
        ctx.req.valid("query");

      let user: DB["user"] | undefined = undefined;

      if (id) {
        const data = await db
          .select()
          .from(users)
          .where(eq(users.id, id))
          .limit(1);
        user = data[0];
      }

      if (identity) {
        const data = await db
          .select()
          .from(users)
          .where(eq(users.identity, identity))
          .limit(1);
        user = data[0];
      }

      if (username) {
        const data = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);
        user = data[0];
      }

      if (suins_domain_name) {
        const data = await db
          .select()
          .from(users)
          .where(eq(users.suinsDomainName, suins_domain_name))
          .limit(1);
        user = data[0];
      }

      if (address) {
        const data = await db
          .select()
          .from(users)
          .where(eq(users.address, address))
          .limit(1);
        user = data[0];
      }

      if (!user) return ctx.json({ error: "User not found" }, 404);

      return ctx.json({ id: user.id }, 200);
    }
  )

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

      const user = await db.select().from(users).where(eq(users.id, id));

      return ctx.json({ user }, 200);
    }
  )

  .get(
    "/search",
    zValidator(
      "query",
      z.object({
        query: z.string(),
      })
    ),
    async (ctx) => {
      const { query } = ctx.req.valid("query");

      const fuzzyQuery = `%${query.split("").join("%")}%`;

      const usersList = await db
        .select()
        .from(users)
        .where(
          or(
            sql`${users.username} LIKE ${fuzzyQuery}`,
            sql`${users.fullName} LIKE ${fuzzyQuery}`
          )
        )
        .orderBy(
          sql`LENGTH(${users.username}) ASC, LENGTH(${users.fullName}) ASC`
        )
        .limit(10);

      return ctx.json({ users: usersList }, 200);
    }
  )

  .get(
    "/:id/posts",
    zValidator(
      "param",
      z.object({
        id: zNumberString,
      })
    ),
    zValidator(
      "query",
      z.object({
        page: zNumberString.default("1"),
        limit: zNumberString.default("10"),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const { page, limit } = ctx.req.valid("query");

      if (!id) {
        return ctx.json({ error: "id not provided" }, 400);
      }

      const offset = (page - 1) * limit;
      const userPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.authorId, id))
        .limit(limit)
        .offset(offset);

      const totalPosts = await db
        .select({ count: count() })
        .from(posts)
        .where(eq(posts.authorId, id));

      return ctx.json(
        {
          userPosts,
          totalPosts: totalPosts[0]?.count ?? 0,
          currentPage: page,
          perPage: limit,
        },
        200
      );
    }
  );
