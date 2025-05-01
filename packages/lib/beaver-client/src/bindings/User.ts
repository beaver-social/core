import { ApiClient, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
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
      ApiParams<ApiClient["users"]["$post"]>["json"],
      "username" | "fullName" | "about" | "imageUrl" | "bannerUrl"
    >
  ) {
    const { features, address } = this.defaults.store;
    if (!features || !address) {
      throw new Error("Connect wallet before registering.");
    }

    const { nonce } = await safeParseResponse(
      this.defaults.apiClient.users.nonce.$get({
        query: { address },
      })
    );

    const { signature } = await features.signPersonalMessage(nonce);

    const user = await safeParseResponse(
      this.defaults.apiClient.users.$post({
        json: {
          ...options,
          address: address,
          signature,
        },
      })
    );

    return user;
  }

  async login() {
    const { address, features } = this.defaults.store;
    if (!features || !address) {
      throw new Error("Connect wallet before logging in.");
    }

    const { nonce } = await safeParseResponse(
      this.defaults.apiClient.users.nonce.$get({
        query: { address },
      })
    );

    const { signature } = await features.signPersonalMessage(nonce);

    const { token } = await safeParseResponse(
      this.defaults.apiClient.users.login.$post({
        json: {
          address,
          signature,
        },
      })
    );

    this.defaults.store.authToken = token;
  }
}
