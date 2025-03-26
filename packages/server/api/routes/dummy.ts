import { Hono } from "hono";
import { posts } from "../data/posts";

const app = new Hono()
    .get("/posts", async (ctx) => {
        return ctx.json({ posts }, 200);
    });

export default app;
