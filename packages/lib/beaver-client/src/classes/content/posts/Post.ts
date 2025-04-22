import Logger from "../../misc/logger";
import { Defaults } from "../../../types/client.types";

export default class Post {
  /** @hidden */
  static CREATE_ERROR = "unable to create post";
  /** @hidden */
  static UPDATE_ERROR = "unable to update post";
  /** @hidden */
  static DELETE_ERROR = "unable to delete post";

  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Post interface instantiated");
  }
}
