import { Hono } from "hono";

/**
 * User Content Routes
 * Base path: /user/content
 */
export default new Hono()
  .get("/posts/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      posts: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's posts",
    });
  })
  .get("/replies/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      replies: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's replies/comments",
    });
  })
  .get("/media/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      media: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's media posts",
    });
  })
  .get("/likes/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      likes: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get posts liked by user",
    });
  })
  .get("/activity/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      activities: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's activity",
    });
  })
  .get("/shorts/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      shorts: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's short videos",
    });
  })
  .get("/bookmarks", (ctx) => {
    return ctx.json({
      bookmarks: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's bookmarked posts",
    });
  });
