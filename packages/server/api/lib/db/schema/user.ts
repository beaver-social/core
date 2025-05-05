import * as t from "drizzle-orm/sqlite-core";
import { timestamps, suiAddressType } from "../helpers";

export const users = t.sqliteTable(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    address: suiAddressType().notNull(),
    identity: suiAddressType().notNull(),
    collectionNft: suiAddressType().notNull(),
    username: t.text().notNull().unique(),
    about: t.text(),
    fullName: t.text().notNull(),
    suinsDomainName: t.text(),

    onboardingStep: t.int().default(0),
    onboardingCompleted: t.int({ mode: "boolean" }).default(false),

    imageUrl: t.text(),
    imageBlurhash: t.text(),
    bannerUrl: t.text(),
    website: t.text(),
    timezone: t.int(),

    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("username_idx").on(table.username),
    t.uniqueIndex("address_idx").on(table.address),
    t.uniqueIndex("identity_idx").on(table.identity),
    t.uniqueIndex("suins_idx").on(table.suinsDomainName),
  ]
);

export const follows = t.sqliteTable(
  "follows",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    followerId: t
      .int()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: t
      .int()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("follows_idx").on(table.followerId, table.followingId),
  ]
);
