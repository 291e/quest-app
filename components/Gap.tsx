import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type GapProps = {
  children: React.ReactNode;
  gap: number;
  direction?: "horizontal" | "vertical";
  style?: ViewStyle;
};

export default function Gap({
  children,
  gap,
  direction = "vertical",
  style,
}: GapProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <View style={[styles.container, isHorizontal && styles.horizontal, style]}>
      {React.Children.map(children, (child, index) => (
        <View
          style={[
            index !== React.Children.count(children) - 1 && // 마지막 요소에는 간격을 적용하지 않음
              (isHorizontal ? { marginRight: gap } : { marginBottom: gap }),
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  horizontal: { flexDirection: "row" },
});
