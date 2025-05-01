import { Hono } from "hono";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { respond } from "../../lib/utils/respond";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import authenticated from "../../middlewares/authenticated";
import {
  bookmarkPost,
  createPost,
  likePost,
  unbookmarkPost,
  unlikePost,
  zBookmarkPostAction,
  zCreatePostAction,
  zLikePostAction,
  zUnbookmarkPostAction,
  zUnlikePostAction,
} from "./actions";
import { zNumberString, zSuiSignature } from "../../lib/zod/helpers";
import { preprocessImageMedia } from "./helpers";
import s3 from "../../lib/s3/client";
import { eq } from "drizzle-orm";

const { posts, post_media, post_topics, post_mentions, likes, users } =
  db.schema;

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
          .from(posts)
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
          db.insert(post_mentions).values({
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
          db.insert(post_topics).values({
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
            db.insert(post_media).values({
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
            db.insert(post_media).values({
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
          .from(posts)
          .where(eq(posts.id, id))
          .leftJoin(post_media, eq(posts.id, post_media.id))
          .leftJoin(post_mentions, eq(posts.id, post_mentions.id))
          .leftJoin(post_topics, eq(posts.id, post_topics.id))
          .limit(1)
      );

      if (postResponse.error) {
        ctx.log(postResponse.error);
        return respond.err(ctx, "Failed to get post from db", 500);
      }

      const [post] = postResponse.data;

      if (!post) {
        return respond.err(ctx, "Post not found", 404);
      }

      return respond.ok(
        ctx,
        {
          ...post.posts,
          media: post.post_media,
          mentions: post.post_mentions,
          topics: post.post_topics,
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
  )

  .post(
    "/bookmark",
    authenticated,
    zValidator(
      "json",
      zBookmarkPostAction().merge(
        z.object({
          signature: zSuiSignature(),
        })
      )
    ),
    async (ctx) => {
      const { postId, signature } = ctx.req.valid("json");

      const user = ctx.get("user");

      const { error: actionError } = await tryCatch(
        bookmarkPost({ postId: postId, userId: user.id }, signature)
      );

      if (actionError) {
        ctx.log(actionError);
        return respond.err(ctx, actionError.message, 400);
      }

      return respond.ok(ctx, {}, "Post bookmarked successfully", 201);
    }
  )

  .post(
    "/unbookmark",
    authenticated,
    zValidator(
      "json",
      zUnbookmarkPostAction().merge(
        z.object({
          signature: zSuiSignature(),
        })
      )
    ),
    async (ctx) => {
      const { postId, signature } = ctx.req.valid("json");

      const user = ctx.get("user");

      const { error: actionError } = await tryCatch(
        unbookmarkPost({ postId: postId, userId: user.id }, signature)
      );

      if (actionError) {
        ctx.log(actionError);
        return respond.err(ctx, actionError.message, 400);
      }

      return respond.ok(ctx, {}, "Post unbookmarked successfully", 201);
    }
  );

export default app;
