import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { topics } from "./topics";

export const shorts = table(
  "shorts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    caption: t.text(),
    authorId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    thumbnailUrl: t.text("thumbnail_url"), // Optional thumbnail
    topicId: t
      .int("space_id")
      .references(() => topics.id, { onDelete: "cascade" }), // Optional reference to a topic
    isPinned: t.int("is_pinned", { mode: "boolean" }).default(false),
    isDeleted: t.int("is_deleted", { mode: "boolean" }).default(false),
    viewCount: t.int("view_count").default(0),
    likesCount: t.int("likes_count").default(0),
    commentsCount: t.int("comments_count").default(0),
    ...timestamps,
  },
  (table) => [
    t.index("author_short_idx").on(table.authorId),
    t.index("topic_short_idx").on(table.topicId),
  ]
);
