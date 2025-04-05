import { and, eq, sql } from "drizzle-orm";
import db from "..";
import { likes } from "../schema/like";
import { posts } from "../schema/post";
import { createAction } from "./factory";

export const likePost = createAction<{ postId: number }>(
  async ({ postId, userId }) => {
    await db.insert(likes).values({
      userId: userId,
      postId: postId,
    });

    await db
      .update(posts)
      .set({
        likesCount: sql`${posts.likesCount} + 1`,
      })
      .where(eq(posts.id, postId));
  }
);

export const unlikePost = createAction<{ postId: number }>(
  async ({ postId, userId }) => {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

    await db
      .update(posts)
      .set({
        likesCount: sql`${posts.likesCount} - 1`,
      })
      .where(eq(posts.id, postId));
  }
);

export const createComment = createAction<{ content: string, media: string, parent: number }>(
  async ({ userId, content, media, parent }) => {

    await db.insert(posts).values({
      authorId: userId,
      content,
      media,
      parent
    })

    await db
      .update(posts)
      .set({
        repliesCount: sql`${posts.repliesCount} + 1`,
      })
      .where(eq(posts.id, parent));
  }
)


export const deleteComment = createAction<{ postId: number, parent: number }>(
  async ({ userId, parent, postId }) => {

    await db.delete(posts).where(and(eq(posts.id, postId), eq(posts.authorId, userId)));

    await db
      .update(posts)
      .set({
        repliesCount: sql`${posts.repliesCount} - 1`,
      })
      .where(eq(posts.id, parent));
  }
)