import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../schema/db";
import { awards } from "../../schema/misc/awards";
import { getPaginationParams } from "../../lib/utils";
import { zNumberString } from "../../lib/zod/helpers";
import { desc, eq } from "drizzle-orm";

export default new Hono()
  // get all awards
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: zNumberString,
        limit: zNumberString,
      }),
    ),
    async (ctx) => {
      const { page, limit } = ctx.req.valid("query");
      const { offset } = getPaginationParams(page, limit);

      const result = await tryCatch(
        db
          .select()
          .from(awards)
          .limit(limit)
          .offset(offset)
          .orderBy(desc(awards.createdAt)),
      );

      if (result.error) {
        return ctx.json(
          {
            message: "Failed to get awards",
          },
          500,
        );
      }

      return ctx.json(result.data, 200);
    },
  )
  // get award details by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: zNumberString })),
    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await tryCatch(
        db.select().from(awards).where(eq(awards.id, id)),
      );

      if (result.error) {
        return ctx.json(
          {
            message: "Failed to get award details",
          },
          500,
        );
      }

      return ctx.json(result.data, 200);
    },
  );
