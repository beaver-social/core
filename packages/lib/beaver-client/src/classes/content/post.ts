import { tryCatch } from "../../utils/tryCatch";
import { safeParseResponse } from "../../utils/apiClient";
import { Defaults } from "../../types";
import { Logger } from "../misc";

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
   * Retrieves a post based on its id.
   * @returns A promise that resolves to the post, or null.
   */
  public async getByID(options: { id: number }) {
    const { apiClient } = this.defaults;
    const { id } = options;

    return safeParseResponse(
      apiClient.content.posts[":id"].$get({
        param: { id: id.toString() },
      })
    );
  }

  /**
   * Retrieves the public post feed.
   * @returns A promise that resolves to the feed.
   */
  public async getFeed(options: { page: number; limit: number }) {
    const { apiClient } = this.defaults;
    const { page, limit } = options;

    return safeParseResponse(
      apiClient.content.posts.$get({
        query: { page: page.toString(), limit: limit.toString() },
      })
    );
  }

  /**
   * Retrieves interactions of a specific type for a post.
   * @returns A promise that resolves to the interactions.
   */
  public async getInteractionsByType(options: {
    id: number;
    type: "likes" | "replies" | "reposts";
  }) {
    const { apiClient } = this.defaults;
    const { id, type } = options;

    return safeParseResponse(
      apiClient.content.posts[":id"].interaction.$get({
        param: { id: id.toString() },
        query: { type },
      })
    );
  }

  /**
   * Retrieves posts based on user preferences.
   * @returns A promise that resolves to the feed.
   */
  public async getUserFeed(options: {
    page: number;
    limit: number;
    type: "following" | "for_you";
  }) {
    const { apiClient } = this.defaults;
    const { page, limit, type } = options;

    return safeParseResponse(
      apiClient.content.posts.user.feed.$get({
        query: { page: page.toString(), limit: limit.toString(), type },
      })
    );
  }

  /**
   * Retrieves posts for user profile.
   * @returns A promise that resolves to the posts.
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

    return safeParseResponse(
      apiClient.content.posts.user.profile.$get({
        query: { page: page.toString(), limit: limit.toString(), type },
      })
    );
  }

  /**
   * Retrieves awards for a post.
   * @returns A promise that resolves to the post awards.
   */
  public async getAwards(options: { id: number; page: number; limit: number }) {
    const { apiClient } = this.defaults;
    const { id, page, limit } = options;

    return safeParseResponse(
      apiClient.content.posts[":id"].awards.$get({
        param: { id: id.toString() },
        query: { page: page.toString(), limit: limit.toString() },
      })
    );
  }

  /**
   * Creates a new post.
   * @returns A promise that resolves to the created post.
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

    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts.$post({
        json: {
          content,
          media: media || [],
          parentId,
          flags,
        },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Deletes a post.
   * @returns A promise that resolves when the post is deleted.
   */
  public async delete(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].$delete({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Updates a post.
   * @returns A promise that resolves to the updated post.
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

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].$patch({
        param: { id: id.toString() },
        json: {
          content,
          media,
        },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Likes a post.
   * @returns A promise that resolves when the post is liked.
   */
  public async like(options: {
    id: number;
    reaction?: "like" | "haha" | "wow" | "sad" | "angry";
  }) {
    const { apiClient, surface } = this.defaults;
    const { id, reaction } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, reaction });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to like post: ${signatureResult.error}`);
      throw new Error(`Unable to like post: ${signatureResult.error}`);
    }

    const apiResponse = await safeParseResponse(
      apiClient.content.posts[":id"].like.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
          reaction: reaction || "like",
        },
      })
    );

    return apiResponse;
  }

  /**
   * Unlikes a post.
   * @returns A promise that resolves when the post is unliked.
   */
  public async unlike(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unlike post: ${signatureResult.error}`);
      throw new Error(`Unable to unlike post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].unlike.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Reposts a post.
   * @returns A promise that resolves when the post is reposted.
   */
  public async repost(options: { postId: number; content?: string }) {
    const { apiClient, surface } = this.defaults;
    const { postId, content } = options;

    // Create payload string to sign
    const payload = JSON.stringify({
      postId: postId,
      content: content,
      type: "v1.repost.post",
    });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to repost: ${signatureResult.error}`);
      throw new Error(`Unable to repost: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].repost.$post({
        param: { id: postId.toString() },
        json: { content },
        query: { signature: signatureResult.data.signature },
      })
    );
  }

  /**
   * Removes a repost.
   * @returns A promise that resolves when the repost is removed.
   */
  public async unrepost(options: { postId: number; repostId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId, repostId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId, repostId });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unrepost: ${signatureResult.error}`);
      throw new Error(`Unable to unrepost: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].unrepost.$post({
        param: { id: postId.toString() },
        query: { signature: signatureResult.data.signature },
      })
    );
  }

  /**
   * Saves a post.
   * @returns A promise that resolves when the post is saved.
   */
  public async save(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to save post: ${signatureResult.error}`);
      throw new Error(`Unable to save post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].save.$post({
        param: { id: postId.toString() },
        query: { signature: signatureResult.data.signature },
      })
    );
  }

  /**
   * Removes a post from saved posts.
   * @returns A promise that resolves when the post is unsaved.
   */
  public async unsave(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unsave post: ${signatureResult.error}`);
      throw new Error(`Unable to unsave post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].unsave.$post({
        param: { id: postId.toString() },
        query: { signature: signatureResult.data.signature },
      })
    );
  }

  /**
   * Reports a post.
   * @returns A promise that resolves when the post is reported.
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

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to report post: ${signatureResult.error}`);
      throw new Error(`Unable to report post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].report.$post({
        param: { id: postId.toString() },
        json: {
          reason,
          details,
        },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Pins a post to the user profile.
   * @returns A promise that resolves when the post is pinned.
   */
  public async pin(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to pin post: ${signatureResult.error}`);
      throw new Error(`Unable to pin post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].pin.$post({
        param: { id: postId.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Unpins a post from the user profile.
   * @returns A promise that resolves when the post is unpinned.
   */
  public async unpin(options: { postId: number }) {
    const { apiClient, surface } = this.defaults;
    const { postId } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ postId });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unpin post: ${signatureResult.error}`);
      throw new Error(`Unable to unpin post: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.posts[":id"].unpin.$post({
        param: { id: postId.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }
}
