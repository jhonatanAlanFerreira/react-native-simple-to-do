import { SQLiteDatabase } from "expo-sqlite";

export async function createSchemaIfNeeded(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        checked TINYINT DEFAULT 0
      );
    `);
  } catch (err) {
    console.error("Failed to initialize database schema", err);
  }
}
