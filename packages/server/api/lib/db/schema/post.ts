import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "../helpers";
import { users } from "./user";
import { actions } from "./action";

export const posts = t.sqliteTable(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    authorId: t
      .int()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: t.text().notNull(),
    nsfw: t.int({ mode: "boolean" }).default(false),
    suiAddress: suiAddressType(), // for upgrading to suins
    location: t.text(),

    // Either one exists or neither
    parentId: t.int().references((): t.AnySQLiteColumn => posts.id),
    reposting: t.int().references((): t.AnySQLiteColumn => posts.id),

    viewCount: t.int().default(0),
    likesCount: t.int().default(0),
    repliesCount: t.int().default(0),
    repostsCount: t.int().default(0),
    sharesCount: t.int().default(0),

    actionId: t
      .int()
      .references((): t.AnySQLiteColumn => actions.id)
      .unique(),
    subscriberOnly: t.int({ mode: "boolean" }).default(false),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("parent_idx").on(table.parentId),
    t.index("repost_idx").on(table.reposting),
    t.uniqueIndex("repost_user_idx").on(table.reposting, table.authorId),
  ]
);

export const post_media = t.sqliteTable(
  "post_media",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    postId: t.int().notNull(),
    url: t.text().notNull(),
    blurhash: t.text(),
  },
  (table) => [t.index("media_post_id_idx").on(table.postId)]
);

export const topics = t.sqliteTable("topics", {
  id: t.int().primaryKey({ autoIncrement: true }),
  tag: t.text().notNull(),
});

export const post_topics = t.sqliteTable(
  "post_topics",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    postId: t.int().notNull(),
    topicId: t.int().notNull(),
  },
  (table) => [t.index("topic_post_id_idx").on(table.postId)]
);

export const post_mentions = t.sqliteTable(
  "post_mentions",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    postId: t.int().notNull(),
    userId: t.int().notNull(),
  },
  (table) => [t.index("mention_post_id_idx").on(table.postId)]
);
