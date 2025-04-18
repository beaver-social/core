import { z } from "zod";
import { zSwipeMedia } from "../../lib/zod/helpers";
import { verifyChallenge } from "../auth/helpers";
import db from "../../schema/db";
import * as contentSchema from "../../schema/content";
import {
  likes,
  reposts,
  saves,
  comments,
} from "../../schema/interactions/content";
import { eq } from "drizzle-orm";
import { canUserModifyPost, processAndUploadVideo } from "./helpers";

export async function createSwipe(
  data: {
    caption: string;
    hashtags: string[];
    mentions: string[];
    media: z.infer<typeof zSwipeMedia>;
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  },
  options: {
    userId: number;
    signature: string;
  }
): Promise<number> {
  // verify challenge
  await verifyChallenge(
    JSON.stringify(data),
    options.userId,
    options.signature
  );

  // create swipe
  const swipe = await db
    .insert(contentSchema.swipes)
    .values({
      authorId: options.userId,
      caption: data.caption,
      tags: data.hashtags.join(","),
      mentions: data.mentions.join(","),
      parentId: data.parentId,
      nsfw: data.flags.nsfw,
      subscriberOnly: data.flags.subscriberOnly,
    })
    .returning({ id: contentSchema.swipes.id });

  const { videoUrl, thumbnailUrl } = await processAndUploadVideo(
    data.media.buffer
  );

  // create media
  await db.insert(contentSchema.media).values({
    contentId: swipe[0].id, // swipe id
    contentTypeId: 1, // swipe
    url: videoUrl, // media url
    type: "video", // media type
    thumbnailUrl: data.media.thumbnailUrl || thumbnailUrl, // thumbnail url
    duration: data.media.duration, // duration
    width: data.media.width, // width
    height: data.media.height, // height
    altText: data.media.altText, // alt text
  });

  return swipe[0].id;
}

/**
 * Updates an existing swipe with new content or flags
 */
export async function updateSwipe(
  id: number,
  data: {
    caption?: string;
    hashtags?: string[];
    mentions?: string[];
    flags?: {
      nsfw?: boolean;
      subscriberOnly?: boolean;
    };
  },
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify(data),
    options.userId,
    options.signature
  );

  // Check if swipe exists and belongs to user
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user is authorized to update this swipe
  if (!canUserModifyPost(options.userId, swipeResult[0].authorId)) {
    throw new Error("Unauthorized to update this swipe");
  }

  // Prepare update data
  const updateData: any = {};

  if (data.caption) {
    updateData.caption = data.caption;
  }

  if (data.hashtags) {
    updateData.tags = data.hashtags.join(",");
  }

  if (data.mentions) {
    updateData.mentions = data.mentions.join(",");
  }

  if (data.flags) {
    if (typeof data.flags.nsfw === "boolean") {
      updateData.nsfw = data.flags.nsfw;
    }
    if (typeof data.flags.subscriberOnly === "boolean") {
      updateData.subscriberOnly = data.flags.subscriberOnly;
    }
  }

  // Update the swipe
  await db
    .update(contentSchema.swipes)
    .set(updateData)
    .where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Deletes a swipe by ID
 */
export async function deleteSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists and belongs to user
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user is authorized to delete this swipe
  if (!canUserModifyPost(options.userId, swipeResult[0].authorId)) {
    throw new Error("Unauthorized to delete this swipe");
  }

  // Delete the swipe
  await db.delete(contentSchema.swipes).where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Likes a swipe
 */
export async function likeSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user already liked the swipe
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingLike = await db
    .select()
    .from(likes)
    .where(
      eq(likes.userId, options.userId) &&
        eq(likes.contentId, id) &&
        eq(likes.contentTypeId, contentTypeId)
    );

  if (existingLike.length > 0) {
    throw new Error("You already liked this swipe");
  }

  // Create like record
  await db.insert(likes).values({
    userId: options.userId,
    contentId: id,
    contentTypeId,
    reaction: "like",
  });

  // Increment likes count on swipe
  await db
    .update(contentSchema.swipes)
    .set({
      likesCount: (swipeResult[0]?.likesCount ?? 0) + 1,
    })
    .where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Unlikes a swipe
 */
export async function unlikeSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if like exists
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingLike = await db
    .select()
    .from(likes)
    .where(
      eq(likes.userId, options.userId) &&
        eq(likes.contentId, id) &&
        eq(likes.contentTypeId, contentTypeId)
    );

  if (existingLike.length === 0) {
    throw new Error("You have not liked this swipe");
  }

  // Delete like record
  await db
    .delete(likes)
    .where(
      eq(likes.userId, options.userId) &&
        eq(likes.contentId, id) &&
        eq(likes.contentTypeId, contentTypeId)
    );

  // Decrement likes count on swipe
  await db
    .update(contentSchema.swipes)
    .set({
      likesCount: Math.max(0, (swipeResult[0]?.likesCount ?? 0) - 1),
    })
    .where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Reposts a swipe
 */
