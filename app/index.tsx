import {
  CheckboxItem,
  CheckboxItemHandles,
} from "@/components/CheckboxItem/CheckboxItem";
import { db } from "@/db/client";
import { todoItems } from "@/db/schema";
import { Item } from "@/types/global";
import { eq } from "drizzle-orm";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const checkboxItemRef = useRef<CheckboxItemHandles>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async (item: Item) => {
    if (!item.description) {
      return;
    }

    if (item.id) {
      await db
        .update(todoItems)
        .set({ description: item.description })
        .where(eq(todoItems.id, item.id));

      loadItems();
    } else {
      await db.insert(todoItems).values({
        description: item.description,
      });

      loadItems().then(() => {
        setTimeout(() => {
          scrollRef.current?.scrollToEnd();
          setTimeout(() => {
            checkboxItemRef.current?.focus();
          });
        });
      });
    }
  };

  const loadItems = async () => {
    const res = await db.select().from(todoItems);
    setItems(res as Item[]);
  };

  const onDelete = (item: Item) => {
    db.delete(todoItems)
      .where(eq(todoItems.id, item.id))
      .then(() => loadItems());
  };

  return (
    <SafeAreaView className="h-full bg-gray-200 p-5">
      <View className="bg-white h-full rounded-lg">
        <ScrollView ref={scrollRef}>
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
            ref={checkboxItemRef}
            todoItem={{ id: 0, description: "" }}
            onSelectChange={() => true}
            onBlur={(item) => saveItem(item)}
          ></CheckboxItem>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
