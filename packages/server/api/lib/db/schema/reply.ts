import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { post } from "./post";
import { timestamps } from "./helpers";

export const replies = table("replies", {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t.int().references(() => users.id).notNull(),
    postId: t.int().references(() => post.id),
    parentReplyId: t.int().references(() => post.id),
    content: t.text().notNull(),
    ...timestamps
});
