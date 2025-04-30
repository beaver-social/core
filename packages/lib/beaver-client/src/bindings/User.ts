import { ApiClient, Defaults } from "../types/client";
import { ApiParams } from "../types/utils";
import { safeParseResponse } from "../utils/apiClient";
import { ensureConnection } from "../utils/connection";
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
    const { surface, connection } = ensureConnection(this.defaults);
    const address = connection.account.address;

    const {
      data: { nonce },
    } = await safeParseResponse(
      this.defaults.apiClient.users.nonce.$get({
        query: { address },
      })
    );

    const { signature } = await surface.signPersonalMessage(nonce);

    const raw = await this.defaults.apiClient.users.$post({
      json: {
        ...options,
        address: connection.account.address,
        loginType: surface.type,
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
