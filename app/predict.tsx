import {
  Header,
  MainBodyCard,
  ThemedPageView,
  Font,
  Footer,
  HomeCard,
} from "@/components";
import { MotiView } from "moti";
import React from "react";
import { TextInput, View } from "react-native";

export default function Predict() {
  return (
    <ThemedPageView>
      <Header />
      <MainBodyCard>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 50 }}
        >
          <HomeCard color="green" heading="CURRENT EVENT">
            <View style={{ flex: 1, alignItems: "center" }}>
              <Font style={{ fontSize: 35 }}>Cricket Match</Font>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Font style={{ fontSize: 18 }}>People:</Font>
                <Font style={{ fontSize: 18 }}>32,240</Font>
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Font style={{ fontSize: 18 }}>6th September</Font>

                <Font style={{ fontSize: 18 }}>7:00 PM</Font>
              </View>
            </View>
          </HomeCard>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 250 }}
        >
          <HomeCard
            color="yellow"
            heading="YOUR PREDICTIONS"
            desc="The closest prediction wins!"
          >
            <View style={{}}>
              <MotiView
                style={{ marginVertical: 10 }}
                from={{ translateX: 400, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 250 }}
              >
                <Font style={{ fontSize: 24 }}>
                  How much waste would be generated?
                </Font>
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
                  }}
                  placeholder="40,000kg"
                ></TextInput>
                <View
                  style={{
                    backgroundColor: "#ADDB9F",
                    borderRadius: 100,
                    padding: 5,
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Font style={{ fontSize: 22 }} overrideDarkStyle={true}>
                    Reward: 200 points
                  </Font>
                </View>
              </MotiView>

              <MotiView
                style={{ marginVertical: 10 }}
                from={{ translateX: 400, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 350 }}
              >
                <Font style={{ fontSize: 24 }}>
                  How much waste would be plastic waste?
                </Font>
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
                  }}
                  placeholder="17,200kg"
                ></TextInput>
                <View
                  style={{
                    backgroundColor: "#ADDB9F",
                    borderRadius: 100,
                    padding: 5,
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Font style={{ fontSize: 22 }} overrideDarkStyle={true}>
                    Reward: 200 points
                  </Font>
                </View>
              </MotiView>
              <MotiView
                style={{ marginTop: 10 }}
                from={{ translateX: 400, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 450 }}
              >
                <Font style={{ fontSize: 24 }}>
                  How much waste would be recycled?
                </Font>
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
                  }}
                  placeholder="120kg"
                ></TextInput>
                <View
                  style={{
                    backgroundColor: "#ADDB9F",
                    borderRadius: 100,
                    padding: 5,
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Font style={{ fontSize: 22 }} overrideDarkStyle={true}>
                    Reward: 100 points
                  </Font>
                </View>
              </MotiView>
            </View>
          </HomeCard>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 550 }}
        >
          <HomeCard
            color="orange"
            heading="NEXT EVENT"
            style={{ marginBottom: 30 }}
            desc="Person with highest number of points wins!"
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Font style={{ fontSize: 35 }}>KOTH event</Font>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Font style={{ fontSize: 18 }}>12th September</Font>
                <Font style={{ fontSize: 18 }}>Lasts 12h</Font>
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Font style={{ fontSize: 18 }}>Reward:</Font>
                <Font style={{ fontSize: 18 }}>300 points</Font>
              </View>
            </View>
          </HomeCard>
        </MotiView>
      </MainBodyCard>
      <Footer />
    </ThemedPageView>
  );
}
