import { Hono } from "hono";

/**
 * User Messaging Routes
 * Base path: /user/messages
 */
export default new Hono()
  .get("/conversations", (ctx) => {
    return ctx.json({
      conversations: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get user's conversations",
    });
  })
  .post("/conversations", (ctx) => {
    return ctx.json({
      conversationId: "conv-123",
      gunChannelKey: "encrypted-key-456",
      message: "Create a new conversation",
    });
  })
  .get("/conversations/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      conversation: { id },
      participants: [],
      message: "Get a conversation details",
    });
  })
  .delete("/conversations/:id", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      success: true,
      message: "Leave/delete a conversation",
    });
  })
  .post("/conversations/:id/participants", (ctx) => {
    const id = ctx.req.param("id");
    return ctx.json({
      success: true,
      conversation: { id },
      message: "Add participant to conversation",
    });
  })
  .delete("/conversations/:id/participants/:userId", (ctx) => {
    const id = ctx.req.param("id");
    const userId = ctx.req.param("userId");
    return ctx.json({
      success: true,
      message: "Remove participant",
    });
  })
  .post("/relay", (ctx) => {
    return ctx.json({
      delivered: true,
      messageId: "msg-123",
      message: "Relay encrypted message",
    });
  })
  .post("/read/:conversationId", (ctx) => {
    const conversationId = ctx.req.param("conversationId");
    return ctx.json({
      success: true,
      message: "Mark conversation as read",
    });
  })
  .post("/typing/:conversationId", (ctx) => {
    const conversationId = ctx.req.param("conversationId");
    return ctx.json({
      success: true,
      message: "Send typing indicator",
    });
  })
  .post("/block/:userId", (ctx) => {
    const userId = ctx.req.param("userId");
    return ctx.json({
      success: true,
      message: "Block user from messaging",
    });
  })
  .post("/unblock/:userId", (ctx) => {
    const userId = ctx.req.param("userId");
    return ctx.json({
      success: true,
      message: "Unblock user from messaging",
    });
  })
  .get("/blocked", (ctx) => {
    return ctx.json({
      users: [],
      pagination: { page: 1, limit: 20, total: 0 },
      message: "Get list of blocked users",
    });
  })
  .get("/search", (ctx) => {
    return ctx.json({
      results: [],
      message: "Search messages",
    });
  });
