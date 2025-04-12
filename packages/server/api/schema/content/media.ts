import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { contentTypes } from "../interactions/types";

// Unified media table for all content types (posts, shorts, topics, etc.)
export const media = table(
  "media",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    contentId: t.int("content_id").notNull(), // ID of the post, short, etc.
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    url: t.text().notNull(), // Media URL
    type: t.text().notNull(), // image, video, audio, etc.
    order: t.int().default(0), // For ordering multiple media items
    thumbnailUrl: t.text("thumbnail_url"), // Optional thumbnail for videos
    duration: t.int(), // For audio/video content
    width: t.int(), // For image/video dimensions
    height: t.int(), // For image/video dimensions
    altText: t.text(), // Optional alt text for accessibility
    ...timestamps,
  },
  (table) => [
    t.index("content_media_idx").on(table.contentId, table.contentTypeId),
    t.index("media_type_idx").on(table.type),
  ]
);
