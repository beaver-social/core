import { Defaults } from "../types/client";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Social {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Social interface instantiated");
  }

  async followUser(options: { userId: number }) {
    const { userId: followingId } = options;
    if (!followingId) {
      throw new Error("User ID is required");
    }

    const { features, user, actionPointer } = this.defaults.store;
    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated or wallet not connected");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        followingId: followingId,
        userId: user.id,
        type: "v1.user.follow.user",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.social.follow[":id"].$post({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    this.defaults.events.emit("social:follow", {
      followingId,
      userId: user.id,
    });

    return result;
  }

  async unfollowUser(options: { userId: number }) {
    const { userId: followingId } = options;
    if (!followingId) {
      throw new Error("User ID is required");
    }

    const { features, user, actionPointer } = this.defaults.store;
    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated or wallet not connected");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        followingId: followingId,
        userId: user.id,
        type: "v1.user.unfollow.user",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.social.follow[":id"].$delete({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    this.defaults.events.emit("social:unfollow", {
      followingId,
      userId: user.id,
    });

    return result;
  }

  async isFollowing(options: { userId: number }) {
    const { userId } = options;
    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.social["is-following"][":id"].$get({
        param: { id: userId.toString() },
      })
    );
  }

  async getFollowCounts(options: { userId: number }) {
    const { userId } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.social.counts[":id"].$get({
        param: { id: userId },
      })
    );
  }

  async getFollowers(options: {
    userId: number;
    page?: number;
    perPage?: number;
  }) {
    const { userId, page = 1, perPage = 8 } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.social.followers[":id"].$get({
        query: { page: page.toString(), perPage: perPage.toString() },
        param: { id: userId.toString() },
      })
    );
  }

  async getFollowing(options: {
    userId: number;
    page?: number;
    perPage?: number;
  }) {
    const { userId, page = 1, perPage = 8 } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.social.following[":id"].$get({
        query: { page: page.toString(), perPage: perPage.toString() },
        param: { id: userId.toString() },
      })
    );
  }

  async bulkCheckFollowStatus(options: { userIds: number[] }) {
    const { userIds } = options;
    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    if (userIds.length === 0) {
      return { followStatus: {} };
    }

    if (userIds.length > 100) {
      throw new Error("Maximum 100 user IDs allowed per request");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.social.following["bulk-check"].$post({
        json: { userIds },
      })
    );
  }

  async getRecommendedUsers(options: {
    limit?: number;
    excludeFollowing?: boolean;
  }) {
    const { limit = 10, excludeFollowing = true } = options;

    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.social.recommendations.$get({
        query: {
          limit: limit.toString(),
          excludeFollowing: excludeFollowing.toString(),
        },
      })
    );
  }

  async getMutualFollowers(options: { userId: number }) {
    const { userId } = options;

    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.social.mutual[":id"].$get({
        param: { id: userId.toString() },
      })
    );
  }
}
