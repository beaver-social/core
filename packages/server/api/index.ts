import { Hono } from "hono";
import { cors } from "hono/cors";
import dummy from "./routes/dummy";
import users from "./routes/users";
import posts from "./routes/posts";
import replies from "./routes/replies";

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
        }),
    )
    .route("dummy", dummy)
    .route("users", users)
    .route("posts", posts)
    .route("replies", replies)
    .get("/stats", async (ctx) => {
        servedSessions++;
        return ctx.json({
            servedSessions,
        });
    });

export default app;

export type API = typeof app;
