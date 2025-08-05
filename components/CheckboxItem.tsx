import { Item } from "@/types/global";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setItem(todoItem);
  }, [todoItem]);

  const resetAndBlur = () => {
    onBlur(item);

    if (!item.id) {
      setItem({ id: 0, description: "" });
    }
  };

  return (
    <View>
      {!!item.id && (
        <Checkbox value={isChecked} onValueChange={setChecked}></Checkbox>
      )}
      <TextInput
        placeholder="New Item"
        value={item.description}
        onSubmitEditing={resetAndBlur}
        onChangeText={(description) =>
          setItem((prev) => ({ ...prev, description }))
        }
      ></TextInput>
      {!!item.id && (
        <Button
          title="Delete"
          onPress={() => {
            if (onDelete) {
              onDelete(item);
            }
          }}
        ></Button>
      )}
    </View>
  );
}
