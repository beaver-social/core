import { Api, Defaults } from "../types/client";
import { ApiParams } from "../types/api";
import { safeParseResponse } from "../utils/apiClient";
import Logger from "./Logger";

export default class Media {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Media interface instantiated");
  }

  async uploadMedia(
    options: ApiParams<Api["media"]["upload"]["$post"]>["form"]
  ) {
    const uploadMedia = safeParseResponse(
      this.defaults.apiClient.rpc.media.upload.$post({
        form: options,
      })
    );
    return uploadMedia;
  }
}
