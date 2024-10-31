import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type BackButtonProps = {
  color?: string;
  size?: number;
};

export default function BackButton({
  color = "#000",
  size = 24,
}: BackButtonProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.button}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
  },
});
