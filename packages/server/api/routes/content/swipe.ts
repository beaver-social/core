import { Hono } from "hono";

export default new Hono()
  // Public swipe actions
  // Get swipes feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get shorts feed (for you) - curated topics for you based on your following and interests. use query params to filter by type like trending, following etc",
    });
  })
  // get your swipes
  .get("/your", (ctx) => {
    return ctx.json({
      message: "get your swipes",
    });
  })
  // get details for a swipe by id
  .get("/:id", (ctx) => {
    return ctx.json({
      message: "get details for a swipe by id",
    });
  })
  // View a swipe
  .get("/view", (ctx) => {
    return ctx.json({
      message: "view a swipe",
    });
  })
  // Like a swipe
  .post("/like", (ctx) => {
    return ctx.json({
      message: "like a swipe",
    });
  })
  // Unlike a swipe
  .post("/unlike", (ctx) => {
    return ctx.json({
      message: "unlike a swipe",
    });
  })
  // Comment on a swipe
  .post("/comment", (ctx) => {
    return ctx.json({
      message: "comment on a swipe",
    });
  })
  // Repost/share a swipe
  .post("/share", (ctx) => {
    return ctx.json({
      message: "share a swipe on your profile",
    });
  })
  // Unrepost/unshare a swipe
  .post("/unshare", (ctx) => {
    return ctx.json({
      message: "unshare a swipe from your profile",
    });
  })
  // Bookmark a swipe
  .post("/bookmark", (ctx) => {
    return ctx.json({
      message: "bookmark a swipe",
    });
  })
  // Remove swipe from bookmarks
  .post("/unbookmark", (ctx) => {
    return ctx.json({
      message: "remove swipe from bookmarks",
    });
  })
  // Report a swipe
  .post("/report", (ctx) => {
    return ctx.json({
      message: "report a swipe",
    });
  })
  // React with emoji to swipe (future feature)
  .post("/reactions", (ctx) => {
    return ctx.json({
      message: "react with emoji",
    });
  })
  // Get action counts for a swipe
  .get("/action-count", (ctx) => {
    return ctx.json({
      message:
        "get data for swipe like count, repost count, comments count, view count",
    });
  })
  // Get comments on a swipe
  .get("/comments", (ctx) => {
    return ctx.json({
      message: "get comments on a swipe",
    });
  })
  // Get reactions to a swipe (future feature)
  .get("/reactions", (ctx) => {
    return ctx.json({
      message: "get reactions to a swipe",
    });
  })

  // Your swipe actions
  // create a new swipe
  .post("/create", (ctx) => {
    return ctx.json({
      message: "create a new short",
    });
  })
  // Delete a swipe
  .delete("/", (ctx) => {
    return ctx.json({
      message: "delete a swipe",
    });
  })
  // Update a swipe
  .patch("/", (ctx) => {
    return ctx.json({
      message: "update a swipe",
    });
  })
  // Pin swipe to profile
  .post("/pin", (ctx) => {
    return ctx.json({
      message: "pin your swipe to profile",
    });
  })
  // Unpin swipe from profile
  .post("/unpin", (ctx) => {
    return ctx.json({
      message: "unpin your swipe from profile",
    });
  });
