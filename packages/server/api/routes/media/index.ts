import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { uploadMedia } from "./helpers";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import authenticated from "../../middlewares/authenticated";

export default new Hono().post(
  "/upload",
  authenticated,
  zValidator(
    "form",
    z.object({
      media: z.array(z.instanceof(File)).min(1).max(10).or(z.instanceof(File)),
      tags: z.array(z.string()).optional(),
    })
  ),
  async (ctx) => {
    const { media, tags } = ctx.req.valid("form");
    const user = ctx.get("user");

    if (Array.isArray(media)) {
      const results = await Promise.all(
        media.map(async (file) => {
          const result = await tryCatch(uploadMedia(file, tags));
          if (result.error) {
            console.error(result.error);
            return;
          }

          await tryCatch(
            db.insert(db.schema.media).values({
              authorId: user.id,
              url: result.data.url,
              type: file.type,
            })
          );

          return result.data;
        })
      );

      return respond.ok(
        ctx,
        {
          url: results
            .filter((result) => result !== undefined)
            .map((result) => result.url),
        },
        "Files uploaded successfully",
        200
      );
    } else {
      const result = await tryCatch(uploadMedia(media, tags));
      if (result.error) {
        return respond.err(ctx, result.error.message, 500);
      }

      await tryCatch(
        db.insert(db.schema.media).values({
          authorId: user.id,
          url: result.data.url,
          type: media.type,
        })
      );

      return respond.ok(
        ctx,
        {
          url: [result.data.url],
        },
        "File uploaded successfully",
        200
      );
    }
  }
);
