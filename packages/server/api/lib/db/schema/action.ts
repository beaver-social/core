import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { users } from "./user";

export const actions = table(
  "actions",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    userId: t.int().references(() => users.id),
    type: t.text().notNull(),
    request: t.text().notNull(),
    signature: t.text().notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("user_idx").on(table.userId)]
);
