import { Item, List } from "@/types/global";
import { create } from "zustand";
import { AppStore } from "./AppTypes";

export const createAppStore = create<AppStore>((set, get) => ({
  todoItems: [],
  completedItems: [],
  lists: [],
  isLoading: false,
  currentListIndex: 0,

  setTodoItems: (todoItems: Item[]) => set({ todoItems }),
  getTodoItems: () => get().todoItems,
  setCompletedItems: (completedItems: Item[]) => set({ completedItems }),
  getCompletedItems: () => get().completedItems,
  setLists: (lists: List[]) => set({ lists }),
  getLists: () => get().lists,
  setIsLoading: (isLoading) => set({ isLoading }),
  getIsLoading: () => get().isLoading,
  setCurrentListIndex: (currentListIndex: number) => set({ currentListIndex }),
  getCurrentListIndex: () => get().currentListIndex,
}));
