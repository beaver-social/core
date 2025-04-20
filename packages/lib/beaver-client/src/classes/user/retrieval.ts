import User from "./User";
import {
  FindUserOptions,
  GetInteractionsOptions,
  GetAwardsOptions,
} from "../../types/user.types";
import { tryCatch } from "../../utils/tryCatch";

/**
 * Get current user details
 * @returns A promise that resolves to the current user.
 */
export async function getCurrentUser(this: User) {
  const { apiClient } = this.defaults;

  const apiResponse = await tryCatch(apiClient.user.$get());

  if (apiResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Get user details by ID
 * @param options The user ID
 * @returns A promise that resolves to the user information.
 */
export async function getById(this: User, options: { id: number }) {
  const { apiClient } = this.defaults;
  const { id } = options;

  const apiResponse = await tryCatch(apiClient.user.$get({ param: { id } }));

  if (apiResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Find user by identity, username, suinsDomainName, or address
 * @param options The search criteria
 * @returns A promise that resolves to the user ID.
 */
export async function find(this: User, options: FindUserOptions) {
  const { apiClient } = this.defaults;

  const apiResponse = await tryCatch(
    apiClient.user.find.$get({ query: { ...options } })
  );

  if (apiResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Get user's interactions
 * @param options The page, limit, and interaction type
 * @returns A promise that resolves to the interactions data.
 */
export async function getInteractions(
  this: User,
  options: GetInteractionsOptions
) {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  const apiResponse = await tryCatch(
    apiClient.user.interactions.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
        type,
      },
    })
  );

  if (apiResponse.error) {
    this.logger.error(`${User.INTERACTIONS_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.INTERACTIONS_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.INTERACTIONS_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.INTERACTIONS_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Get suggested users to follow
 * @returns A promise that resolves to suggested users.
 */
export async function getSuggestions(this: User) {
  const { apiClient } = this.defaults;

  const apiResponse = await tryCatch(apiClient.user.suggestions.$get());

  if (apiResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.FETCH_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Get user's awards
 * @param options The page, limit, and award type
 * @returns A promise that resolves to the awards data.
 */
export async function getAwards(this: User, options: GetAwardsOptions) {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  const apiResponse = await tryCatch(
    apiClient.user.awards.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
        type,
      },
    })
  );

  if (apiResponse.error) {
    this.logger.error(`${User.AWARDS_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.AWARDS_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.AWARDS_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.AWARDS_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}

/**
 * Get user analytics
 * @param options The user ID to get analytics for
 * @returns A promise that resolves to the user analytics data.
 */
export async function getAnalytics(this: User, options: { userId: number }) {
  const { apiClient } = this.defaults;
  const { userId } = options;

  const apiResponse = await tryCatch(
    apiClient.user[":id"].analytics.$get({ param: { id: userId } })
  );

  if (apiResponse.error) {
    this.logger.error(`${User.ANALYTICS_ERROR}: ${apiResponse.error}`);
    throw new Error(`${User.ANALYTICS_ERROR}: ${apiResponse.error}`);
  }

  const parsedResponse = await tryCatch(apiResponse.data.json());

  if (parsedResponse.error) {
    this.logger.error(`${User.ANALYTICS_ERROR}: ${parsedResponse.error}`);
    throw new Error(`${User.ANALYTICS_ERROR}: ${parsedResponse.error}`);
  }

  return parsedResponse.data;
}
