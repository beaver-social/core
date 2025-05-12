import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "./user";
import { zPingIntents } from "../../zod/helpers";

export const pingChats = t.sqliteTable("ping_chats", {
  id: t.int().primaryKey({ autoIncrement: true }),
  userId: t
    .int()
    .notNull()
    .references(() => users.id),
  intent: t.text({ enum: zPingIntents()._def.values }).notNull(),
  label: t.text().notNull(),

  ...timestamps,
});

export const pingMessages = t.sqliteTable("ping_messages", {
  id: t.int().primaryKey({ autoIncrement: true }),
  chatId: t
    .int()
    .notNull()
    .references(() => pingChats.id, { onDelete: "cascade" }),
  parts: t.text().notNull(),
  role: t.text({ enum: ["user", "model"] }).notNull(),

  ...timestamps,
});
