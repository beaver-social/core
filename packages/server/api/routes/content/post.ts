import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zMedia, zNumberString, zSignType } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "./post.action";
import { and, desc, eq, inArray, isNotNull, isNull, sql } from "drizzle-orm";
import db from "../../schema";
import { posts } from "../../schema/content";
import * as postHelpers from "./post.helpers";
import * as InteractionSchema from "../../schema/interactions";
import { media } from "../../schema/content/media";
import { authenticated } from "../../middlewares/auth";

export default new Hono()
  // **get actions on a post - using direct db calls***
  // get public feed
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
      const { offset } = postHelpers.getPaginationParams(page, limit);

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
  // get single post by id
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
  // get interactions count for a post
  .get(
    "/:id/interaction/count",
    zValidator("param", z.object({ id: zNumberString })),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");

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
          .where(eq(posts.id, postId))
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
  // get interaction by type for a post
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
          db
            .select()
            .from(InteractionSchema.likes)
            .where(eq(InteractionSchema.likes.contentTypeId, postId))
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
            .from(InteractionSchema.reposts)
            .where(
              and(
                eq(InteractionSchema.reposts.contentId, postId),
                eq(InteractionSchema.reposts.contentTypeId, 0)
              )
            )
        );

        if (result.error) {
          return ctx.err(result.error?.message || "Failed to get reposts", 400);
        }

        return ctx.ok(result.data, "Reposts fetched successfully", 200);
      }
    }
  )

  // ***AUTH BASED POST ROUTES***
  .use(authenticated)
  // get posts based on user's preferences
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
      const { offset } = postHelpers.getPaginationParams(page, limit);
      if (type === "following") {
        // fetch posts from following users
        const following = await db
          .select()
          .from(InteractionSchema.follows)
          .where(eq(InteractionSchema.follows.followerId, userId));

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
  // get posts where author is the user
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
      const { offset } = postHelpers.getPaginationParams(page, limit);

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

  // ***write actions on a post - using custom actions from post.action.ts***
  // create a new post (pass parentId to reply to a post)
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
      const { valid, message } = postHelpers.validatePostContent(content);
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
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature, type } = ctx.req.valid("query");
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
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { content, media } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      // Pre-validate content before sending to action
      const validation = postHelpers.validatePostContent(content);
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
  // like a post (optionally with an emoji)
  .post(
    "/like/:id",
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
        type: zSignType,
        reaction: z.string().optional(),
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature, type } = ctx.req.valid("query");
      const userId = ctx.get("user").id;
      const result = await tryCatch(
        actions.likePost({ postId, userId }, signature)
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
    zValidator("param", z.object({ id: zNumberString })),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, content } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
      const userId = ctx.get("user").id;

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
          signature
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, repostId } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId, reason, details } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
        signature: z.string(),
        type: zSignType,
      })
    ),
    async (ctx) => {
      const { postId } = ctx.req.valid("json");
      const { signature, type } = ctx.req.valid("query");
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
