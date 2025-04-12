import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";

export const topics = table("topics", {
  id: t.int().primaryKey({ autoIncrement: true }),
  label: t.text().notNull(),
  ...timestamps,
});
