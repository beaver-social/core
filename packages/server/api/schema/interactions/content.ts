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
  },
  (table) => [
    t
      .uniqueIndex("content_user_like_idx")
      .on(table.contentId, table.userId, table.contentTypeId),
    t.index("content_like_idx").on(table.contentId, table.contentTypeId),
    t.index("user_like_idx").on(table.userId),
  ]
);

// Bookmarks for posts and shorts
export const bookmarks = table(
  "bookmarks",
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
      .uniqueIndex("content_user_bookmark_idx")
      .on(table.contentId, table.userId, table.contentTypeId),
    t.index("content_bookmark_idx").on(table.contentId, table.contentTypeId),
    t.index("user_bookmark_idx").on(table.userId),
  ]
);

// Emoji reactions
export const reactions = table(
  "reactions",
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
    emoji: t.text().notNull(),
    ...timestamps,
  },
  (table) => [
    t
      .uniqueIndex("content_user_emoji_idx")
      .on(table.contentId, table.userId, table.emoji, table.contentTypeId),
    t.index("content_reaction_idx").on(table.contentId, table.contentTypeId),
    t.index("user_reaction_idx").on(table.userId),
  ]
);

// Content views
export const views = table(
  "views",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .references(() => users.id, { onDelete: "cascade" }),
    contentId: t.int("content_id").notNull(), // ID of the post or short
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    viewedAt: t
      .int("viewed_at")
      .notNull()
      .$default(() => Date.now()),
    duration: t.int("duration"), // For videos, how many seconds watched
    ...timestamps,
  },
  (table) => [
    t.index("content_view_idx").on(table.contentId, table.contentTypeId),
    t.index("user_view_idx").on(table.userId),
  ]
);

// Comments for posts and shorts
export const comments = table(
  "comments",
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
    content: t.text().notNull(),
    parentId: t.int("parent_id"), // For nested comments (replies to comments)
    isDeleted: t.int("is_deleted", { mode: "boolean" }).default(false),
    ...timestamps,
  },
  (table) => [
    t.index("content_comment_idx").on(table.contentId, table.contentTypeId),
    t.index("user_comment_idx").on(table.userId),
    t.index("parent_comment_idx").on(table.parentId),
  ]
);