export async function repostSwipe(
  id: number,
  quote: string | undefined,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id, quote }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user already reposted the swipe
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingRepost = await db
    .select()
    .from(reposts)
    .where(
      eq(reposts.userId, options.userId) &&
        eq(reposts.contentId, id) &&
        eq(reposts.contentTypeId, contentTypeId)
    );

  if (existingRepost.length > 0) {
    throw new Error("You already reposted this swipe");
  }

  // Create repost record
  await db.insert(reposts).values({
    userId: options.userId,
    contentId: id,
    contentTypeId,
    quote: quote || null,
  });

  // Increment reposts count on swipe
  await db
    .update(contentSchema.swipes)
    .set({
      repostsCount: (swipeResult[0]?.repostsCount ?? 0) + 1,
    })
    .where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Unrepost a swipe
 */
export async function unrepostSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if repost exists
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingRepost = await db
    .select()
    .from(reposts)
    .where(
      eq(reposts.userId, options.userId) &&
        eq(reposts.contentId, id) &&
        eq(reposts.contentTypeId, contentTypeId)
    );

  if (existingRepost.length === 0) {
    throw new Error("You have not reposted this swipe");
  }

  // Delete repost record
  await db
    .delete(reposts)
    .where(
      eq(reposts.userId, options.userId) &&
        eq(reposts.contentId, id) &&
        eq(reposts.contentTypeId, contentTypeId)
    );

  // Decrement reposts count on swipe
  await db
    .update(contentSchema.swipes)
    .set({
      repostsCount: Math.max(0, (swipeResult[0]?.repostsCount ?? 0) - 1),
    })
    .where(eq(contentSchema.swipes.id, id));

  return true;
}

/**
 * Save a swipe
 */
export async function saveSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user already saved the swipe
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingSave = await db
    .select()
    .from(saves)
    .where(
      eq(saves.userId, options.userId) &&
        eq(saves.contentId, id) &&
        eq(saves.contentTypeId, contentTypeId)
    );

  if (existingSave.length > 0) {
    throw new Error("You already saved this swipe");
  }

  // Create save record
  await db.insert(saves).values({
    userId: options.userId,
    contentId: id,
    contentTypeId,
  });

  return true;
}

/**
 * Unsave a swipe
 */
export async function unsaveSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if save exists
  const contentTypeId = 1; // Assuming 1 is for swipes
  const existingSave = await db
    .select()
    .from(saves)
    .where(
      eq(saves.userId, options.userId) &&
        eq(saves.contentId, id) &&
        eq(saves.contentTypeId, contentTypeId)
    );

  if (existingSave.length === 0) {
    throw new Error("You have not saved this swipe");
  }

  // Delete save record
  await db
    .delete(saves)
    .where(
      eq(saves.userId, options.userId) &&
        eq(saves.contentId, id) &&
        eq(saves.contentTypeId, contentTypeId)
    );

  return true;
}

/**
 * Report a swipe
 */
export async function reportSwipe(
  id: number,
  reason: string,
  details: string | undefined,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id, reason, details }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // For now, just log the report (in a real system, you would store this in a reports table)
  console.log(
    `User ${options.userId} reported swipe ${id} for ${reason}: ${
      details || "No details provided"
    }`
  );

  return true;
}

/**
 * Pin a swipe to user profile
 */
export async function pinSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user is authorized to pin this swipe
  if (!canUserModifyPost(options.userId, swipeResult[0].authorId)) {
    throw new Error("Unauthorized to pin this swipe");
  }

  // For now, just log the pin action (in a real system, you would have a pins table)
  console.log(`User ${options.userId} pinned swipe ${id}`);

  return true;
}

/**
 * Unpin a swipe from user profile
 */
export async function unpinSwipe(
  id: number,
  options: {
    userId: number;
    signature: string;
  }
): Promise<boolean> {
  await verifyChallenge(
    JSON.stringify({ id }),
    options.userId,
    options.signature
  );

  // Check if swipe exists
  const swipeResult = await db
    .select()
    .from(contentSchema.swipes)
    .where(eq(contentSchema.swipes.id, id));

  if (swipeResult.length === 0) {
    throw new Error("Swipe not found");
  }

  // Check if user is authorized to unpin this swipe
  if (!canUserModifyPost(options.userId, swipeResult[0].authorId)) {
    throw new Error("Unauthorized to unpin this swipe");
  }

  // For now, just log the unpin action (in a real system, you would remove from a pins table)
  console.log(`User ${options.userId} unpinned swipe ${id}`);

  return true;
}
