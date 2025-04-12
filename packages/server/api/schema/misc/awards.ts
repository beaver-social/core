import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { posts } from "../content/posts";

export const awards = table("awards", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  imageUrl: t.text().notNull(),
  amount: t.int().notNull(),
  ...timestamps,
});

export const postAwards = table("post_awards", {
  id: t.int().primaryKey({ autoIncrement: true }),
  giverId: t
    .int()
    .notNull()
    .references(() => users.id),
  postId: t
    .int()
    .notNull()
    .references(() => posts.id),
  awardId: t
    .int()
    .notNull()
    .references(() => awards.id),
});
