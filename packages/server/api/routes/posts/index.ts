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
import {
  zBooleanString,
  zNumberString,
  zPaginatedRequest,
  zPostMedia,
  zSuiAddress,
  zSuiSignature,
} from "../../lib/zod/helpers";
import { preprocessImageMedia } from "./helpers";
import s3 from "../../lib/s3/client";
import { and, eq, inArray, isNotNull, desc } from "drizzle-orm";
import { bookmarks } from "../../lib/db/schema/interaction";
import { follows } from "../../lib/db/schema/user";

const { posts, post_media, post_topics, post_mentions, likes, users } =
  db.schema;

const app = new Hono()

  // Get all posts
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString()
          .default("1")
          .transform((v) => v - 1),
        perPage: zNumberString()
          .transform((v) => Math.min(v, 32))
          .default("8"),
      })
    ),
    async (ctx) => {
      const { page, perPage } = ctx.req.valid("query");

      const postsResponse = await tryCatch(
        db
          .select({
            id: posts.id,
          })
          .from(posts)
          .limit(perPage)
          .offset(page * perPage)
          .orderBy(desc(posts.createdAt))
      );

      if (postsResponse.error) {
        ctx.log(postsResponse.error);
        return respond.err(ctx, "Failed to get posts from db", 500);
      }

      const postsData = postsResponse.data;

      return respond.ok(
        ctx,
        { posts: postsData, hasMore: !(postsData.length < perPage) },
        "Posts fetched successfully",
        200
      );
    }
  )

  // Get all following posts
  .get(
    "/following",
    zValidator(
      "query",
      z.object({
        page: zNumberString()
          .default("1")
          .transform((v) => v - 1),
        perPage: zNumberString()
          .transform((v) => Math.min(v, 32))
          .default("8"),
      })
    ),
    authenticated,
    async (ctx) => {
      const { page, perPage } = ctx.req.valid("query");
      const user = ctx.get("user");

      // find all following users
      const followingResponse = await tryCatch(
        db
          .select({
            id: follows.followingId,
          })
          .from(follows)
          .where(eq(follows.followerId, user.id))
      );

      if (followingResponse.error) {
        ctx.log(followingResponse.error);
        return respond.err(ctx, "Failed to get following users from db", 500);
      }

      const following = followingResponse.data;
      const followingIds = following.map((f) => f.id);

      const postsResponse = await tryCatch(
        db
          .select({
            id: posts.id,
          })
          .from(posts)
          .where(inArray(posts.authorId, followingIds))
          .limit(perPage)
          .offset(page * perPage)
      );

      if (postsResponse.error) {
        ctx.log(postsResponse.error);
        return respond.err(ctx, "Failed to get following posts from db", 500);
      }

      const postsData = postsResponse.data;

      return respond.ok(
        ctx,
        { posts: postsData, hasMore: !(postsData.length < perPage) },
        "Following posts fetched successfully",
        200
      );
    }
  )

  // Get post data by ID
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
        db.select().from(posts).where(eq(posts.id, id)).limit(1)
      );

      const mentions = await tryCatch(
        db
          .select({
            userId: users.id,
            username: users.username,
            fullName: users.fullName,
            imageUrl: users.imageUrl,
          })
          .from(users)
          .innerJoin(post_mentions, eq(users.id, post_mentions.userId))
          .where(eq(post_mentions.postId, id))
      );

      const postMedia = await tryCatch(
        db.select().from(post_media).where(eq(post_media.postId, id))
      );

      if (postResponse.error) {
        ctx.log(postResponse.error);
        return respond.err(ctx, "Failed to get post from db", 500);
      }

      if (mentions.error) {
        ctx.log(mentions.error);
      }

      if (postMedia.error) {
        ctx.log(postMedia.error);
      }

      const [post] = postResponse.data;
      const mediaArray = postMedia.data;

      if (!post) {
        return respond.err(ctx, "Post not found", 404);
      }

      const parsedPost = {
        media: mediaArray,
        mentions: mentions.data,
        analytics: {
          likes: post.likesCount || 0,
          reposts: post.repostsCount || 0,
          comments: post.repliesCount || 0,
          shares: post.sharesCount || 0,
        },
        ...post,
      };

      return respond.ok(ctx, parsedPost, "Post fetched successfully", 200);
    }
  )

  // Create post
  .post(
    "/",
    authenticated,
    zValidator(
      "json",
      zCreatePostAction().merge(
        z.object({
          signature: zSuiSignature(),
        })
      )
    ),
    zValidator("form", z.any()),
    async (ctx) => {
      const user = ctx.get("user");
      const { signature, ...postData } = ctx.req.valid("json");
      const { media, type, previewUrl, aspectRatio } = ctx.req.valid("form");
      ctx.log({
        media,
        type,
        previewUrl,
        aspectRatio,
      });

      if (!(postData.content.length > 0) && !postData.reposting) {
        return respond.err(ctx, "Content is required", 400);
      }

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

      if (media) {
        for (const item of media) {
          const mimeType = item.file.type.split("/")[0];

          if (mimeType === "image") {
            const imageData = Buffer.from(await item.file.arrayBuffer());
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
                aspectRatio: item.aspectRatio || "square",
                type: "image",
              })
            );

            if (error) {
              ctx.log(error);
              continue;
            }
          }

          if (mimeType === "video") {
            const videoData = Buffer.from(await item.file.arrayBuffer());
            const videoUrl = await tryCatch(s3.upload(videoData));

            if (videoUrl.error) {
              ctx.log(videoUrl.error);
              continue;
            }

            const { error } = await tryCatch(
              db.insert(post_media).values({
                postId: post.id,
                url: videoUrl.data,
                aspectRatio: item.aspectRatio || "square",
                type: "video",
              })
            );

            if (error) {
              ctx.log(error);
              continue;
            }
          }
        }
      }

      return respond.ok(ctx, { post }, "Post created successfully", 201);
    }
  )

  // Like post
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

  // Unlike post
  .delete(
    "/like",
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

  // Bookmark post
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

  // Unbookmark post
  .delete(
    "/bookmark",
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
  )

  // Get likes
  .get(
    "/:id/likes",
    authenticated,
    zValidator("param", z.object({ id: zNumberString() })),
    zValidator("query", zPaginatedRequest()),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { page, perPage } = ctx.req.valid("query");

      const likesResponse = await tryCatch(
        db
          .select()
          .from(likes)
          .where(eq(likes.postId, id))
          .limit(perPage)
          .offset(page * perPage)
      );

      if (likesResponse.error) {
        ctx.log(likesResponse.error);
        return respond.err(ctx, "Failed to get likes from db", 500);
      }

      const likesData = likesResponse.data;

      return respond.ok(
        ctx,
        {
          likes: likesData,
          hasMore: !(likesData.length < perPage),
        },
        "Likes fetched successfully",
        200
      );
    }
  )

  // Get replies
  .get(
    "/:id/replies",
    authenticated,
    zValidator("param", z.object({ id: zNumberString() })),
    zValidator("query", zPaginatedRequest()),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { page, perPage } = ctx.req.valid("query");

      const repliesResponse = await tryCatch(
        db
          .select({
            id: posts.id,
          })
          .from(posts)
          .where(eq(posts.parentId, id))
          .limit(perPage)
          .offset(page * perPage)
          .orderBy(desc(posts.createdAt))
      );

      if (repliesResponse.error) {
        ctx.log(repliesResponse.error);
        return respond.err(ctx, "Failed to get replies from db", 500);
      }

      const repliesData = repliesResponse.data;

      return respond.ok(
        ctx,
        {
          replies: repliesData,
          hasMore: !(repliesData.length < perPage),
        },
        "Replies fetched successfully",
        200
      );
    }
  )

  // Get reposts
  .get(
    "/:id/reposts",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "query",
      zPaginatedRequest().merge(z.object({ quotesOnly: zBooleanString() }))
    ),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const { quotesOnly, page, perPage } = ctx.req.valid("query");

      const baseFilter = eq(posts.parentId, id);
      const filter = quotesOnly
        ? and(baseFilter, isNotNull(posts.content))
        : baseFilter;

      const repostsResponse = await tryCatch(
        db
          .select()
          .from(posts)
          .where(filter)
          .limit(perPage)
          .offset(page * perPage)
      );

      if (repostsResponse.error) {
        ctx.log(repostsResponse.error);
        return respond.err(ctx, "Failed to get reposts from db", 500);
      }

      const repostsData = repostsResponse.data;
      const hasMore = !(repostsData.length < perPage);

      return respond.ok(
        ctx,
        { reposts: repostsData, hasMore },
        "Reposts fetched successfully",
        200
      );
    }
  )

  // user post interaction
  .get(
    "/:id/interacted",
    authenticated,
    zValidator("param", z.object({ id: zNumberString() })),
    async (ctx) => {
      const { id: postId } = ctx.req.valid("param");
      const user = ctx.get("user");
      
      ctx.log({ id: user.id })

      const hasLikedResponse = await tryCatch(
        db
          .select()
          .from(likes)
          .where(and(eq(likes.postId, postId), eq(likes.userId, user.id)))
          .limit(1)
      );

      if (hasLikedResponse.error) {
        ctx.log(hasLikedResponse.error);
        return respond.err(ctx, "Failed to get has liked from db", 500);
      }

      const hasLiked = hasLikedResponse.data.length > 0;

      const hasBookmarkedResponse = await tryCatch(
        db
          .select()
          .from(bookmarks)
          .where(
            and(eq(bookmarks.postId, postId), eq(bookmarks.userId, user.id))
          )
          .limit(1)
      );

      if (hasBookmarkedResponse.error) {
        ctx.log(hasBookmarkedResponse.error);
        return respond.err(ctx, "Failed to get has bookmarked from db", 500);
      }

      const hasBookmarked = hasBookmarkedResponse.data.length > 0;

      return respond.ok(
        ctx,
        { hasLiked, hasBookmarked },
        "User post interaction fetched successfully",
        200
      );
    }
  );

export default app;
