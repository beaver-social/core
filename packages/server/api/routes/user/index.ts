import { Hono } from "hono";
import user from "./user";
import settings from "./settings";
import messages from "./messages";
import alerts from "./alerts";
import monetization from "./monetization";

export default new Hono()
  .route("/", user)
  .route("/settings", settings)
  .route("/messages", messages)
  .route("/alerts", alerts)
  .route("/monetization", monetization);
