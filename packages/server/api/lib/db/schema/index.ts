import * as user from "./user";
import * as action from "./action";
import * as post from "./post";
import * as interaction from "./interaction";
import * as ping from "./ping";
import * as dev from "./dev";

// Combine all schema parts
const schema = {
  ...user,
  ...post,
  ...interaction,
  ...action,
  ...ping,
  ...dev
  //   ...short,
  //   ...media,
  //   ...topic,
  //   ...timezone,
  //   ...helper,
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
