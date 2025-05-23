import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "./user";

export const applications = t.sqliteTable("ping_chats", {
  id: t.int().primaryKey({ autoIncrement: true }),
  userId: t
    .int()
    .notNull()
    .references(() => users.id),
  name: t.text().notNull(),
  appId: t
    .text()
    .notNull()
    .$default(() =>
      crypto.randomUUID().toString().replaceAll("-", "").replaceAll("_", ""),
    ),

  ...timestamps,
});

export const applicationUrls = t.sqliteTable("application_urls", {
  id: t.int().primaryKey({ autoIncrement: true }),
  applicationId: t
    .int()
    .notNull()
    .references(() => applications.id),
  url: t.text().notNull(),
});
