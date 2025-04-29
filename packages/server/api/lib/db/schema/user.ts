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
    bannerUrl: t.text(),
    website: t.text(),
    timezone: t.int(),
    loginType: t
      .text({
        enum: ["wallet", "zk"],
      })
      .notNull(),

    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("username_idx").on(table.username),
    t.uniqueIndex("address_idx").on(table.address),
    t.uniqueIndex("identity_idx").on(table.identity),
    t.uniqueIndex("suins_idx").on(table.suinsDomainName),
  ]
);

export const follows = t.sqliteTable("follows", {
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
});

// export const userAnalytics = t.sqliteTable("user_analytics", {
//   id: t.int().primaryKey({ autoIncrement: true }),
//   userId: t
//     .int()
//     .notNull()
//     .references((): t.AnySQLiteColumn => users.id),
//   // User Analytics
//   profileVisitsCount: t.int("profile_visits_count").default(0), // visits on user's profile
//   profileSharesCount: t.int("profile_shares_count").default(0), // shares on user's profile
//   profileViewsCount: t.int("profile_views_count").default(0), // views on user's profile
//   // Post Analytics
//   postCount: t.int("post_count").default(0), // total posts on user's profile
//   postLikesCount: t.int("post_likes_count").default(0), // likes on user's posts
//   postRepostsCount: t.int("post_reposts_count").default(0), // reposts on user's posts
//   postSharesCount: t.int("post_shares_count").default(0), // shares on user's posts
//   postCommentsCount: t.int("post_comments_count").default(0), // comments on user's posts
//   postViewsCount: t.int("post_views_count").default(0), // views on user's posts
//   postSavesCount: t.int("post_saves_count").default(0), // saves on user's posts
//   // Swipe Analytics
//   swipeCount: t.int("swipe_count").default(0), // total swipes on user's profile
//   swipeLikesCount: t.int("swipe_likes_count").default(0), // likes on user's swipes
//   swipeRepostsCount: t.int("swipe_reposts_count").default(0), // reposts on user's swipes
//   swipeSharesCount: t.int("swipe_shares_count").default(0), // shares on user's swipes
//   swipeCommentsCount: t.int("swipe_comments_count").default(0), // comments on user's swipes
//   swipeViewsCount: t.int("swipe_views_count").default(0), // views on user's swipes
//   swipeSavesCount: t.int("swipe_saves_count").default(0), // saves on user's swipes
//   // Misc
//   awardsCount: t.int("awards_count").default(0), // total awards on user's profile
//   earnings: t.int("earnings").default(0), // total earnings on user's profile
//   followersCount: t.int("followers_count").default(0), // total followers on user's profile
//   followingCount: t.int("following_count").default(0), // total following on user's profile
// });
