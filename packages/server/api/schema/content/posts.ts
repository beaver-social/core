import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { topics } from "./topics";

export const posts = table(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    content: t.text().notNull(),
    authorId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topicId: t
      .int("space_id")
      .references(() => topics.id, { onDelete: "cascade" }), // Optional reference to a topic
    replyToId: t
      .int("reply_to_id")
      .references((): t.AnySQLiteColumn => posts.id), // Optional reference to another post (for replies/comments)
    isPinned: t.int("is_pinned", { mode: "boolean" }).default(false),
    isDeleted: t.int("is_deleted", { mode: "boolean" }).default(false),
    viewCount: t.int("view_count").default(0),
    likesCount: t.int("likes_count").default(0),
    repliesCount: t.int("replies_count").default(0),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("topic_idx").on(table.topicId),
    t.index("reply_idx").on(table.replyToId),
  ]
);
