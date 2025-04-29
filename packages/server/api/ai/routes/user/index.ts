import { Hono } from "hono";
import user from "./user";
import settings from "./settings";
import messages from "./messages";
import alerts from "./alerts";
import monetization from "./monetization";
import profile from "./profile";
import relationships from "./relationships";
import content from "./content";
import analytics from "./analytics";
import topics from "./topics";
import moderation from "./moderation";
import nft from "./nft";

export default new Hono()
  .route("/", user)
  .route("/settings", settings)
  .route("/messages", messages)
  .route("/alerts", alerts)
  .route("/monetization", monetization)
  .route("/profile", profile)
  .route("/relationships", relationships)
  .route("/content", content)
  .route("/analytics", analytics)
  .route("/topics", topics)
  .route("/moderation", moderation)
  .route("/nft", nft);
