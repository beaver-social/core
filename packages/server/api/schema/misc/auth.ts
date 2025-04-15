import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";

export const challenges = table("challenges", {
  id: t.int().primaryKey({ autoIncrement: true }),
  nonce: t.text().notNull().unique(),
  userId: t.int().notNull().unique(),
  ...timestamps,
});
