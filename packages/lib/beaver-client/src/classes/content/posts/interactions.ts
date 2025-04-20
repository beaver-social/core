import Post from "./Post";
import { tryCatch } from "../../utils/tryCatch";
import {
  LikePostResponse,
  UnlikePostResponse,
  RepostResponse,
  UnrepostResponse,
  SavePostResponse,
  UnsavePostResponse,
} from "../../types/post.types";

/**
 * Likes a post.
 * @returns A promise that resolves when the post is liked.
 */
export async function like(
  this: Post,
  options: { id: number; reaction?: string }
): Promise<LikePostResponse> {
  const { apiClient, surface } = this.defaults;
  const { id, reaction } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id, reaction });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to like post: ${signatureResult.error}`);
    throw new Error(`Unable to like post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.like[":id"].$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
      reaction,
    },
  });
}

/**
 * Unlikes a post.
 * @returns A promise that resolves when the post is unliked.
 */
export async function unlike(
  this: Post,
  options: { id: number }
): Promise<UnlikePostResponse> {
  const { apiClient, surface } = this.defaults;
  const { id } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to unlike post: ${signatureResult.error}`);
    throw new Error(`Unable to unlike post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.unlike[":id"].$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Reposts a post.
 * @returns A promise that resolves when the post is reposted.
 */
export async function repost(
  this: Post,
  options: { postId: number; content?: string }
): Promise<RepostResponse> {
  const { apiClient, surface } = this.defaults;
  const { postId, content } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ postId, content });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to repost: ${signatureResult.error}`);
    throw new Error(`Unable to repost: ${signatureResult.error}`);
  }

  return apiClient.content.posts.repost.$post({
    json: {
      postId,
      content,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Removes a repost.
 * @returns A promise that resolves when the repost is removed.
 */
export async function unrepost(
  this: Post,
  options: { postId: number; repostId: number }
): Promise<UnrepostResponse> {
  const { apiClient, surface } = this.defaults;
  const { postId, repostId } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ postId, repostId });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to unrepost: ${signatureResult.error}`);
    throw new Error(`Unable to unrepost: ${signatureResult.error}`);
  }

  return apiClient.content.posts.unrepost.$post({
    json: {
      postId,
      repostId,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Saves a post.
 * @returns A promise that resolves when the post is saved.
 */
export async function save(
  this: Post,
  options: { postId: number }
): Promise<SavePostResponse> {
  const { apiClient, surface } = this.defaults;
  const { postId } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ postId });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to save post: ${signatureResult.error}`);
    throw new Error(`Unable to save post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.save.$post({
    json: {
      postId,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Removes a post from saved posts.
 * @returns A promise that resolves when the post is unsaved.
 */
export async function unsave(
  this: Post,
  options: { postId: number }
): Promise<UnsavePostResponse> {
  const { apiClient, surface } = this.defaults;
  const { postId } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ postId });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to unsave post: ${signatureResult.error}`);
    throw new Error(`Unable to unsave post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.unsave.$post({
    json: {
      postId,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
