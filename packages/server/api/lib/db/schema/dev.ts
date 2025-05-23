import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "./user";

export const applications = t.sqliteTable("ping_chats", {
  id: t.int().primaryKey({ autoIncrement: true }),
  userId: t
    .int()
    .notNull()
    .references(() => users.id),
  name: t.text(),
  appId: t.text().notNull().$default(() => crypto.randomUUID().toString().replaceAll("-", "").replaceAll("_", "")),

  ...timestamps,
});
