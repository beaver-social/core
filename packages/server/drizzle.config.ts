import { defineConfig } from "drizzle-kit";
import env from "./env";
import path from "path";

export default defineConfig({
  out: "./drizzle",
  schema: path.join(__dirname, "./api/lib/db/schema/index.ts"),
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME || "data.db",
  },
  casing: "snake_case",
});
