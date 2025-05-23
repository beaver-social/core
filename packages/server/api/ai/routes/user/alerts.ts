import { Hono } from "hono";

/**
 * User Notifications/Alerts Routes
 * Base path: /user/alerts
 */
export default new Hono()
  .get("/", (ctx) => {
    return ctx.json({
      alerts: [],
      unreadCount: 0,
      message: "Get user notifications",
    });
  })
  .get("/count", (ctx) => {
    return ctx.json({
      count: 0,
      message: "Get unread notification count",
    });
  })
  .get("/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      alert: { id },
      message: "Get specific notification details",
    });
  })
  .post("/:id/read", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      success: true,
      message: "Mark notification as read",
    });
  })
  .post("/read", (ctx) => {
    return ctx.json({
      success: true,
      updatedCount: 5,
      message: "Mark multiple notifications as read",
    });
  })
  .post("/read/all", (ctx) => {
    return ctx.json({
      success: true,
      updatedCount: 10,
      message: "Mark all notifications as read",
    });
  })
  .get("/settings", (ctx) => {
    return ctx.json({
      settings: {},
      message: "Get user notification settings",
    });
  })
  .patch("/settings", (ctx) => {
    return ctx.json({
      settings: {},
      message: "Update notification settings",
    });
  })
  .post("/mute/:type", (ctx) => {
    const type = ctx.req.param("type");
    return ctx.json({
      success: true,
      muteExpiry: new Date(Date.now() + 86400000).toISOString(),
      message: "Mute specific notification type",
    });
  })
  .post("/unmute/:type", (ctx) => {
    const type = ctx.req.param("type");
    return ctx.json({
      success: true,
      message: "Unmute notification type",
    });
  })

  // Mentions & Tags
  .route(
    "/mentions",
    new Hono()
      .get("/", (ctx) => {
        return ctx.json({
          mentions: [],
          pagination: { page: 1, limit: 20, total: 0 },
          message: "Get mentions of current user",
        });
      })
      .post("/:id/read", (ctx) => {
        const id = ctx.req.param("id");
        return ctx.json({
          success: true,
          message: "Mark mention as read",
        });
      })
      .post("/read/all", (ctx) => {
        return ctx.json({
          success: true,
          count: 3,
          message: "Mark all mentions as read",
        });
      })
      .get("/count", (ctx) => {
        return ctx.json({
          count: 0,
          message: "Get unread mentions count",
        });
      })
      .get("/users", (ctx) => {
        return ctx.json({
          users: [],
          message: "Get mentionable users",
        });
      })
      .get("/suggestions", (ctx) => {
        return ctx.json({
          suggestions: [],
          message: "Get mention suggestions",
        });
      }),
  );
