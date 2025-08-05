import "@/global.css";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { createSchemaIfNeeded } from "../db/setup";

export default function RootLayout() {
  return (
    <>
      <SQLiteProvider databaseName="todo.db" onInit={createSchemaIfNeeded}>
        <Stack />
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
