import { Hono } from "hono";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { respond } from "../../lib/utils/respond";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import authenticated from "../../middlewares/authenticated";
import { createPost, zCreatePostAction } from "./actions";
import { zSuiSignature } from "../../lib/zod/helpers";
import { preprocessImageMedia } from "./helpers";
import s3 from "../../lib/s3/client";

const app = new Hono()

  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.number().default(1),
        perPage: z.number().max(32).default(8),
      })
    ),
    async (ctx) => {
      const { page, perPage } = ctx.req.valid("query");

      const postsResposne = await tryCatch(
        db
          .select()
          .from(db.schema.posts)
          .limit(perPage)
          .offset(page * perPage)
      );

      if (postsResposne.error) {
        ctx.log(postsResposne.error);
        return respond.err(ctx, "Failed to get posts from db", 500);
      }

      const postsData = postsResposne.data;

      return respond.ok(
        ctx,
        { posts: postsData, hasMore: !!postsData.length },
        "Posts fetched successfully",
        200
      );
    }
  )

  .post(
    "/",
    authenticated,
    zValidator(
      "json",
      zCreatePostAction().merge(
        z.object({
          media: z.array(z.instanceof(File)),
          signature: zSuiSignature(),
        })
      )
    ),
    async (ctx) => {
      const { media, signature, ...postData } = ctx.req.valid("json");
      const user = ctx.get("user");

      const { post, mentions, topics } = await createPost(
        { ...postData, userId: user.id },
        signature
      );

      for (const mention of mentions) {
        const mentionedUser = await db.getUserByUsername(mention);

        if (!mentionedUser) continue;

        const { error } = await tryCatch(
          db.insert(db.schema.post_mentions).values({
            userId: mentionedUser.id,
            postId: post.id,
          })
        );

        if (error) {
          ctx.log(error);
          continue;
        }
      }

      for (const topic of topics) {
        const { error } = await tryCatch(
          db.insert(db.schema.post_topics).values({
            postId: post.id,
            topicId: await db.ensureTopicId(topic),
          })
        );

        if (error) {
          ctx.log(error);
          continue;
        }
      }

      for (const file of media) {
        const mimeType = file.type.split("/")[0];

        if (mimeType === "image") {
          const imageData = Buffer.from(await file.arrayBuffer());
          const { imageBuffer, blurhash } = await preprocessImageMedia(
            imageData
          );

          const imageUrl = await tryCatch(s3.upload(imageBuffer));

          if (imageUrl.error) {
            ctx.log(imageUrl.error);
            continue;
          }

          const { error } = await tryCatch(
            db.insert(db.schema.post_media).values({
              postId: post.id,
              url: imageUrl.data,
              blurhash,
            })
          );

          if (error) {
            ctx.log(error);
            continue;
          }
        }

        if (mimeType === "video") {
          const videoData = Buffer.from(await file.arrayBuffer());
          const videoUrl = await tryCatch(s3.upload(videoData));

          if (videoUrl.error) {
            ctx.log(videoUrl.error);
            continue;
          }

          const { error } = await tryCatch(
            db.insert(db.schema.post_media).values({
              postId: post.id,
              url: videoUrl.data,
            })
          );

          if (error) {
            ctx.log(error);
            continue;
          }
        }
      }
    }
  );

export default app;
