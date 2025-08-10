import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AbsoluteModalProps } from "./AbsoluteModalTypes";

export default function AbsoluteModal({
  visible,
  onClose,
  children,
  overlayClosable = true,
  modalHeight = 300,
}: AbsoluteModalProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(modalHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: modalHeight,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, translateY, modalHeight]);

  if (!visible) return null;

  const { width } = Dimensions.get("window");

  return (
    <View className="absolute inset-0 z-50" pointerEvents="box-none">
      <TouchableWithoutFeedback onPress={() => overlayClosable && onClose()}>
        <Animated.View
          className="absolute inset-0 bg-black/50"
          style={{ opacity }}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        className="absolute inset-0 flex justify-center items-center w-3/4"
        style={{
          transform: [{ translateY }],
          width,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full items-center"
        >
          <View className="w-96 max-w-xl bg-white rounded-xl p-4 shadow-lg relative">
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-2 right-2 p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
            {children}
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
