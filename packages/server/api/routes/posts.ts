import { Hono } from "hono";
import db from "../lib/db";
import { zValidator } from "@hono/zod-validator";
import { count, desc, eq, like, sql } from "drizzle-orm";
import { z } from "zod";
import { zNumberString } from "../lib/zod/helpers";
import { posts } from "../lib/db/schema/post";
import { likes } from "../lib/db/schema/like";

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
            const { page, limit } = ctx.req.valid("query");

            const offset = (page - 1) * limit;
            const allPosts = await db
                .select({
                    post: posts,
                    repliesCount: sql<number>`COALESCE(COUNT(DISTINCT replies.id), 0)`,
                    likesCount: sql<number>`COALESCE(COUNT(DISTINCT likes.id), 0)`
                })
                .from(posts)
                .leftJoin(posts, eq(posts.id, posts.parent))
                .leftJoin(likes, eq(posts.id, likes.postId))
                .groupBy(posts.id)
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

    .get("/:id",
        zValidator(
            "param",
            z.object({
                id: zNumberString,
            }),
        ),
        async (ctx) => {
            const { id } = ctx.req.valid("param");

            const { 0: post } = await db.select().from(posts).where(eq(posts.id, id));

            if (!post) return ctx.json(err("Post not found"), 404)

            return ctx.json({ post }, 200);
        },
    )

    .get("/:id/likes",
        zValidator(
            "param",
            z.object({
                id: zNumberString,
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
            const { id } = ctx.req.valid("param");

            // check if page & limit is number when default
            const { page, limit } = ctx.req.valid("query");

            if (!id) {
                return ctx.json({ error: "id not provided" }, 400)
            }

            const offset = (page - 1) * limit;
            const postLikes = await db
                .select()
                .from(likes)
                .where(eq(likes.id, id))
                .limit(limit)
                .offset(offset);

            const totalPostLikes = await db
                .select({ count: count() })
                .from(likes)
                .where(eq(likes.id, id));

            return ctx.json({
                postLikes,
                totalPosts: totalPostLikes[0]?.count ?? 0,
                currentPage: page,
                perPage: limit,
            }, 200);
        }
    );


