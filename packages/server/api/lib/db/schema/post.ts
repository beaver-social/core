import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "./helpers";
import { users } from "./user";
import { actions } from "./action";
import { topics } from "./topic";
import { awards } from "./award";

export const posts = table(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    content: t.text().notNull(),
    parentId: t.int().references((): t.AnySQLiteColumn => posts.id),
    isPaid: t.int({ mode: "boolean" }).default(false), // verify parent is null to be paid
    likesCount: t.int().default(0),
    repliesCount: t.int().default(0),
    authorId: t.int().references(() => users.id),
    suiAddress: suiAddressType(),
    nsfw: t.int({ mode: "boolean" }).default(false),
    actionId: t
      .int()
      .references((): t.AnySQLiteColumn => actions.id)
      .unique(),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("parent_idx").on(table.parentId),
  ]
);

export const post_topics = table("post_topics", {
  id: t.int().primaryKey({ autoIncrement: true }),
  postId: t
    .int()
    .notNull()
    .references(() => posts.id),
  topicId: t
    .int()
    .notNull()
    .references(() => topics.id),
});

export const post_media = table("post_media", {
  id: t.int().primaryKey({ autoIncrement: true }),
  postId: t
    .int()
    .notNull()
    .references(() => posts.id),
  url: t.text().notNull(),
  type: t.text().notNull(),
});

export const post_awards = table("post_awards", {
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
