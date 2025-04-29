import { Hono } from "hono";

/**
 * User Profile Routes
 * Base path: /user/profile
 */
export default new Hono()
  // Collections routes
  .get("/collections", (ctx) => {
    return ctx.json({
      collections: [],
      message: "Get user's collections",
    });
  })
  .post("/collections", (ctx) => {
    return ctx.json({
      collection: {},
      message: "Create a new collection",
    });
  })
  .get("/collections/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      collection: { id },
      posts: [],
      message: "Get a specific collection",
    });
  })
  .patch("/collections/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      collection: { id },
      message: "Update a collection",
    });
  })
  .delete("/collections/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      success: true,
      message: "Delete a collection",
    });
  })
  .get("/collections/:id/posts", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      posts: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get posts in collection",
    });
  })
  .post("/collections/:id/posts", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      success: true,
      message: "Add post to collection",
    });
  })
  .delete("/collections/:id/posts/:postId", (ctx) => {
    const id = ctx.req.param("id");
    const postId = ctx.req.param("postId");
    return ctx.json({
      success: true,
      message: "Remove post from collection",
    });
  });
