export interface Item {
  id: number;
  description: string;
  checked: number;
  listId?: number;
}

export interface List {
  id: number;
}
