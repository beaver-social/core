import Logger from "../logger";
import { Defaults } from "../types";
import { tryCatch } from "../utils/tryCatch";

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

  /**
   * create - Creates a new post.
   * @param {Object} options - The options object.
   * @param {string} options.content - The content of the post.
   * @param {Array} [options.media] - Optional media attachments.
   * @param {number} [options.parentId] - Optional parent post id for replies.
   * @param {Object} options.flags - Post flags.
   * @param {boolean} options.flags.nsfw - Whether the post contains NSFW content.
   * @param {boolean} [options.flags.subscriberOnly] - Whether the post is for subscribers only.
   * @returns {Promise<any>} - A promise that resolves to the created post.
   */
  public async create(options: {
    content: string;
    media?: Array<any>;
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  }) {
    const { apiClient, surface } = this.defaults;
    const { content, media, parentId, flags } = options;

    const payload = JSON.stringify({
      content,
      media: media || [],
      parentId,
      flags,
    });

    const messageBytes = new TextEncoder().encode(payload);

    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
    }

    return apiClient.content.posts.create.$post({
      json: {
        content,
        media: media || [],
        parentId,
        flags,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * delete - Deletes a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post to delete.
   * @returns {Promise<any>} - A promise that resolves when the post is deleted.
   */
  public async delete(options: { id: number }) {
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
      this.logger.error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
    }

    return apiClient.content.posts[":id"].$delete({
      param: { id },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * update - Updates a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post to update.
   * @param {string} options.content - The new content of the post.
   * @param {Array} options.media - The new media attachments.
   * @returns {Promise<any>} - A promise that resolves when the post is updated.
   */
  public async update(options: {
    id: number;
    content: string;
    media: Array<any>;
  }) {
    const { apiClient, surface } = this.defaults;
    const { id, content, media } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, content, media });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
    }

    return apiClient.content.posts[":id"].$patch({
      param: { id },
      json: {
        content,
        media,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * like - Likes a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post to like.
   * @param {string} [options.reaction] - Optional reaction emoji.
   * @returns {Promise<any>} - A promise that resolves when the post is liked.
   */
  public async like(options: { id: number; reaction?: string }) {
    const { apiClient, surface } = this.defaults;
    const { id, reaction } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, reaction });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to like post: ${signatureResult.error}`);
      throw new Error(`Unable to like post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.like[":id"].$post({
      param: { id },
      query: {
        signature: signatureResult.data.signature,
        reaction,
      },
    });
  }

  /**
   * unlike - Unlikes a post.
   * @param {Object} options - The options object.
   * @param {number} options.id - The id of the post to unlike.
   * @returns {Promise<any>} - A promise that resolves when the post is unliked.
   */
  public async unlike(options: { id: number }) {
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
      this.logger.error(`Unable to unlike post: ${signatureResult.error}`);
      throw new Error(`Unable to unlike post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.unlike[":id"].$post({
      param: { id },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * repost - Reposts a post.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to repost.
   * @param {string} [options.content] - Optional content for the repost.
   * @returns {Promise<any>} - A promise that resolves when the post is reposted.
   */
  public async repost(options: { postId: number; content?: string }) {
    const { apiClient, surface } = this.defaults;
    const { postId, content } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId, content });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to repost: ${signatureResult.error}`);
      throw new Error(`Unable to repost: ${signatureResult.error}`);
    }

    return apiClient.content.posts.repost.$post({
      json: {
        postId,
        content,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * unrepost - Removes a repost.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the original post.
   * @param {number} options.repostId - The id of the repost to remove.
   * @returns {Promise<any>} - A promise that resolves when the repost is removed.
   */
  public async unrepost(options: { postId: number; repostId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId, repostId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId, repostId });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unrepost: ${signatureResult.error}`);
      throw new Error(`Unable to unrepost: ${signatureResult.error}`);
    }

    return apiClient.content.posts.unrepost.$post({
      json: {
        postId,
        repostId,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * save - Saves a post.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to save.
   * @returns {Promise<any>} - A promise that resolves when the post is saved.
   */
  public async save(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to save post: ${signatureResult.error}`);
      throw new Error(`Unable to save post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.save.$post({
      json: {
        postId,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * unsave - Removes a post from saved posts.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to unsave.
   * @returns {Promise<any>} - A promise that resolves when the post is unsaved.
   */
  public async unsave(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unsave post: ${signatureResult.error}`);
      throw new Error(`Unable to unsave post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.unsave.$post({
      json: {
        postId,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * report - Reports a post.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to report.
   * @param {string} options.reason - The reason for reporting the post.
   * @param {string} [options.details] - Optional details about the report.
   * @returns {Promise<any>} - A promise that resolves when the post is reported.
   */
  public async report(options: {
    postId: number;
    reason: string;
    details?: string;
  }) {
    const { apiClient, surface } = this.defaults;
    const { postId, reason, details } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId, reason, details });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to report post: ${signatureResult.error}`);
      throw new Error(`Unable to report post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.report.$post({
      json: {
        postId,
        reason,
        details,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * pin - Pins a post to the user profile.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to pin.
   * @returns {Promise<any>} - A promise that resolves when the post is pinned.
   */
  public async pin(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to pin post: ${signatureResult.error}`);
      throw new Error(`Unable to pin post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.pin.$post({
      json: {
        postId,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }

  /**
   * unpin - Unpins a post from the user profile.
   * @param {Object} options - The options object.
   * @param {number} options.postId - The id of the post to unpin.
   * @returns {Promise<any>} - A promise that resolves when the post is unpinned.
   */
  public async unpin(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(payload);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(messageBytes)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unpin post: ${signatureResult.error}`);
      throw new Error(`Unable to unpin post: ${signatureResult.error}`);
    }

    return apiClient.content.posts.unpin.$post({
      json: {
        postId,
      },
      query: {
        signature: signatureResult.data.signature,
      },
    });
  }
}
