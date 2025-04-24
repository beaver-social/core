import { Logger } from "../misc";
import { tryCatch } from "../../utils/tryCatch";
import { safeParseResponse } from "../../utils/apiClient";
import { Defaults } from "../../types";

export default class User {
  /** @hidden */
  static UPDATE_ERROR = "unable to update user";
  /** @hidden */
  static FETCH_ERROR = "unable to fetch user";
  /** @hidden */
  static INTERACTIONS_ERROR = "unable to fetch interactions";
  /** @hidden */
  static SUINS_SYNC_ERROR = "unable to sync suins";
  /** @hidden */
  static AWARDS_ERROR = "unable to fetch awards";
  /** @hidden */
  static ANALYTICS_ERROR = "unable to fetch user analytics";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("User interface instantiated");
  }

  /**
   * Updates the current user details.
   * @param options The user details to update.
   * @returns A promise that resolves to the updated user.
   */
  public async update(options: {
    username?: string;
    fullName?: string;
    about?: string;
    imageUrl?: string;
    bannerUrl?: string;
    timezone?: number;
    isVerified?: boolean;
    pinnedPost?: number;
    pinnedShort?: number;
    email?: string;
  }) {
    const { apiClient, surface } = this.defaults;

    // Create payload string to sign
    const payload = JSON.stringify(options);

    // Sign the payload using tryCatch
    const signatureResult = await tryCatch(
      surface.signPersonalMessage(payload)
    );

    if (signatureResult.error) {
      this.logger.error(`${User.UPDATE_ERROR}: ${signatureResult.error}`);
      throw new Error(`${User.UPDATE_ERROR}: ${signatureResult.error}`);
    }

    return safeParseResponse(
      apiClient.user.$patch({
        json: options,
        query: {
          signature: signatureResult.data.signature,
        },
      })
    );
  }

  /**
   * Syncs Suins domain names with user account.
   * @returns A promise that resolves when sync is complete.
   */
  public async syncSuins() {
    const { apiClient } = this.defaults;

    return safeParseResponse(apiClient.user.suins.sync.$get());
  }

  /**
   * Get current user details
   * @returns A promise that resolves to the current user.
   */
  public async getCurrentUser() {
    const { apiClient } = this.defaults;

    return safeParseResponse(apiClient.user.$get());
  }

  /**
   * Get user details by ID
   * @param options The user ID
   * @returns A promise that resolves to the user information.
   */
  public async getById(options: { id: number }) {
    const { apiClient } = this.defaults;
    const { id } = options;

    return safeParseResponse(apiClient.user.$get({ param: { id } }));
  }

  /**
   * Find user by identity, username, suinsDomainName, or address
   * @param options The search criteria
   * @returns A promise that resolves to the user ID.
   */
  public async find(options: {
    identity?: string;
    username?: string;
    suinsDomainName?: string;
    address?: string;
  }) {
    const { apiClient } = this.defaults;

    return safeParseResponse(
      apiClient.user.find.$get({ query: { ...options } })
    );
  }

  /**
   * Get user's interactions
   * @param options The page, limit, and interaction type
   * @returns A promise that resolves to the interactions data.
   */
  public async getInteractions(options: {
    page?: number;
    limit?: number;
    type:
      | "likes"
      | "saves"
      | "reposts"
      | "comments"
      | "follows"
      | "topicFollows";
  }) {
    const { apiClient } = this.defaults;
    const { page, limit, type } = options;

    return safeParseResponse(
      apiClient.user.interactions.$get({
        query: {
          page: page ? page.toString() : "1",
          limit: limit ? limit.toString() : "10",
          type,
        },
      })
    );
  }

  /**
   * Get suggested users to follow
   * @returns A promise that resolves to suggested users.
   */
  public async getSuggestions() {
    const { apiClient } = this.defaults;

    return safeParseResponse(apiClient.user.suggestions.$get());
  }

  /**
   * Get user's awards
   * @param options The page, limit, and award type
   * @returns A promise that resolves to the awards data.
   */
  public async getAwards(options: {
    page?: number;
    limit?: number;
    type: "owned" | "given";
  }) {
    const { apiClient } = this.defaults;
    const { page, limit, type } = options;

    return safeParseResponse(
      apiClient.user.awards.$get({
        query: {
          page: page ? page.toString() : "1",
          limit: limit ? limit.toString() : "10",
          type,
        },
      })
    );
  }

  /**
   * Get user analytics
   * @param options The user ID to get analytics for
   * @returns A promise that resolves to the user analytics data.
   */
  public async getAnalytics(options: { userId: number }) {
    const { apiClient } = this.defaults;
    const { userId } = options;

    return safeParseResponse(
      apiClient.user[":id"].analytics.$get({ param: { id: userId } })
    );
  }
}
