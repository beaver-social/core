import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";
import { contentTypes } from "./types";

// Content reports
export const reports = table(
  "reports",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    reporterId: t
      .int("reporter_id")
      .notNull()
      .references(() => users.id),
    contentId: t.int("content_id").notNull(), // ID of post, short, space, or user
    contentTypeId: t
      .int("content_type_id")
      .notNull()
      .references(() => contentTypes.id),
    reason: t.text().notNull(),
    details: t.text(),
    status: t.text().notNull().default("pending"), // pending, reviewed, resolved
    reviewerId: t.int("reviewer_id").references(() => users.id),
    reviewedAt: t.int("reviewed_at"),
    ...timestamps,
  },
  (table) => [
    t.index("reporter_idx").on(table.reporterId),
    t.index("content_report_idx").on(table.contentId, table.contentTypeId),
    t.index("status_idx").on(table.status),
  ]
);
