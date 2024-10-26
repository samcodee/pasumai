import React from "react";
import { View } from "react-native";
import Font from "@/components/Font";

export default function NewsDetail({ day, date, boost}: {day:string, date:string, boost:number}) {
  return (
    <View
    style={{
        margin: 10
      }}
    >
      <Font style={{ fontSize: 26 }}>{day}</Font>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Font style={{ fontSize: 20 }}>{date}</Font>
        <View
          style={{
            backgroundColor: "#ADDB9F",
            borderRadius: 100,
            padding: 5,
          }}
        >
          <Font style={{ fontSize: 22 }} overrideDarkStyle={true}>{boost}x points</Font>
        </View>
      </View>
    </View>
  );
}
