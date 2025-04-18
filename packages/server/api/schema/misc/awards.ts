import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { posts } from "../content/posts";

// awards
export const awards = table("awards", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  imageUrl: t.text().notNull(),
  amount: t.int().notNull(),
  ...timestamps,
});

// awards owned by a user
export const postAwards = table(
  "post_awards",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    postId: t
      .int()
      .notNull()
      .references(() => posts.id),
    awardId: t
      .int()
      .notNull()
      .references(() => awards.id),
    giverId: t
      .int()
      .notNull()
      .references(() => users.id),
    recipientId: t
      .int()
      .notNull()
      .references(() => users.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("post_award_idx").on(table.postId, table.awardId),
    t.uniqueIndex("giver_post_award_idx").on(table.giverId, table.postId),
    t
      .uniqueIndex("recipient_post_award_idx")
      .on(table.recipientId, table.postId),
  ]
);
