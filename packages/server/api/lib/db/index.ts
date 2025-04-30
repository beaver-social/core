import schema from "./schema";
import dbClient from "./client";
import { eq } from "drizzle-orm";
import { dbExtensionHelpers } from "./extension";

const db = {
  ...dbClient,
  select: dbClient.select,
  insert: dbClient.insert,
  update: dbClient.update,
  delete: dbClient.delete,
  query: dbClient.query,
  transaction: dbClient.transaction,
  ...dbExtensionHelpers,
  schema,
};

export default db;
