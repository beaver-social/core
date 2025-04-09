import { Hono } from "hono";
import user from "./user";
import settings from "./settings";
import messages from "./messages";
import topics from "./topics";
import alerts from "./alerts";
import analytics from "./analytics/analytics";
import monetization from "./monetization";
import nft from "./nft";

export default new Hono()
  .route("/", user)
  .route("/settings", settings)
  .route("/messages", messages)
  .route("/topics", topics)
  .route("/alerts", alerts)
  .route("/analytics", analytics)
  .route("/monetization", monetization)
  .route("/nft", nft);
