import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import useThemedValue from "@/hooks/useThemedValue";

export default function MainBodyCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView
      style={[
        styles.mainCard,
        { backgroundColor: useThemedValue("#D9D9D9", "#222222") },
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main Card
  mainCard: {
    flexGrow: 1,
    width: "100%",
    marginBottom: 20,
    borderRadius: 25,
    padding: 15,
  },
});
