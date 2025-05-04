import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { and, eq, sql } from "drizzle-orm";

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
