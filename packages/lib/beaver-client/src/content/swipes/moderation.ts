import Swipe from "./Swipe";
import { tryCatch } from "../../utils/tryCatch";
import {
  ReportSwipeResponse,
  PinSwipeResponse,
  UnpinSwipeResponse,
} from "./types";

/**
 * Reports a swipe.
 * @returns A promise that resolves when the swipe is reported.
 */
export async function report(
  this: Swipe,
  options: {
    id: number;
    reason:
      | "spam"
      | "nudity"
      | "violence"
      | "harassment"
      | "false_information"
      | "hate_speech"
      | "terrorism"
      | "other";
    details?: string;
  }
): Promise<ReportSwipeResponse> {
  const { apiClient, surface } = this.defaults;
  const { id, reason, details } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id, reason, details });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`Unable to report swipe: ${signatureResult.error}`);
    throw new Error(`Unable to report swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].report.$post({
    param: { id },
    json: {
      reason,
      details,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Pins a swipe to the user profile.
 * @returns A promise that resolves when the swipe is pinned.
 */
export async function pin(
  this: Swipe,
  options: { id: number }
): Promise<PinSwipeResponse> {
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
    this.logger.error(`Unable to pin swipe: ${signatureResult.error}`);
    throw new Error(`Unable to pin swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].pin.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Unpins a swipe from the user profile.
 * @returns A promise that resolves when the swipe is unpinned.
 */
export async function unpin(
  this: Swipe,
  options: { id: number }
): Promise<UnpinSwipeResponse> {
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
    this.logger.error(`Unable to unpin swipe: ${signatureResult.error}`);
    throw new Error(`Unable to unpin swipe: ${signatureResult.error}`);
  }

  return apiClient.content.swipes[":id"].unpin.$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
