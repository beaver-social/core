import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";

export const swipes = table(
  "swipes",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    caption: t.text(),
    authorId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    viewCount: t.int("view_count").default(0),
    likesCount: t.int("likes_count").default(0),
    commentsCount: t.int("comments_count").default(0),
    sharesCount: t.int("shares_count").default(0),
    repostsCount: t.int("reposts_count").default(0),
    nsfw: t.int("nsfw", { mode: "boolean" }).default(false),
    tags: t.text("tags").default(""),
    mentions: t.text("mentions").default(""),
    ...timestamps,
    subscriberOnly: t
      .int("subscriber_only", { mode: "boolean" })
      .default(false),
  },
  (table) => [t.index("author_short_idx").on(table.authorId)]
);
