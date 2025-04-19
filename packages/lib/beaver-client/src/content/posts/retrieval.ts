import Post from "./Post";
import {
  GetPostResponse,
  GetPostFeedResponse,
  GetPostInteractionsResponse,
  GetPostAwardsResponse,
} from "./types";

/**
 * Retrieves a post based on its id.
 * @returns A promise that resolves to the post, or null.
 */
export async function getByID(
  this: Post,
  options: { id: number }
): Promise<GetPostResponse> {
  const { apiClient } = this.defaults;
  const { id } = options;

  return apiClient.content.posts[":id"].$get({ param: { id: id } });
}

/**
 * Retrieves the public post feed.
 * @returns A promise that resolves to the feed.
 */
export async function getFeed(
  this: Post,
  options: { page: number; limit: number }
): Promise<GetPostFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit } = options;

  return apiClient.content.posts.$get({ query: { page, limit } });
}

/**
 * Retrieves interactions of a specific type for a post.
 * @returns A promise that resolves to the interactions.
 */
export async function getInteractionsByType(
  this: Post,
  options: {
    id: number;
    type: "likes" | "replies" | "reposts";
  }
): Promise<GetPostInteractionsResponse> {
  const { apiClient } = this.defaults;
  const { id, type } = options;

  return apiClient.content.posts[":id"].interaction.$get({
    param: { id },
    query: { type },
  });
}

/**
 * Retrieves posts based on user preferences.
 * @returns A promise that resolves to the feed.
 */
export async function getUserFeed(
  this: Post,
  options: {
    page: number;
    limit: number;
    type: "following" | "for_you";
  }
): Promise<GetPostFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  return apiClient.content.posts.user.feed.$get({
    query: { page, limit, type },
  });
}

/**
 * Retrieves posts for user profile.
 * @returns A promise that resolves to the posts.
 */
export async function getUserProfilePosts(
  this: Post,
  options: {
    page: number;
    limit: number;
    type:
      | "your-posts"
      | "your-replies"
      | "your-media"
      | "your-saved"
      | "your-pinned";
  }
): Promise<GetPostFeedResponse> {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  return apiClient.content.posts.user.profile.$get({
    query: { page, limit, type },
  });
}

/**
 * Retrieves awards for a post.
 * @returns A promise that resolves to the post awards.
 */
export async function getAwards(
  this: Post,
  options: {
    id: number;
    page: number;
    limit: number;
  }
): Promise<GetPostAwardsResponse> {
  const { apiClient } = this.defaults;
  const { id, page, limit } = options;

  return apiClient.content.posts[":id"].awards.$get({
    param: { id },
    query: { page, limit },
  });
}
