import { Hono } from "hono";

export default new Hono()
  // search across the platform, use query to filter by user, content, shorts or all.
  .get("/", (ctx) => {
    return ctx.json({
      message: "search service for users, content or shorts",
    });
  });
