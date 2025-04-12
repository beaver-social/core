import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { users } from "./user";

export const actions = table(
  "actions",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    userId: t
      .int()
      .notNull()
      .references(() => users.id),
    type: t.text().notNull(),
    previous: t.text().notNull(),
    hash: t.text().notNull(),
    signature: t.text().notNull().unique(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("user_idx").on(table.userId)]
);

export const actionRequests = table("action_requests", {
  hash: t.text().notNull().primaryKey(),
  function: t
    .int()
    .notNull()
    .references(() => actionFunctions.id),
  payload: t.text().notNull(),
});

export const actionFunctions = table("action_functions", {
  id: t.int().notNull().primaryKey({ autoIncrement: true }),
  hash: t.text().notNull().unique(),
  params: t.text().notNull(),
});
