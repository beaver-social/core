import Post from "./Post";

/**
 * Retrieves a post based on its id.
 * @returns A promise that resolves to the post, or null.
 */
export async function getByID(this: Post, options: { id: number }) {
  const { apiClient } = this.defaults;
  const { id } = options;

  return apiClient.content.posts[":id"].$get({ param: { id: id.toString() } });
}

/**
 * Retrieves the public post feed.
 * @returns A promise that resolves to the feed.
 */
export async function getFeed(
  this: Post,
  options: { page: number; limit: number }
) {
  const { apiClient } = this.defaults;
  const { page, limit } = options;

  return apiClient.content.posts.$get({
    query: { page: page.toString(), limit: limit.toString() },
  });
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
) {
  const { apiClient } = this.defaults;
  const { id, type } = options;

  return apiClient.content.posts[":id"].interaction.$get({
    param: { id: id.toString() },
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
) {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  return apiClient.content.posts.user.feed.$get({
    query: { page: page.toString(), limit: limit.toString(), type },
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
) {
  const { apiClient } = this.defaults;
  const { page, limit, type } = options;

  return apiClient.content.posts.user.profile.$get({
    query: { page: page.toString(), limit: limit.toString(), type },
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
) {
  const { apiClient } = this.defaults;
  const { id, page, limit } = options;

  return apiClient.content.posts[":id"].awards.$get({
    param: { id: id.toString() },
    query: { page: page.toString(), limit: limit.toString() },
  });
}
