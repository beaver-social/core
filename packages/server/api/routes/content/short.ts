import { Hono } from "hono";

export default new Hono()
  // Public short actions
  // Get details for a short by id
  .get("/", (ctx) => {
    return ctx.json({
      message: "get details for a short by id",
    });
  })
  // View a short
  .get("/view", (ctx) => {
    return ctx.json({
      message: "view a short",
    });
  })
  // Like a short
  .post("/like", (ctx) => {
    return ctx.json({
      message: "like a short",
    });
  })
  // Unlike a short
  .post("/unlike", (ctx) => {
    return ctx.json({
      message: "unlike a short",
    });
  })
  // Comment on a short
  .post("/comment", (ctx) => {
    return ctx.json({
      message: "comment on a short",
    });
  })
  // Repost/share a short
  .post("/share", (ctx) => {
    return ctx.json({
      message: "share a short on your profile",
    });
  })
  // Unrepost/unshare a short
  .post("/unshare", (ctx) => {
    return ctx.json({
      message: "unshare a short from your profile",
    });
  })
  // Bookmark a short
  .post("/bookmark", (ctx) => {
    return ctx.json({
      message: "bookmark a short",
    });
  })
  // Remove short from bookmarks
  .post("/unbookmark", (ctx) => {
    return ctx.json({
      message: "remove short from bookmarks",
    });
  })
  // Report a short
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report a short",
    });
  })
  // React with emoji to short (future feature)
  .post("/reactions", (ctx) => {
    return ctx.json({
      message: "react with emoji",
    });
  })
  // Get action counts for a short
  .get("/action-count", (ctx) => {
    return ctx.json({
      message:
        "get data for short like count, repost count, comments count, view count",
    });
  })
  // Get comments on a short
  .get("/comments", (ctx) => {
    return ctx.json({
      message: "get comments on a short",
    });
  })
  // Get reactions to a short (future feature)
  .get("/reactions", (ctx) => {
    return ctx.json({
      message: "get reactions to a short",
    });
  })

  // Your short actions
  // Delete a short
  .delete("/", (ctx) => {
    return ctx.json({
      message: "delete a short",
    });
  })
  // Update a short
  .patch("/", (ctx) => {
    return ctx.json({
      message: "update a short",
    });
  })
  // Pin short to profile
  .post("/pin", (ctx) => {
    return ctx.json({
      message: "pin your short to profile",
    });
  })
  // Unpin short from profile
  .post("/unpin", (ctx) => {
    return ctx.json({
      message: "unpin your short from profile",
    });
  });
