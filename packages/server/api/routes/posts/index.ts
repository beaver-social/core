import { Hono } from "hono";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { respond } from "../../lib/utils/respond";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import authenticated from "../../middlewares/authenticated";
import {
  createPost,
  likePost,
  unlikePost,
  zCreatePostAction,
  zLikePostAction,
  zUnlikePostAction,
} from "./actions";
import { zNumberString, zSuiSignature } from "../../lib/zod/helpers";
import { preprocessImageMedia } from "./helpers";
import s3 from "../../lib/s3/client";
import { eq } from "drizzle-orm";
import post from "../../ai/routes/content/post";

const app = new Hono()

  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z
          .number()
          .default(1)
          .transform((v) => v - 1),
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

      const { data: actionResponse, error: actionError } = await tryCatch(
        createPost({ ...postData, userId: user.id }, signature)
      );

      if (actionError) {
        ctx.log(actionError);
        return respond.err(ctx, actionError.message, 400);
      }

      const { post, mentions, topics } = actionResponse;

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

      return respond.ok(ctx, { post }, "Post created successfully", 201);
    }
  )

  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const postResponse = await tryCatch(
        db
          .select()
          .from(db.schema.posts)
          .where(eq(db.schema.posts.id, id))
          .limit(1)
      );

      if (postResponse.error) {
        ctx.log(postResponse.error);
        return respond.err(ctx, "Failed to get post from db", 500);
      }

      const post = postResponse.data[0];

      if (!post) {
        return respond.err(ctx, "Post not found", 404);
      }

      const mediaResponse = await tryCatch(
        db
          .select()
          .from(db.schema.post_media)
          .where(eq(db.schema.post_media.postId, id))
      );

      const mentionsResponse = await tryCatch(
        db.query.post_mentions.findMany({
          where: eq(db.schema.post_mentions.postId, id),
          with: {
            user: {
              columns: {
                id: true,
                username: true,
                suiAddress: true,
                displayName: true,
                avatar: true,
              },
            },
          },
        })
      );

      const topicsResponse = await tryCatch(
        db.query.post_topics.findMany({
          where: eq(db.schema.post_topics.postId, id),
          with: {
            topic: true,
          },
        })
      );

      const media = mediaResponse.error ? [] : mediaResponse.data;
      const topics = topicsResponse.error
        ? []
        : topicsResponse.data.map((t) => t.topic);
      const mentions = mentionsResponse.error
        ? []
        : mentionsResponse.data.map((m) => m.user);

      return respond.ok(
        ctx,
        {
          post: {
            ...post,
            media,
            mentions,
            topics,
          },
        },
        "Post fetched successfully",
        200
      );
    }
  )

  .post(
    "/like",
    authenticated,
    zValidator(
      "json",
      zLikePostAction().merge(
        z.object({
          signature: zSuiSignature(),
        })
      )
    ),
    async (ctx) => {
      const { signature, postId } = ctx.req.valid("json");

      const user = ctx.get("user");

      const { error: actionError } = await tryCatch(
        likePost({ postId: postId, userId: user.id }, signature)
      );

      if (actionError) {
        ctx.log(actionError);
        return respond.err(ctx, actionError.message, 400);
      }

      return respond.ok(ctx, {}, "Post liked successfully", 201);
    }
  )

  .post(
    "/unlike",
    authenticated,
    zValidator(
      "json",
      zUnlikePostAction().merge(
        z.object({
          signature: zSuiSignature(),
        })
      )
    ),
    async (ctx) => {
      const { signature, postId } = ctx.req.valid("json");

      const user = ctx.get("user");

      const { error: actionError } = await tryCatch(
        unlikePost({ postId: postId, userId: user.id }, signature)
      );

      if (actionError) {
        ctx.log(actionError);
        return respond.err(ctx, actionError.message, 400);
      }

      return respond.ok(ctx, {}, "Post unliked successfully", 201);
    }
  );

export default app;
