import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import useThemedValue from "@/hooks/useThemedValue";

export default function ThemedPageView({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: useThemedValue("#64A8CA", "#0A0A0A"),
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  // Page
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 10,
  },
});
