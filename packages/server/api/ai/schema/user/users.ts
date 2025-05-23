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
    address: suiAddressType("address").notNull(),
    suinsDomainName: t.text("suins_domain_name"),
    username: t.text().notNull().unique(),
    fullName: t.text("full_name").notNull(),
    about: t.text("about"),
    website: t.text("website"),
    imageUrl: t.text("image_url"),
    bannerUrl: t.text("banner_url"),
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
  ],
);

export const userAnalytics = table("user_analytics", {
  id: t.int().primaryKey({ autoIncrement: true }),
  userId: t
    .int()
    .notNull()
    .references((): t.AnySQLiteColumn => users.id),
  // User Analytics
  profileVisitsCount: t.int("profile_visits_count").default(0), // visits on user's profile
  profileSharesCount: t.int("profile_shares_count").default(0), // shares on user's profile
  profileViewsCount: t.int("profile_views_count").default(0), // views on user's profile
  // Post Analytics
  postCount: t.int("post_count").default(0), // total posts on user's profile
  postLikesCount: t.int("post_likes_count").default(0), // likes on user's posts
  postRepostsCount: t.int("post_reposts_count").default(0), // reposts on user's posts
  postSharesCount: t.int("post_shares_count").default(0), // shares on user's posts
  postCommentsCount: t.int("post_comments_count").default(0), // comments on user's posts
  postViewsCount: t.int("post_views_count").default(0), // views on user's posts
  postSavesCount: t.int("post_saves_count").default(0), // saves on user's posts
  // Swipe Analytics
  swipeCount: t.int("swipe_count").default(0), // total swipes on user's profile
  swipeLikesCount: t.int("swipe_likes_count").default(0), // likes on user's swipes
  swipeRepostsCount: t.int("swipe_reposts_count").default(0), // reposts on user's swipes
  swipeSharesCount: t.int("swipe_shares_count").default(0), // shares on user's swipes
  swipeCommentsCount: t.int("swipe_comments_count").default(0), // comments on user's swipes
  swipeViewsCount: t.int("swipe_views_count").default(0), // views on user's swipes
  swipeSavesCount: t.int("swipe_saves_count").default(0), // saves on user's swipes
  // Misc
  awardsCount: t.int("awards_count").default(0), // total awards on user's profile
  earnings: t.int("earnings").default(0), // total earnings on user's profile
  followersCount: t.int("followers_count").default(0), // total followers on user's profile
  followingCount: t.int("following_count").default(0), // total following on user's profile

  ...timestamps,
});
