import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps, suiAddressType } from "../helpers";
import { posts } from "../content/posts";
import { swipes } from "../content/swipes";

export const users = table(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    identity: suiAddressType().notNull(),
    username: t.text().notNull().unique(),
    fullName: t.text("full_name").notNull(),
    about: t.text("about"),
    imageUrl: t.text("image_url"),
    bannerUrl: t.text("banner_url"),
    address: suiAddressType("address").notNull(),
    suinsDomainName: t.text("suins_domain_name"),
    loginType: t
      .text({
        enum: ["wallet", "zk"],
      })
      .notNull(),
    email: t.text("email"),
    isVerified: t.int("is_verified", { mode: "boolean" }).default(false),
    timezone: t.int("timezone"),
    pinnedPost: t
      .int("pinned_post")
      .references((): t.AnySQLiteColumn => posts.id),
    pinnedShort: t
      .int("pinned_short")
      .references((): t.AnySQLiteColumn => swipes.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("username_idx").on(table.username),
    t.uniqueIndex("address_idx").on(table.address),
    t.uniqueIndex("identity_idx").on(table.identity),
    t.uniqueIndex("suins_idx").on(table.suinsDomainName),
  ]
);
