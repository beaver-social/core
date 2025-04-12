import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { zMedia, zNumberString } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import * as actions from "./post.action";
import { desc } from "drizzle-orm";
import db from "../../schema";
import { posts } from "../../schema/content";

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
      const offset = (page - 1) * limit;

      if (type === "trending") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limit)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(result, "Posts feed fetched successfully", 200);
      } else if (type === "following") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limit)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(result, "Posts feed fetched successfully", 200);
      } else if (type === "for_you") {
        const result = await tryCatch(
          db
            .select()
            .from(posts)
            .orderBy(desc(posts.likesCount))
            .limit(limit)
            .offset(offset)
        );

        if (result.error) {
          return ctx.err(
            result.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(result, "Posts feed fetched successfully", 200);
      }
    }
  )
  // get details for a post by id
  .get("/:id", (ctx) => {
    return ctx.json({
      message: "get details for a post by id",
    });
  })
  // get view count of a post
  .get("/views/:id", (ctx) => {
    return ctx.json({
      message: "get view count of a post",
    });
  })
  // get interactions data for a post
  .get("/interactions/:id", (ctx) => {
    return ctx.json({
      message:
        "get interactions data for post: like, repost, save, reply, view count",
    });
  })

  // ***write actions on a post - using custom actions from post.action.ts***
  // create a new post
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        content: z.string(),
        media: zMedia.array(),
        topicId: z.number().optional(),
        parentId: z.number().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.number(),
        signature: z.string(),
        type: z.enum(["wallet", "zk"]),
      })
    ),
    async (ctx) => {
      const { content, media, topicId, parentId } = ctx.req.valid("json");
      const { userId, signature, type } = ctx.req.valid("query");

      const result = await tryCatch(
        actions.createPost(
          { userId, content, media, topicId, parentId },
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
        type: z.enum(["wallet", "zk"]),
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
  .patch("/:id", (ctx) => {
    return ctx.json({
      message: "update a post",
    });
  })
  // increment view count of a post
  .post("/view/:id", (ctx) => {
    return ctx.json({
      message: "increment view count of a post",
    });
  })
  // like a post (optionally with an emoji)
  .post("/like/:id", (ctx) => {
    return ctx.json({
      message: "like a post",
    });
  })
  // unlike a post
  .post("/unlike/:id", (ctx) => {
    return ctx.json({
      message: "unlike a post",
    });
  })
  // repost a post
  .post("/repost", (ctx) => {
    return ctx.json({
      message: "repost a post",
    });
  })
  // unrepost a post
  .post("/unrepost", (ctx) => {
    return ctx.json({
      message: "unrepost a post",
    });
  })
  // save a post
  .post("/save", (ctx) => {
    return ctx.json({
      message: "save a post",
    });
  })
  // remove post from saved posts
  .post("/unsave", (ctx) => {
    return ctx.json({
      message: "remove post from saved posts",
    });
  })
  // report a post
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report a post",
    });
  })
  // Pin post to profile
  .post("/pin", (ctx) => {
    return ctx.json({
      message: "pin your post to profile",
    });
  })
  // Unpin post from profile
  .post("/unpin", (ctx) => {
    return ctx.json({
      message: "unpin your post from profile",
    });
  });
