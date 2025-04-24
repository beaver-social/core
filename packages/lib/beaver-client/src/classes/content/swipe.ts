import { Logger } from "../misc";
import { tryCatch } from "../../utils/tryCatch";
import { safeParseResponse } from "../../utils/apiClient";
import { Defaults } from "../../types";

export default class Swipe {
  /** @hidden */
  static CREATE_ERROR = "unable to create swipe";
  /** @hidden */
  static UPDATE_ERROR = "unable to update swipe";
  /** @hidden */
  static DELETE_ERROR = "unable to delete swipe";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Swipe interface instantiated");
  }

  /**
   * Retrieves a swipe based on its id.
   * @returns A promise that resolves to the swipe, or null.
   */
  public async getByID(options: { id: number }) {
    const { apiClient } = this.defaults;
    const { id } = options;

    return safeParseResponse(
      apiClient.content.swipes[":id"].$get({
        param: { id: id.toString() },
      })
    );
  }

  /**
   * Retrieves the public swipe feed.
   * @returns A promise that resolves to the feed.
   */
  public async getFeed(options: { page: number; limit: number }) {
    const { apiClient } = this.defaults;
    const { page, limit } = options;

    return safeParseResponse(
      apiClient.content.swipes.$get({
        query: { page: page.toString(), limit: limit.toString() },
      })
    );
  }

  /**
   * Retrieves interactions of a specific type for a swipe.
   * @returns A promise that resolves to the interactions.
   */
  public async getInteractionsByType(options: {
    id: number;
    type: "likes" | "reposts" | "saves" | "comments";
    page: number;
    limit: number;
  }) {
    const { apiClient } = this.defaults;
    const { id, type, page, limit } = options;

    return safeParseResponse(
      apiClient.content.swipes[":id"].interactions.$get({
        param: { id: id.toString() },
        query: {
          type,
          page: page.toString(),
          limit: limit.toString(),
        },
      })
    );
  }

  /**
   * Retrieves swipes based on user preferences.
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
      apiClient.content.swipes.user.feed.$get({
        query: {
          page: page.toString(),
          limit: limit.toString(),
          type,
        },
      })
    );
  }

  /**
   * Retrieves swipes for user profile.
   * @returns A promise that resolves to the swipes.
   */
  public async getUserProfileSwipes(options: { page: number; limit: number }) {
    const { apiClient } = this.defaults;
    const { page, limit } = options;

    return safeParseResponse(
      apiClient.content.swipes.user.profile.$get({
        query: {
          page: page.toString(),
          limit: limit.toString(),
        },
      })
    );
  }

  /**
   * Creates a new swipe.
   * @returns A promise that resolves to the created swipe.
   */
  public async create(options: {
    caption: string;
    media: {
      buffer: Buffer;
      thumbnailUrl?: string;
      duration?: number;
      width?: number;
      height?: number;
      altText?: string;
    };
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  }) {
    const { apiClient, surface } = this.defaults;
    const { caption, media, parentId, flags } = options;

    const payload = JSON.stringify({
      caption,
      media,
      parentId,
      flags,
    });

    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${Swipe.CREATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Swipe.CREATE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes.create.$post({
        json: {
          caption,
          media,
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
   * Deletes a swipe.
   * @returns A promise that resolves when the swipe is deleted.
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
      this.logger.error(`${Swipe.DELETE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Swipe.DELETE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].$delete({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Updates a swipe.
   * @returns A promise that resolves to the updated swipe.
   */
  public async update(options: {
    id: number;
    caption?: string;
    flags?: {
      nsfw?: boolean;
      subscriberOnly?: boolean;
    };
  }) {
    const { apiClient, surface } = this.defaults;
    const { id, caption, flags } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, caption, flags });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${Swipe.UPDATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${Swipe.UPDATE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].$patch({
        param: { id: id.toString() },
        json: {
          caption,
          flags,
        },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Likes a swipe.
   * @returns A promise that resolves when the swipe is liked.
   */
  public async like(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to like swipe: ${signatureResult.error}`);
      throw new Error(`Unable to like swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].like.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Unlikes a swipe.
   * @returns A promise that resolves when the swipe is unliked.
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
      this.logger.error(`Unable to unlike swipe: ${signatureResult.error}`);
      throw new Error(`Unable to unlike swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].unlike.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Reposts a swipe.
   * @returns A promise that resolves when the swipe is reposted.
   */
  public async repost(options: { id: number; quote?: string }) {
    const { apiClient, surface } = this.defaults;
    const { id, quote } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, quote });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to repost swipe: ${signatureResult.error}`);
      throw new Error(`Unable to repost swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].repost.$post({
        param: { id: id.toString() },
        json: {
          quote,
        },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Unrepost a swipe.
   * @returns A promise that resolves when the swipe is unreposted.
   */
  public async unrepost(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unrepost swipe: ${signatureResult.error}`);
      throw new Error(`Unable to unrepost swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].unrepost.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Saves a swipe.
   * @returns A promise that resolves when the swipe is saved.
   */
  public async save(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to save swipe: ${signatureResult.error}`);
      throw new Error(`Unable to save swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].save.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Unsaves a swipe.
   * @returns A promise that resolves when the swipe is unsaved.
   */
  public async unsave(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unsave swipe: ${signatureResult.error}`);
      throw new Error(`Unable to unsave swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].unsave.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Reports a swipe.
   * @returns A promise that resolves when the swipe is reported.
   */
  public async report(options: {
    id: number;
    reason:
      | "spam"
      | "nudity"
      | "violence"
      | "harassment"
      | "false_information"
      | "hate_speech"
      | "terrorism"
      | "other";
    details?: string;
  }) {
    const { apiClient, surface } = this.defaults;
    const { id, reason, details } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id, reason, details });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to report swipe: ${signatureResult.error}`);
      throw new Error(`Unable to report swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].report.$post({
        param: { id: id.toString() },
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
   * Pins a swipe to the user profile.
   * @returns A promise that resolves when the swipe is pinned.
   */
  public async pin(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to pin swipe: ${signatureResult.error}`);
      throw new Error(`Unable to pin swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].pin.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Unpins a swipe from the user profile.
   * @returns A promise that resolves when the swipe is unpinned.
   */
  public async unpin(options: { id: number }) {
    const { apiClient, surface } = this.defaults;
    const { id } = options;

    // Create payload string to sign
    const payload = JSON.stringify({ id });

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`Unable to unpin swipe: ${signatureResult.error}`);
      throw new Error(`Unable to unpin swipe: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.content.swipes[":id"].unpin.$post({
        param: { id: id.toString() },
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }
}
