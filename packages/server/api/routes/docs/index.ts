import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { tryCatch } from "../../lib/tryCatch";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().get(
  "/",
  zValidator("query", z.object({ title: z.string() })),
  async (ctx) => {
    const { title } = ctx.req.query();

    const result = await tryCatch(Bun.file(`./api/docs/${title}`).text());

    if (result.error) {
      return respond.err(ctx, "Something went wrong", 500);
    }

    return respond.ok(
      ctx,
      {
        content: result.data,
      },
      "Introduction",
      200
    );
  }
);

export default app;
