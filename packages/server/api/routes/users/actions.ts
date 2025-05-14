import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { and, eq, sql } from "drizzle-orm";

const { follows, users, posts } = db.schema;

export const zFollowUserAction = () =>
  createInsertSchema(follows).pick({
    followingId: true,
  });

export const followUser = createAction<
  z.infer<ReturnType<typeof zFollowUserAction>>
>()(async function followUser(tx, { user, followingId }) {
  const followingUser = await tx
    .select()
    .from(users)
    .where(eq(users.id, followingId))
    .limit(1);

  if (!followingUser) {
    throw new Error("User not found");
  }

  if (followingId === user.id) {
    throw new Error("You cannot follow yourself");
  }

  await tx.insert(follows).values({
    followerId: user.id,
    followingId,
  });
});

export const zUnfollowUserAction = () =>
  createInsertSchema(follows).pick({
    followingId: true,
  });

export const unfollowUser = createAction<
  z.infer<ReturnType<typeof zUnfollowUserAction>>
>()(async function unfollowUser(tx, { user, followingId }) {
  const followingUser = await tx
    .select()
    .from(users)
    .where(eq(users.id, followingId))
    .limit(1);

  if (!followingUser) {
    throw new Error("User not found");
  }

  if (followingId === user.id) {
    throw new Error("You cannot unfollow yourself");
  }

  await tx
    .delete(follows)
    .where(
      and(eq(follows.followerId, user.id), eq(follows.followingId, followingId))
    );
});

export const zPinPostAction = () =>
  z.object({
    postId: z.number(),
  });

export const pinPost = createAction<
  z.infer<ReturnType<typeof zPinPostAction>>
>()(async function pinPost(tx, { user, postId }) {
  const post = await tx
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post[0]) {
    throw new Error("Post not found");
  }

  if (post[0].authorId !== user.id) {
    throw new Error("Cannot pin someone else's post");
  }

  await tx
    .update(users)
    .set({ pinnedPost: postId })
    .where(eq(users.id, user.id));
});

export const zUnpinPostAction = () =>
  z.object({
    postId: z.number(),
  });

export const unpinPost = createAction<
  z.infer<ReturnType<typeof zUnpinPostAction>>
>()(async function unpinPost(tx, { user, postId }) {
  const userData = await tx
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (userData[0].pinnedPost !== postId) {
    throw new Error("This post is not pinned");
  }

  await tx.update(users).set({ pinnedPost: null }).where(eq(users.id, user.id));
});
