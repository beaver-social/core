import { Hono } from "hono";
import { cors } from "hono/cors";
import authIndex from "./routes/auth";
import contentIndex from "./routes/content";
import miscIndex from "./routes/misc";
import userIndex from "./routes/user";
import analyticsIndex from "./routes/analytics";
import { respond } from "../utils/respond";

let servedSessions = 0;

const app = new Hono()
  // middlewares
  .use(
    cors({
      origin: (origin, ctx) => {
        const selfUrl = new URL(ctx.req.url);
        const allowedOrigins = ["http://localhost:3000"];
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

  // .route("auth", authIndex)
  .route("content", contentIndex)
  // .route("misc", miscIndex)
  // .route("user", userIndex)
  // .route("analytics", analyticsIndex)

  // handlers
  .get("/stats", async (ctx) => {
    servedSessions++;
    return ctx.json({
      servedSessions,
    });
  })
  .get("/contracts", async (ctx) => {
    const data = {
      testnet: {
        packages: {
          beaverSocial: {
            id: "0x",
          },
        },
        objects: {
          adminsRecord: "0x",
          clock: "0x",
          registry: "0x",
        },
      },
    };

    return respond.ok(ctx, data, "Contracts fetched successfully", 200);
  });

export default app;

export type API = typeof app;
