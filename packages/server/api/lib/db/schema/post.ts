import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { users } from "./user";

export const posts = table("post", {
    id: t.int().primaryKey({ autoIncrement: true }),
    content: t.text().notNull(),
    mediaUrl: t.text(),
    authorId: t.int("author_id").references(() => users.id),
    ...timestamps
});
