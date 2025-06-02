import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import db from "../../lib/db";
import { eq } from "drizzle-orm";

const { users, posts } = db.schema;

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
