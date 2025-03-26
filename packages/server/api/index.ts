import { Hono } from "hono";
import { cors } from "hono/cors";
import dummy from "./routes/dummy";

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
    .get("/stats", async (ctx) => {
        servedSessions++;
        return ctx.json({
            servedSessions,
        });
    });

export default app;

export type API = typeof app;
