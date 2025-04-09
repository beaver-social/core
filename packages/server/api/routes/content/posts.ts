import { Hono } from "hono";

export default new Hono()
  // public posts
  // get posts feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get posts feed (for you) - curated topics for you based on your following and interests. use query params to filter by type like trending, following etc",
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
