import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { contentTypes } from "../interactions/types";

// Unified media table for all content types (posts, shorts, topics, etc.)
export const media = table(
  "media",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    contentId: t.int("content_id").notNull(),
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    url: t.text().notNull(),
    type: t
      .text({
        enum: ["image", "video", "audio"],
      })
      .notNull(),
    order: t.int().default(0), // for ordering multiple media items
    thumbnailUrl: t.text("thumbnail_url"),
    duration: t.int(),
    width: t.int(),
    height: t.int(),
    altText: t.text(),
    ...timestamps,
  },
  (table) => [
    t.index("content_media_idx").on(table.contentId, table.contentTypeId),
    t.index("media_type_idx").on(table.type),
  ]
);
