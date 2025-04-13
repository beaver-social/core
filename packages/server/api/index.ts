import { Hono } from "hono";
import { cors } from "hono/cors";
import authIndex from "./routes/auth";
import contentIndex from "./routes/content";
import miscIndex from "./routes/misc";
import userIndex from "./routes/user";

let servedSessions = 0;

const app = new Hono()
  // middlewares
  .use(
    cors({
      origin: (origin, ctx) => {
        const selfUrl = new URL(ctx.req.url);
        const selfOrigin = selfUrl.origin;
        if (!origin || origin === selfOrigin) {
          return origin;
        }
        return "";
      },
      credentials: true,
      allowMethods: ["POST", "GET", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use("*", async (ctx, next) => {
    ctx.text = () => {
      throw new Error("c.text() is disabled — use c.ok() or c.err() instead");
    };

    // will be used in the future
    // ctx.json = () => {
    //   throw new Error("c.json() is disabled — use c.ok() or c.err() instead");
    // };

    await next();
  })

  // routes
  .route("auth", authIndex)
  .route("content", contentIndex)
  .route("misc", miscIndex)
  .route("user", userIndex)

  // handlers
  .get("/stats", async (ctx) => {
    servedSessions++;
    return ctx.json({
      servedSessions,
    });
  })
  .get("/contracts", async (ctx) => {
    return ctx.json({
      testnet: {
        objects: {
          adminsRecord: "0x",
          clock: "0x",
          registry: "0x",
        },
        packages: {
          beaverSocial: { id: "0x" },
        },
      },
    });
  });

export default app;

export type API = typeof app;
