import { Hono } from "hono";
import search from "./search";

export default new Hono()
  .route("/search", search)

  .get("/", (ctx) => {
    return ctx.json({
      message: "misc service for users, content or shorts",
    });
  });
