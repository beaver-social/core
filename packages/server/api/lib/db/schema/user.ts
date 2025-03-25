import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { suiAddressType, timestamps } from "./helpers";

export const users = table("users", {
    id: t.int().notNull().primaryKey({ autoIncrement: true }),
    identifier: suiAddressType().notNull(),
    imageUrl: t.text().notNull().default(""),
    ...timestamps,
}, (table) => [
    t.uniqueIndex("identifier_idx").on(table.identifier),
]);
