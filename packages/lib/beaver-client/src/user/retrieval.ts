import User from "./User";
import { tryCatch } from "../utils/tryCatch";
import {
  FindUserOptions,
  FindUserResponse,
  GetUserResponse,
  GetInteractionsOptions,
  GetInteractionsResponse,
  GetSuggestionsResponse,
  GetAwardsOptions,
  GetAwardsResponse,
  UserAnalytics,
} from "./types";

/**
 * Get current user details
 * @returns A promise that resolves to the current user.
 */
export async function getCurrentUser(this: User): Promise<GetUserResponse> {
  const { apiClient } = this.defaults;

  try {
    return apiClient.user.$get();
  } catch (error) {
    this.logger.error(`${User.FETCH_ERROR}: ${error}`);
    throw new Error(`${User.FETCH_ERROR}: ${error}`);
  }
}

/**
 * Get user details by ID
 * @param options The user ID
 * @returns A promise that resolves to the user information.
 */
export async function getById(
  this: User,
  options: { id: number }
): Promise<GetUserResponse> {
  const { apiClient } = this.defaults;
  const { id } = options;

  try {
    return apiClient.user[":id"].$get({
      param: { id },
    });
  } catch (error) {
    this.logger.error(`${User.FETCH_ERROR}: ${error}`);
    throw new Error(`${User.FETCH_ERROR}: ${error}`);
  }
}

/**
 * Find user by identity, username, suinsDomainName, or address
 * @param options The search criteria
 * @returns A promise that resolves to the user ID.
 */
export async function find(
  this: User,
  options: FindUserOptions
): Promise<FindUserResponse> {
  const { apiClient } = this.defaults;

  try {
    return apiClient.user.find.$get({
      query: { ...options },
    });
  } catch (error) {
    this.logger.error(`${User.FETCH_ERROR}: ${error}`);
    throw new Error(`${User.FETCH_ERROR}: ${error}`);
  }
}

/**
 * Get user's interactions
 * @param options The page, limit, and interaction type
 * @returns A promise that resolves to the interactions data.
 */
export async function getInteractions(
  this: User,
  options: GetInteractionsOptions
): Promise<GetInteractionsResponse> {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  try {
    return apiClient.user.interactions.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
        type,
      },
    });
  } catch (error) {
    this.logger.error(`${User.INTERACTIONS_ERROR}: ${error}`);
    throw new Error(`${User.INTERACTIONS_ERROR}: ${error}`);
  }
}

/**
 * Get suggested users to follow
 * @returns A promise that resolves to suggested users.
 */
export async function getSuggestions(
  this: User
): Promise<GetSuggestionsResponse> {
  const { apiClient } = this.defaults;

  try {
    return apiClient.user.suggestions.$get();
  } catch (error) {
    this.logger.error(`${User.FETCH_ERROR}: ${error}`);
    throw new Error(`${User.FETCH_ERROR}: ${error}`);
  }
}

/**
 * Get user's awards
 * @param options The page, limit, and award type
 * @returns A promise that resolves to the awards data.
 */
export async function getAwards(
  this: User,
  options: GetAwardsOptions
): Promise<GetAwardsResponse> {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  try {
    return apiClient.user.awards.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
        type,
      },
    });
  } catch (error) {
    this.logger.error(`${User.AWARDS_ERROR}: ${error}`);
    throw new Error(`${User.AWARDS_ERROR}: ${error}`);
  }
}

/**
 * Get user analytics
 * @param options The user ID to get analytics for
 * @returns A promise that resolves to the user analytics data.
 */
export async function getAnalytics(
  this: User,
  options: { userId: number }
): Promise<{ analytics: UserAnalytics }> {
  const { apiClient } = this.defaults;
  const { userId } = options;

  try {
    return apiClient.user[":id"].analytics.$get({
      param: { id: userId },
    });
  } catch (error) {
    this.logger.error(`${User.ANALYTICS_ERROR}: ${error}`);
    throw new Error(`${User.ANALYTICS_ERROR}: ${error}`);
  }
}
