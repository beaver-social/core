import { and, eq, sql } from "drizzle-orm";
import * as interactionSchema from "../../schema/interactions";
import * as contentSchema from "../../schema/content";
import * as userSchema from "../../schema/user";
import { createAction } from "../../lib/actions/factory";

export const createPost = createAction<{
  content: string;
  media: { url: string; type: string }[];
}>()(
  async (tx, { userId, content, media }) => {
    const [post] = await tx
      .insert(contentSchema.posts)
      .values({
        authorId: userId,
        content: content.trim(),
      })
      .returning();

    for (const mediaItem of media) {
      await tx.insert(contentSchema.media).values({
        contentId: post.id,
        contentTypeId: 1,
        url: mediaItem.url,
        type: mediaItem.type,
      });
    }

    return post;
  },
  async (tx, post, action) => {
    await tx.insert(interactionSchema.contentActions).values({
      actionId: action.id,
      contentId: post.id,
    });
  }
);

export const deletePost = createAction<{ postId: number }>()(
  async (tx, { postId }) => {
    const [post] = await tx
      .update(contentSchema.posts)
      .set({
        deletedAt: Date.now(),
        likesCount: 0,
        content: "deleted",
        authorId: -1,
      })
      .where(eq(contentSchema.posts.id, postId))
      .returning();

    await tx
      .delete(contentSchema.media)
      .where(eq(contentSchema.media.contentId, postId));

    return post;
  },
  async (tx, post) => {
    await tx
      .update(interactionSchema.contentActions)
      .set({ deleted: true })
      .where(eq(interactionSchema.contentActions.contentId, post.id));
  }
);

export const likePost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    await tx.insert(interactionSchema.likes).values({
      userId: userId,
      contentId: postId,
      contentTypeId: 1,
    });

    await tx
      .update(contentSchema.posts)
      .set({
        likesCount: sql`${contentSchema.posts.likesCount} + 1`,
      })
      .where(eq(contentSchema.posts.id, postId));
  }
);

export const unlikePost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    await tx
      .delete(interactionSchema.likes)
      .where(
        and(
          eq(interactionSchema.likes.userId, userId),
          eq(interactionSchema.likes.contentId, postId)
        )
      );

    await tx
      .update(contentSchema.posts)
      .set({
        likesCount: sql`GREATEST(${contentSchema.posts.likesCount} - 1, 0)`,
      })
      .where(eq(contentSchema.posts.id, postId));
  }
);

export const pinPost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    const [post] = await tx
      .select({ deletedAt: contentSchema.posts.deletedAt })
      .from(contentSchema.posts)
      .where(
        and(
          eq(contentSchema.posts.id, postId),
          eq(contentSchema.posts.authorId, userId)
        )
      )
      .limit(1);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.deletedAt) {
      throw new Error("Cannot pin a deleted post");
    }

    const [user] = await tx
      .select({ pinned: contentSchema.posts.isPinned })
      .from(contentSchema.posts)
      .where(eq(contentSchema.posts.id, postId))
      .limit(1);

    if (user?.pinned) {
      throw new Error("Post is already pinned");
    }

    await tx
      .update(userSchema.users)
      .set({
        pinnedPost: postId,
      })
      .where(eq(userSchema.users.id, userId));
  }
);

export const unpinPost = createAction<{
  postId: number;
}>()(async (tx, { postId, userId }) => {
  const [user] = await tx
    .select({ pinned: contentSchema.posts.isPinned })
    .from(contentSchema.posts)
    .where(eq(contentSchema.posts.id, postId))
    .limit(1);

  if (!user?.pinned) {
    throw new Error("No post is currently pinned");
  }

  await tx
    .update(userSchema.users)
    .set({
      pinnedPost: null,
    })
    .where(eq(userSchema.users.id, userId));
});

export const reply = createAction<{
  postId: number;
  content: string;
  media: string[];
}>()(
  async (tx, { userId, content, media, postId }) => {
    const [{ deletedAt }] = await tx
      .select()
      .from(contentSchema.posts)
      .where(eq(contentSchema.posts.id, postId))
      .limit(1);

    if (deletedAt) {
      throw new Error("Cannot reply to a deleted post");
    }

    const [post] = await tx
      .insert(contentSchema.posts)
      .values({
        authorId: userId,
        content: content.trim(),
        parent: postId,
      })
      .returning();

    for (const mediaItem of media) {
      await tx.insert(contentSchema.media).values({
        contentId: post.id,
        contentTypeId: 1,
        url: mediaItem,
        type: "image",
      });
    }

    let current: number | null = postId;
    while (current) {
      await tx
        .update(contentSchema.posts)
        .set({
          repliesCount: sql`${contentSchema.posts.repliesCount} + 1`,
        })
        .where(eq(contentSchema.posts.id, current));

      const [next] = await tx
        .select({ parent: contentSchema.posts.parent })
        .from(contentSchema.posts)
        .where(eq(contentSchema.posts.id, current))
        .limit(1);

      current = next?.parent ?? null;
    }

    return post;
  },
  async (tx, post, action) => {
    await tx
      .update(interactionSchema.contentActions)
      .set({
        actionId: action.id,
        contentId: post.id,
      })
      .where(
        and(
          eq(interactionSchema.contentActions.contentId, post.id),
          eq(interactionSchema.contentActions.actionId, action.id)
        )
      );
  }
);
