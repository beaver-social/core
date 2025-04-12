import * as contentInteractions from "./content";
import * as socialInteractions from "./social";
import * as moderationInteractions from "./moderation";
import * as actionInteractions from "./actions";

export {
  contentInteractions,
  socialInteractions,
  moderationInteractions,
  actionInteractions,
};

// Convenience exports for common tables
export const { likes, saves, views, comments } = contentInteractions;

export const { follows, topicFollows } = socialInteractions;
export const { reports } = moderationInteractions;
export const { actions, actionFunctions, actionRequests, contentActions } =
  actionInteractions;
