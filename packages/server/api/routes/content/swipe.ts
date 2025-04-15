import { Hono } from "hono";
import { authenticated } from "../../middlewares/auth";

export default new Hono()
  /**
   *PUBLIC ROUTES
   **/
  // Public routes for swipes
  .get("/", async (ctx) => {
    return ctx.text("Get swipes feed");
  })
  .get("/:id", async (ctx) => {
    return ctx.text("Get swipe data by ID");
  })
  .get("/:id/interaction", async (ctx) => {
    return ctx.text("Get swipe interaction data by type");
  })

  /**
   *AUTHENTICATED ROUTES
   **/
  .use(authenticated)
  .get("/user/feed", async (ctx) => {
    return ctx.text("Get user swipes feed");
  })
  .get("/user/profile", async (ctx) => {
    return ctx.text("Get user profile swipes");
  })
  .post("/create", async (ctx) => {
    return ctx.text("Create swipe");
  })
  .delete("/:id", async (ctx) => {
    return ctx.text("Delete swipe");
  })
  .patch("/:id", async (ctx) => {
    return ctx.text("Update swipe");
  })
  .post("/:id/like", async (ctx) => {
    return ctx.text("Like swipe");
  })
  .post("/:id/unlike", async (ctx) => {
    return ctx.text("Unlike swipe");
  })
  .post("/:id/repost", async (ctx) => {
    return ctx.text("Repost swipe");
  })
  .post("/:id/unrepost", async (ctx) => {
    return ctx.text("Unrepost swipe");
  })
  .post("/:id/save", async (ctx) => {
    return ctx.text("Save swipe");
  })
  .post("/:id/unsave", async (ctx) => {
    return ctx.text("Unsave swipe");
  })
  .post("/:id/report", async (ctx) => {
    return ctx.text("Report swipe");
  })
  .post("/:id/pin", async (ctx) => {
    return ctx.text("Pin swipe");
  })
  .post("/:id/unpin", async (ctx) => {
    return ctx.text("Unpin swipe");
  });
