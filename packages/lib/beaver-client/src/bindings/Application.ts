import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Application {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Application interface instantiated");
  }

  async createAppId(options: { name: string }) {
    const { name } = options;
    const application = safeParseResponse(
      this.defaults.apiClient.rpc.dev.applications.$post({
        json: { name },
      })
    );
    return application;
  }

  async getApplications() {
    const applications = safeParseResponse(
      this.defaults.apiClient.rpc.dev.applications.$get()
    );
    return applications;
  }

  async getApplicationById(options: { id: string }) {
    const { id } = options;
    const application = safeParseResponse(
      this.defaults.apiClient.rpc.dev.applications[":id"].$get({
        param: options,
      })
    );
    return application;
  }

  async whitelistApplicationUrls(options: { id: string; urls: string[] }) {
    const { id, urls } = options;
    const application = safeParseResponse(
      this.defaults.apiClient.rpc.dev.applications[":id"].whitelist.$put({
        param: options,
        json: { urls },
      })
    );
    return application;
  }
}
