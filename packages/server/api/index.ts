import { Hono } from "hono";
import { cors } from "hono/cors";
import dummy from "./routes/dummy";
import users from "./routes/users";
import posts from "./routes/posts";
import replies from "./routes/replies";
import nft from "./routes/nft";
import oauth from "./routes/oauth";

let servedSessions = 0;
const app = new Hono()
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
  .route("dummy", dummy)
  .route("users", users)
  .route("posts", posts)
  .route("replies", replies)
  .route("oauth", oauth)
  .get("/stats", async (ctx) => {
    servedSessions++;
    return ctx.json({
      servedSessions,
    });
  })
  .get("/contracts", async (ctx) => {
    return ctx.json({
      testnet: {
        beaverSocial: {
          package: "0x",
          modules: {
            registry: {
              functions: [{
                name: "mint"
              }]
            }
          }
        }
      },
    });
  });

export default app;

export type API = typeof app;
