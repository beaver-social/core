import { and, eq, sql, isNotNull } from "drizzle-orm";
import { z } from "zod";
import { zMedia, zReactionType } from "../../lib/zod/helpers";
import { createAction } from "../../lib/actions/factory";
import * as helpers from "../../../routes/posts/helpers";
import * as userSchema from "../../schema/user";
import * as contentSchema from "../../schema/content";
import * as interactionSchema from "../../schema/interactions";

// Creates a new post with content, parent post reference, media items, and flags
export const createPost = createAction<{
  content: string;
  parentId: number | undefined;
  media: z.infer<typeof zMedia>[] | undefined;
  flags: { nsfw: boolean; subscriberOnly?: boolean };
}>()(
  async (tx, { userId, content, parentId, media, flags }) => {
    // Sanitize and validate content
    const sanitizedContent = helpers.sanitizePostContent(content);
    const validation = helpers.validatePostContent(sanitizedContent);

    if (!validation.valid) {
      throw new Error(validation.message);
    }

    // checks for replies
    if (parentId) {
      const [parentPost] = await tx
        .select()
        .from(contentSchema.posts)
        .where(eq(contentSchema.posts.id, parentId))
        .limit(1);

      if (!parentPost) {
        throw new Error("Parent post not found");
      }

      if (parentPost.deletedAt) {
        throw new Error("Cannot reply to a deleted post");
      }

      if (parentPost.authorId === userId) {
        throw new Error("You cannot reply to your own post");
      }

      if (parentPost.subscriberOnly) {
        const [{ id: parentAuthorId }] = await tx
          .select({ id: userSchema.users.id })
          .from(userSchema.users)
          .where(eq(userSchema.users.id, parentPost.authorId))
          .limit(1);

        if (!parentAuthorId) {
          throw new Error("Parent post author not found");
        }

        const [{ type: followType }] = await tx
          .select({
            type: interactionSchema.follows.type,
          })
          .from(interactionSchema.follows)
          .where(
            and(
              eq(interactionSchema.follows.followerId, userId),
              eq(interactionSchema.follows.followingId, parentAuthorId)
            )
          )
          .limit(1);

        if (!followType) {
          throw new Error("You are not following this user");
        }

        if (followType !== "subscribe") {
          throw new Error("You are not subscribed to this user");
        }
      }
    }

    const tags = helpers.extractHashtags(sanitizedContent);
    const mentions = helpers.extractMentions(sanitizedContent);

    const [post] = await tx
      .insert(contentSchema.posts)
      .values({
        authorId: userId,
        content: sanitizedContent,
        parentId: parentId ?? null,
        nsfw: flags?.nsfw,
        subscriberOnly: flags?.subscriberOnly,
        tags: tags.join(","),
        mentions: mentions.join(","),
      })
      .returning({
        id: contentSchema.posts.id,
        parentId: contentSchema.posts.parentId,
      });

    // Process media items
    if (media && media.length > 0) {
      for (const mediaItem of media) {
        if (mediaItem.type === "image") {
          try {
            // Convert Base64 to Buffer
            const imageData = Buffer.from(
              mediaItem.url.split(",")[1] || mediaItem.url,
              "base64"
            );

            // Process and upload to S3, get back the URL
            const s3Url = await helpers.processAndUploadImage(imageData);

            // Store the S3 URL in the database
            await tx.insert(contentSchema.media).values({
              contentId: post.id,
              contentTypeId: 0,
              url: s3Url,
              type: mediaItem.type,
            });
          } catch (error: any) {
            throw new Error(`Failed to process image: ${error.message}`);
          }
        } else if (mediaItem.type === "video") {
          try {
            // Convert Base64 to Buffer
            const videoData = Buffer.from(
              mediaItem.url.split(",")[1] || mediaItem.url,
              "base64"
            );

            // Process and upload to S3, get back both video URL and thumbnail URL
            const { videoUrl, thumbnailUrl } =
              await helpers.processAndUploadVideo(videoData);

            // Store the video URL in the database
            await tx.insert(contentSchema.media).values({
              contentId: post.id,
              contentTypeId: 0,
              url: videoUrl,
              type: mediaItem.type,
              thumbnailUrl: thumbnailUrl, // Store the thumbnail URL
            });
          } catch (error: any) {
            throw new Error(`Failed to process video: ${error.message}`);
          }
        } else {
          await tx.insert(contentSchema.media).values({
            contentId: post.id,
            contentTypeId: 0,
            url: mediaItem.url,
            type: mediaItem.type,
          });
        }
      }
    }

    return post;
  },
  async (tx, post, action) => {
    // update post action id
    await tx
      .update(contentSchema.posts)
      .set({
        actionId: action.id,
      })
      .where(eq(contentSchema.posts.id, post.id));

    // update parent's reply count
    if (post.parentId) {
      await tx
        .update(contentSchema.posts)
        .set({
          repliesCount: sql`${contentSchema.posts.repliesCount} + 1`,
        })
        .where(eq(contentSchema.posts.id, post.parentId));
    }
  }
);

