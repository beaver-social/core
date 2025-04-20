import Logger from "../misc/logger";
import { Defaults } from "../../types/client.types";

export default class User {
  /** @hidden */
  static UPDATE_ERROR = "unable to update user";
  /** @hidden */
  static FETCH_ERROR = "unable to fetch user";
  /** @hidden */
  static INTERACTIONS_ERROR = "unable to fetch interactions";
  /** @hidden */
  static SUINS_SYNC_ERROR = "unable to sync suins";
  /** @hidden */
  static AWARDS_ERROR = "unable to fetch awards";
  /** @hidden */
  static ANALYTICS_ERROR = "unable to fetch user analytics";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("User interface instantiated");
  }
}
