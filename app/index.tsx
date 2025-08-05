import { CheckboxItem } from "@/components/CheckboxItem/CheckboxItem";
import { db } from "@/db/client";
import { todoItems } from "@/db/schema";
import { Item } from "@/types/global";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async (item: Item) => {
    if (item.id) {
      await db
        .update(todoItems)
        .set({ description: item.description })
        .where(eq(todoItems.id, item.id));
    } else {
      await db.insert(todoItems).values({
        description: item.description,
      });
    }

    loadItems();
  };

  const loadItems = () => {
    db.select()
      .from(todoItems)
      .then((res) => {
        setItems(res as Item[]);
      });
  };

  const onDelete = (item: Item) => {
    db.delete(todoItems)
      .where(eq(todoItems.id, item.id))
      .then(() => loadItems());
  };

  return (
    <View>
      {items.map((item, i) => (
        <CheckboxItem
          key={i}
          onSelectChange={() => true}
          onBlur={(item) => saveItem(item)}
          todoItem={item}
          onDelete={onDelete}
        ></CheckboxItem>
      ))}
      <CheckboxItem
        todoItem={{ id: 0, description: "" }}
        onSelectChange={() => true}
        onBlur={(item) => saveItem(item)}
      ></CheckboxItem>
    </View>
  );
}
