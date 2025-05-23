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

  async canMint(options: {
    address?: string;
    username?: string;
  }): Promise<boolean> {
    const { address, username } = options;
    const alreadyOwnedBy =
      username &&
      (await this.defaults.contracts.registry.read.resolveAddress({
        username,
      }));
    const alreadyHasUsername =
      address &&
      (await this.defaults.contracts.registry.read.resolveUsername({
        address,
      }));

    return !alreadyOwnedBy && !alreadyHasUsername;
  }

  async register(
    options: Pick<
      ApiParams<Api["users"]["$post"]>["form"],
      "username" | "fullName" | "about"
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
        form: {
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

  async getProfile(options: {
    type: "id" | "identity" | "username" | "suinsDomainName" | "address";
    value: string;
  }) {
    const { type, value } = options;

    return safeParseResponse(
      this.defaults.apiClient.rpc.users.find.$get({
        query: { type, value },
      })
    );
  }

  async searchSuggestions(options: { search: string; limit: number }) {
    const { search, limit } = options;

    return safeParseResponse(
      this.defaults.apiClient.rpc.users["search-suggestions"].$get({
        query: { search, limit: limit.toString() },
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

  async getFollowCount(options: { userId: number }) {
    const { userId } = options;
    return safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"]["follow-count"].$get({
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

    const followUser = safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].follow.$post({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return followUser;
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

    const unfollowUser = safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].follow.$delete({
        json: { signature },
        param: { id: followingId.toString() },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return unfollowUser;
  }

  async getPinned(options: { userId: number }) {
    const { userId } = options;
    const pinnedPost = safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].pin.$get({
        param: { id: userId.toString() },
      })
    );
    return pinnedPost;
  }

  async pinPost(options: { postId: number }) {
    const { postId } = options;

    const { features, user, actionPointer } = this.defaults.store;
    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated or wallet not connected");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId: postId,
        userId: user.id,
        type: "v1.user.pin.post",
        previous: actionPointer,
      })
    );

    const pinPost = safeParseResponse(
      this.defaults.apiClient.rpc.users[":id"].pin.$post({
        json: { signature },
        param: { id: user.id.toString() },
      })
    );
    return pinPost;
  }

  async unpinPost() {
    const { features, user, actionPointer } = this.defaults.store;
    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("User not authenticated or wallet not connected");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId: user.pinnedPost,
        userId: user.id,
        type: "v1.user.pin.post",
        previous: actionPointer,
      })
    );

    const unpinPost = safeParseResponse(
      this.defaults.apiClient.rpc.users.pin.$delete({
        json: { signature },
      })
    );
    return unpinPost;
  }
}
