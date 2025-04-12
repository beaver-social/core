import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { users } from "./user";
import { actions } from "./action";

export const posts = table(
  "post",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    content: t.text().notNull(),
    parent: t.int("parent_id").references((): t.AnySQLiteColumn => posts.id),
    likesCount: t.int().default(0),
    repliesCount: t.int().default(0),
    authorId: t.int("author_id").references(() => users.id),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("parent_idx").on(table.parent),
  ]
);

export const post_media = table("post_media", {
  id: t.int().primaryKey({ autoIncrement: true }),
  postId: t
    .int()
    .notNull()
    .references(() => posts.id),
  url: t.text().notNull(),
  type: t.text().notNull(),
});

export const post_action = table("post_action", {
  id: t.int().primaryKey({ autoIncrement: true }),
  postId: t
    .int()
    .notNull()
    .references(() => posts.id),
  actionId: t
    .int()
    .notNull()
    .references(() => actions.id),
  deleted: t.int({ mode: "boolean" }).default(false),
});
