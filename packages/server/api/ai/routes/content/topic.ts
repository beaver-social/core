import { Hono } from "hono";
import { respond } from "../../../lib/utils/respond";

export default new Hono()
  // Viewer actions
  // Get details for a topic by id
  .get("/", (ctx) => {
    return respond.ok(ctx, {}, "get basic details for a topic by id", 200);
  })

  // Get relevant posts in a topic
  .get("/posts", (ctx) => {
    return respond.ok(
      ctx,
      {},
      "get posts for this topic. use query params to filter by type like trending, following etc",
      200
    );
  })
  // Get related topics
  .get("/related", (ctx) => {
    return respond.ok(ctx, {}, "get related topics", 200);
  })
  // Search within a topic
  .get("/search", (ctx) => {
    return respond.ok(
      ctx,
      {},
      "search for content (posts, shorts etc) within this topic",
      200
    );
  })

  // Member actions
  // Follow/join a topic
  .post("/follow", (ctx) => {
    return respond.ok(ctx, {}, "follow/join this topic", 200);
  })
  // Unfollow/leave a topic
  .post("/unfollow", (ctx) => {
    return respond.ok(ctx, {}, "unfollow/leave this topic", 200);
  })
  // Report a topic
  .post("/report", (ctx) => {
    return respond.ok(ctx, {}, "report this topic", 200);
  })
  // Mute a topic (hide from feed without unfollowing)
  .post("/mute", (ctx) => {
    return respond.ok(
      ctx,
      {},
      "mute this topic (hide from feed without unfollowing)",
      200
    );
  })
  // Unmute a topic
  .post("/unmute", (ctx) => {
    return respond.ok(ctx, {}, "unmute this topic", 200);
  })

  // Update topic details (name, description, avatar, banner)
  .patch("/", (ctx) => {
    return respond.ok(
      ctx,
      {},
      "update topic details including name, description, avatar, banner, tags etc",
      200
    );
  })
  // Pin a post to topic
  .post("/pin-post/:postId", (ctx) => {
    return respond.ok(ctx, {}, "pin a post to this topic", 200);
  })
  // Unpin a post from topic
  .post("/unpin-post/:postId", (ctx) => {
    return respond.ok(ctx, {}, "unpin a post from this topic", 200);
  })
  // Update topic settings (privacy, post approval, etc)
  .patch("/settings", (ctx) => {
    return respond.ok(ctx, {}, "update topic settings", 200);
  })
  // Get topic analytics
  .get("/analytics", (ctx) => {
    return respond.ok(
      ctx,
      {},
      "get analytics for this topic (visible to moderators)",
      200
    );
  })

  // Admin/Owner actions
  // Delete a topic
  .delete("/", (ctx) => {
    return respond.ok(ctx, {}, "delete a topic", 200);
  });
