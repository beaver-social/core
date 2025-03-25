import { Hono } from "hono";
import { coins } from "../data/posts";

const app = new Hono()
    .get("/coins", async (ctx) => {
        return ctx.json({ coins });
    });

export default app;
