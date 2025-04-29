import { createInsertSchema } from "drizzle-zod";
import { createAction } from "../../lib/actions/factory";
import { z } from "zod";
import schema from "../../lib/db/schema";
import { tryCatch } from "../../lib/tryCatch";
import { preprocessPostContent } from "./helpers";
import db from "../../lib/db";
import { eq, sql } from "drizzle-orm";

const { posts, post_mentions, post_topics } = schema;

export const zCreatePostAction = () =>
  createInsertSchema(posts).pick({
    content: true,
    nsfw: true,
    reposting: true,
    parentId: true,
    subscriberOnly: true,
  });

export const createPost = createAction<
  z.infer<ReturnType<typeof zCreatePostAction>>
>()(
  async (tx, { user, content, nsfw, parentId, reposting, subscriberOnly }) => {
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