// Deletes a post if the user has permission
export const deletePost = createAction<{ postId: number }>()(
  async (tx, { postId, userId }) => {
    // Check if user has permission to delete
    const [postToDelete] = await tx
      .select({ authorId: contentSchema.posts.authorId })
      .from(contentSchema.posts)
      .where(eq(contentSchema.posts.id, postId))
      .limit(1);

    if (!postToDelete) {
      throw new Error("Post not found");
    }

    if (!helpers.canUserModifyPost(userId, postToDelete.authorId)) {
      throw new Error("You don't have permission to delete this post");
    }

    const [post] = await tx
      .update(contentSchema.posts)
      .set({
        deletedAt: Date.now(),
        likesCount: 0,
        content: "NA",
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

// Likes a post if it exists and hasn't been liked by the user yet
export const likePost = createAction<{
  postId: number;
  reaction: z.infer<typeof zReactionType> | undefined;
}>()(function (tx, { postId, userId, reaction }) {
  return (async () => {
    // Check if post exists
    const [post] = await tx
      .select({
        id: contentSchema.posts.id,
        deletedAt: contentSchema.posts.deletedAt,
      })
      .from(contentSchema.posts)
      .where(eq(contentSchema.posts.id, postId))
      .limit(1);

    if (!post || post.deletedAt) {
      throw new Error("Post not found or has been deleted");
    }

    // Check if already liked
    const [existingLike] = await tx
      .select()
      .from(interactionSchema.likes)
      .where(
        and(
          eq(interactionSchema.likes.userId, userId),
          eq(interactionSchema.likes.contentId, postId)
        )
      )
      .limit(1);

    if (existingLike) {
      throw new Error("You've already liked this post");
    }

    await tx.insert(interactionSchema.likes).values({
      userId: userId,
      contentId: postId,
      contentTypeId: 0,
      reaction: reaction || "like",
    });

    await tx
      .update(contentSchema.posts)
      .set({
        likesCount: sql`${contentSchema.posts.likesCount} + 1`,
      })
      .where(eq(contentSchema.posts.id, postId));

    return { success: true };
  })();
});

// Unlikes a post if it has been liked by the user
export const unlikePost = createAction<{ postId: number }>()(function (
  tx,
  { postId, userId }
) {
  return (async () => {
    // Check if like exists
    const [existingLike] = await tx
      .select()
      .from(interactionSchema.likes)
      .where(
        and(
          eq(interactionSchema.likes.userId, userId),
          eq(interactionSchema.likes.contentId, postId)
        )
      )
      .limit(1);

    if (!existingLike) {
      throw new Error("You haven't liked this post");
    }

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

    return { success: true };
  })();
});

// Pins a post for the user if they have permission
export const pinPost = createAction<{ postId: number }>()(function (
  tx,
  { postId, userId }
) {
  return (async () => {
    const [post] = await tx
      .select({
        deletedAt: contentSchema.posts.deletedAt,
        authorId: contentSchema.posts.authorId,
      })
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

    // Ensure user can pin the post
    if (!helpers.canUserModifyPost(userId, post.authorId)) {
      throw new Error("You don't have permission to pin this post");
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

    return { success: true };
  })();
});

// Unpins a post for the user
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

// Updates an existing post with new content and media if the user is the author
export const updatePost = createAction<{
  postId: number;
  content: string;
  media: z.infer<typeof zMedia>[];
}>()(async (tx, { postId, userId, content, media }) => {
  // Sanitize and validate content
  const sanitizedContent = helpers.sanitizePostContent(content);
  const validation = helpers.validatePostContent(sanitizedContent);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  // Check if post exists and user is the author
  const [post] = await tx
    .select({
      id: contentSchema.posts.id,
      authorId: contentSchema.posts.authorId,
    })
    .from(contentSchema.posts)
    .where(
      and(
        eq(contentSchema.posts.id, postId),
        eq(contentSchema.posts.authorId, userId)
      )
    )
    .limit(1);

  if (!post) {
    throw new Error("Post not found or you don't have permission to edit");
  }

  // Ensure user can modify the post
  if (!helpers.canUserModifyPost(userId, post.authorId)) {
    throw new Error("You don't have permission to edit this post");
  }

  // Update post content
  await tx
    .update(contentSchema.posts)
    .set({ content: sanitizedContent })
    .where(eq(contentSchema.posts.id, postId));

  // Delete existing media
  await tx
    .delete(contentSchema.media)
    .where(
      and(
        eq(contentSchema.media.contentId, postId),
        eq(contentSchema.media.contentTypeId, 1)
      )
    );

  // Add new media
  for (const mediaItem of media) {
    // Process different media types
    if (mediaItem.type === "image") {
      try {
        // Convert Base64 to Buffer
        const imageData = Buffer.from(
          mediaItem.url.split(",")[1] || mediaItem.url,
          "base64"
        );

        // Process and upload to S3, get back the URL
        const s3Url = await helpers.processAndUploadImage(imageData);

        // Store the S3 URL in the database
        await tx.insert(contentSchema.media).values({
          contentId: postId,
          contentTypeId: 0,
          url: s3Url,
          type: mediaItem.type,
        });
      } catch (error: any) {
        throw new Error(`Failed to process image: ${error.message}`);
      }
    } else if (mediaItem.type === "video") {
      try {
        // Convert Base64 to Buffer
        const videoData = Buffer.from(
          mediaItem.url.split(",")[1] || mediaItem.url,
          "base64"
        );

        // Process and upload to S3, get back URLs
        const { videoUrl, thumbnailUrl } = await helpers.processAndUploadVideo(
          videoData
        );

        // Store the video URL in the database
        await tx.insert(contentSchema.media).values({
          contentId: postId,
          contentTypeId: 0,
          url: videoUrl,
          type: mediaItem.type,
          thumbnailUrl: thumbnailUrl, // Store the thumbnail URL
        });
      } catch (error: any) {
        throw new Error(`Failed to process video: ${error.message}`);
      }
    } else {
      // For other media types, just store the URL as-is
      await tx.insert(contentSchema.media).values({
        contentId: postId,
        contentTypeId: 0,
        url: mediaItem.url,
        type: mediaItem.type,
      });
    }
  }

  return { success: true, id: postId };
});

// Reposts an existing post with optional new content
export const repostPost = createAction<{
  postId: number;
  content: string | null;
}>()(
  async (tx, { postId, userId, content }) => {
    // Sanitize content if provided
    let sanitizedContent = "";
    if (content) {
      sanitizedContent = helpers.sanitizePostContent(content);
      const validation = helpers.validatePostContent(sanitizedContent);

      if (!validation.valid) {
        throw new Error(validation.message);
      }
    }

    // Check if post exists and is not deleted
    const [originalPost] = await tx
      .select({
        id: contentSchema.posts.id,
        deletedAt: contentSchema.posts.deletedAt,
      })
      .from(contentSchema.posts)
      .where(eq(contentSchema.posts.id, postId))
      .limit(1);

    if (!originalPost) {
      throw new Error("Original post not found");
    }

    if (originalPost.deletedAt) {
      throw new Error("Cannot repost a deleted post");
    }

    // Create a new post with reference to original
    const [repost] = await tx
      .insert(contentSchema.posts)
      .values({
        authorId: userId,
        content: sanitizedContent,
        parentId: postId,
      })
      .returning({ id: contentSchema.posts.id });

    // Update repost count on original post
    await tx
      .update(contentSchema.posts)
      .set({
        repostsCount: sql`${contentSchema.posts.repostsCount} + 1`,
      })
      .where(eq(contentSchema.posts.id, postId));

    return repost;
  },
  async (tx, repost, action) => {
    await tx.insert(interactionSchema.contentActions).values({
      actionId: action.id,
      contentId: repost.id,
    });
  }
);

// Deletes a repost if the user has permission
export const unrepostPost = createAction<{
  postId: number;
}>()(async (tx, { postId, userId }) => {
  // Check if repost exists and user is the author
  const [repost] = await tx
    .select({ authorId: contentSchema.posts.authorId })
    .from(contentSchema.posts)
    .where(
      and(
        eq(contentSchema.posts.id, postId),
        eq(contentSchema.posts.authorId, userId),
        isNotNull(contentSchema.posts.parentId)
      )
    )
    .limit(1);

  if (!repost) {
    throw new Error("Repost not found or you don't have permission");
  }

  // Ensure user can modify the post
  if (!helpers.canUserModifyPost(userId, repost.authorId)) {
    throw new Error("You don't have permission to delete this repost");
  }

  // Delete the repost
  await tx
    .update(contentSchema.posts)
    .set({ deletedAt: Date.now() })
    .where(eq(contentSchema.posts.id, postId));

  // Update repost count on original post
  await tx
    .update(contentSchema.posts)
    .set({
      repostsCount: sql`GREATEST(${contentSchema.posts.repostsCount} - 1, 0)`,
    })
    .where(eq(contentSchema.posts.id, postId));

  return { success: true };
});

// Saves a post for the user if it hasn't been saved already
export const savePost = createAction<{
  postId: number;
}>()(async (tx, { postId, userId }) => {
  // Check if post exists and is not deleted
  const [post] = await tx
    .select({
      id: contentSchema.posts.id,
      deletedAt: contentSchema.posts.deletedAt,
    })
    .from(contentSchema.posts)
    .where(eq(contentSchema.posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.deletedAt) {
    throw new Error("Cannot save a deleted post");
  }

  // Check if already saved
  const [saved] = await tx
    .select()
    .from(interactionSchema.saves)
    .where(
      and(
        eq(interactionSchema.saves.contentId, postId),
        eq(interactionSchema.saves.userId, userId),
        eq(interactionSchema.saves.contentTypeId, 1)
      )
    )
    .limit(1);

  if (saved) {
    throw new Error("Post already saved");
  }

  // Save the post
  await tx.insert(interactionSchema.saves).values({
    userId,
    contentId: postId,
    contentTypeId: 0,
  });

  return { success: true, postId };
});

// Unsaves a post for the user if it has been saved
export const unsavePost = createAction<{
  postId: number;
}>()(async (tx, { postId, userId }) => {
  // Check if save exists
  const [savedPost] = await tx
    .select()
    .from(interactionSchema.saves)
    .where(
      and(
        eq(interactionSchema.saves.contentId, postId),
        eq(interactionSchema.saves.userId, userId),
        eq(interactionSchema.saves.contentTypeId, 1)
      )
    )
    .limit(1);

  if (!savedPost) {
    throw new Error("Post is not in your saved posts");
  }

  // Delete the save record
  await tx
    .delete(interactionSchema.saves)
    .where(
      and(
        eq(interactionSchema.saves.contentId, postId),
        eq(interactionSchema.saves.userId, userId),
        eq(interactionSchema.saves.contentTypeId, 1)
      )
    );

  return { success: true, postId };
});

//  Reports a post for inappropriate content.
export const reportPost = createAction<{
  postId: number;
  reason: string;
  details?: string;
}>()(async (tx, { postId, userId, reason, details }) => {
  // Check if post exists
  const [post] = await tx
    .select({ id: contentSchema.posts.id })
    .from(contentSchema.posts)
    .where(eq(contentSchema.posts.id, postId))
    .limit(1);

  if (!post) {
    throw new Error("Post not found");
  }

  // Validate reason
  if (!reason || reason.trim().length === 0) {
    throw new Error("A reason for reporting is required");
  }

  // Create a report record
  await tx.insert(interactionSchema.reports).values({
    reporterId: userId,
    contentId: postId,
    contentTypeId: 0,
    reason,
    details: details || "",
    status: "pending",
  });

  return { success: true, postId };
});
