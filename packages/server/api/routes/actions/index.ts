import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import db from "../../lib/db";
import { tryCatch } from "../../lib/tryCatch";
import { eq, desc } from "drizzle-orm";
import { zNumberString } from "../../lib/zod/helpers";
import { respond } from "../../lib/utils/respond";

const { actions, posts } = db.schema;

export default new Hono()
  // get action data given id
  .get(
    "/:id",
    zValidator("param", z.object({ id: zNumberString() })),
    async (ctx) => {
      const { id: actionId } = ctx.req.valid("param");

      const result = await tryCatch(
        db.select().from(actions).where(eq(actions.id, actionId))
      );

      if (result.error) {
        return respond.err(ctx, result.error.message, 400);
      }

      return respond.ok(
        ctx,
        {
          action: result.data,
        },
        "Action fetched successfully",
        200
      );
    }
  )

  // get all actions for a user
  .get(
    "/user/:id",
    zValidator("param", z.object({ id: zNumberString() })),
    zValidator(
      "query",
      z.object({
        page: zNumberString().optional(),
        perPage: zNumberString().optional(),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");
      const { page, perPage } = ctx.req.valid("query");

      const actionsResult = await tryCatch(
        db
          .select()
          .from(actions)
          .where(eq(actions.userId, userId))
          .orderBy(desc(actions.createdAt))
          .limit(perPage ? Number(perPage) : 10)
          .offset(page ? Number(page) * Number(perPage) : 0)
      );

      if (actionsResult.error) {
        return respond.err(ctx, actionsResult.error.message, 400);
      }

      const actionWithPostId = await Promise.all(
        actionsResult.data.map(async (item) => {
          if (item.type.includes("post")) {
            const postResult = await tryCatch(
              db
                .select({
                  id: posts.id,
                })
                .from(posts)
                .where(eq(posts.actionId, item.id))
                .limit(1)
            );

            if (postResult.error) {
              ctx.log({
                message: `Error fetching post for actionId: ${item.id}`,
                error: postResult.error,
              });
            }

            return {
              ...item,
              postId: postResult.data?.[0]?.id,
            };
          }

          return {
            ...item,
            postId: undefined,
          };
        })
      );

      return respond.ok(
        ctx,
        {
          actions: actionWithPostId,
        },
        "User actions fetched successfully",
        200
      );
    }
  );
