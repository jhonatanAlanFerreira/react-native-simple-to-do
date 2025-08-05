import { Item } from "@/types/global";
import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { Button, TextInput, View } from "react-native";

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
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setItem(todoItem);
  }, [todoItem]);

  const resetAndBlur = () => {
    onBlur(item);

    if (!item.id) {
      setItem({ id: 0, description: "" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  return (
    <View
      className={`p-3 flex flex-row items-center ${
        item.id ? "justify-between" : "justify-center"
      }`}
    >
      {!!item.id && <Checkbox value={isChecked} onValueChange={setChecked} />}

      <TextInput
        ref={inputRef}
        className={item.id ? "flex-1 mx-2" : ""}
        placeholder="New Item"
        value={item.description}
        onSubmitEditing={resetAndBlur}
        onChangeText={(description) =>
          setItem((prev) => ({ ...prev, description }))
        }
      />

      {!!item.id && onDelete && (
        <Button title="Delete" onPress={() => onDelete(item)} />
      )}
    </View>
  );
}
