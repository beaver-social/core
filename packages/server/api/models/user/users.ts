import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps, suiAddressType } from "../helpers";
import { posts } from "../content/posts";
import { shorts } from "../content/shorts";

export const users = table(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    identity: suiAddressType().notNull(),
    username: t.text().notNull().unique(),
    displayName: t.text("display_name").notNull(),
    bio: t.text("bio"),
    avatarUrl: t.text("avatar_url"),
    bannerUrl: t.text("banner_url"),
    address: suiAddressType("address").notNull(),
    email: t.text("email"),
    isVerified: t.int("is_verified", { mode: "boolean" }).default(false),
    suinsDomainName: t.text("suins_domain_name"),
    timezone: t.int("timezone"),
    pinnedPost: t
      .int("pinned_post")
      .references((): t.AnySQLiteColumn => posts.id),
    pinnedShort: t
      .int("pinned_short")
      .references((): t.AnySQLiteColumn => shorts.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("username_idx").on(table.username),
    t.uniqueIndex("address_idx").on(table.address),
    t.uniqueIndex("email_idx").on(table.email),
    t.uniqueIndex("identity_idx").on(table.identity),
    t.uniqueIndex("suins_idx").on(table.suinsDomainName),
  ]
);
