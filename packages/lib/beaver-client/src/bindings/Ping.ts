import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import { stringify } from "../utils/utils";
import Logger from "./Logger";

export default class Ping {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Ping interface instantiated");
  }

  async chat(options: {
    message: string;
    chatId?: string;
    intent: "chat" | "dev-ask";
  }) {
    const { message, chatId, intent } = options;

    const response = await this.defaults.apiClient.rpc.ping.$post({
      json: {
        message,
        chatId,
        intent,
      },
    });

    return response;
  }

  async getAllChats() {
    const ping = safeParseResponse(
      this.defaults.apiClient.rpc.ping.chats.$get()
    );
    return ping;
  }

  async getChatById(options: { id: string }) {
    const { id } = options;
    const ping = safeParseResponse(
      this.defaults.apiClient.rpc.ping[":id"].$get({
        param: { id },
      })
    );
    return ping;
  }
}
