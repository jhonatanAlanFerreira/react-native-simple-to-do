import { Item } from "@/types/global";
import Checkbox from "expo-checkbox";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  Pressable,
  TextInput as RNTextInput,
  Text,
  TextInput,
  View,
} from "react-native";

export interface CheckboxItemHandles {
  focus: () => void;
}

export const CheckboxItem = forwardRef<
  CheckboxItemHandles,
  {
    todoItem: Item;
    onBlur: (item: Item) => void;
    onSelectChange?: (item: Item) => void;
    onDelete?: (item: Item) => void;
  }
>(({ todoItem, onBlur, onSelectChange, onDelete }, ref) => {
  const [item, setItem] = useState<Item>({
    id: 0,
    description: "",
    checked: 0,
  });
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    setItem(todoItem);
  }, [todoItem]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  const resetAndBlur = () => {
    setIsFocused(false);
    onBlur(item);

    if (!item.id && item.description) {
      setItem({ id: 0, description: "", checked: 0 });
    }
  };

  const setChecked = (isChecked: boolean) => {
    const checked = isChecked ? 1 : 0;

    setItem((prev) => ({ ...prev, checked }));
    onSelectChange && onSelectChange({ ...item, checked });
  };

  return (
    <View className="pl-5 p-1 flex flex-row items-center justify-between gap-3 bg-gray-100 mb-2">
      {!!item.id && (
        <Checkbox
          style={{ transform: [{ scale: 1.3 }] }}
          value={!!item.checked}
          onValueChange={setChecked}
        />
      )}

      <TextInput
        ref={inputRef}
        className={`flex-1 bg-gray-100 pl-2 rounded-lg text-black bg-gray-100 ${item.checked ? "opacity-50" : ""}`}
        placeholderTextColor="gray"
        placeholder="New Item"
        value={item.description}
        onBlur={resetAndBlur}
        onKeyPress={() => setIsFocused(true)}
        onChangeText={(description) =>
          setItem((prev) => ({ ...prev, description }))
        }
      />

      {isFocused && (
        <View>
          <Button onPress={resetAndBlur} color={"green"} title="Save" />
        </View>
      )}

      {!!item.id && !isFocused && onDelete && (
        <Pressable onPress={() => onDelete(item)} className="px-2">
          <Text className="text-red-500 text-xl font-bold pr-5">×</Text>
        </Pressable>
      )}
    </View>
  );
});
