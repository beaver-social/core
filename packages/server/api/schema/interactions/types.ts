import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";

// Content type enum table (0 = post, 1 = swipe)
export const contentTypes = table("content_types", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull().unique(),
  ...timestamps,
});
