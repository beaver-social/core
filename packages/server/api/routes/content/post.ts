import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zMedia, zNumberString, zSignType } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "./post.action";
import { desc, eq, and, sql } from "drizzle-orm";
import db from "../../schema";
import { posts } from "../../schema/content";
import * as mediaSchema from "../../schema/content/media";
import * as interactionSchema from "../../schema/interactions";
import { reports } from "../../schema/interactions/moderation";
import * as postHelpers from "./post.helpers";

export default new Hono()
  // ***read actions on a post - using direct db calls***
  // get all posts (post feed)
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
        type: z.enum(["trending", "following", "for_you"]),
      })
    ),
    async (ctx) => {
      const { page, limit, type } = ctx.req.valid("query");

      // Use the pagination helper
      const { limit: limitNum, offset } = postHelpers.getPaginationParams(
        page,
        limit
      );

      if (type === "trending") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limitNum)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        // Process posts for display
        const processedPosts = result.data.map((post) =>
          postHelpers.processPostForDisplay(post)
        );

        return ctx.ok(processedPosts, "Posts feed fetched successfully", 200);
      } else if (type === "following") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limitNum)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        // Process posts for display
        const processedPosts = result.data.map((post) =>
          postHelpers.processPostForDisplay(post)
        );

        return ctx.ok(processedPosts, "Posts feed fetched successfully", 200);
      } else if (type === "for_you") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limitNum)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        // Process posts for display
        const processedPosts = result.data.map((post) =>
          postHelpers.processPostForDisplay(post)
        );

        return ctx.ok(processedPosts, "Posts feed fetched successfully", 200);
      }
    }
  )
  // get details for a post by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      // Using db.select() instead of db.query
      const result = await tryCatch(
        db
          .select()
          .from(posts)
          .where(eq(posts.id, parseInt(id)))
          .limit(1)
        // To join author, media, topic this would need more joins here
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

      // Process the post for display
      const processedPost = postHelpers.processPostForDisplay(result.data[0]);

      return ctx.ok(processedPost, "Post details fetched successfully", 200);
    }
  )
  // get interactions data for a post
  .get(
    "/interactions/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .select({
            likesCount: posts.likesCount,
            repliesCount: posts.repliesCount,
            sharesCount: posts.sharesCount,
            repostsCount: posts.repostsCount,
            viewCount: posts.viewCount,
          })
          .from(posts)
          .where(eq(posts.id, parseInt(id)))
          .limit(1)
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get post interactions",
          400
        );
      }

      if (!result.data || result.data.length === 0) {
        return ctx.err("Post not found", 404);
      }

      return ctx.ok(
        result.data[0],
        "Post interactions fetched successfully",
        200
      );
    }
  )
  // get view count of a post
  .get(
    "/views/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .select({ viewCount: posts.viewCount })
          .from(posts)
          .where(eq(posts.id, parseInt(id)))
          .limit(1)
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get post view count",
          400
        );
      }

      if (!result.data || result.data.length === 0) {
        return ctx.err("Post not found", 404);
      }

      return ctx.ok(
        { viewCount: result.data[0].viewCount },
        "Post view count fetched successfully",
        200
      );
    }
  )
  // increment view count of a post
  .post(
    "/view/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .update(posts)
          .set({ viewCount: sql`${posts.viewCount} + 1` })
          .where(eq(posts.id, parseInt(id)))
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to record view", 400);
      }

      return ctx.ok({}, "View recorded successfully", 200);
    }
  )

  // ***write actions on a post - using custom actions from post.action.ts***
  // create a new post (pass parentId to reply to a post)
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        content: z.string(),
        media: zMedia.array(),
        parentId: z.number().optional(),
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
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { content, media, parentId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      // Pre-validate content before sending to action
      const validation = postHelpers.validatePostContent(content);
      if (!validation.valid) {
        return ctx.err(validation.message ?? "Invalid post content", 400);
      }

      const result = await tryCatch(
        actions.createPost(
          { userId, content, media, parentId },
          { signature, type }
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
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.deletePost(
          { postId: parseInt(id), userId },
          { signature, type }
        )
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
    zValidator("param", z.object({ id: z.string() })),
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
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { content, media } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      // Pre-validate content before sending to action
      const validation = postHelpers.validatePostContent(content);
      if (!validation.valid) {
        return ctx.err(validation.message ?? "Invalid post content", 400);
      }

      const result = await tryCatch(
        actions.updatePost(
          { postId: parseInt(id), userId, content, media },
          { signature, type }
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to update post", 400);
      }

      return ctx.ok({}, "Post updated successfully", 200);
    }
  )

  // like a post (optionally with an emoji)
  .post(
    "/like/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
        reaction: z.string().optional(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.likePost({ postId: parseInt(id), userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to like post", 400);
      }

      return ctx.ok({}, "Post liked successfully", 200);
    }
  )
  // unlike a post
  .post(
    "/unlike/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unlikePost(
          { postId: parseInt(id), userId },
          { signature, type }
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unlike post", 400);
      }

      return ctx.ok({}, "Post unliked successfully", 200);
    }
  )
  // repost a post
  .post(
    "/repost",
    zValidator(
      "json",
      z.object({
        postId: z.number(),
        content: z.string().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, content } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      // If content is provided, validate it
      if (content) {
        const validation = postHelpers.validatePostContent(content);
        if (!validation.valid) {
          return ctx.err(validation.message ?? "Invalid post content", 400);
        }
      }

      const result = await tryCatch(
        actions.repostPost(
          { postId, userId, content: content || null },
          { signature, type }
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to repost", 400);
      }

      return ctx.ok(result.data, "Post reposted successfully", 200);
    }
  )
  // unrepost a post
  .post(
    "/unrepost",
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
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, repostId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unrepostPost({ postId, repostId, userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unrepost", 400);
      }

      return ctx.ok({}, "Post unreposted successfully", 200);
    }
  )
  // save a post
  .post(
    "/save",
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.savePost({ postId, userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to save post", 400);
      }

      return ctx.ok({}, "Post saved successfully", 200);
    }
  )
  // remove post from saved posts
  .post(
    "/unsave",
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unsavePost({ postId, userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unsave post", 400);
      }

      return ctx.ok({}, "Post unsaved successfully", 200);
    }
  )
  // report a post
  .post(
    "/report",
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
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, reason, details } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      // Validate reason
      if (!reason || reason.trim().length === 0) {
        return ctx.err("A reason for reporting is required", 400);
      }

      const result = await tryCatch(
        actions.reportPost(
          { postId, userId, reason, details },
          { signature, type }
        )
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to report post", 400);
      }

      return ctx.ok({}, "Post reported successfully", 200);
    }
  )
  // Pin post to profile
  .post(
    "/pin",
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.pinPost({ postId, userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to pin post", 400);
      }

      return ctx.ok({}, "Post pinned successfully", 200);
    }
  )
  // Unpin post from profile
  .post(
    "/unpin",
    zValidator(
      "json",
      z.object({
        postId: z.number(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.unpinPost({ postId, userId }, { signature, type })
      );

      if (result.error) {
        return ctx.err(result.error?.message || "Failed to unpin post", 400);
      }

      return ctx.ok({}, "Post unpinned successfully", 200);
    }
  );
