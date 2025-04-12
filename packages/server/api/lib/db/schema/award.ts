import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";

export const awards = table("awards", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  imageUrl: t.text().notNull(),
  amount: t.int().notNull(),
  ...timestamps,
});
