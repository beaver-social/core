import { Hono } from "hono";

export default new Hono()
  // public shorts
  // get shorts feed
  .get("/", (ctx) => {
    return ctx.json({
      message: "get shorts feed (for you)",
    });
  })
  // get trending shorts
  .get("/popular", (ctx) => {
    return ctx.json({
      message: "get popular / trending shorts",
    });
  })
  // get shorts from accounts you follow
  .get("/following", (ctx) => {
    return ctx.json({
      message:
        "get popular shorts from accounts you follow (choose chronological or algorithmic)",
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
