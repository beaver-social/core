import Post from "./Post";
import { tryCatch } from "../../../utils/tryCatch";
import {
  ReportPostResponse,
  PinPostResponse,
  UnpinPostResponse,
} from "../../../types/post.types";

/**
 * Reports a post.
 * @returns A promise that resolves when the post is reported.
 */
export async function report(
  this: Post,
  options: {
    postId: number;
    reason: string;
    details?: string;
  }
): Promise<ReportPostResponse> {
  const { apiClient, surface } = this.defaults;
  const { postId, reason, details } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ postId, reason, details });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to report post: ${signatureResult.error}`);
    throw new Error(`Unable to report post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.report.$post({
    json: {
      postId,
      reason,
      details,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Pins a post to the user profile.
 * @returns A promise that resolves when the post is pinned.
 */
export async function pin(
  this: Post,
  options: { postId: number }
): Promise<PinPostResponse> {
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
    this.logger.error(`Unable to pin post: ${signatureResult.error}`);
    throw new Error(`Unable to pin post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.pin.$post({
    json: {
      postId,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Unpins a post from the user profile.
 * @returns A promise that resolves when the post is unpinned.
 */
export async function unpin(
  this: Post,
  options: { postId: number }
): Promise<UnpinPostResponse> {
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
    this.logger.error(`Unable to unpin post: ${signatureResult.error}`);
    throw new Error(`Unable to unpin post: ${signatureResult.error}`);
  }

  return apiClient.content.posts.unpin.$post({
    json: {
      postId,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
