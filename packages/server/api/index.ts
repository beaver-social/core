import { Hono } from "hono";
import { cors } from "hono/cors";
import nft from "./routes/#legacy/nft";

import content from "./routes/content/index";
import user from "./routes/user/index";
import auth from "./routes/auth/index";

let servedSessions = 0;
const app = new Hono()
  // middleware
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

  // routes
  .route("auth", auth)
  .route("user", user)
  .route("content", content)
  .route("nft", nft)

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
