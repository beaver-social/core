import Swipe from "./Swipe";
import { tryCatch } from "../../../utils/tryCatch";
import {
  CreateSwipeApiResponse,
  DeleteSwipeResponse,
  UpdateSwipeResponse,
} from "../../../types/swipe.types";

/**
 * Creates a new swipe.
 * @returns A promise that resolves to the created swipe.
 */
export async function create(
  this: Swipe,
  options: {
    caption: string;
    media: {
      buffer: Buffer | Uint8Array;
      thumbnailUrl?: string;
      duration?: number;
      width?: number;
      height?: number;
      altText?: string;
    };
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  }
) {
  const { apiClient, surface } = this.defaults;
  const { caption, media, parentId, flags } = options;

  const payload = JSON.stringify({
    caption,
    media,
    parentId,
    flags,
  });

  const messageBytes = new TextEncoder().encode(payload);

  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${Swipe.CREATE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Swipe.CREATE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.swipes.create.$post({
    json: {
      caption,
      media,
      parentId,
      flags,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Deletes a swipe.
 * @returns A promise that resolves when the swipe is deleted.
 */
export async function delete_(this: Swipe, options: { id: number }) {
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
    this.logger.error(`${Swipe.DELETE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Swipe.DELETE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].$delete({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Updates a swipe.
 * @returns A promise that resolves to the updated swipe.
 */
export async function update(
  this: Swipe,
  options: {
    id: number;
    caption?: string;
    flags?: {
      nsfw?: boolean;
      subscriberOnly?: boolean;
    };
  }
) {
  const { apiClient, surface } = this.defaults;
  const { id, caption, flags } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id, caption, flags });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${Swipe.UPDATE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Swipe.UPDATE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].$patch({
    param: { id },
    json: {
      caption,
      flags,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
