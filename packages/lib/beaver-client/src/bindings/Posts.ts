import { ApiClient, Defaults } from "../types/client";
import { ApiParams } from "../types/utils";
import { safeParseResponse } from "../utils/apiClient";
import { ensureConnection } from "../utils/connection";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Posts {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Post interface instantiated");
  }

  async upload(
    options: Omit<ApiParams<ApiClient["posts"]["$post"]>["json"], "signature">
  ) {
    const { surface, connection } = ensureConnection(this.defaults);
    const address = connection.account.address;

    const {
      data: { pointer },
    } = await safeParseResponse(
      this.defaults.apiClient.users.actions.pointer.$get()
    );
    const {
      data: { id },
    } = await safeParseResponse(this.defaults.apiClient.users.$get());

    const { media, ...data } = options;
    const { signature } = await surface.signPersonalMessage(
      stringify({
        ...data,
        userId: id,
        type: "v1.user.create.post",
        previous: pointer,
      })
    );

    const raw = await this.defaults.apiClient.posts.$post({
      json: {
        ...options,
        signature,
      },
    });
    const response = await raw.json();

    if (!response.success) {
      throw new Error(response.error);
    }

    const { data: user } = response;

    return user;
  }
}
