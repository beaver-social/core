import { and, eq, sql } from "drizzle-orm";
import { likes } from "../schema/like";
import { post_action, post_media, posts } from "../schema/post";
import { createAction } from "./factory";

export const makePost = createAction<{
  content: string;
  media: { url: string; type: string }[];
}>()(
  async (tx, { userId, content, media }) => {
    const [post] = await tx
      .insert(posts)
      .values({
        authorId: userId,
        content: content.trim(),
      })
      .returning();

    for (const mediaItem of media) {
      await tx.insert(post_media).values({
        postId: post.id,
        url: mediaItem.url,
        type: mediaItem.type,
      });
    }

    return post;
  },
  async (tx, post, action) => {
    await tx.insert(post_action).values({
      actionId: action.id,
      postId: post.id,
    });
  }
);

export const reply = createAction<{
  postId: number;
  content: string;
  media: string[];
}>()(
  async (tx, { userId, content, media, postId }) => {
    const [{ deletedAt }] = await tx
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (deletedAt) {
      throw new Error("Cannot reply to a deleted post");
    }

    const [post] = await tx
      .insert(posts)
      .values({
        authorId: userId,
        content: content.trim(),
        parent: postId,
      })
      .returning();

    for (const mediaItem of media) {
      await tx.insert(post_media).values({
        postId: post.id,
        url: mediaItem,
        type: "image",
      });
    }

    let current: number | null = postId;
    while (current) {
      await tx
        .update(posts)
        .set({
          repliesCount: sql`${posts.repliesCount} + 1`,
        })
        .where(eq(posts.id, current));

      const [next] = await tx
        .select({ parent: posts.parent })
        .from(posts)
        .where(eq(posts.id, current))
        .limit(1);

      current = next?.parent ?? null;
    }

    return post;
  },
  async (tx, post, action) => {
    await tx
      .update(post_action)
      .set({
        actionId: action.id,
        postId: post.id,
      })
      .where(
        and(
          eq(post_action.postId, post.id),
          eq(post_action.actionId, action.id)
        )
      );
  }
);

export const deletePost = createAction<{ postId: number }>()(
  async (tx, { postId }) => {
    const [post] = await tx
      .update(posts)
      .set({
        deletedAt: Date.now(),
        likesCount: 0,
        content: "deleted",
        authorId: -1,
      })
      .where(eq(posts.id, postId))
      .returning();

    await tx.delete(post_media).where(eq(post_media.postId, postId));

    return post;
  },
  async (tx, post) => {
    await tx
      .update(post_action)
      .set({ deleted: true })
      .where(eq(post_action.postId, post.id));
  }
);

export const likePost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    await tx.insert(likes).values({
      userId: userId,
      postId: postId,
    });

    await tx
      .update(posts)
      .set({
        likesCount: sql`${posts.likesCount} + 1`,
      })
      .where(eq(posts.id, postId));
  }
);

export const unlikePost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    await tx
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

    await tx
      .update(posts)
      .set({
        likesCount: sql`GREATEST(${posts.likesCount} - 1, 0)`,
      })
      .where(eq(posts.id, postId));
  }
);
