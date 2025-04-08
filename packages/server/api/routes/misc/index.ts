import { Hono } from "hono";

export default new Hono().get("/search", (ctx) => {
  return ctx.json({
    message: "search service",
  });
});
