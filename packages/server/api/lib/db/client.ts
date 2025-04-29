import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import env from "../../../env";
import schema from "./schema";

const sqlite = new Database(env.DB_FILE_NAME || "beaver.db");
sqlite.exec("PRAGMA foreign_keys = ON");

const dbClient = drizzle({
  client: sqlite,
  schema: schema,
  casing: "snake_case",
});

export default dbClient;
