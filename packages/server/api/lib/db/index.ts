import schema from "./schema";
import { dbExtensionHelpers } from "./helpers";
import dbClient from "./client";

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
