import { Hono } from "hono";
import { logger } from "hono/logger";
import api from "./api";
import { serveStatic } from "@hono/node-server/serve-static";

import { ensureEnv } from "./env";
ensureEnv();

const htmlFile = Bun.file(__dirname + "/index.html");
const html = await htmlFile.text();

const app = new Hono();

const log = (...data: any[]) => console.log(...data);

app.use(logger(log));
app.use((ctx, next) => {
  ctx.log = log;
  return next();
});

app.route("api", api);
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {
  log("Production mode detected, serving static files.");

  app.use("/*", serveStatic({ root: __dirname + "/dist" }));

  // SPA fallback
  app.get("*", async (ctx) =>
    ctx.html(await Bun.file(__dirname + "/dist/index.html").text())
  );
} else {
  log("Development mode detected.");

  app.get("*", (ctx) => ctx.html(html));
}

export default {
  ...app,
  maxRequestBodySize: 4 * 1024 * 1024, // 4 MB
};

declare module "hono" {
  interface Context {
    log: (...data: any[]) => void;
  }
}
