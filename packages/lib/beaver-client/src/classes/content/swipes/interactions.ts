import Swipe from "./Swipe";
import { tryCatch } from "../../../utils/tryCatch";
import {
  LikeSwipeResponse,
  UnlikeSwipeResponse,
  RepostSwipeResponse,
  UnrepostSwipeResponse,
  SaveSwipeResponse,
  UnsaveSwipeResponse,
} from "../../../types/swipe.types";

/**
 * Likes a swipe.
 * @returns A promise that resolves when the swipe is liked.
 */
export async function like(this: Swipe, options: { id: number }) {
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
    this.logger.error(`Unable to like swipe: ${signatureResult.error}`);
    throw new Error(`Unable to like swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].like.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Unlikes a swipe.
 * @returns A promise that resolves when the swipe is unliked.
 */
export async function unlike(this: Swipe, options: { id: number }) {
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
    this.logger.error(`Unable to unlike swipe: ${signatureResult.error}`);
    throw new Error(`Unable to unlike swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].unlike.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Reposts a swipe.
 * @returns A promise that resolves when the swipe is reposted.
 */
export async function repost(
  this: Swipe,
  options: { id: number; quote?: string }
) {
  const { apiClient, surface } = this.defaults;
  const { id, quote } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id, quote });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to repost swipe: ${signatureResult.error}`);
    throw new Error(`Unable to repost swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].repost.$post({
    param: { id },
    json: {
      quote,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Unrepost a swipe.
 * @returns A promise that resolves when the swipe is unreposted.
 */
export async function unrepost(this: Swipe, options: { id: number }) {
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
    this.logger.error(`Unable to unrepost swipe: ${signatureResult.error}`);
    throw new Error(`Unable to unrepost swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].unrepost.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Saves a swipe.
 * @returns A promise that resolves when the swipe is saved.
 */
export async function save(this: Swipe, options: { id: number }) {
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
    this.logger.error(`Unable to save swipe: ${signatureResult.error}`);
    throw new Error(`Unable to save swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].save.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Unsaves a swipe.
 * @returns A promise that resolves when the swipe is unsaved.
 */
export async function unsave(this: Swipe, options: { id: number }) {
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
    this.logger.error(`Unable to unsave swipe: ${signatureResult.error}`);
    throw new Error(`Unable to unsave swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].unsave.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
