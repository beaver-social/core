import { createMiddleware } from "hono/factory";

const isAuthenticated = createMiddleware(async (ctx, next) => {
  // ENSURE IDENTITY OF USER
});
