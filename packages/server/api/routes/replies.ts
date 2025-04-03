import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zNumberString } from "../lib/zod/helpers";
import { replies } from "../lib/db/schema/reply";
import db from "../lib/db";
import { count, desc, eq } from "drizzle-orm";
import { likes } from "../lib/db/schema/like";

export default new Hono()
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
      const allReplies = await db
        .select()
        .from(replies)
        .orderBy(desc(replies.createdAt))
        .limit(limit)
        .offset(offset);

      const totalReplies = await db.select({ count: count() }).from(replies);

      return ctx.json(
        {
          allReplies,
          totalReplies: totalReplies[0]?.count ?? 0,
          currentPage: page,
          perPage: limit,
        },
        200
      );
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

      const reply = await db.select().from(replies).where(eq(replies.id, id));

      return ctx.json({ reply: reply }, 200);
    }
  )

  .get(
    "/:id/likes",
    zValidator(
      "param",
      z.object({
        id: zNumberString,
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const data = await db.select().from(likes).where(eq(likes.replyId, id));

      return ctx.json({ reply: data }, 200);
    }
  );
