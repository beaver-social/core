import * as contentInteractionsSchema from "./content";
import * as socialInteractionsSchema from "./social";
import * as moderationInteractionsSchema from "./moderation";
import * as actionInteractionsSchema from "./actions";

// Convenience exports for common tables
export const { likes, saves, comments, reposts } = contentInteractionsSchema;
export const { follows, topicFollows } = socialInteractionsSchema;
export const { reports } = moderationInteractionsSchema; // idk if this is needed
export const { actions, actionFunctions, actionRequests, contentActions } =
  actionInteractionsSchema;
