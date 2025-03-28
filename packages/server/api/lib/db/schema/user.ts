import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "./helpers";
import { relations } from "drizzle-orm";
import { posts } from "./post";

export const users = table("users", {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    identity: suiAddressType().notNull(),
    username: t.text().notNull(),
    fullName: t.text().notNull(),
    wallet: suiAddressType().notNull(),
    suins_domain_name: t.text(),
    image_url: t.text(),
    banner_url: t.text(),
    about: t.text(),
    imageUrl: t.text().notNull().default(""),
    timezone: t.int(),
    pinned: t.int("pinned_post").references((): t.AnySQLiteColumn => posts.id),
    ...timestamps,
}, (table) => [
    t.uniqueIndex("identity_idx").on(table.identity),
]);
