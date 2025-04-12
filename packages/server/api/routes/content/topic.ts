import { Hono } from "hono";

export default new Hono()
  // Viewer actions
  // Get details for a topic by id
  .get("/", (ctx) => {
    return ctx.json({
      message: "get basic details for a topic by id",
    });
  })

  // Get relevant posts in a topic
  .get("/posts", (ctx) => {
    return ctx.json({
      message:
        "get posts for this topic. use query params to filter by type like trending, following etc",
    });
  })
  // Get related topics
  .get("/related", (ctx) => {
    return ctx.json({
      message: "get related topics",
    });
  })
  // Search within a topic
  .get("/search", (ctx) => {
    return ctx.json({
      message: "search for content (posts, shorts etc) within this topic",
    });
  })

  // Member actions
  // Follow/join a topic
  .post("/follow", (ctx) => {
    return ctx.json({
      message: "follow/join this topic",
    });
  })
  // Unfollow/leave a topic
  .post("/unfollow", (ctx) => {
    return ctx.json({
      message: "unfollow/leave this topic",
    });
  })
  // Report a topic
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report this topic",
    });
  })
  // Mute a topic (hide from feed without unfollowing)
  .post("/mute", (ctx) => {
    return ctx.json({
      message: "mute this topic (hide from feed without unfollowing)",
    });
  })
  // Unmute a topic
  .post("/unmute", (ctx) => {
    return ctx.json({
      message: "unmute this topic",
    });
  })

  // Update topic details (name, description, avatar, banner)
  .patch("/", (ctx) => {
    return ctx.json({
      message:
        "update topic details including name, description, avatar, banner, tags etc",
    });
  })
  // Pin a post to topic
  .post("/pin-post/:postId", (ctx) => {
    return ctx.json({
      message: "pin a post to this topic",
    });
  })
  // Unpin a post from topic
  .post("/unpin-post/:postId", (ctx) => {
    return ctx.json({
      message: "unpin a post from this topic",
    });
  })
  // Update topic settings (privacy, post approval, etc)
  .patch("/settings", (ctx) => {
    return ctx.json({
      message: "update topic settings",
    });
  })
  // Get topic analytics
  .get("/analytics", (ctx) => {
    return ctx.json({
      message: "get analytics for this topic (visible to moderators)",
    });
  })

  // Admin/Owner actions
  // Delete a topic
  .delete("/", (ctx) => {
    return ctx.json({
      message: "delete a topic",
    });
  });
