import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { contentTypes } from "./types";

// Likes for posts and shorts
export const likes = table(
  "likes",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: t.int("content_id").notNull(), // ID of the post or short
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    ...timestamps,
    reaction: t
      .text({
        enum: ["like", "haha", "wow", "sad", "angry"],
      })
      .default("like"), // for emoji reactions
  },
  (table) => [
    t
      .uniqueIndex("content_user_like_idx")
      .on(table.contentId, table.userId, table.contentTypeId),
    t.index("content_like_idx").on(table.contentId, table.contentTypeId),
    t.index("user_like_idx").on(table.userId),
  ],
);

// Saves for posts and shorts
export const saves = table(
  "saves",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: t.int("content_id").notNull(), // ID of the post or short
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    ...timestamps,
  },
  (table) => [
    t
      .uniqueIndex("content_user_save_idx")
      .on(table.contentId, table.userId, table.contentTypeId),
    t.index("content_save_idx").on(table.contentId, table.contentTypeId),
    t.index("user_save_idx").on(table.userId),
  ],
);

// Comments for swipes only
export const comments = table(
  "comments",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: t.int("content_id").notNull(), // ID of the short
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    content: t.text().notNull(),
    parentId: t.int("parent_id"), // For nested comments (replies to comments)
    ...timestamps,
  },
  (table) => [
    t.index("content_comment_idx").on(table.contentId, table.contentTypeId),
    t.index("user_comment_idx").on(table.userId),
    t.index("parent_comment_idx").on(table.parentId),
  ],
);

// Reposts for posts and shorts
export const reposts = table(
  "reposts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t.int("user_id").notNull(),
    contentId: t.int("content_id").notNull(),
    contentTypeId: t.int("content_type_id").notNull(),
    quote: t.text(),
    ...timestamps,
  },
  (table) => [
    t.index("content_repost_idx").on(table.contentId, table.contentTypeId),
    t.index("user_repost_idx").on(table.userId),
  ],
);
