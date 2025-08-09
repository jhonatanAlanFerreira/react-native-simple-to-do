import { Item } from "@/types/global";

export interface AppState {
  todoItems: Item[];
  completedItems: Item[];
  isLoading: boolean;
}

export interface AppStore extends AppState {
  setTodoItems: (items: Item[]) => void;
  getTodoItems: () => Item[];
  setCompletedItems: (items: Item[]) => void;
  getCompletedItems: () => Item[];
  setIsLoading: (isLoading: boolean) => void;
  getIsLoading: () => boolean;
}
