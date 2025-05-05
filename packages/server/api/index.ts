import { Hono } from "hono";
import { cors } from "hono/cors";
import router from "./routes";
import { respond } from "./lib/utils/respond";
import { onchainDefinitions } from "contracts/definitions";

let servedSessions = 0;

const app = new Hono()
  // middlewares
  .use(
    cors({
      origin: (origin, ctx) => {
        const selfUrl = new URL(ctx.req.url);
        const allowedOrigins = [
          "http://localhost:9090",
          "https://localhost:3000",
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
      allowHeaders: ["Content-Type", "Authorization"],
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
