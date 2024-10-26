import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Font from "@/components/Font";
import useThemedValue from "@/hooks/useThemedValue";
import { router } from "expo-router";
import { useTheme } from "./ThemeContext";
import { usePoints } from "./PointsContext";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { points, addPoints } = usePoints();
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.pointsHeader,
        {
          borderWidth: useThemedValue(0, 3),
          borderColor: "#D9D9D9",
          backgroundColor: useThemedValue("#D9D9D9", "#222222"),
        },
      ]}
    >
      <Pressable
        onPress={() => {
          router.navigate("/store");
        }}
        style={styles.pointsHeaderLogo}
      >
        <Font style={{ color: "#FFF" }}>Pasumai</Font>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("./store");
        }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Font style={{ fontSize: 25 }}>{points.totalPoints} points</Font>
        <Font style={{ fontSize: 14 }}>Today: {points.pointsToday}/150</Font>
      </Pressable>
      <Pressable onPress={toggleTheme} style={{ marginLeft: 15 }}>
        <Ionicons
          size={40}
          style={{ color: useThemedValue("#000", "#FFF") }}
          name={`${useThemedValue("moon", "sunny")}`}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  pointsHeader: {
    alignItems: "center",
    padding: 10,
    paddingRight: 20,
    width: "100%",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pointsHeaderLogo: {
    backgroundColor: "#006F45",
    borderRadius: 100,
    height: 40,
    width: "auto",
    padding: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
  },
});
