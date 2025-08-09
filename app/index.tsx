import { createAppStore } from "@/appStore/AppStore";
import { CheckboxItem } from "@/components/CheckboxItem/CheckboxItem";
import { CheckboxItemHandles } from "@/components/CheckboxItem/CheckboxItemTypes";
import { Title } from "@/components/Title/Title";
import { db } from "@/db/client";
import { todoItems } from "@/db/schema";
import { Item } from "@/types/global";
import { Ionicons } from "@expo/vector-icons";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const checkboxItemRef = useRef<CheckboxItemHandles>(null);

  const {
    setIsLoading,
    getIsLoading,
    setTodoItems,
    getTodoItems,
    setCompletedItems,
    getCompletedItems,
  } = createAppStore();

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
        }, 300);
      });
    }
  };

  const loadItems = async () => {
    setIsLoading(true);

    const res = await db
      .select()
      .from(todoItems)
      .orderBy(todoItems.checked, desc(todoItems.id));
    setTodoItems(res.filter((item) => !item.checked) as Item[]);
    setCompletedItems(res.filter((item) => item.checked) as Item[]);

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
      <Ionicons className="mb-2" name="menu" size={30} color="gray" />
      {getIsLoading() && (
        <View className="absolute w-screen h-screen flex justify-center z-10">
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
      {!getIsLoading() && (
        <View className="bg-white flex-1 p-2">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
              <CheckboxItem
                ref={checkboxItemRef}
                todoItem={{ id: 0, description: "", checked: 0 }}
                onBlur={saveItem}
              ></CheckboxItem>
              <Title title="To-Do Items"></Title>
              {getTodoItems().map((item, i) => (
                <CheckboxItem
                  key={i}
                  onSelectChange={saveItem}
                  onBlur={saveItem}
                  todoItem={item}
                  onDelete={onDelete}
                ></CheckboxItem>
              ))}
              <View className="mt-5">
                <Title title="Completed Items"></Title>
              </View>
              {getCompletedItems().map((item, i) => (
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
      <View className="flex-row justify-between items-center px-4 mt-2">
        <Ionicons name="arrow-back" size={30} color="gray" />
        <Text className="text-gray-500">1/1</Text>
        <Ionicons name="arrow-forward" size={30} color="gray" />
      </View>
    </SafeAreaView>
  );
}
