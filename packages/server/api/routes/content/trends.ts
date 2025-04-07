import { Hono } from "hono";

export default new Hono()
  .get("/", (ctx) => {
    return ctx.json({
      message: "get all trends",
    });
  })
  .get("/topics", (ctx) => {
    return ctx.json({
      message: "get trending topics",
    });
  })
  .get("/posts", (ctx) => {
    return ctx.json({
      message: "get trending posts",
    });
  })
  .get("/hashtags", (ctx) => {
    return ctx.json({
      message: "get trending hashtags",
    });
  })
  .get("/shorts", (ctx) => {
    return ctx.json({
      message: "get trending shorts",
    });
  })
  .get("/for-you", (ctx) => {
    return ctx.json({
      message: "get personalized trends",
    });
  })
  .get("/categories", (ctx) => {
    return ctx.json({
      message: "get trend categories",
    });
  });
