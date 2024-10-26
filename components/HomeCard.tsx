import React from "react";
import { StyleProp, View } from "react-native";
import Font from "@/components/Font";
import useThemedValue from "@/hooks/useThemedValue";
import { Ionicons } from "@expo/vector-icons";

type ColorType = "green" | "yellow" | "orange";

export default function HomeCard({
  children,
  heading,
  color,
  style,
  desc,
}: {
  children: React.ReactNode;
  heading?: string;
  color: ColorType;
  style?: any;
  desc?: string;
}) {
  let findCode = (clr: ColorType) => {
    var toReturn;
    switch (clr) {
      case "green":
        toReturn = "#ADDB9F";
        break;
      case "yellow":
        toReturn = "#D2BA31";
        break;
      case "orange":
        toReturn = "#D29A31";
        break;
      default:
        toReturn = "#ADDB9F";
        break;
    }
    return toReturn;
  };
  return (
    <View
      style={[
        {
          padding: 10,
          width: "100%",
          height: "auto",
          backgroundColor: useThemedValue(findCode(color), "#2F2F2F"),
          borderRadius: 15,
          marginBottom: 10,
          borderColor: findCode(color),
          borderWidth: useThemedValue(0, 3),
        },
        style,
      ]}
    >
      {heading && <Font style={{ fontSize: 18 }}>{heading}</Font>}
      {desc && (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            style={{
              marginRight: 5,
              fontSize: 25,
              color: useThemedValue("#000", "#FFF"),
            }}
            name="information-circle"
          />
          <Font style={{ flex: 1, flexWrap: "wrap", fontStyle: "normal" }}>
            {desc}
          </Font>
        </View>
      )}

      {children}
    </View>
  );
}
