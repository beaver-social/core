import { Hono } from "hono";
import search from "./search";
import awards from "./awards";
import upload from "./upload";

export default new Hono()
  .route("/search", search)
  .route("/upload", upload)
  .route("/awards", awards)

  .get("/", (ctx) => {
    return ctx.json({
      message: "misc service for users, content or shorts",
    });
  });
