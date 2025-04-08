import { Hono } from "hono";

export default new Hono()
  // public shorts
  // get shorts feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get shorts feed (for you) - curated topics for you based on your following and interests. use query params to filter by type like trending, following etc",
    });
  })

  // your shorts
  // get your shorts
  .post("/create", (ctx) => {
    return ctx.json({
      message: "create a new short",
    });
  })
  // get your shorts
  .get("/your-shorts", (ctx) => {
    return ctx.json({
      message: "get your shorts",
    });
  });
