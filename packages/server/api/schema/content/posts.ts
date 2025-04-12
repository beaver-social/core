import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "../helpers";
import { users } from "../user/users";
import { topics } from "./topics";
import { actions } from "../interactions/actions";

export const posts = table(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    authorId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: t.text().notNull(),
    parentId: t.int("parent_id").references((): t.AnySQLiteColumn => posts.id),
    isPinned: t.int("is_pinned", { mode: "boolean" }).default(false),
    viewCount: t.int("view_count").default(0),
    likesCount: t.int("likes_count").default(0),
    repliesCount: t.int("replies_count").default(0),
    sharesCount: t.int("shares_count").default(0),
    repostsCount: t.int("reposts_count").default(0),
    tags: t.text("tags").default(""),
    mentions: t.text("mentions").default(""),
    nsfw: t.int("nsfw", { mode: "boolean" }).default(false),
    suiAddress: suiAddressType(), // for upgrading to sui
    actionId: t
      .int()
      .references((): t.AnySQLiteColumn => actions.id)
      .unique(),
    subscriberOnly: t
      .int("subscriber_only", { mode: "boolean" })
      .default(false),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("parent_idx").on(table.parentId),
    t.index("tags_idx").on(table.tags),
  ]
);
