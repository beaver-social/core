import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";

export const topics = table(
  "topics",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    description: t.text(),
    imageUrl: t.text("image_url"),
    bannerUrl: t.text("banner_url"),
    tags: t.text(), // JSON string array of tags
    ...timestamps,
    followerCount: t.int("follower_count").default(0),
  },
  (table) => [t.index("topic_name_idx").on(table.name)]
);
