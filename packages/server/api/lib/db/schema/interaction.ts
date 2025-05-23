import * as t from "drizzle-orm/sqlite-core";
import { posts } from "./post";
import { users } from "./user";

export const likes = t.sqliteTable(
  "likes",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    userId: t
      .int()
      .references(() => users.id)
      .notNull(),
    postId: t
      .int()
      .references(() => posts.id)
      .notNull(),
  },
  (table) => [t.uniqueIndex("user_post_idx").on(table.userId, table.postId)],
);

export const bookmarks = t.sqliteTable(
  "bookmarks",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    userId: t
      .int()
      .references(() => users.id)
      .notNull(),
    postId: t
      .int()
      .references(() => posts.id)
      .notNull(),
  },
  (table) => [
    t.uniqueIndex("user_bookmark_idx").on(table.userId, table.postId),
  ],
);
