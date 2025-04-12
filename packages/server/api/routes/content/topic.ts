import { Hono } from "hono";

export default new Hono()
  // Viewer actions
  // Get details for a topic by id
  .get("/", (ctx) => {
    return ctx.json({
      message: "get basic details for a topic by id",
    });
  })
  // Get topic members
  .get("/members", (ctx) => {
    return ctx.json({
      message: "get members of this topic",
    });
  })
  // Get topic moderators
  .get("/moderators", (ctx) => {
    return ctx.json({
      message: "get moderators of this topic",
    });
  })
  // Get topic rules
  .get("/rules", (ctx) => {
    return ctx.json({
      message: "get rules for this topic",
    });
  })
  // Get topic events
  .get("/events", (ctx) => {
    return ctx.json({
      message: "get upcoming events in this topic",
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
  // Request to join private topic
  .post("/request-join", (ctx) => {
    return ctx.json({
      message: "request to join this private topic",
    });
  })
  // Report a topic
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report this topic",
    });
  })
  // Post to a topic
  .post("/post", (ctx) => {
    return ctx.json({
      message: "create a new post in this topic",
    });
  })
  // Add an event to a topic
  .post("/events", (ctx) => {
    return ctx.json({
      message: "create a new event in this topic",
    });
  })
  // RSVP to a topic event
  .post("/events/:eventId/rsvp", (ctx) => {
    return ctx.json({
      message: "RSVP to an event in this topic",
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

  // Moderator actions
  // Update topic details (name, description, avatar, banner)
  .patch("/", (ctx) => {
    return ctx.json({
      message:
        "update topic details including name, description, avatar, banner, tags etc",
    });
  })
  // Update topic rules
  .patch("/rules", (ctx) => {
    return ctx.json({
      message: "update topic rules",
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
  // Add moderator
  .post("/moderators", (ctx) => {
    return ctx.json({
      message: "add a new moderator to this topic",
    });
  })
  // Remove moderator
  .delete("/moderators/:userId", (ctx) => {
    return ctx.json({
      message: "remove a moderator from this topic",
    });
  })
  // Moderate post (hide/unhide)
  .patch("/posts/:postId/moderate", (ctx) => {
    return ctx.json({
      message: "moderate (hide/unhide) a post in this topic",
    });
  })
  // Ban user from topic
  .post("/ban/:userId", (ctx) => {
    return ctx.json({
      message: "ban a user from this topic",
    });
  })
  // Unban user from topic
  .delete("/ban/:userId", (ctx) => {
    return ctx.json({
      message: "unban a user from this topic",
    });
  })
  // Get banned users (for moderators)
  .get("/banned", (ctx) => {
    return ctx.json({
      message: "get list of banned users in this topic",
    });
  })
  // Invite users to topic
  .post("/invite", (ctx) => {
    return ctx.json({
      message: "invite users to this topic",
    });
  })
  // Approve join request
  .post("/requests/:requestId/approve", (ctx) => {
    return ctx.json({
      message: "approve request to join this topic",
    });
  })
  // Reject join request
  .post("/requests/:requestId/reject", (ctx) => {
    return ctx.json({
      message: "reject request to join this topic",
    });
  })
  // Get join requests
  .get("/requests", (ctx) => {
    return ctx.json({
      message: "get pending join requests for this topic",
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
  })
  // Transfer ownership
  .post("/transfer-ownership/:userId", (ctx) => {
    return ctx.json({
      message: "transfer topic ownership to another user",
    });
  });
