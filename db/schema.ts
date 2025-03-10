import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  quantity: int().notNull(),
  description: text().notNull(),
});
