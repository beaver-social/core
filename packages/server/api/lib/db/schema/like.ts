import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { posts } from "./post";
import { timestamps } from "./helpers";

export const likes = table(
  "likes",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int()
      .references(() => users.id)
      .notNull(),
    postId: t
      .int()
      .references(() => posts.id)
      .notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("post_user_idx").on(table.postId, table.userId)]
);
