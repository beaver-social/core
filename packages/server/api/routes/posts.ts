import { Hono } from "hono";
import db from "../lib/db";
import { users } from "../lib/db/schema/user";
import { zValidator } from "@hono/zod-validator";
import { count, desc, eq } from "drizzle-orm";
import { DB } from "../lib/db/schema";
import { z } from "zod";
import { zNumberString, zSuiAddress } from "../lib/zod/helpers";
import { posts } from "../lib/db/schema/post";
import { replies } from "../lib/db/schema/reply";

function err(msg: string) {
    return { error: msg }
}

export default new Hono()
    .get("/",
        zValidator(
            "query",
            z.object({
                page: zNumberString.default("1"),
                limit: zNumberString.default("10")
            }),
        ),
        async (ctx) => {
            // check if page & limit is number when default
            const { page, limit } = ctx.req.valid("query");

            const offset = (page - 1) * limit;
            const allPosts = await db
                .select()
                .from(posts)
                .orderBy(desc(posts.createdAt))
                .limit(limit)
                .offset(offset);

            const totalPosts = await db
                .select({ count: count() })
                .from(posts)

            return ctx.json({
                allPosts,
                totalPosts: totalPosts[0]?.count ?? 0,
                currentPage: page,
                perPage: limit,
            }, 200);
        },


    )

    .get("/:postId",
        zValidator(
            "param",
            z.object({
                postId: zNumberString,
            }),
        ),
        async (ctx) => {
            const { postId } = ctx.req.valid("param");

            const { 0: post } = await db.select().from(posts).where(eq(posts.id, postId));

            if (!post) return ctx.json(err("Post not found"), 404)

            return ctx.json({ post }, 200);
        },
    )

    .get("/:postId/replies",
        zValidator(
            "param",
            z.object({
                postId: zNumberString,
            }),
        ),
        zValidator(
            "query",
            z.object({
                page: zNumberString.default("1"),
                limit: zNumberString.default("10")
            }),
        ),
        async (ctx) => {
            const { postId } = ctx.req.valid("param");

            // check if page & limit is number when default
            const { page, limit } = ctx.req.valid("query");

            if (!postId) {
                return ctx.json({ error: "id not provided" }, 400)
            }

            const offset = (page - 1) * limit;
            const postReplies = await db
                .select()
                .from(replies)
                .where(eq(replies.postId, postId))
                .limit(limit)
                .offset(offset);

            const totalReplies = await db
                .select({ count: count() })
                .from(replies)
                .where(eq(replies.userId, postId));

            return ctx.json({
                postReplies,
                totalPosts: totalReplies[0]?.count ?? 0,
                currentPage: page,
                perPage: limit,
            }, 200);
        }
    );


