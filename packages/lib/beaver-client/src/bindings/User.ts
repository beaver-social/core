import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class User {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("User interface instantiated");
  }

  async register(
    options: Pick<
      ApiParams<Api["users"]["$post"]>["json"],
      "username" | "fullName" | "about" | "image" | "banner"
    >
  ) {
    const { features, address } = this.defaults.store;
    if (!features || !address) {
      throw new Error("Connect wallet before registering.");
    }

    const { nonce } = await safeParseResponse(
      this.defaults.apiClient.rpc.users.nonce.$get({
        query: { address },
      })
    );

    const { signature } = await features.signPersonalMessage(nonce);

    const user = await safeParseResponse(
      this.defaults.apiClient.rpc.users.$post({
        json: {
          ...options,
          address: address,
          signature,
        },
      })
    );

    this.defaults.store.syncUserAndActionPointer();

    return user;
  }

  async login() {
    const store = this.defaults.store;
    const { address, features } = store;
    if (!features || !address) {
      throw new Error("Connect wallet before logging in.");
    }

    const { nonce } = await safeParseResponse(
      this.defaults.apiClient.rpc.users.nonce.$get({
        query: { address },
      })
    );

    const { signature } = await features.signPersonalMessage(nonce);

    const { token } = await safeParseResponse(
      this.defaults.apiClient.rpc.users.login.$post({
        json: {
          address,
          signature,
        },
      })
    );

    // await sleep(1500); // Wait for the jwt token to be valid
    await store.setJwt(token);

    const user = store.user;

    if (!user) {
      this.logout();
      return console.log(
        "BEAVER FATAL : Unable to fetch user data. Logging out."
      );
    }

    this.defaults.store.syncUserAndActionPointer();

    if (this.defaults.store.isAuthenticated()) {
      this.defaults.events.emit("user:login", {
        user: this.defaults.store.user,
      });
    }
  }

  async logout() {
    await this.defaults.store.setJwt(null);
    this.defaults.events.emit("user:logout", {});
  }

  async getUserById(options: { id: number }) {
    const { id } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].$get({
        param: { id: id.toString() },
      })
    );
  }

  async updateProfile(options: {
    fullName?: string;
    imageUrl?: string;
    bannerUrl?: string;
    about?: string | null;
  }) {
    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.users.$patch({
        json: options,
      })
    );
  }

  async getProfile() {
    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated");
    }
    return safeParseResponse(this.defaults.apiClient.rpc.users.$get());
  }

  async getFollowers(options: {
    userId: number;
    page?: number;
    perPage?: number;
  }) {
    const { userId, page = 1, perPage = 8 } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].followers.$get({
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
      this.defaults.apiClient.rpc.users[":id"].following.$get({
        query: { page: page.toString(), perPage: perPage.toString() },
        param: { id: userId.toString() },
      })
    );
  }

  async followUser(options: { followingId: number }) {
    const { followingId } = options;
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

    return safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].follow.$post({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );
  }

  async unfollowUser(options: { followingId: number }) {
    const { followingId } = options;
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

    return safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].follow.$delete({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );
  }
}
