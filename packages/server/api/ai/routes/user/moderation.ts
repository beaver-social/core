import { Hono } from "hono";

/**
 * User Moderation Routes
 * Base path: /user/moderation
 */
export default new Hono()
  .get("/reports", (ctx) => {
    return ctx.json({
      reports: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's submitted reports",
    });
  })
  .get("/reports/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      report: { id },
      status: "pending",
      resolution: null,
      message: "Get report status",
    });
  })
  .post("/appeals", (ctx) => {
    return ctx.json({
      success: true,
      appealId: "appeal-123",
      message: "Appeal a moderation action",
    });
  })
  .get("/appeals/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      status: "pending",
      details: {},
      notes: null,
      message: "Check appeal status",
    });
  })
  .get("/reported", (ctx) => {
    return ctx.json({
      reports: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get content reported by user",
    });
  })
  .post("/sensitive", (ctx) => {
    return ctx.json({
      success: true,
      message: "Mark content as sensitive",
    });
  });
