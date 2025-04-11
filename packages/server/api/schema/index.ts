import * as user from "./user/users";
import * as post from "./content/posts";
import * as short from "./content/shorts";
import * as topic from "./content/topics";
import * as interaction from "./interactions";
import * as media from "./content/media";
import * as timezone from "./misc/timezones";
import * as helper from "./helpers";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import env from "../../env";

// Combine all schema parts
const schema = {
  ...user,
  ...post,
  ...short,
  ...topic,
  ...interaction,
  ...media,
  ...timezone,
  ...helper,
};

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

const sqlite = new Database(env.DB_FILE_NAME || "beaver.db");
sqlite.exec("PRAGMA foreign_keys = ON");
const db = drizzle({
  client: sqlite,
  schema: schema,
  casing: "snake_case",
});

export default db;
