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

    this.logger.info("Post interface instantiated");
  }

  async upload(
    options: Omit<ApiParams<Api["posts"]["$post"]>["json"], "signature">
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

    const { post } = await safeParseResponse(
      this.defaults.apiClient.rpc.posts.$post({
        json: {
          ...options,
          signature,
        },
      })
    );

    return post;
  }
}
