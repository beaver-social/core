import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Actions {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Actions interface instantiated");
  }

  async fetchActions(options: {
    userId: number;
    page?: number;
    perPage?: number;
  }) {
    const actions = safeParseResponse(
      this.defaults.apiClient.rpc.actions.user[":id"].$get({
        query: {
          page: options.page,
          perPage: options.perPage,
        },
        param: { id: options.userId },
      })
    );
    return actions;
  }

  async fetchActionById(options: { actionId: string }) {
    const action = safeParseResponse(
      this.defaults.apiClient.rpc.actions[":id"].$get({
        param: { id: options.actionId },
      })
    );
    return action;
  }
}
