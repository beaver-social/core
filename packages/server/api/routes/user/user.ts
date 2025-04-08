import { Hono } from "hono";

export default new Hono()
  // get user details by username
  .get("/:username", (ctx) => {
    return ctx.json({
      message: "get user details by username",
    });
  })

  // get current user details
  .get("/", (ctx) => {
    return ctx.json({
      message: "get current user details",
    });
  })

  // update current user details
  .patch("/", (ctx) => {
    return ctx.json({
      message: "update current user details",
    });
  });
