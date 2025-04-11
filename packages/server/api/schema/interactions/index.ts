import * as contentInteractions from "./content";
import * as socialInteractions from "./social";
import * as moderationInteractions from "./moderation";
import * as actionInteractions from "./actions";
import { contentTypes } from "./types";

export {
  contentTypes,
  contentInteractions,
  socialInteractions,
  moderationInteractions,
  actionInteractions,
};

// Convenience exports for common tables
export const { likes, bookmarks, views, reactions, comments } =
  contentInteractions;

export const { follows, spaceFollows } = socialInteractions;
export const { reports } = moderationInteractions;
export const { actions, actionFunctions, actionRequests, contentActions } =
  actionInteractions;
