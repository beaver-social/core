import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { post } from "./post";
import { replies } from "./reply";
import { timestamps } from "./helpers";

export const likes = table("likes", {
    id: t.int().primaryKey({ autoIncrement: true }),
    userId: t.int().references(() => users.id).notNull(),
    postId: t.int().references(() => post.id),
    replyId: t.int().references(() => replies.id),
    reaction: t.int(),
    ...timestamps
});
