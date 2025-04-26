import { Defaults } from "../../types/client";
import { tryCatch } from "../../utils/tryCatch";
import { Logger } from "../misc";

export default class Auth {
  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Auth interface instantiated");
  }

  public async getChallenge(address: string) {
    const { apiClient } = this.defaults;

    const result = await tryCatch(
      apiClient.auth.challenge.$get({
        query: {
          address,
        },
      })
    );

    if (result.error) {
      throw result.error;
    }

    return result.data;
  }

  public async verifyChallenge(
    address: string,
    message: string,
    signature: string
  ) {
    const { apiClient } = this.defaults;

    const result = await tryCatch(
      apiClient.auth.verify.$post({
        json: {
          address,
          message,
          signature,
        },
      })
    );

    if (result.error) {
      throw result.error;
    }

    return result.data;
  }
}
