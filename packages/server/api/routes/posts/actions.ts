import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import { tryCatch } from "../../lib/tryCatch";
import { preprocessPostContent } from "./helpers";
import db from "../../lib/db";
import { and, eq, sql } from "drizzle-orm";

const { posts, likes, bookmarks } = db.schema;

export const zCreatePostAction = () =>
  createInsertSchema(posts).pick({
    content: true,
    nsfw: true,
    reposting: true,
    parentId: true,
    subscriberOnly: true,
    location: true,
  });

export const createPost = createAction<
  z.infer<ReturnType<typeof zCreatePostAction>>
>()(
  async function createPost(
    tx,
    { user, content, nsfw, parentId, reposting, subscriberOnly, location }
  ) {
    if (!!parentId && !!reposting) {
      throw new Error(
        "Cannot repost and reply at the same time you dumbass! Get your act together."
      );
    }

    const contentResponse = await tryCatch(preprocessPostContent(content));

    if (contentResponse.error) {
      throw new Error("Failed to preprocess content: " + contentResponse.error);
    }
    const {
      content: sanitizedContent,
      mentions,
      topics,
    } = contentResponse.data;

    if (parentId) {
      const parentPost = await db.getPostById(parentId);

      if (!parentPost) {
        throw new Error("Parent post not found");
      }

      if (parentPost.deletedAt) {
        throw new Error("Cannot reply to a deleted post");
      }
    }

    const [post] = await tx
      .insert(posts)
      .values({
        authorId: user.id,
        content: sanitizedContent,
        parentId: parentId,
        location: location,
        nsfw: nsfw,
        subscriberOnly: subscriberOnly,
      })
      .returning({
        id: posts.id,
        parentId: posts.parentId,
        reposting: posts.reposting,
      });

    return { post, mentions, topics };
  },
  async (tx, result, action) => {
    const { post } = result;

    if (!!post.reposting && !!post.parentId) {
      tx.rollback();
      throw new Error(
        "You should not have reached this point. Please report this bug."
      );
    }

    await tx
      .update(posts)
      .set({
        actionId: action.id,
      })
      .where(eq(posts.id, post.id));

    if (post.parentId) {
      let current = post.parentId;

      while (current != null) {
        const [{ next }] = await tx
          .select({
            next: posts.parentId,
          })
          .from(posts)
          .where(eq(posts.id, current))
          .limit(1);

        await tx
          .update(posts)
          .set({
            repliesCount: sql`${posts.repliesCount} + 1`,
          })
          .where(eq(posts.id, post.parentId));

        if (!next) break;

        current = next;
      }
    }

    if (post.reposting) {
      await tx
        .update(posts)
        .set({
          repostsCount: sql`${posts.repostsCount} + 1`,
        })
        .where(eq(posts.id, post.reposting));
    }
  }
);

export const zLikePostAction = () =>
  createInsertSchema(likes).pick({
    postId: true,
  });

export const likePost = createAction<
  z.infer<ReturnType<typeof zLikePostAction>>
>()(async function likePost(tx, { user, postId }) {
  const [post] = await tx
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.deletedAt) {
    throw new Error("Cannot like a deleted post");
  }

  await tx.insert(likes).values({
    userId: user.id,
    postId: postId,
  });

  await tx
    .update(posts)
    .set({ likesCount: sql`${posts.likesCount} + 1` })
    .where(eq(posts.id, postId));
});

export const zUnlikePostAction = () =>
  createInsertSchema(likes).pick({
    postId: true,
  });

export const unlikePost = createAction<
  z.infer<ReturnType<typeof zUnlikePostAction>>
>()(async function unlikePost(tx, { user, postId }) {
  const [post] = await tx
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.deletedAt) {
    throw new Error("Cannot unlike a deleted post");
  }

  await tx
    .delete(likes)
    .where(and(eq(likes.userId, user.id), eq(likes.postId, postId)));

  await tx
    .update(posts)
    .set({ likesCount: sql`${posts.likesCount} - 1` })
    .where(eq(posts.id, postId));
});

export const zBookmarkPostAction = () =>
  createInsertSchema(bookmarks).pick({
    postId: true,
  });

export const bookmarkPost = createAction<
  z.infer<ReturnType<typeof zBookmarkPostAction>>
>()(async function bookmarkPost(tx, { user, postId }) {
  const [post] = await tx
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.deletedAt) {
    throw new Error("Cannot bookmark a deleted post");
  }

  await tx.insert(bookmarks).values({
    userId: user.id,
    postId: postId,
  });
});

export const zUnbookmarkPostAction = () =>
  createInsertSchema(bookmarks).pick({
    postId: true,
  });

export const unbookmarkPost = createAction<
  z.infer<ReturnType<typeof zUnbookmarkPostAction>>
>()(async function unbookmarkPost(tx, { user, postId }) {
  const [post] = await tx
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.deletedAt) {
    throw new Error("Cannot unbookmark a deleted post");
  }

  await tx
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.postId, postId)));
});
