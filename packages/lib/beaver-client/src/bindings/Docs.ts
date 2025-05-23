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

    this.logger.info("Docs interface instantiated");
  }

  async fetchDocs() {
    const docs = safeParseResponse(this.defaults.apiClient.rpc.docs.$get());
    return docs;
  }

  async fetchDocById(options: { id: string }) {
    const { id } = options;
    const doc = safeParseResponse(
      this.defaults.apiClient.rpc.docs[":id"].$get({
        param: options,
      }),
    );
    return doc;
  }
}
