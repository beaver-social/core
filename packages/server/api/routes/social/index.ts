import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import authenticated from "../../middlewares/authenticated";
import { respond } from "../../lib/utils/respond";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../lib/db";
import { count, eq, and, inArray, desc } from "drizzle-orm";
import { zNumberString, zSuiSignature } from "../../lib/zod/helpers";
import { followUser, unfollowUser } from "./actions";

const { users, follows } = db.schema;

export default new Hono()

  // Follow a user
  .post(
    "/follow/:id",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { id: followingId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("json");
      const user = ctx.var.user;

      const { error: followError } = await tryCatch(
        followUser({ followingId, userId: user.id }, signature)
      );

      if (followError) {
        return respond.err(
          ctx,
          "Failed to follow user: " + followError.message,
          400
        );
      }

      return respond.ok(
        ctx,
        { following: true },
        "Followed user successfully",
        200
      );
    }
  )

  // Unfollow a user
  .delete(
    "/follow/:id",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "json",
      z.object({
        signature: zSuiSignature(),
      })
    ),
    async (ctx) => {
      const { id: followingId } = ctx.req.valid("param");
      const { signature } = ctx.req.valid("json");
      const user = ctx.var.user;

      const { error: unfollowError } = await tryCatch(
        unfollowUser({ followingId, userId: user.id }, signature)
      );

      if (unfollowError) {
        return respond.err(
          ctx,
          "Failed to unfollow user: " + unfollowError.message,
          400
        );
      }

      return respond.ok(
        ctx,
        { following: false },
        "Unfollowed user successfully",
        200
      );
    }
  )

  // Check if current user follows another user
  .get(
    "/is-following/:id",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");
      const currentUser = ctx.var.user;

      const followResponse = await tryCatch(
        db
          .select({ id: follows.id })
          .from(follows)
          .where(
            and(
              eq(follows.followerId, currentUser.id),
              eq(follows.followingId, userId)
            )
          )
          .limit(1)
      );

      if (followResponse.error) {
        ctx.log(followResponse.error);
        return respond.err(ctx, "Failed to check follow status", 500);
      }

      const isFollowing = followResponse.data.length > 0;

      return respond.ok(
        ctx,
        { following: isFollowing },
        "Follow status retrieved",
        200
      );
    }
  )

  // Get follow counts for a user
  .get(
    "/counts/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");

      const [followerCountResponse, followingCountResponse] = await Promise.all(
        [
          tryCatch(
            db
              .select({ count: count() })
              .from(follows)
              .where(eq(follows.followingId, userId))
          ),
          tryCatch(
            db
              .select({ count: count() })
              .from(follows)
              .where(eq(follows.followerId, userId))
          ),
        ]
      );

      if (followerCountResponse.error) {
        ctx.log(followerCountResponse.error);
        return respond.err(ctx, "Failed to fetch follower count", 500);
      }

      if (followingCountResponse.error) {
        ctx.log(followingCountResponse.error);
        return respond.err(ctx, "Failed to fetch following count", 500);
      }

      const [followerCount] = followerCountResponse.data;
      const [followingCount] = followingCountResponse.data;

      return respond.ok(
        ctx,
        {
          followers: followerCount.count,
          following: followingCount.count,
        },
        "Follow counts retrieved successfully",
        200
      );
    }
  )

  // Get detailed followers (with user info) - paginated
  .get(
    "/followers/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "query",
      z.object({
        page: zNumberString()
          .default("1")
          .transform((v) => v - 1),
        perPage: zNumberString()
          .transform((v) => Math.min(v, 32))
          .default("8"),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");
      const { page, perPage } = ctx.req.valid("query");

      const followersResponse = await tryCatch(
        db
          .select()
          .from(follows)
          .where(eq(follows.followingId, userId))
          .limit(perPage)
          .offset(page * perPage)
      );

      if (followersResponse.error) {
        ctx.log(followersResponse.error);
        return respond.err(ctx, "Failed to fetch followers", 500);
      }

      const followers = followersResponse.data.map(
        (follow) => follow.followerId
      );

      return respond.ok(
        ctx,
        {
          followers,
          hasMore: followers.length === perPage,
          page: page + 1,
          perPage,
        },
        "Followers retrieved successfully",
        200
      );
    }
  )

  // Get detailed following (with user info) - paginated
  .get(
    "/following/:id",
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    zValidator(
      "query",
      z.object({
        page: zNumberString()
          .default("1")
          .transform((v) => v - 1),
        perPage: zNumberString()
          .transform((v) => Math.min(v, 32))
          .default("8"),
      })
    ),
    async (ctx) => {
      const { id: userId } = ctx.req.valid("param");
      const { page, perPage } = ctx.req.valid("query");

      const followingResponse = await tryCatch(
        db
          .select()
          .from(follows)
          .where(eq(follows.followerId, userId))
          .limit(perPage)
          .offset(page * perPage)
      );

      if (followingResponse.error) {
        ctx.log(followingResponse.error);
        return respond.err(ctx, "Failed to fetch following", 500);
      }

      const following = followingResponse.data.map(
        (follow) => follow.followingId
      );

      return respond.ok(
        ctx,
        {
          following,
          hasMore: following.length === perPage,
          page: page + 1,
          perPage,
        },
        "Following retrieved successfully",
        200
      );
    }
  )

  // Bulk check follow status for multiple users
  .post(
    "/following/bulk-check",
    authenticated,
    zValidator(
      "json",
      z.object({
        userIds: z.array(z.number()).max(100), // Limit to prevent abuse
      })
    ),
    async (ctx) => {
      const { userIds } = ctx.req.valid("json");
      const currentUser = ctx.var.user;

      if (userIds.length === 0) {
        return respond.ok(ctx, { followStatus: {} }, "Empty user list", 200);
      }

      const followResponse = await tryCatch(
        db
          .select({
            followingId: follows.followingId,
          })
          .from(follows)
          .where(
            and(
              eq(follows.followerId, currentUser.id),
              inArray(follows.followingId, userIds)
            )
          )
      );

      if (followResponse.error) {
        ctx.log(followResponse.error);
        return respond.err(ctx, "Failed to check follow status", 500);
      }

      const followedIds = new Set(
        followResponse.data.map((follow) => follow.followingId)
      );

      const followStatus = userIds.reduce((acc, userId) => {
        acc[userId] = followedIds.has(userId);
        return acc;
      }, {} as Record<number, boolean>);

      return respond.ok(
        ctx,
        { followStatus },
        "Bulk follow status retrieved",
        200
      );
    }
  )

  // Get recommended users for the current user
  .get(
    "/recommendations",
    authenticated,
    zValidator(
      "query",
      z.object({
        limit: zNumberString()
          .transform((v) => Math.min(v, 50))
          .default("10"),
        excludeFollowing: z
          .string()
          .transform((v) => v === "true")
          .default("true"),
      })
    ),
    async (ctx) => {
      const { limit, excludeFollowing } = ctx.req.valid("query");
      const currentUser = ctx.var.user;

      // Get users the current user is following if we need to exclude them
      let followingIds: number[] = [];
      if (excludeFollowing) {
        const followingResponse = await tryCatch(
          db
            .select({ followingId: follows.followingId })
            .from(follows)
            .where(eq(follows.followerId, currentUser.id))
        );

        if (followingResponse.error) {
          ctx.log(followingResponse.error);
          return respond.err(ctx, "Failed to fetch following list", 500);
        }

        followingIds = followingResponse.data.map((f) => f.followingId);
      }

      // Exclude current user and their following
      const excludeIds = [currentUser.id, ...followingIds];

      // Get popular users (users with most followers) as recommendations
      // This is a simple recommendation algorithm - you can enhance it
      let popularUsersQuery = db
        .select({
          userId: follows.followingId,
          followerCount: count(),
        })
        .from(follows)
        .groupBy(follows.followingId)
        .orderBy(desc(count()))
        .limit(limit * 3); // Get more to filter out excluded users

      const recommendationsResponse = await tryCatch(popularUsersQuery);

      if (recommendationsResponse.error) {
        ctx.log(recommendationsResponse.error);
        return respond.err(ctx, "Failed to fetch recommendations", 500);
      }

      // Filter out excluded users and get user details for the recommendations
      const filteredRecommendations = recommendationsResponse.data
        .filter((rec) => !excludeIds.includes(rec.userId))
        .slice(0, limit);

      const userIds = filteredRecommendations.map((rec) => rec.userId);

      if (userIds.length === 0) {
        return respond.ok(
          ctx,
          {
            recommendations: [],
            excludedCount: followingIds.length,
          },
          "No recommendations found",
          200
        );
      }

      const usersResponse = await tryCatch(
        db.select().from(users).where(inArray(users.id, userIds))
      );

      if (usersResponse.error) {
        ctx.log(usersResponse.error);
        return respond.err(ctx, "Failed to fetch user details", 500);
      }

      return respond.ok(
        ctx,
        {
          recommendations: usersResponse.data,
          excludedCount: followingIds.length,
        },
        "Recommendations retrieved successfully",
        200
      );
    }
  )

  // Get mutual followers between current user and another user
  .get(
    "/mutual/:id",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { id: targetUserId } = ctx.req.valid("param");
      const currentUser = ctx.var.user;

      // Get users that current user follows
      const myFollowingResponse = await tryCatch(
        db
          .select({ followingId: follows.followingId })
          .from(follows)
          .where(eq(follows.followerId, currentUser.id))
      );

      if (myFollowingResponse.error) {
        ctx.log(myFollowingResponse.error);
        return respond.err(ctx, "Failed to fetch current user following", 500);
      }

      // Get followers of the target user
      const theirFollowersResponse = await tryCatch(
        db
          .select({ followerId: follows.followerId })
          .from(follows)
          .where(eq(follows.followingId, targetUserId))
      );

      if (theirFollowersResponse.error) {
        ctx.log(theirFollowersResponse.error);
        return respond.err(ctx, "Failed to fetch target user followers", 500);
      }

      // Find mutual connections (users that current user follows AND follow the target user)
      const myFollowingIds = new Set(
        myFollowingResponse.data.map((f) => f.followingId)
      );
      const mutualFollowerIds = theirFollowersResponse.data
        .filter((f) => myFollowingIds.has(f.followerId))
        .map((f) => f.followerId);

      return respond.ok(
        ctx,
        {
          mutualFollowerIds,
          count: mutualFollowerIds.length,
        },
        "Mutual followers retrieved successfully",
        200
      );
    }
  );
