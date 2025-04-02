import { Hono } from "hono";

const app = new Hono().get("/", async (ctx) => {
  return ctx.json("hey", 200);
});

export default app;
