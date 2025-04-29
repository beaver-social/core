import { Hono } from "hono";

export default new Hono()
  // public topics
  // get topics feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get topics feed (curated topics for you). use query params to filter by type like trending, following etc",
    });
  })
  // featured topics (curated by the platform)
  .get("/featured", (ctx) => {
    return ctx.json({
      message: "get editorial topics",
    });
  })

  // your topics
  // create a new topic
  .post("/create", (ctx) => {
    return ctx.json({
      message: "create a new topic",
    });
  })
  // get your topics
  .get("/your-topics", (ctx) => {
    return ctx.json({
      message: "get your topics",
    });
  });
