// src/components/CustomButton.tsx
import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import Gap from "./Gap";

type CustomButtonProps = {
  label: string;
  onPress: () => void;
  color?: string;
};

export default function CustomButton({
  label,
  onPress,
  color = "#4CAF50",
}: CustomButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#66BB6A" : color },
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  button: {
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
