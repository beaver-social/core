import { Hono } from "hono";
import { authenticated } from "../../middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zMedia, zNumberString, zSwipeMedia } from "../../lib/zod/helpers";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../schema/db";
import { desc, eq, inArray, isNull, sql } from "drizzle-orm";
import { swipes, media } from "../../schema/content";
import { follows } from "../../schema/interactions";
import * as helpers from "./helpers";
import * as actions from "./swipe.action";

export default new Hono()
  /**
   *PUBLIC ROUTES
   **/
  // get swipes feed
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      })
    ),
    async (ctx) => {
      const { page, limit } = ctx.req.valid("query");
      const { offset } = helpers.getPaginationParams(page, limit);

      const result = await tryCatch(
        db
          .select()
          .from(swipes)
          .where(isNull(swipes.parentId))
          .orderBy(desc(swipes.likesCount))
          .limit(limit)
          .offset(offset)
          .leftJoin(media, eq(swipes.id, media.contentId))
      );

      if (result.error) {
        return ctx.err(
          result.error?.message || "Failed to get swipes feed",
          400
        );
      }

      return ctx.ok(result.data, "Swipes feed fetched successfully", 200);
    }
  )
  // get swipe data by ID
  .get("/:id", async (ctx) => {
    return ctx.text("Get swipe data by ID");
  })
  // get swipe interaction data by type
  .get("/:id/interactions", async (ctx) => {
    return ctx.text("Get swipe interaction data by type");
  })

  /**
   *AUTHENTICATED ROUTES
   **/
  .use(authenticated)
  // get user's personal swipes feed
  .get(
    "/user/feed",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
        type: z.enum(["following", "for_you"]),
      })
    ),
    async (ctx) => {
      const userId = ctx.get("user").id;
      const { page, limit, type } = ctx.req.valid("query");
      const { offset } = helpers.getPaginationParams(page, limit);
      if (type === "following") {
        // fetch posts from following users
        const following = await db
          .select()
          .from(follows)
          .where(eq(follows.followerId, userId));

        const followingIds = following.map((follow) => follow.followingId);

        const followingPosts = await tryCatch(
          db
            .select()
            .from(swipes)
            .where(
              inArray(swipes.authorId, followingIds) && isNull(swipes.parentId)
            )
            .orderBy(desc(swipes.createdAt))
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(swipes.id, media.contentId))
        );

        if (followingPosts.error) {
          return ctx.err(
            followingPosts.error?.message || "Failed to get posts feed",
            400
          );
        }

        return ctx.ok(
          followingPosts.data,
          "Posts feed fetched successfully",
          200
        );
      } else if (type === "for_you") {
        const result = await tryCatch(
          db
            .select()
            .from(swipes)
            .where(isNull(swipes.parentId))
            .orderBy(sql`RAND()`)
            .limit(limit)
            .offset(offset)
            .leftJoin(media, eq(swipes.id, media.contentId))
        );

        if (result.error) {
          return ctx.err(
            result.error.message || "Failed to get swipes feed",
            400
          );
        }

        return ctx.ok(result.data, "Posts feed fetched successfully", 200);
      }
    }
  )
  // get user's own swipes
  .get("/user/profile", async (ctx) => {
    return ctx.text("Get user's owned swipes");
  })
  // create a new swipe
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        caption: z.string(),
        media: zSwipeMedia,
        parentId: z.number().optional(),
        flags: z.object({
          nsfw: z.boolean(),
          subscriberOnly: z.boolean().optional(),
        }),
      })
    ),
    zValidator(
      "query",
      z.object({
        signature: z.string(),
      })
    ),
    async (ctx) => {
      const body = ctx.req.valid("json");
      const userId = ctx.get("user").id;
      const { signature } = ctx.req.valid("query");

      // preprocess caption
      const processedCaption = helpers.preprocessPostContent(body.caption);
      const processedBody = {
        ...body,
        caption: processedCaption.content,
        hashtags: processedCaption.hashtags,
        mentions: processedCaption.mentions,
      };

      // create swipe
      const resp = await tryCatch(
        actions.createSwipe(processedBody, {
          userId,
          signature,
        })
      );

      if (resp.error) {
        return ctx.err(resp.error.message || "Failed to create swipe", 400);
      }

      return ctx.ok(
        {
          swipeId: resp.data,
        },
        "Post Created Successfully",
        201
      );
    }
  )
  // delete swipe by ID
  .delete("/:id", async (ctx) => {
    return ctx.text("Delete swipe");
  })
  // update swipe by ID
  .patch("/:id", async (ctx) => {
    return ctx.text("Update swipe");
  })
  // like swipe by ID
  .post("/:id/like", async (ctx) => {
    return ctx.text("Like swipe");
  })
  // unlike swipe by ID
  .post("/:id/unlike", async (ctx) => {
    return ctx.text("Unlike swipe");
  })
  // repost swipe by ID
  .post("/:id/repost", async (ctx) => {
    return ctx.text("Repost swipe");
  })
  // unrepost swipe by ID
  .post("/:id/unrepost", async (ctx) => {
    return ctx.text("Unrepost swipe");
  })
  // save swipe by ID
  .post("/:id/save", async (ctx) => {
    return ctx.text("Save swipe");
  })
  // unsave swipe by ID
  .post("/:id/unsave", async (ctx) => {
    return ctx.text("Unsave swipe");
  })
  // report swipe by ID
  .post("/:id/report", async (ctx) => {
    return ctx.text("Report swipe");
  })
  // pin swipe by ID
  .post("/:id/pin", async (ctx) => {
    return ctx.text("Pin swipe");
  })
  // unpin swipe by ID
  .post("/:id/unpin", async (ctx) => {
    return ctx.text("Unpin swipe");
  });
