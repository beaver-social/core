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

  const apiResponse = await tryCatch(
    apiClient.user.$patch({
      json: options,
      query: {
        signature: signatureResult.data.signature,
      },
    })
  );

  if (apiResponse.error) {
    this.logger.error(`${User.UPDATE_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.UPDATE_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.UPDATE_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.UPDATE_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Syncs Suins domain names with user account.
 * @returns A promise that resolves when sync is complete.
 */
export async function syncSuins(this: User) {
  const { apiClient } = this.defaults;

  const apiResponse = await tryCatch(apiClient.user.suins.sync.$get());

  if (apiResponse.error) {
    this.logger.error(`${User.SUINS_SYNC_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.SUINS_SYNC_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.SUINS_SYNC_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.SUINS_SYNC_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}
