import useThemedValue from "@/hooks/useThemedValue";
import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

const Font = ({
  children,
  style,
  overrideDarkStyle = false,
  ...rest
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  overrideDarkStyle?: boolean;
}) => {
  const textColor = overrideDarkStyle ? "#000" : "#FFF";

  return (
    <Text
      style={[styles.font, { color: useThemedValue("#000", textColor) }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: "LexendExa_400Regular",
    // fontFamily: "Fredoka_600SemiBold",
  },
});

export default Font;
