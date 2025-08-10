import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { lists, todoItems } from "./schema";

const expoDb = openDatabaseSync("todo.db");

export const db = drizzle(expoDb, {
  schema: {
    lists,
    todoItems,
  },
});
