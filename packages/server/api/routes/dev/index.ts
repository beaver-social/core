import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
import env from "../../../env";
import db from "../../lib/db";
import authenticated from "../../middlewares/authenticated";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { respond } from "../../lib/utils/respond";
import { and, eq } from "drizzle-orm";
import { zNumberString } from "../../lib/zod/helpers";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const { applications, applicationUrls } = db.schema;

const app = new Hono()

  .use(async (ctx, next) => {
    const appId = ctx.req.header("X-Api-Key");

    if (appId != env.DEFAULT_APPID) {
      return respond.err(ctx, "Very Smart but this won't work", 400);
    }
  })

  .post(
    "/applications",
    authenticated,
    zValidator(
      "json",
      z.object({
        name: z.string().min(3).max(32),
      })
    ),
    async (ctx) => {
      const { user } = ctx.var;
      const { name } = ctx.req.valid("json");

      const [app] = await db
        .insert(applications)
        .values({
          userId: user.id,
          name: name,
        })
        .returning();

      return respond.ok(ctx, app, "New Application Created", 201);
    }
  )
  .get("/applications", authenticated, async (ctx) => {
    const { user } = ctx.var;
    const apps = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, user.id));

    return respond.ok(ctx, { apps }, "Your Applications", 200);
  })
  .get(
    "/applications/:id",
    authenticated,
    zValidator(
      "param",
      z.object({
        id: zNumberString(),
      })
    ),
    async (ctx) => {
      const { user } = ctx.var;
      const { id: applicationId } = ctx.req.valid("param");

      const [app] = await db
        .select()
        .from(applications)
        .where(
          and(
            eq(applications.userId, user.id),
            eq(applications.id, applicationId)
          )
        );

      if (!app) return respond.err(ctx, "Application not found", 404);

      const whitelist = await db
        .select()
        .from(applicationUrls)
        .where(eq(applicationUrls.applicationId, app.id));

      return respond.ok(ctx, { ...app, whitelist }, "Application Data", 200);
    }
  )
  .put(
    "/applications/:id/whitelist",
    authenticated,
    zValidator(
      "json",
      z.object({
        urls: z.array(z.string()),
      })
    ),
    zValidator("param", z.object({ id: zNumberString() })),
    async (ctx) => {
      const { user } = ctx.var;
      const { id: applicationId } = ctx.req.valid("param");
      const { urls } = ctx.req.valid("json");

      const [app] = await db
        .select()
        .from(applications)
        .where(
          and(
            eq(applications.userId, user.id),
            eq(applications.id, applicationId)
          )
        );

      if (!app) return respond.err(ctx, "Application not found", 404);

      await db.transaction(async (tx) => {
        await tx
          .delete(applicationUrls)
          .where(eq(applicationUrls.applicationId, applicationId));

        await tx
          .insert(applicationUrls)
          .values(urls.map((item) => ({ url: item, applicationId })));
      });

      return respond.ok(ctx, {}, "Updated Whitelisted Urls", 200);
    }
  );

export default app;
