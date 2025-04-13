import Logger from "../logger";
import { Defaults } from "../types";
import { Transaction } from "@mysten/sui/transactions";

export default class Post {
  /** @hidden */
  static CREATE_ERROR = "unable to create post";
  /** @hidden */
  static UPDATE_ERROR = "unable to update post";
  /** @hidden */
  static DELETE_ERROR = "unable to delete post";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Post interface instantiated");
  }

  /**
   * getByID - Retrieves a post based on its id.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post.
   * @returns {Promise<any>} - A promise that resolves to the post, or null.
   */
  public async getByID(options: { id: number }) {
    const { apiClient } = this.defaults;
    const { id } = options;

    return apiClient.content.posts[":id"].$get({ param: { id: id } });
  }

  /**
   * getFeed - Retrieves the public post feed.
   * @param {Object} options - The options object.
   * @param {number} options.page - The page number.
   * @param {number} options.limit - The number of posts to retrieve.
   * @returns {Promise<any>} - A promise that resolves to the feed.
   */
  public async getFeed(options: { page: number; limit: number }) {
    const { apiClient } = this.defaults;
    const { page, limit } = options;

    return apiClient.content.posts.$get({ query: { page, limit } });
  }

  /**
   * getInteractionCount - Retrieves interaction counts for a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post.
   * @returns {Promise<any>} - A promise that resolves to the interaction counts.
   */
  public async getInteractionCount(options: { id: number }) {
    const { apiClient } = this.defaults;
    const { id } = options;

    return apiClient.content.posts[":id"].interaction.count.$get({
      param: { id },
    });
  }

  /**
   * getInteractionsByType - Retrieves interactions of a specific type for a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post.
   * @param {string} options.type - The type of interaction ("likes", "replies", "reposts").
   * @returns {Promise<any>} - A promise that resolves to the interactions.
   */
  public async getInteractionsByType(options: {
    id: number;
    type: "likes" | "replies" | "reposts";
  }) {
    const { apiClient } = this.defaults;
    const { id, type } = options;

    return apiClient.content.posts[":id"].interaction.$get({
      param: { id },
      query: { type },
    });
  }

  /**
   * getUserFeed - Retrieves posts based on user preferences.
   * @param {Object} options - The options object.
   * @param {number} options.page - The page number.
   * @param {number} options.limit - The number of posts to retrieve.
   * @param {string} options.type - The feed type ("following" or "for_you").
   * @returns {Promise<any>} - A promise that resolves to the feed.
   */
  public async getUserFeed(options: {
    page: number;
    limit: number;
    type: "following" | "for_you";
  }) {
    const { apiClient } = this.defaults;
    const { page, limit, type } = options;

    return apiClient.content.posts.user.feed.$get({
      query: { page, limit, type },
    });
  }

  /**
   * getUserProfilePosts - Retrieves posts for user profile.
   * @param {Object} options - The options object.
   * @param {number} options.page - The page number.
   * @param {number} options.limit - The number of posts to retrieve.
   * @param {string} options.type - The post type to retrieve.
   * @returns {Promise<any>} - A promise that resolves to the posts.
   */
  public async getUserProfilePosts(options: {
    page: number;
    limit: number;
    type:
      | "your-posts"
      | "your-replies"
      | "your-media"
      | "your-saved"
      | "your-pinned";
  }) {
    const { apiClient } = this.defaults;
    const { page, limit, type } = options;

    return apiClient.content.posts.user.profile.$get({
      query: { page, limit, type },
    });
  }
}
