import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  zMedia,
  zNumberString,
  zReactionType,
  zSignType,
} from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import { and, desc, eq, inArray, isNotNull, isNull, sql } from "drizzle-orm";
import { authenticated } from "../../middlewares/auth";
import { posts } from "../../schema/content";
import { media } from "../../schema/content/media";
import { likes, reposts, follows } from "../../schema/interactions";
import db from "../../schema/db";
import * as helpers from "./helpers";
import * as actions from "./post.actions";
import { getPaginationParams } from "../../lib/utils";
import { postAwards } from "../../schema/misc/awards";

export default new Hono()
  /**
   *PUBLIC ROUTES
   **/
  // Get public feed
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
          .from(posts)
          .where(isNull(posts.parentId))
          .orderBy(desc(posts.likesCount))
          .limit(limit)
          .offset(offset)
          .leftJoin(media, eq(posts.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get posts feed",
          400
        );
      }

      return ctx.ok(result.data, "Posts feed fetched successfully", 200);
    }
  )
  // Get single post by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .select()
          .from(posts)
          .where(eq(posts.id, postId))
          .limit(1)
          .leftJoin(media, eq(posts.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get post details",
          400
        );
      }

      if (!result.data || result.data.length === 0) {
        return ctx.err("Post not found", 404);
      }

      return ctx.ok(result.data[0], "Post details fetched successfully", 200);
    }
  )
  // Get interaction by type for a post
  .get(
    "/:id/interaction",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({ type: z.enum(["likes", "replies", "reposts"]) })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { type } = ctx.req.valid("query");

      if (type === "likes") {
        const result = await tryCatch(
          db.select().from(likes).where(eq(likes.contentTypeId, postId))
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get likes", 400);
        }

        return ctx.ok(result.data, "Likes fetched successfully", 200);
      } else if (type === "replies") {
        const result = await tryCatch(
          db.select().from(posts).where(eq(posts.parentId, postId))
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get replies", 400);
        }

        return ctx.ok(result.data, "Replies fetched successfully", 200);
      } else if (type === "reposts") {
        const result = await tryCatch(
          db
            .select()
            .from(reposts)
            .where(
              and(eq(reposts.contentId, postId), eq(reposts.contentTypeId, 0))
            )
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get reposts", 400);
        }

        return ctx.ok(result.data, "Reposts fetched successfully", 200);
      }
    }
  )
  // Get post awards
  .get(
    "/:id/awards",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      const result = await tryCatch(
        db
          .select()
          .from(postAwards)
          .where(eq(postAwards.postId, postId))
          .orderBy(desc(postAwards.createdAt))
          .limit(limit)
          .offset(offset)
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get post awards",
          400
        );
      }

      return ctx.ok(result.data, "Post awards fetched successfully", 200);
    }
  )

  /**
   *AUTH BASED ROUTES
   **/
  .use(authenticated)
  // Get posts based on user's preferences
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
            .from(posts)
            .where(
              inArray(posts.authorId, followingIds) && isNull(posts.parentId)
            )
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(posts.id, media.contentId))
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
        // curated for you (future implementation)
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(isNull(posts.parentId))
            .orderBy(sql`RAND()`)
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(posts.id, media.contentId))
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(result.data, "Posts feed fetched successfully", 200);
      }
    }
  )
  // Get posts where author is the user
  .get(
    "/user/profile",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
        type: z.enum([
          "your-posts",
          "your-replies",
          "your-media",
          "your-saved",
          "your-pinned",
        ]),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { page, limit, type } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      if (type === "your-posts") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(eq(posts.authorId, userId))
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get posts", 400);
        }

        return ctx.ok(result.data, "Posts fetched successfully", 200);
      } else if (type === "your-replies") {
        // fetch all posts, where you have replied to (post has a parentId and you are the author)
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(and(eq(posts.authorId, userId), isNotNull(posts.parentId)))
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(posts.id, media.contentId))
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get posts", 400);
        }

        return ctx.ok(result.data, "Posts fetched successfully", 200);
      } else if (type === "your-media") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(eq(posts.authorId, userId))
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
            .innerJoin(media, eq(posts.id, media.contentId))
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get posts", 400);
        }

        return ctx.ok(result.data, "Posts fetched successfully", 200);
      } else if (type === "your-saved") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(eq(posts.authorId, userId))
            .orderBy(desc(posts.createdAt))
            .limit(limit)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get posts", 400);
        }

        return ctx.ok(result.data, "Posts fetched successfully", 200);
      } else if (type === "your-pinned") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .where(eq(posts.authorId, userId))
            .orderBy(desc(posts.createdAt))
            .limit(1)
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get posts", 400);
        }

        return ctx.ok(result.data, "Posts fetched successfully", 200);
      }
    }
  )
  // Create a new post (pass parentId to reply to a post)
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        content: z.string(),
        media: zMedia.array().optional(),
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
      const { content, media, parentId, flags } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      // Pre-validate content before sending to action
      const { valid, message } = helpers.validatePostContent(content);
      if (!valid) {
        return ctx.err(message ?? "Invalid post content", 400);
      }

      const result = await tryCatch(
        actions.createPost(
          { userId, content, media, parentId, flags },
          signature
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to create post", 400);
      }

      return ctx.ok({}, "Post Created Successfully", 201);
    }
  )
  // Delete a post
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
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      const result = await tryCatch(
        actions.deletePost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to delete post", 400);
      }

      return ctx.ok({}, "Post Deleted Successfully", 201);
    }
  )
  // Update a post
  .patch(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        content: z.string(),
        media: zMedia.array(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { content, media } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      // Pre-validate content before sending to action
      const validation = helpers.validatePostContent(content);
      if (!validation.valid) {
        return ctx.err(validation.message ?? "Invalid post content", 400);
      }

      const result = await tryCatch(
        actions.updatePost({ postId, userId, content, media }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to update post", 400);
      }

      return ctx.ok({}, "Post updated successfully", 200);
    }
  )
  // Like a post (optionally with an emoji)
  .post(
    "/:id/like",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
        reaction: zReactionType.optional(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature, reaction } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      const result = await tryCatch(
        actions.likePost({ postId, userId, reaction }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to like post", 400);
      }

      return ctx.ok({}, "Post liked successfully", 200);
    }
  )
  // Unlike a post
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
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      const result = await tryCatch(
        actions.unlikePost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unlike post", 400);
      }

      return ctx.ok({}, "Post unliked successfully", 200);
    }
  )
  // Repost a post
  .post(
    ":id/repost",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        content: z.string().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { content } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      // If content is provided, validate it
      if (content) {
        const validation = helpers.validatePostContent(content);
        if (!validation.valid) {
          return ctx.err(validation.message ?? "Invalid post content", 400);
        }
      }

      const result = await tryCatch(
        actions.repostPost(
          { postId, userId, content: content || null },
          signature
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to repost", 400);
      }

      return ctx.ok({}, "Post reposted successfully", 200);
    }
  )
  // Unrepost a post
  .post(
    "/:id/unrepost",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
        repostId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { repostId } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      const result = await tryCatch(
        actions.unrepostPost({ postId, repostId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unrepost", 400);
      }

      return ctx.ok({}, "Post unreposted successfully", 200);
    }
  )
  // Save a post
  .post(
    "/:id/save",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      const result = await tryCatch(
        actions.savePost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to save post", 400);
      }

      return ctx.ok({}, "Post saved successfully", 200);
    }
  )
  // Remove post from saved posts
  .post(
    "/:id/unsave",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      const result = await tryCatch(
        actions.unsavePost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unsave post", 400);
      }

      return ctx.ok({}, "Post unsaved successfully", 200);
    }
  )
  // Report a post
  .post(
    "/:id/report",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
        reason: z.string(),
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
      const { id: postId } = ctx.req.valid("param");
      const { reason, details } = ctx.req.valid("json");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      // Validate reason
      if (!reason || reason.trim().length === 0) {
        return ctx.err("A reason for reporting is required", 400);
      }

      const result = await tryCatch(
        actions.reportPost({ postId, userId, reason, details }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to report post", 400);
      }

      return ctx.ok({}, "Post reported successfully", 200);
    }
  )
  // Pin post to profile
  .post(
    "/:id/pin",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      const result = await tryCatch(
        actions.pinPost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to pin post", 400);
      }

      return ctx.ok({}, "Post pinned successfully", 200);
    }
  )
  // Unpin post from profile
  .post(
    "/:id/unpin",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

      const result = await tryCatch(
        actions.unpinPost({ postId, userId }, signature)
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unpin post", 400);
      }

      return ctx.ok({}, "Post unpinned successfully", 200);
    }
  );
