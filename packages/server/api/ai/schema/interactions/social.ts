import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { topics } from "../content/topics";

// User follows
export const follows = table(
  "follows",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    followerId: t
      .int("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: t
      .int("following_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: t
      .text({
        enum: ["follow", "notify", "subscribe"],
      })
      .default("follow")
      .notNull(), // follow / notify / subscribe
    ...timestamps,
  },
  (table) => [
    t
      .uniqueIndex("follower_following_idx")
      .on(table.followerId, table.followingId),
    t.index("follower_idx").on(table.followerId),
    t.index("following_idx").on(table.followingId),
  ],
);

// Topic follows
export const topicFollows = table(
  "topic_follows",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topicId: t
      .int("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    ...timestamps,
    type: t.text("type").notNull(), // follow, notify
  },
  (table) => [
    t.uniqueIndex("user_topic_follow_idx").on(table.userId, table.topicId),
    t.index("user_follow_idx").on(table.userId),
    t.index("topic_follow_idx").on(table.topicId),
  ],
);
