import { createAppStore } from "@/appStore/AppStore";
import { CheckboxItem } from "@/components/CheckboxItem/CheckboxItem";
import { CheckboxItemHandles } from "@/components/CheckboxItem/CheckboxItemTypes";
import AbsoluteModal from "@/components/Modal/Modal";
import { Title } from "@/components/Title/Title";
import { db } from "@/db/client";
import { lists, todoItems } from "@/db/schema";
import { Item } from "@/types/global";
import { Ionicons } from "@expo/vector-icons";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
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
    setLists,
    getLists,
    setCompletedItems,
    getCompletedItems,
    setCurrentListIndex,
    getCurrentListIndex,
    setIsModalOpened,
    getIsModalOpened,
  } = createAppStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await retrieveList();
    loadItems();
  };

  const retrieveList = async () => {
    setIsLoading(true);

    const res = await db.select().from(lists);

    if (res.length) {
      setLists(res);
    } else {
      await createNewList();
      const itemsLists = await db.select().from(lists);
      setLists(itemsLists);
    }

    setIsLoading(false);
  };

  const createNewList = async () => {
    await db.insert(lists).values({});
  };

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
        listId: getLists()[getCurrentListIndex()].id,
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
      <Ionicons
        onPress={() => setIsModalOpened(true)}
        className="mb-2"
        name="menu"
        size={30}
        color="gray"
      />
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
        <Text className="text-gray-500">{`${getCurrentListIndex() + 1}/${getLists().length} Lists`}</Text>
        <Ionicons name="arrow-forward" size={30} color="gray" />
      </View>

      <AbsoluteModal
        visible={getIsModalOpened()}
        onClose={() => setIsModalOpened(false)}
      >
        <View className="pt-10">
          <Pressable
            onPress={() => {}}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm mb-4"
            android_ripple={{ color: "rgba(0,0,0,0.05)" }}
          >
            <Text className="text-center text-gray-800 text-lg font-medium">
              Create New List
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this item?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {},
                  },
                ],
                { cancelable: true }
              );
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm"
            android_ripple={{ color: "rgba(0,0,0,0.05)" }}
          >
            <Text className="text-center text-red-800 text-lg font-medium">
              Remove Current List
            </Text>
          </Pressable>
        </View>
      </AbsoluteModal>
    </SafeAreaView>
  );
}
