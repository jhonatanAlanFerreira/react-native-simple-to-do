import Checkbox from "expo-checkbox";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  Button,
  Pressable,
  TextInput as RNTextInput,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCheckboxItemStore } from "./CheckboxItemStore";
import { CheckboxItemProps } from "./CheckboxItemTypes";

export interface CheckboxItemHandles {
  focus: () => void;
}

export const CheckboxItem = forwardRef<CheckboxItemHandles, CheckboxItemProps>(
  ({ todoItem, onBlur, onSelectChange, onDelete }, ref) => {
    const inputRef = useRef<RNTextInput>(null);
    const { getIsFocused, getItem, setIsFocused, setItem } =
      useCheckboxItemStore();

    useEffect(() => {
      setItem(todoItem);
    }, [todoItem]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const resetAndBlur = () => {
      const item = getItem();

      setIsFocused(false);

      if (!getItem().id && getItem().description) {
        setItem({ id: 0, description: "", checked: 0 });
        console.log(getItem());
        onBlur(item);
      }
    };

    const setChecked = (isChecked: boolean) => {
      const checked = isChecked ? 1 : 0;

      setItem({ ...getItem(), checked });
      onSelectChange && onSelectChange({ ...getItem(), checked });
    };

    return (
      <View className="pl-5 p-1 flex flex-row items-center justify-between gap-3 bg-gray-100 mb-2">
        {!!getItem().id && (
          <Checkbox
            style={{ transform: [{ scale: 1.3 }] }}
            value={!!getItem().checked}
            onValueChange={setChecked}
          />
        )}

        <TextInput
          ref={inputRef}
          className={`flex-1 bg-gray-100 pl-2 rounded-lg text-black bg-gray-100 ${getItem().checked ? "opacity-50" : ""}`}
          placeholderTextColor="gray"
          placeholder="New Item"
          value={getItem().description}
          onBlur={resetAndBlur}
          onKeyPress={() => setIsFocused(true)}
          onChangeText={(description) => setItem({ ...getItem(), description })}
        />

        {getIsFocused() && (
          <View>
            <Button onPress={resetAndBlur} color={"green"} title="Save" />
          </View>
        )}

        {!!getItem().id && !getIsFocused() && onDelete && (
          <Pressable onPress={() => onDelete(getItem())} className="px-2">
            <Text className="text-red-500 text-xl font-bold pr-5">×</Text>
          </Pressable>
        )}
      </View>
    );
  }
);
