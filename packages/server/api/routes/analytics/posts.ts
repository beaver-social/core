import { zValidator } from "@hono/zod-validator";
import { zNumberString } from "../../lib/zod/helpers";
import { z } from "zod";
import { Hono } from "hono";
import db from "../../schema/db";
import { tryCatch } from "../../lib/tryCatch";
import { eq } from "drizzle-orm";
import { posts } from "../../schema/content/posts";

export default new Hono()
  // Get interactions count for a post
  .get(
    "/:id/interactions",
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

      return ctx.json(
        {
          data: result.data[0],
          message: "Post interactions fetched successfully",
        },
        200
      );
    }
  );
