import { Item } from "@/types/global";

export interface CheckboxItemHandles {
  focus: () => void;
}

export interface CheckboxItemProps {
  todoItem: Item;

  onBlur: (item: Item) => void;
  onSelectChange?: (item: Item) => void;
  onDelete?: (item: Item) => void;
}

export interface CheckboxItemState {
  item: Item;
  isFocused: boolean;
}

export interface CheckboxItemStore extends CheckboxItemState {
  setItem: (item: Item) => void;
  getItem: () => Item;
  setIsFocused: (focused: boolean) => void;
  getIsFocused: () => boolean;
}
