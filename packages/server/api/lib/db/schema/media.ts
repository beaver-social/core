import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "./user";
import { posts } from "./post";

export const media = t.sqliteTable("media", {
  id: t.int().primaryKey({ autoIncrement: true }),
  url: t.text().notNull(),
  type: t.text().notNull(),
  authorId: t
    .int()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: t.int().references(() => posts.id, { onDelete: "cascade" }),
  ...timestamps,
});
