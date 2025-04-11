import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { contentTypes } from "./types";

// Actions
export const actions = table(
  "actions",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id),
    type: t.text().notNull(),
    previous: t.text().notNull(),
    hash: t.text().notNull(),
    signature: t.text().notNull().unique(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("user_action_idx").on(table.userId)]
);

// Action functions
export const actionFunctions = table("action_functions", {
  id: t.int().notNull().primaryKey({ autoIncrement: true }),
  hash: t.text().notNull().unique(),
  params: t.text().notNull(),
});

// Action requests
export const actionRequests = table("action_requests", {
  hash: t.text().notNull().primaryKey(),
  function: t
    .int()
    .notNull()
    .references(() => actionFunctions.id),
  payload: t.text().notNull(),
});

// Content actions
export const contentActions = table("content_actions", {
  id: t.int().primaryKey({ autoIncrement: true }),
  contentId: t
    .int("content_id")
    .notNull()
    .references(() => contentTypes.id),
  actionId: t
    .int("action_id")
    .notNull()
    .references(() => actions.id),
  deleted: t.int({ mode: "boolean" }).default(false),
});
