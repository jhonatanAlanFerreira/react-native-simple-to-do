import { Item } from "@/types/global";
import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

export function CheckboxItem({
  todoItem,
  onBlur,
  onSelectChange,
  onDelete,
}: {
  todoItem: Item;
  onBlur: (item: Item) => void;
  onSelectChange: () => void;
  onDelete?: (item: Item) => void;
}) {
  const [item, setItem] = useState<Item>({ id: 0, description: "" });
  const [isChecked, setChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setItem(todoItem);
  }, [todoItem]);

  const resetAndBlur = () => {
    setIsFocused(false);
    onBlur(item);

    if (!item.id && item.description) {
      setItem({ id: 0, description: "" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  return (
    <View
      className={"pl-5 pr-5 flex flex-row items-center justify-between gap-3"}
    >
      {!!item.id && <Checkbox value={isChecked} onValueChange={setChecked} />}

      <TextInput
        ref={inputRef}
        className="flex-1 mx-2"
        placeholder="New Item"
        value={item.description}
        onBlur={resetAndBlur}
        onKeyPress={() => setIsFocused(true)}
        onChangeText={(description) =>
          setItem((prev) => ({ ...prev, description }))
        }
      />

      {isFocused && (
        <Button onPress={resetAndBlur} color={"green"} title="Save"></Button>
      )}

      {!!item.id && onDelete && (
        <Pressable onPress={() => onDelete(item)} className="px-2">
          <Text className="text-red-500 text-xl font-bold">×</Text>
        </Pressable>
      )}
    </View>
  );
}
