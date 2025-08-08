import { create } from "zustand";
import { CheckboxItemStore } from "./CheckboxItemTypes";

export const useCheckboxItemStore = create<CheckboxItemStore>((set, get) => ({
  isFocused: false,
  item: { id: 0, checked: 0, description: "" },

  setIsFocused: (isFocused) => set({ isFocused }),
  getIsFocused: () => get().isFocused,
  setItem: (item) => set({ item }),
  getItem: () => get().item
}));
