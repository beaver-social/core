import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { uploadMedia } from "./helpers";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import authenticated from "../../middlewares/authenticated";
import { eq, desc, and, isNull, isNotNull } from "drizzle-orm";
import { zBooleanString, zNumberString } from "../../lib/zod/helpers";

const { media } = db.schema;

export default new Hono()
  // get media by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: zNumberString() })),
    authenticated,
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const mediaResult = await tryCatch(
        db
          .select()
          .from(media)
          .where(eq(media.id, Number(id)))
          .limit(1)
      );

      if (mediaResult.error) {
        return respond.err(ctx, mediaResult.error.message, 500);
      }

      return respond.ok(
        ctx,
        {
          media: mediaResult.data[0],
        },
        "Media fetched successfully",
        200
      );
    }
  )

  // get all media for a user (paginated)
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
          .default("10"),
        postOnly: zBooleanString().optional(),
      })
    ),
    authenticated,
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");
      const { page, perPage, postOnly } = ctx.req.valid("query");

      let filter = and(eq(media.authorId, userId), isNull(media.deletedAt));
      if (postOnly) {
        filter = and(filter, isNotNull(media.postId));
      }

      const mediaResult = await tryCatch(
        db
          .select()
          .from(media)
          .where(filter)
          .limit(perPage)
          .offset(page * perPage)
          .orderBy(desc(media.createdAt))
      );

      if (mediaResult.error) {
        return respond.err(ctx, mediaResult.error.message, 500);
      }

      return respond.ok(
        ctx,
        {
          media: mediaResult.data,
          hasMore: !(mediaResult.data.length < perPage),
        },
        "Media fetched successfully",
        200
      );
    }
  )

  // upload media
  .post(
    "/upload",
    authenticated,
    zValidator(
      "form",
      z.object({
        media: z
          .array(z.instanceof(File))
          .min(1)
          .max(10)
          .or(z.instanceof(File)),
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
