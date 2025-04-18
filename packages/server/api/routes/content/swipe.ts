import { Hono } from "hono";
import { authenticated } from "../../middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zNumberString, zSwipeMedia } from "../../lib/zod/helpers";
import tryCatchSync, { tryCatch } from "../../lib/tryCatch";
import db from "../../schema/db";
import { desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { swipes, media } from "../../schema/content";
import { follows } from "../../schema/interactions";
import {
  likes,
  reposts,
  saves,
  comments,
} from "../../schema/interactions/content";
import { users } from "../../schema/user/users";
import * as helpers from "./helpers";
import * as actions from "./swipe.action";
import { getPaginationParams } from "../../lib/utils";

export default new Hono()
  /**
   *PUBLIC ROUTES
   **/
  // get swipes feed
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    async (ctx) => {
      const { page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      const result = await tryCatch(
        db
          .select()
          .from(swipes)
          .where(isNull(swipes.parentId))
          .orderBy(desc(swipes.likesCount))
          .limit(limit)
          .offset(offset)
          .leftJoin(media, eq(swipes.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get swipes feed",
          400
        );
      }

      return ctx.ok(result.data, "Swipes feed fetched successfully", 200);
    }
  )
  // get swipe data by ID
  .get(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .select()
          .from(swipes)
          .where(eq(swipes.id, id))
          .leftJoin(media, eq(swipes.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to fetch swipe", 400);
      }

      if (result.data.length === 0) {
        return ctx.err("Swipe not found", 404);
      }

      return ctx.ok(result.data[0], "Swipe fetched successfully", 200);
    }
  )
  // get swipe interaction data by type
  .get(
    "/:id/interactions",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        type: z.enum(["likes", "reposts", "saves", "comments"]),
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { type, page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      let result;
      // Check if swipe exists
      const swipeExists = await tryCatch(
        db.select().from(swipes).where(eq(swipes.id, id))
      );

      if (swipeExists.error || swipeExists.data.length === 0) {
        return ctx.err("Swipe not found", 404);
      }

      // Get the content type ID for swipes (assuming it's 1 based on createSwipe implementation)
      const contentTypeId = 1;

      switch (type) {
        case "likes":
          result = await tryCatch(
            db
              .select({
                like: likes,
                user: users,
              })
              .from(likes)
              .where(
                eq(likes.contentId, id) &&
                  eq(likes.contentTypeId, contentTypeId)
              )
              .innerJoin(users, eq(likes.userId, users.id))
              .limit(limit)
              .offset(offset)
          );
          break;
        case "reposts":
          result = await tryCatch(
            db
              .select({
                repost: reposts,
                user: users,
              })
              .from(reposts)
              .where(
                eq(reposts.contentId, id) &&
                  eq(reposts.contentTypeId, contentTypeId)
              )
              .innerJoin(users, eq(reposts.userId, users.id))
              .limit(limit)
              .offset(offset)
          );
          break;
        case "saves":
          result = await tryCatch(
            db
              .select({
                save: saves,
                user: users,
              })
              .from(saves)
              .where(
                eq(saves.contentId, id) &&
                  eq(saves.contentTypeId, contentTypeId)
              )
              .innerJoin(users, eq(saves.userId, users.id))
              .limit(limit)
              .offset(offset)
          );
          break;
        case "comments":
          result = await tryCatch(
            db
              .select({
                comment: comments,
                user: users,
              })
              .from(comments)
              .where(
                eq(comments.contentId, id) &&
                  eq(comments.contentTypeId, contentTypeId)
              )
              .innerJoin(users, eq(comments.userId, users.id))
              .limit(limit)
              .offset(offset)
          );
          break;
      }

      if (result.error) {
        return ctx.err(result.error.message || `Failed to fetch ${type}`, 400);
      }

      return ctx.ok(result.data, `${type} fetched successfully`, 200);
    }
  )

  /**
   *ROUTES FOR SIGNED IN USERS
   **/
  .use(authenticated)
  // get user's personal swipes feed
  .get(
    "/user/feed",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
        type: z.enum(["following", "for_you"]),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { page, limit, type } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);
      if (type === "following") {
        // fetch posts from following users
        const following = await db
          .select()
          .from(follows)
          .where(eq(follows.followerId, userId));

        const followingIds = following.map((follow) => follow.followingId);

        const followingPosts = await tryCatch(
          db
            .select()
            .from(swipes)
            .where(
              inArray(swipes.authorId, followingIds) && isNull(swipes.parentId)
            )
            .orderBy(desc(swipes.createdAt))
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(swipes.id, media.contentId))
        );

        if (followingPosts.error) {
          return ctx.err(
            followingPosts.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(
          followingPosts.data,
          "Posts feed fetched successfully",
          200
        );
      } else if (type === "for_you") {
        const result = await tryCatch(
          db
            .select()
            .from(swipes)
            .where(isNull(swipes.parentId))
            .orderBy(sql`RAND()`)
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(swipes.id, media.contentId))
        );

        if (result.error) {
          return ctx.err(
            result.error.message || "Failed to get swipes feed",
            400
          );
        }

        return ctx.ok(result.data, "Posts feed fetched successfully", 200);
      }
    }
  )
  // get user's own swipes
  .get(
    "/user/profile",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      const result = await tryCatch(
        db
          .select()
          .from(swipes)
          .where(eq(swipes.authorId, userId))
          .orderBy(desc(swipes.createdAt))
          .limit(limit)
          .offset(offset)
          .leftJoin(media, eq(swipes.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(
          result.error.message || "Failed to get user's swipes",
          400
        );
      }

      return ctx.ok(result.data, "User's swipes fetched successfully", 200);
    }
  )

  /**
   *ACTION BASED ROUTES BELOW
   **/
  // create a new swipe
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        caption: z.string(),
        media: zSwipeMedia,
        parentId: z.number().optional(),
        flags: z.object({
          nsfw: z.boolean(),
          subscriberOnly: z.boolean().optional(),
        }),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const body = ctx.req.valid("json");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      // preprocess caption
      const processedCaption = helpers.preprocessPostContent(body.caption);
      const processedBody = {
        ...body,
        caption: processedCaption.content,
        hashtags: processedCaption.hashtags,
        mentions: processedCaption.mentions,
      };

      // create swipe
      const resp = await tryCatch(
        actions.createSwipe(processedBody, {
          userId,
          signature,
        })
      );

      if (resp.error) {
        return ctx.err(resp.error.message || "Failed to create swipe", 400);
      }

      return ctx.ok(
        {
          swipeId: resp.data,
        },
        "Post Created Successfully",
        201
      );
    }
  )
  // delete swipe by ID
  .delete(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.deleteSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to delete swipe", 400);
      }

      return ctx.ok(null, "Swipe deleted successfully", 200);
    }
  )
  // update swipe by ID
  .patch(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        caption: z.string().optional(),
        flags: z
          .object({
            nsfw: z.boolean().optional(),
            subscriberOnly: z.boolean().optional(),
          })
          .optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const body = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");

      // preprocess caption if provided
      let hashtags, mentions;
      if (body.caption) {
        const processedCaption = helpers.preprocessPostContent(body.caption);
        body.caption = processedCaption.content;
        hashtags = processedCaption.hashtags;
        mentions = processedCaption.mentions;
      }

      const result = await tryCatch(
        actions.updateSwipe(
          id,
          {
            caption: body.caption,
            hashtags,
            mentions,
            flags: body.flags,
          },
          { userId, signature }
        )
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to update swipe", 400);
      }

      return ctx.ok(null, "Swipe updated successfully", 200);
    }
  )
  // like swipe by ID
  .post(
    "/:id/like",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.likeSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to like swipe", 400);
      }

      return ctx.ok(null, "Swipe liked successfully", 200);
    }
  )
  // unlike swipe by ID
  .post(
    "/:id/unlike",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unlikeSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to unlike swipe", 400);
      }

      return ctx.ok(null, "Swipe unliked successfully", 200);
    }
  )
  // repost swipe by ID
  .post(
    "/:id/repost",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        quote: z.string().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { quote } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.repostSwipe(id, quote, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to repost swipe", 400);
      }

      return ctx.ok(null, "Swipe reposted successfully", 200);
    }
  )
  // unrepost swipe by ID
  .post(
    "/:id/unrepost",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unrepostSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to unrepost swipe", 400);
      }

      return ctx.ok(null, "Swipe unreposted successfully", 200);
    }
  )
  // save swipe by ID
  .post(
    "/:id/save",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.saveSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to save swipe", 400);
      }

      return ctx.ok(null, "Swipe saved successfully", 200);
    }
  )
  // unsave swipe by ID
  .post(
    "/:id/unsave",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unsaveSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to unsave swipe", 400);
      }

      return ctx.ok(null, "Swipe unsaved successfully", 200);
    }
  )
  // report swipe by ID
  .post(
    "/:id/report",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        reason: z.enum([
          "spam",
          "nudity",
          "violence",
          "harassment",
          "false_information",
          "hate_speech",
          "terrorism",
          "other",
        ]),
        details: z.string().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { reason, details } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.reportSwipe(id, reason, details, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to report swipe", 400);
      }

      return ctx.ok(null, "Report submitted successfully", 200);
    }
  )
  // pin swipe by ID
  .post(
    "/:id/pin",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.pinSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to pin swipe", 400);
      }

      return ctx.ok(null, "Swipe pinned successfully", 200);
    }
  )
  // unpin swipe by ID
  .post(
    "/:id/unpin",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unpinSwipe(id, { userId, signature })
      );

      if (result.error) {
        return ctx.err(result.error.message || "Failed to unpin swipe", 400);
      }

      return ctx.ok(null, "Swipe unpinned successfully", 200);
    }
  );
