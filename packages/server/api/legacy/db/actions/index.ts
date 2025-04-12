import { and, eq, sql } from "drizzle-orm";
import { likes } from "../schema/like";
import { post_action, post_media, posts } from "../schema/post";
import { createAction } from "./factory";
import { users } from "../schema/user";
import { contracts } from "../../../lib/sui/contracts";
import { Transaction } from "@mysten/sui/transactions";
import { defaultAdminCapId } from "../../../lib/sui/constants";
import suiClient, { serverKeypair } from "../../../lib/sui/client";
import { tryCatch } from "../../../lib/tryCatch";

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

export const pinPost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    const [post] = await tx
      .select({ deletedAt: posts.deletedAt })
      .from(posts)
      .where(and(eq(posts.id, postId), eq(posts.authorId, userId)))
      .limit(1);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.deletedAt) {
      throw new Error("Cannot pin a deleted post");
    }

    const [user] = await tx
      .select({ pinned: users.pinned })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user?.pinned === postId) {
      throw new Error("Post is already pinned");
    }

    await tx
      .update(users)
      .set({
        pinned: postId,
      })
      .where(eq(users.id, userId));
  }
);

export const unpinPost = createAction<{}>()(async (tx, { userId }) => {
  const [user] = await tx
    .select({ pinned: users.pinned })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user?.pinned) {
    throw new Error("No post is currently pinned");
  }

  await tx
    .update(users)
    .set({
      pinned: null,
    })
    .where(eq(users.id, userId));
});

export const createIdentity = createAction<{
  username: string;
  about: string;
  receiver: string;
  fullName: string;
  imageUrl: string;
}>()(async (tx, { username, about, receiver, fullName, imageUrl }) => {
  const suiTx = new Transaction();
  contracts.admin.mint_for(suiTx, {
    username: username,
    about: about,
    receiver: receiver,
    adminCap: { id: defaultAdminCapId },
  });

  const suiTxResp = await tryCatch(
    suiClient.signAndExecuteTransaction({
      signer: serverKeypair,
      transaction: suiTx,
    })
  );

  if (suiTxResp.error) {
    throw new Error("Failed to create identity on-chain", {
      cause: suiTxResp.error.message,
    });
  }

  const { objectChanges } = suiTxResp.data;

  if (!objectChanges) {
    return tx.rollback();
  }

  let identityAddress = "";
  for (const change of objectChanges) {
    if (
      change.type === "created" &&
      change.objectType === "0x2::identity::Identity"
    ) {
      identityAddress = change.objectId;
      break;
    }
  }

  const addUser = await tryCatch(
    tx.insert(users).values({
      address: receiver,
      identity: identityAddress,
      username: username,
      fullName: fullName,
      imageUrl: imageUrl,
      about: about,
    })
  );

  if (addUser.error) {
    throw new Error("Failed to insert user into database", {
      cause: addUser.error.message,
    });
  }
});
