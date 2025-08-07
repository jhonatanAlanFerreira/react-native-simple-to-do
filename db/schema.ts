import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoItems = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description"),
  checked: integer("checked").default(0),
});
