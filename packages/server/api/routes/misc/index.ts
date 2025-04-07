import { Hono } from "hono";

export default new Hono()
  .get("/search/all", (ctx) => {
    return ctx.json({
      message: "search service",
    });
  })

  .get("/search/users", (ctx) => {
    return ctx.json({
      message: "search users service",
    });
  })

  .get("/search/posts", (ctx) => {
    return ctx.json({
      message: "search posts service",
    });
  });
