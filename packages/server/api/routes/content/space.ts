import { Hono } from "hono";

export default new Hono()
  // Viewer actions
  // Get details for a space by id
  .get("/", (ctx) => {
    return ctx.json({
      message: "get basic details for a space by id",
    });
  })
  // Get space members
  .get("/members", (ctx) => {
    return ctx.json({
      message: "get members of this space",
    });
  })
  // Get space moderators
  .get("/moderators", (ctx) => {
    return ctx.json({
      message: "get moderators of this space",
    });
  })
  // Get space rules
  .get("/rules", (ctx) => {
    return ctx.json({
      message: "get rules for this space",
    });
  })
  // Get space events
  .get("/events", (ctx) => {
    return ctx.json({
      message: "get upcoming events in this space",
    });
  })

  // Get relevant posts in a space
  .get("/posts", (ctx) => {
    return ctx.json({
      message:
        "get posts for this space. use query params to filter by type like trending, following etc",
    });
  })
  // Get related spaces
  .get("/related", (ctx) => {
    return ctx.json({
      message: "get related spaces",
    });
  })
  // Search within a space
  .get("/search", (ctx) => {
    return ctx.json({
      message: "search for content (posts, shorts etc) within this space",
    });
  })

  // Member actions
  // Follow/join a space
  .post("/follow", (ctx) => {
    return ctx.json({
      message: "follow/join this space",
    });
  })
  // Unfollow/leave a space
  .post("/unfollow", (ctx) => {
    return ctx.json({
      message: "unfollow/leave this space",
    });
  })
  // Request to join private space
  .post("/request-join", (ctx) => {
    return ctx.json({
      message: "request to join this private space",
    });
  })
  // Report a space
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report this space",
    });
  })
  // Post to a space
  .post("/post", (ctx) => {
    return ctx.json({
      message: "create a new post in this space",
    });
  })
  // Add an event to a space
  .post("/events", (ctx) => {
    return ctx.json({
      message: "create a new event in this space",
    });
  })
  // RSVP to a space event
  .post("/events/:eventId/rsvp", (ctx) => {
    return ctx.json({
      message: "RSVP to an event in this space",
    });
  })
  // Mute a space (hide from feed without unfollowing)
  .post("/mute", (ctx) => {
    return ctx.json({
      message: "mute this space (hide from feed without unfollowing)",
    });
  })
  // Unmute a space
  .post("/unmute", (ctx) => {
    return ctx.json({
      message: "unmute this space",
    });
  })

  // Moderator actions
  // Update space details (name, description, avatar, banner)
  .patch("/", (ctx) => {
    return ctx.json({
      message:
        "update space details including name, description, avatar, banner, tags etc",
    });
  })
  // Update space rules
  .patch("/rules", (ctx) => {
    return ctx.json({
      message: "update space rules",
    });
  })
  // Pin a post to space
  .post("/pin-post/:postId", (ctx) => {
    return ctx.json({
      message: "pin a post to this space",
    });
  })
  // Unpin a post from space
  .post("/unpin-post/:postId", (ctx) => {
    return ctx.json({
      message: "unpin a post from this space",
    });
  })
  // Add moderator
  .post("/moderators", (ctx) => {
    return ctx.json({
      message: "add a new moderator to this space",
    });
  })
  // Remove moderator
  .delete("/moderators/:userId", (ctx) => {
    return ctx.json({
      message: "remove a moderator from this space",
    });
  })
  // Moderate post (hide/unhide)
  .patch("/posts/:postId/moderate", (ctx) => {
    return ctx.json({
      message: "moderate (hide/unhide) a post in this space",
    });
  })
  // Ban user from space
  .post("/ban/:userId", (ctx) => {
    return ctx.json({
      message: "ban a user from this space",
    });
  })
  // Unban user from space
  .delete("/ban/:userId", (ctx) => {
    return ctx.json({
      message: "unban a user from this space",
    });
  })
  // Get banned users (for moderators)
  .get("/banned", (ctx) => {
    return ctx.json({
      message: "get list of banned users in this space",
    });
  })
  // Invite users to space
  .post("/invite", (ctx) => {
    return ctx.json({
      message: "invite users to this space",
    });
  })
  // Approve join request
  .post("/requests/:requestId/approve", (ctx) => {
    return ctx.json({
      message: "approve request to join this space",
    });
  })
  // Reject join request
  .post("/requests/:requestId/reject", (ctx) => {
    return ctx.json({
      message: "reject request to join this space",
    });
  })
  // Get join requests
  .get("/requests", (ctx) => {
    return ctx.json({
      message: "get pending join requests for this space",
    });
  })
  // Update space settings (privacy, post approval, etc)
  .patch("/settings", (ctx) => {
    return ctx.json({
      message: "update space settings",
    });
  })
  // Get space analytics
  .get("/analytics", (ctx) => {
    return ctx.json({
      message: "get analytics for this space (visible to moderators)",
    });
  })

  // Admin/Owner actions
  // Delete a space
  .delete("/", (ctx) => {
    return ctx.json({
      message: "delete a space",
    });
  })
  // Transfer ownership
  .post("/transfer-ownership/:userId", (ctx) => {
    return ctx.json({
      message: "transfer space ownership to another user",
    });
  });
