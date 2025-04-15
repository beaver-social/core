import { zValidator } from "@hono/zod-validator";
import { zNumberString } from "../../lib/zod/helpers";
import { z } from "zod";
import { Hono } from "hono";
import db from "../../schema/db";
import { tryCatch } from "../../lib/tryCatch";
import { eq } from "drizzle-orm";
import { swipes } from "../../schema/content/swipes";

export default new Hono()
  // Get interactions count for a post
  .get(
    "/:id/interactions",
    zValidator("param", z.object({ id: zNumberString })),
    async (ctx) => {
      const { id: swipeId } = ctx.req.valid("param");

      const result = await tryCatch(
        db
          .select({
            viewCount: swipes.viewCount,
            likesCount: swipes.likesCount,
            repostsCount: swipes.repostsCount,
            sharesCount: swipes.sharesCount,
            commentsCount: swipes.commentsCount,
          })
          .from(swipes)
          .where(eq(swipes.id, swipeId))
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
  );
