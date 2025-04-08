import { Hono } from "hono";
import content from "./content";
import audience from "./audience";

export default new Hono()
  .route("/content", content)
  .route("/audience", audience)

  // get user analytics
  .get("/", (ctx) => {
    return ctx.json({
      message: "get user analytics",
    });
  });
