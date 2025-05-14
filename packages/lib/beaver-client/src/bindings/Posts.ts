import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { stringify } from "../utils/utils";
import Logger from "./Logger";
import { safeParseResponse } from "../utils/apiClient";

export default class Posts {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Posts interface instantiated");
  }

  async upload(
    options: Omit<ApiParams<Api["posts"]["$post"]>["json"], "signature"> & {
      media: {
        file: File;
        type: "image" | "video";
        previewUrl: string;
        aspectRatio: "square" | "portrait" | "custom";
      }[];
    }
  ) {
    const { features, user, actionPointer } = this.defaults.store;
    if (!features || !user) {
      throw new Error("Login before posting.");
    }

    const { media, ...data } = options;

    const { signature } = await features.signPersonalMessage(
      stringify({
        ...data,
        userId: user.id,
        type: "v1.user.create.post",
        previous: actionPointer,
      })
    );

    const formData = new FormData();
    for (const item of media) {
      formData.append("media", item.file);
      formData.append("type", item.type);
      formData.append("previewUrl", item.previewUrl);
      formData.append("aspectRatio", item.aspectRatio);
    }

    const { post } = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.$post({
        json: {
          ...data,
          signature,
        },
        form: formData,
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return post;
  }

  async getPosts(options: { page?: number; perPage?: number } = {}) {
    const { page = 1, perPage = 8 } = options;

    return safeParseResponse(
      this.defaults.apiClient.rpc.posts.$get({
        query: {
          page: page.toString(),
          perPage: perPage.toString(),
        },
      })
    );
  }

  async getPostById(id: number | string) {
    return safeParseResponse(
      this.defaults.apiClient.rpc.posts[`:id`].$get({
        param: { id: id.toString() },
      })
    );
  }

  async likePost(options: { postId: number }) {
    const { postId } = options;
    const { features, user, actionPointer } = this.defaults.store;

    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("Login before liking a post.");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId,
        userId: user.id,
        type: "v1.user.like.post",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.like.$post({
        json: {
          postId,
          signature,
        },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return result;
  }

  async unlikePost(options: { postId: number }) {
    const { postId } = options;
    const { features, user, actionPointer } = this.defaults.store;

    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("Login before unliking a post.");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId,
        userId: user.id,
        type: "v1.user.unlike.post",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.like.$delete({
        json: {
          postId,
          signature,
        },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return result;
  }

  async bookmarkPost(options: { postId: number }) {
    const { postId } = options;
    const { features, user, actionPointer } = this.defaults.store;

    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("Login before bookmarking a post.");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId,
        userId: user.id,
        type: "v1.user.bookmark.post",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.bookmark.$post({
        json: {
          postId,
          signature,
        },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return result;
  }

  async unbookmarkPost(options: { postId: number }) {
    const { postId } = options;
    const { features, user, actionPointer } = this.defaults.store;

    if (!features || !user || !this.defaults.store.isAuthenticated()) {
      throw new Error("Login before unbookmarking a post.");
    }

    const { signature } = await features.signPersonalMessage(
      stringify({
        postId,
        userId: user.id,
        type: "v1.user.unbookmark.post",
        previous: actionPointer,
      })
    );

    const result = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.bookmark.$delete({
        json: {
          postId,
          signature,
        },
      })
    );

    this.defaults.store.syncUserAndActionPointer();
    return result;
  }

  async getPostLikes(options: { id: number; page?: number; perPage?: number }) {
    const { id, page = 1, perPage = 8 } = options;

    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("Login to view post likes.");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.posts[`:id`].likes.$get({
        param: { id: id.toString() },
        query: {
          page: page.toString(),
          perPage: perPage.toString(),
        },
      })
    );
  }

  async getPostReplies(options: {
    id: number;
    page?: number;
    perPage?: number;
  }) {
    const { id, page = 1, perPage = 8 } = options;

    if (!this.defaults.store.isAuthenticated()) {
      throw new Error("Login to view post replies.");
    }

    return safeParseResponse(
      this.defaults.apiClient.rpc.posts[`:id`].replies.$get({
        param: { id: id.toString() },
        query: {
          page: page.toString(),
          perPage: perPage.toString(),
        },
      })
    );
  }

  async getPostReposts(options: {
    id: number;
    page?: number;
    perPage?: number;
    quotesOnly?: boolean;
  }) {
    const { id, page = 1, perPage = 8, quotesOnly } = options;

    return safeParseResponse(
      this.defaults.apiClient.rpc.posts[`:id`].reposts.$get({
        param: { id: id.toString() },
        query: {
          page: page.toString(),
          perPage: perPage.toString(),
          quotesOnly: quotesOnly ? "true" : "false",
        },
      })
    );
  }
}
