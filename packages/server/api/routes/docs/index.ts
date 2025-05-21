import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { tryCatch } from "../../lib/tryCatch";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { docsMetadata } from "../../lib/docs/metadata";

const app = new Hono()
  .get("/", async (ctx) => {
    return respond.ok(
      ctx,
      {
        metadata: docsMetadata,
      },
      "Documentation metadata",
      200
    );
  })

  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        Bun.file(`./api/lib/docs/content/${id}.md`).text()
      );

      if (result.error) {
        return respond.err(ctx, "Failed to fetch documentation", 500);
      }

      const metadata = docsMetadata.find((doc) => doc.id === id);

      console.log({
        content: result.data,
      });

      return respond.ok(
        ctx,
        {
          content: result.data,
          metadata,
        },
        "Documentation fetched successfully.",
        200
      );
    }
  );

export default app;
