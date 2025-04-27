import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zNumberString, zUserUpdate } from "../../lib/zod/helpers";
import { and, desc, eq, isNull, not, sql } from "drizzle-orm";
import type { DB } from "../../schema";
import db from "../../schema/db";
import { authenticated } from "../../middlewares/auth";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "./user.action";
import { users } from "../../schema/user/users";
import { getPaginationParams } from "../../lib/utils";

import {
  likes,
  comments,
  reposts,
  saves,
  follows,
  topicFollows,
} from "../../schema/interactions";
import { postAwards } from "../../schema/misc/awards";
import { respond } from "../../../utils/respond";

export default new Hono()

  // get user id from identity, username, suinsDomainName, address
  .get(
    "/find",
    zValidator(
      "query",
      z.object({
        type: z.enum(["identity", "username", "suinsDomainName", "address"]),
        value: z.string(),
      })
    ),
    async (ctx) => {
      const { type, value } = ctx.req.valid("query");

      if (type === "identity") {
        const result = await tryCatch(
          db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.identity, value))
            .limit(1)
        );

        if (result.error) return respond.err(ctx, "User not found", 404);

        return respond.ok(ctx, result.data[0], "User id fetched", 200);
      } else if (type === "username") {
        const result = await tryCatch(
          db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username, value))
            .limit(1)
        );

        if (result.error) return respond.err(ctx, "User not found", 404);

        return respond.ok(ctx, result.data[0], "User id fetched", 200);
      } else if (type === "suinsDomainName") {
        const result = await tryCatch(
          db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.suinsDomainName, value))
            .limit(1)
        );

        if (result.error) return respond.err(ctx, "User not found", 404);

        return respond.ok(ctx, result.data[0], "User id fetched", 200);
      } else if (type === "address") {
        const result = await tryCatch(
          db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.address, value))
            .limit(1)
        );

        if (result.error) return respond.err(ctx, "User not found", 404);
        return respond.ok(ctx, result.data[0], "User id fetched", 200);
      } else {
        return respond.err(ctx, "Invalid search criteria", 400);
      }
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
        db.select().from(users).where(eq(users.id, userId)).limit(1)
      );

      if (user.error) return respond.err(ctx, "User not found", 404);

      return respond.ok(
        ctx,
        user.data[0],
        "User details fetched from ID successfully",
        200
      );
    }
  )

  // AUTHENTICATED ROUTES
  .use(authenticated)
  // get current user details
  .get("/", async (ctx) => {
    const user = ctx.get("user");
    return respond.ok(
      ctx,
      user,
      "Current user details fetched successfully",
      200
    );
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
        return respond.err(
          ctx,
          result.error?.message || "Failed to update user",
          400
        );

      return respond.ok(ctx, {}, "User updated successfully", 200);
    }
  )
  // get user's interactions (likes, saves, reposts, comments, follows, topic follows)
  .get(
    "/interactions/:type",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    zValidator(
      "param",
      z.object({
        type: z.enum([
          "likes",
          "saves",
          "reposts",
          "comments",
          "follows",
          "topicFollows",
        ]),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { type } = ctx.req.valid("param");
      const { page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      if (type === "likes") {
        const result = await tryCatch(
          db
            .select()
            .from(likes)
            .where(eq(likes.userId, userId))
            .orderBy(desc(likes.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { likes: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else if (type === "saves") {
        const result = await tryCatch(
          db
            .select()
            .from(saves)
            .where(eq(saves.userId, userId))
            .orderBy(desc(saves.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { saves: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else if (type === "reposts") {
        const result = await tryCatch(
          db
            .select()
            .from(reposts)
            .where(eq(reposts.userId, userId))
            .orderBy(desc(reposts.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { reposts: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else if (type === "comments") {
        const result = await tryCatch(
          db
            .select()
            .from(comments)
            .where(and(eq(comments.userId, userId), isNull(comments.parentId)))
            .orderBy(desc(comments.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { comments: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else if (type === "follows") {
        const result = await tryCatch(
          db
            .select()
            .from(follows)
            .where(eq(follows.followerId, userId))
            .orderBy(desc(follows.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { follows: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else if (type === "topicFollows") {
        const result = await tryCatch(
          db
            .select()
            .from(topicFollows)
            .where(eq(topicFollows.userId, userId))
            .orderBy(desc(topicFollows.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user's interactions",
            400
          );

        return respond.ok(
          ctx,
          { topicFollows: result.data },
          "User's interactions fetched successfully",
          200
        );
      } else {
        return respond.err(ctx, "Invalid interaction type", 400);
      }
    }
  )
  // get suggested users to follow
  .get(
    "/suggestions",
    zValidator(
      "query",
      z.object({
        limit: zNumberString,
        page: zNumberString,
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { limit, page } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      // get 5 random users excluding the current user
      const result = await tryCatch(
        db
          .select()
          .from(users)
          .where(not(eq(users.id, userId)))
          .orderBy(sql`RANDOM()`)
          .limit(limit)
          .offset(offset)
      );

      if (result.error)
        return respond.err(
          ctx,
          result.error?.message || "Failed to get suggested users",
          400
        );

      return respond.ok(
        ctx,
        { suggestions: result.data },
        "Suggested users fetched successfully",
        200
      );
    }
  )
  // suins sync
  .get("/suins/sync", async (ctx) => {
    const userId = ctx.get("user").id;
    const result = await tryCatch(actions.syncSuins({ userId }));

    if (result.error)
      return respond.err(
        ctx,
        result.error?.message || "Failed to sync suins",
        400
      );

    return respond.ok(ctx, result.data, "Suins synced successfully", 200);
  })
  // user owned awards
  .get(
    "/awards",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
        type: z.enum(["owned", "given"]),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { page, limit, type } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      if (type === "owned") {
        const result = await tryCatch(
          db
            .select()
            .from(postAwards)
            .where(eq(postAwards.recipientId, userId))
            .orderBy(desc(postAwards.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user awards",
            400
          );

        return respond.ok(
          ctx,
          { awards: result.data },
          "User awards fetched successfully",
          200
        );
      } else if (type === "given") {
        const result = await tryCatch(
          db
            .select()
            .from(postAwards)
            .where(eq(postAwards.giverId, userId))
            .orderBy(desc(postAwards.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error)
          return respond.err(
            ctx,
            result.error?.message || "Failed to get user awards",
            400
          );

        return respond.ok(
          ctx,
          { awards: result.data },
          "User awards fetched successfully",
          200
        );
      } else {
        return respond.err(ctx, "Invalid award type", 400);
      }
    }
  );
