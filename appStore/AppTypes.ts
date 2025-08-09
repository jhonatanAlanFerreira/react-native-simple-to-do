import { Item } from "@/types/global";

export interface AppState {
  items: Item[];
  isLoading: boolean;
}

export interface AppStore extends AppState {
  setItems: (item: Item[]) => void;
  getItems: () => Item[];
  setIsLoading: (isLoading: boolean) => void;
  getIsLoading: () => boolean;
}
