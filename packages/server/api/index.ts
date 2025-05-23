import { Hono } from "hono";
import { cors } from "hono/cors";
import router from "./routes";
import { respond } from "./lib/utils/respond";
import { onchainDefinitions } from "contracts/definitions";
import { rateLimiter } from "hono-rate-limiter";
import env from "../env";
import db from "./lib/db";
import { eq } from "drizzle-orm";

let servedSessions = 0;

const app = new Hono()
  // middlewares
  .use(
    cors({
      origin: (origin, ctx) => {
        const selfUrl = new URL(ctx.req.url);
        const allowedOrigins: string[] = [
        ];
        const selfOrigin = selfUrl.origin;
        if (
          !origin ||
          origin === selfOrigin ||
          allowedOrigins.includes(origin)
        ) {
          return origin;
        }
        return "";
      },
      credentials: true,
      allowMethods: ["POST", "GET", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "X-Api-Key"],
    })
  )

  .use(async (ctx, next) => {
    const appId = ctx.req.header("X-Api-Key")

    if (!appId) return respond.err(ctx, "Missing AppId / Api Key", 400)

    if (appId !== env.DEFAULT_APPID) {
      const [appIdExists] = await db.select().from(db.schema.applications).where(eq(db.schema.applications.appId, appId))
      if (!appIdExists) return respond.err(ctx, "Invalid AppId / Api Key", 400)
    }

    return await next()
  })

  .use(
    rateLimiter({
      windowMs: 1,
      limit: 300,
      standardHeaders: "draft-6",
      keyGenerator: async (ctx) => {
        const appId = ctx.req.header("X-Api-Key")!

        return appId
      },
    })
  )

  .route("/", router)

  .get("/stats", async (ctx) => {
    servedSessions++;
    return ctx.json({
      servedSessions,
      uptime: process.uptime(),
      enokiConfig: {
        apiKey: "enoki_public_8c3957b3817b45f4ee9cfacaa994bf77",
        providers: {
          google: {
            clientId:
              "697934856801-at79vesgvkq9pn28j44o128n1b9td7aa.apps.googleusercontent.com",
          },
        },
      },
    });
  })
  .get("/contracts", async (ctx) => {
    const data = onchainDefinitions;

    return respond.ok(ctx, data, "Contracts fetched successfully", 200);
  })
  .get("*", (ctx) => {
    return respond.err(ctx, "Invalid v1 api route", 404);
  });

export default app;

export type API = typeof app;
