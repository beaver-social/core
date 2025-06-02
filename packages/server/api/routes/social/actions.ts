import { createInsertSchema } from "drizzle-zod";
import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import db from "../../lib/db";
import { and, eq } from "drizzle-orm";

const { follows, users } = db.schema;

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

  if (!followingUser.length) {
    throw new Error("User not found");
  }

  if (followingId === user.id) {
    throw new Error("You cannot follow yourself");
  }

  // Check if already following
  const existingFollow = await tx
    .select()
    .from(follows)
    .where(
      and(eq(follows.followerId, user.id), eq(follows.followingId, followingId))
    )
    .limit(1);

  if (existingFollow.length > 0) {
    throw new Error("Already following this user");
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

  if (!followingUser.length) {
    throw new Error("User not found");
  }

  if (followingId === user.id) {
    throw new Error("You cannot unfollow yourself");
  }

  // Check if actually following
  const existingFollow = await tx
    .select()
    .from(follows)
    .where(
      and(eq(follows.followerId, user.id), eq(follows.followingId, followingId))
    )
    .limit(1);

  if (existingFollow.length === 0) {
    throw new Error("Not following this user");
  }

  await tx
    .delete(follows)
    .where(
      and(eq(follows.followerId, user.id), eq(follows.followingId, followingId))
    );
});
