import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { users } from "./user";

export const posts = table(
  "post",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    content: t.text().notNull(),
    media: t.text(),
    parent: t.int("parent_id").references((): t.AnySQLiteColumn => posts.id),
    likesCount: t.int().default(0),
    repliesCount: t.int().default(0),
    authorId: t.int("author_id").references(() => users.id),
    ...timestamps,
  },
  (table) => [
    t.index("author_idx").on(table.authorId),
    t.index("parent_idx").on(table.parent),
  ]
);
