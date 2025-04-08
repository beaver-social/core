import { Hono } from "hono";

export default new Hono()
  // public spaces
  // get spaces feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get spaces feed (curated topics for you). use query params to filter by type like trending, following etc",
    });
  })
  // featured spaces (curated by the platform)
  .get("/featured", (ctx) => {
    return ctx.json({
      message: "get editorial spaces",
    });
  })

  // your spaces
  // create a new space
  .post("/create", (ctx) => {
    return ctx.json({
      message: "create a new space",
    });
  })
  // get your spaces
  .get("/your-spaces", (ctx) => {
    return ctx.json({
      message: "get your spaces",
    });
  });
