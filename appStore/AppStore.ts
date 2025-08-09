import { Item } from "@/types/global";
import { create } from "zustand";
import { AppStore } from "./AppTypes";

export const createAppStore = create<AppStore>((set, get) => ({
  items: [],
  isLoading: false,

  setItems: (items: Item[]) => set({ items }),
  getItems: () => get().items,
  setIsLoading: (isLoading) => set({ isLoading }),
  getIsLoading: () => get().isLoading,
}));
