import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Docs {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("User interface instantiated");
  }

  async fetchDocs(options: { title: string }) {
    const { title } = options;
    const introduction = safeParseResponse(
      this.defaults.apiClient.rpc.docs.$get({
        query: {
          title,
        },
      })
    );
    return introduction;
  }
}
