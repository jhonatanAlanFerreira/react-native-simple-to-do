import { Item, List } from "@/types/global";

export interface AppState {
  todoItems: Item[];
  completedItems: Item[];
  lists: List[];
  currentListIndex: number;
  isLoading: boolean;
  isModalOpened: boolean;
}

export interface AppStore extends AppState {
  setTodoItems: (items: Item[]) => void;
  getTodoItems: () => Item[];
  setCompletedItems: (items: Item[]) => void;
  getCompletedItems: () => Item[];
  setLists: (lists: List[]) => void;
  getLists: () => List[];
  setIsLoading: (isLoading: boolean) => void;
  getIsLoading: () => boolean;
  setCurrentListIndex: (index: number) => void;
  getCurrentListIndex: () => number;
  setIsModalOpened: (isModalOpened: boolean) => void;
  getIsModalOpened: () => boolean;
}
