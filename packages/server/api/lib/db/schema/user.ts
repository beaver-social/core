import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "./helpers";
import { posts } from "./post";

export const users = table(
  "users",
  {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    identity: suiAddressType().notNull(),
    username: t.text().notNull(),
    fullName: t.text().notNull(),
    about: t.text().notNull(),
    address: suiAddressType().notNull(),
    suinsDomainName: t.text(),
    imageUrl: t.text().notNull(),
    bannerUrl: t.text(),
    timezone: t.int(),
    pinned: t.int("pinned_post").references((): t.AnySQLiteColumn => posts.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("identity_idx").on(table.identity),
    t.uniqueIndex("username_idx").on(table.username),
    t.uniqueIndex("address_idx").on(table.address),
    t.uniqueIndex("suins_idx").on(table.suinsDomainName),
  ]
);

export const follows = table("follows", {
  id: t.int().primaryKey({ autoIncrement: true }),
  followerId: t
    .int()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  followingId: t
    .int()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
