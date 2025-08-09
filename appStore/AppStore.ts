import { Item } from "@/types/global";
import { create } from "zustand";
import { AppStore } from "./AppTypes";

export const createAppStore = create<AppStore>((set, get) => ({
  todoItems: [],
  completedItems: [],
  isLoading: false,

  setTodoItems: (todoItems: Item[]) => set({ todoItems }),
  getTodoItems: () => get().todoItems,
  setCompletedItems: (completedItems: Item[]) => set({ completedItems }),
  getCompletedItems: () => get().completedItems,
  setIsLoading: (isLoading) => set({ isLoading }),
  getIsLoading: () => get().isLoading,
}));
