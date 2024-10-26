import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Divider() {
  return (
    <LinearGradient
      colors={[
        "transparent",
        "transparent",
        "#434343",
        "transparent",
        "transparent",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: 1,
        marginVertical: 10,
      }}
    />
  );
}
