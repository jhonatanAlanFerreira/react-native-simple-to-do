import { createAppStore } from "@/appStore/AppStore";
import { CheckboxItem } from "@/components/CheckboxItem/CheckboxItem";
import { CheckboxItemHandles } from "@/components/CheckboxItem/CheckboxItemTypes";
import { db } from "@/db/client";
import { todoItems } from "@/db/schema";
import { Item } from "@/types/global";
import { desc, eq } from "drizzle-orm";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const checkboxItemRef = useRef<CheckboxItemHandles>(null);
  const scrollRef = useRef<ScrollView>(null);

  const { setIsLoading, getIsLoading, setItems, getItems } = createAppStore();

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async (item: Item) => {
    if (!item.description) {
      return;
    }

    setIsLoading(true);

    if (item.id) {
      await db
        .update(todoItems)
        .set({ description: item.description, checked: item.checked })
        .where(eq(todoItems.id, item.id));

      loadItems();
    } else {
      await db.insert(todoItems).values({
        description: item.description,
      });

      loadItems().then(() => {
        setTimeout(() => {
          checkboxItemRef.current?.focus();
        }, 500);
      });
    }
  };

  const loadItems = async () => {
    setIsLoading(true);

    const res = await db
      .select()
      .from(todoItems)
      .orderBy(todoItems.checked, desc(todoItems.id));
    setItems(res as Item[]);

    setIsLoading(false);
  };

  const onDelete = (item: Item) => {
    setIsLoading(true);

    db.delete(todoItems)
      .where(eq(todoItems.id, item.id))
      .then(() => loadItems());
  };

  return (
    <SafeAreaView className="h-full bg-gray-200 p-5">
      {getIsLoading() && (
        <View className="absolute w-screen h-screen flex justify-center z-10">
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}

      {!getIsLoading() && (
        <View className="bg-white h-full p-2">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView ref={scrollRef}>
              <CheckboxItem
                ref={checkboxItemRef}
                todoItem={{ id: 0, description: "", checked: 0 }}
                onBlur={saveItem}
              ></CheckboxItem>
              {getItems().map((item, i) => (
                <CheckboxItem
                  key={i}
                  onSelectChange={saveItem}
                  onBlur={saveItem}
                  todoItem={item}
                  onDelete={onDelete}
                ></CheckboxItem>
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
}
