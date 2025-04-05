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
