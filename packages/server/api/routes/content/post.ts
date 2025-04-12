import { Hono } from "hono";

export default new Hono()
  // Public post actions
  // Get details for a post
  .get("/", (ctx) => {
    return ctx.json({
      message: "get details for a post by id",
    });
  })
  // View a post
  .get("/view", (ctx) => {
    return ctx.json({
      message: "view a post",
    });
  })
  // Like a post
  .post("/like", (ctx) => {
    return ctx.json({
      message: "like a post",
    });
  })
  // Unlike a post
  .post("/unlike", (ctx) => {
    return ctx.json({
      message: "unlike a post",
    });
  })
  // Comment on a post
  .post("/comment", (ctx) => {
    return ctx.json({
      message: "comment on a post",
    });
  })
  // Repost/share a post
  .post("/share", (ctx) => {
    return ctx.json({
      message: "share a post on your profile",
    });
  })
  // Unrepost/unshare a post
  .post("/unshare", (ctx) => {
    return ctx.json({
      message: "unshare a post from your profile",
    });
  })
  // Bookmark a post
  .post("/bookmark", (ctx) => {
    return ctx.json({
      message: "bookmark a post",
    });
  })
  // Remove post from bookmarks
  .post("/unbookmark", (ctx) => {
    return ctx.json({
      message: "remove post from bookmarks",
    });
  })
  // Report a post
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report a post",
    });
  })
  // React with emoji to post (future feature)
  .post("/reactions", (ctx) => {
    return ctx.json({
      message: "react with emoji",
    });
  })
  // Get action counts for a post
  .get("/action-count", (ctx) => {
    return ctx.json({
      message:
        "get data for post like count, repost count, comments count, view count",
    });
  })
  // Get comments on a post
  .get("/comments", (ctx) => {
    return ctx.json({
      message: "get comments on a post",
    });
  })
  // Get reactions to a post (future feature)
  .get("/reactions", (ctx) => {
    return ctx.json({
      message: "get reactions to a post",
    });
  })

  // Your post actions
  // Delete a post
  .delete("/", (ctx) => {
    return ctx.json({
      message: "delete a post",
    });
  })
  // Update a post
  .patch("/", (ctx) => {
    return ctx.json({
      message: "update a post",
    });
  })
  // Pin post to profile
  .post("/pin", (ctx) => {
    return ctx.json({
      message: "pin your post to profile",
    });
  })
  // Unpin post from profile
  .post("/unpin", (ctx) => {
    return ctx.json({
      message: "unpin your post from profile",
    });
  });
