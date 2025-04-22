import { Hono } from "hono";

/**
 * User Relationships Routes
 * Base path: /user/relationships
 */
export default new Hono()
  .post("/follow/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      follower: { username: "currentUser" },
      following: { username },
      message: "Follow a user",
    });
  })
  .post("/unfollow/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      message: "Unfollow a user",
    });
  })
  .get("/followers/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      followers: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's followers",
    });
  })
  .get("/following/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      following: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get users being followed",
    });
  })
  .post("/block/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      message: "Block a user",
    });
  })
  .post("/unblock/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      message: "Unblock a user",
    });
  })
  .post("/mute/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      message: "Mute a user",
    });
  })
  .post("/unmute/:username", (ctx) => {
    const username = ctx.req.param("username");
    return ctx.json({
      success: true,
      message: "Unmute a user",
    });
  })
  .get("/blocked", (ctx) => {
    return ctx.json({
      users: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get blocked users",
    });
  })
  .get("/muted", (ctx) => {
    return ctx.json({
      users: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get muted users",
    });
  });
