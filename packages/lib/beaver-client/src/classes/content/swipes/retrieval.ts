import Swipe from "./Swipe";
import {
  GetSwipeResponse,
  GetSwipeFeedResponse,
  GetInteractionsResponse,
} from "../../../types/swipe.types";

/**
 * Retrieves a swipe based on its id.
 * @returns A promise that resolves to the swipe, or null.
 */
export async function getByID(
  this: Swipe,
  options: { id: number }
): Promise<GetSwipeResponse> {
  const { apiClient } = this.defaults;
  const { id } = options;

  return apiClient.content.swipes[":id"].$get({ param: { id } });
}

/**
 * Retrieves the public swipe feed.
 * @returns A promise that resolves to the feed.
 */
export async function getFeed(
  this: Swipe,
  options: { page: number; limit: number }
): Promise<GetSwipeFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit } = options;

  return apiClient.content.swipes.$get({ query: { page, limit } });
}

/**
 * Retrieves interactions of a specific type for a swipe.
 * @returns A promise that resolves to the interactions.
 */
export async function getInteractionsByType(
  this: Swipe,
  options: {
    id: number;
    type: "likes" | "reposts" | "saves" | "comments";
    page: number;
    limit: number;
  }
): Promise<GetInteractionsResponse> {
  const { apiClient } = this.defaults;
  const { id, type, page, limit } = options;

  return apiClient.content.swipes[":id"].interactions.$get({
    param: { id },
    query: { type, page, limit },
  });
}

/**
 * Retrieves swipes based on user preferences.
 * @returns A promise that resolves to the feed.
 */
export async function getUserFeed(
  this: Swipe,
  options: {
    page: number;
    limit: number;
    type: "following" | "for_you";
  }
): Promise<GetSwipeFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  return apiClient.content.swipes.user.feed.$get({
    query: { page, limit, type },
  });
}

/**
 * Retrieves swipes for user profile.
 * @returns A promise that resolves to the swipes.
 */
export async function getUserProfileSwipes(
  this: Swipe,
  options: {
    page: number;
    limit: number;
  }
): Promise<GetSwipeFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit } = options;

  return apiClient.content.swipes.user.profile.$get({
    query: { page, limit },
  });
}
