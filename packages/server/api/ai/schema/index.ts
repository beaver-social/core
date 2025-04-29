import * as user from "./user/users";
import * as post from "./content/posts";
import * as short from "./content/swipes";
import * as topic from "./content/topics";
import * as interaction from "./interactions";
import * as media from "./content/media";
import * as timezone from "./misc/timezones";
import * as helper from "./helpers";

// Combine all schema parts
const schema = {
  ...user,
  ...post,
  ...short,
  ...media,
  ...topic,
  ...interaction,
  ...timezone,
  ...helper,
};

export default schema;

type UtilityFunctions =
  | "timestamps"
  | "suiAddressType"
  | "timezoneData"
  | "timezonesEnum"
  | "getTimezoneById"
  | "convertTimestampToTimezone"
  | "getCurrentTimeInTimezone"
  | "listAllTimezones"
  | "contentInteractions"
  | "socialInteractions"
  | "moderationInteractions"
  | "actionInteractions";

type DBSchema = typeof schema;
export type DB = {
  [K in keyof DBSchema as K extends `${infer Base}s` // Tables typically end with 's'
    ? Base // Standard table name (convert 'users' to 'user', etc.)
    : K extends UtilityFunctions // Exclude utility functions
    ? never
    : K]: K extends keyof DBSchema
    ? DBSchema[K] extends { $inferSelect: any }
      ? DBSchema[K]["$inferSelect"]
      : never
    : never;
};
