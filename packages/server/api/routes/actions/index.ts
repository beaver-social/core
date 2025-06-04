import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import db from "../../lib/db";
import { tryCatch } from "../../lib/tryCatch";
import { eq, desc } from "drizzle-orm";
import { zNumberString } from "../../lib/zod/helpers";
import { respond } from "../../lib/utils/respond";
import { retrieveActionRequest } from "../../lib/actions/helpers";

const { actions, actionRequests, posts, users } = db.schema;

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
        page: zNumberString()
          .default("1")
          .transform((v) => v - 1),
        perPage: zNumberString()
          .transform((v) => Math.min(v, 32))
          .default("8"),
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
          .limit(perPage)
          .offset(page * perPage)
          .orderBy(desc(actions.createdAt))
      );

      if (actionsResult.error) {
        return respond.err(ctx, actionsResult.error.message, 400);
      }

      // fetch payload from action request
      const actionWithPayload = await Promise.all(
        actionsResult.data.map(async (action) => {
          const payload = await tryCatch(retrieveActionRequest(action.id));

          if (payload.error) {
            ctx.log({
              message: `Error fetching payload for actionId: ${action.id}`,
              error: payload.error,
            });
          }

          let postId = payload.data?.req.postId || null;
          let user: typeof users.$inferSelect | null = null;

          if (action.type.includes("create.post")) {
            const postData = await tryCatch(
              db
                .select({
                  id: posts.id,
                })
                .from(posts)
                .where(eq(posts.actionId, action.id))
                .limit(1)
            );

            if (postData.error) {
              ctx.log({
                message: `Error fetching post data for actionId: ${action.id}`,
                error: postData.error,
              });
            }

            postId = postData.data?.[0]?.id || null;
          }

          if (action.type.endsWith("user")) {
            const userId =
              payload.data?.req.userId ||
              payload.data?.req.followingId ||
              payload.data?.req.followerId ||
              payload.data?.req.id;

            const userData = await tryCatch(
              db
                .select()
                .from(users)
                .where(eq(users.id, Number(userId)))
                .limit(1)
            );

            if (userData.error) {
              ctx.log({
                message: `Error fetching user data for actionId: ${action.id}`,
                error: userData.error,
              });
            }

            user = userData.data?.[0] || null;
          }

          return {
            ...action,
            payload: {
              ...payload.data?.req,
              postId,
              user,
            },
          };
        })
      );

      return respond.ok(
        ctx,
        {
          actions: actionWithPayload,
          hasMore: !(actionsResult.data.length < perPage),
        },
        "User actions fetched successfully",
        200
      );
    }
  );
