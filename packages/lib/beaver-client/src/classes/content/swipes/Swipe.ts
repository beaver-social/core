import Logger from "../../misc/logger";
import { Defaults } from "../../types/types";

export default class Swipe {
  /** @hidden */
  static CREATE_ERROR = "unable to create swipe";
  /** @hidden */
  static UPDATE_ERROR = "unable to update swipe";
  /** @hidden */
  static DELETE_ERROR = "unable to delete swipe";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Swipe interface instantiated");
  }
}
