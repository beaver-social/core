import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { contentTypes } from "../interactions/types";

export const topics = table(
  "topics",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    description: t.text(),
    imageUrl: t.text(),
    bannerUrl: t.text(),
    tags: t.text(), // JSON string array of tags
    ...timestamps,
    followerCount: t.int("follower_count").default(0),
  },
  (table) => [t.index("topic_name_idx").on(table.name)]
);

export const contentTopics = table(
  "content_topics",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    contentId: t.int("content_id").notNull(),
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    topicId: t
      .int("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    t
      .uniqueIndex("content_topic_idx")
      .on(table.contentId, table.contentTypeId, table.topicId),
    t.index("content_idx").on(table.contentId, table.contentTypeId),
    t.index("topic_idx").on(table.topicId),
  ]
);
