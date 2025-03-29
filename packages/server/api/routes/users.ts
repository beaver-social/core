import { Hono } from "hono";
import db from "../lib/db";
import { users } from "../lib/db/schema/user";
import { zValidator } from "@hono/zod-validator";
import { count, eq } from "drizzle-orm";
import tryCatchSync from "../lib/tryCatch";
import { DB } from "../lib/db/schema";
import { posts } from "../lib/db/schema/post";
import { z } from "zod";
import { zNumberString, zSuiAddress } from "../lib/zod/helpers";
import { likes } from "../lib/db/schema/like";
import { replies } from "../lib/db/schema/reply";

export default new Hono()
    .get("/find",
        zValidator(
            "query",
            z.object({
                id: zNumberString.optional(),
                identity: zSuiAddress.optional(),
                username: z.string().optional(),
                suins_domain_name: z.string().optional(),
                wallet: zSuiAddress.optional(),
            }),
        ),
        async (ctx) => {
            const { id, identity, username, suins_domain_name, wallet } = ctx
                .req.valid("query");

            let user: DB["user"] | undefined = undefined;

            if (id) {
                const data = await db.select().from(users).where(
                    eq(users.id, id),
                ).limit(1);
                user = data[0];
            }

            if (identity) {
                const data = await db.select().from(users).where(
                    eq(users.identity, identity),
                ).limit(1);
                user = data[0];
            }

            if (username) {
                const data = await db.select().from(users).where(
                    eq(users.username, username),
                ).limit(1);
                user = data[0];
            }

            if (suins_domain_name) {
                const data = await db.select().from(users).where(
                    eq(users.suins_domain_name, suins_domain_name),
                ).limit(1);
                user = data[0];
            }

            if (wallet) {
                const data = await db.select().from(users).where(
                    eq(users.wallet, wallet),
                ).limit(1);
                user = data[0];
            }

            if (!user) return ctx.json({ error: "User not found" }, 404);

            return ctx.json({ id: user.id }, 200);
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

            const user = await db.select().from(users).where(eq(users.id, id));

            return ctx.json({ user }, 200);
        },
    )

    .get("/:id/posts",
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

            return ctx.json({
                userPosts,
                totalPosts: totalPosts[0]?.count ?? 0,
                currentPage: page,
                perPage: limit,
            }, 200);
        }
    )

    .get("/:id/replies",
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
            const userReplies = await db
                .select()
                .from(replies)
                .where(eq(replies.userId, id))
                .limit(limit)
                .offset(offset);

            const totalReplies = await db
                .select({ count: count() })
                .from(replies)
                .where(eq(replies.userId, id));

            return ctx.json({
                userReplies,
                totalPosts: totalReplies[0]?.count ?? 0,
                currentPage: page,
                perPage: limit,
            }, 200);
        }
    );
