import {
  Footer,
  ThemedPageView,
  Header,
  MainBodyCard,
  Font,
  useData,
} from "@/components";
import React from "react";
import { TextInput, View } from "react-native";

export default function Settings() {
  const { lcURL, setlcURL } = useData();
  return (
    <ThemedPageView>
      <Header />
      <MainBodyCard>
        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Font>Vanakkam. I am developer settings page. Backend IP:</Font>
          <TextInput
            style={{
              height: 50,
              width: "100%",
              borderRadius: 25,
              backgroundColor: "#D9D9D9",
              paddingHorizontal: 10,
              fontSize: 25,
              fontFamily: "LexendExa_400Regular",
              marginVertical: 10,
              borderColor: "#000",
              borderWidth: 5
            }}
            value={lcURL}
            onChangeText={setlcURL}
            placeholder="192.168.1.2:8000"
          ></TextInput>
        </View>
      </MainBodyCard>
      <Footer />
    </ThemedPageView>
  );
}
