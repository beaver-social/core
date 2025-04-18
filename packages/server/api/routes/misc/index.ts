import { Hono } from "hono";
import search from "./search";
import awards from "./awards";

export default new Hono()
  .route("/search", search)
  .route("/awards", awards)

  .get("/", (ctx) => {
    return ctx.json({
      message: "misc service for users, content or shorts",
    });
  });
