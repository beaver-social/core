import { defineConfig } from "drizzle-kit";
import env from "./env";
import path from "path";

export default defineConfig({
  out: "./drizzle",
  schema: path.join(__dirname, "./api/schema/schema.ts"),
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME || "beaver.db",
  },
  casing: "snake_case",
});
