import { Hono } from "hono";

export default new Hono()
  // public posts
  // get posts feed
  .get("/", (ctx) => {
    return ctx.json({
      message: "get posts feed (for you)",
    });
  })
  // get trending posts
  .get("/popular", (ctx) => {
    return ctx.json({
      message: "get popular / trending posts",
    });
  })
  // get posts from accounts you follow
  .get("/following", (ctx) => {
    return ctx.json({
      message:
        "get popular posts from accounts you follow (choose chronological or algorithmic)",
    });
  })

  // your posts
  // create a new post
  .post("/create", (ctx) => {
    return ctx.json({
      message: "create a new post",
    });
  })
  // get your posts
  .get("/your-posts", (ctx) => {
    return ctx.json({
      message: "get your posts",
    });
  });
