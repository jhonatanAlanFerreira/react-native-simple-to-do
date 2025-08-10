import { SQLiteDatabase } from "expo-sqlite";

export async function createSchemaIfNeeded(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT
      );

      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        checked TINYINT DEFAULT 0,
        FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
      );
    `);
  } catch (err) {
    console.error("Failed to initialize database schema", err);
  }
}
