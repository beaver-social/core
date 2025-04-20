import User from "./User";
import { tryCatch } from "../../utils/tryCatch";
import {
  UpdateUserResponse,
  UserUpdateOptions,
  SyncSuinsResponse,
} from "../../types/user.types";

/**
 * Updates the current user details.
 * @param options The user details to update.
 * @returns A promise that resolves to the updated user.
 */
export async function update(this: User, options: UserUpdateOptions) {
  const { apiClient, surface } = this.defaults;

  // Create payload string to sign
  const payload = JSON.stringify(options);

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${User.UPDATE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${User.UPDATE_ERROR}: ${signatureResult.error}`);
  }

  try {
    return apiClient.user.$patch({
      json: options,
      query: {
        signature: signatureResult.data.signature,
      },
    });
  } catch (error) {
    this.logger.error(`${User.UPDATE_ERROR}: ${error}`);
    throw new Error(`${User.UPDATE_ERROR}: ${error}`);
  }
}

/**
 * Syncs Suins domain names with user account.
 * @returns A promise that resolves when sync is complete.
 */
export async function syncSuins(this: User) {
  const { apiClient } = this.defaults;

  try {
    return apiClient.user.suins.sync.$get();
  } catch (error) {
    this.logger.error(`${User.SUINS_SYNC_ERROR}: ${error}`);
    throw new Error(`${User.SUINS_SYNC_ERROR}: ${error}`);
  }
}
