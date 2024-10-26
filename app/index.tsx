import { View, StyleSheet, Pressable } from "react-native";
import useThemedValue from "@/hooks/useThemedValue";
import { MotiView } from "moti";
import { MainBodyCard, Footer, Header, ThemedPageView } from "@/components/";
import { router } from "expo-router";
import { Font, HomeCard, NewsDetail, Divider } from "@/components/";

export default function Index() {
  return (
    <ThemedPageView>
      <Header />
      <MainBodyCard>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100 }}
        >
          <HomeCard color="green">
            <View style={{ display: "flex", alignItems: "center" }}>
              <Font style={{ fontSize: 28 }}>Click! Trash! Earn!</Font>
              <Pressable
                onPress={() => {
                  router.navigate("/map");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#82D2FA",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 4,
                }}
              >
                <Font
                  overrideDarkStyle={true}
                  style={{ textAlign: "center", fontSize: 30 }}
                >
                  Get Started!
                </Font>
              </Pressable>
            </View>
          </HomeCard>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 250 }}
        >
          <HomeCard heading="PREDICTIONS" color="green">
            <Pressable
              onPress={() => {
                router.navigate("/predict");
              }}
            >
              <View style={{ display: "flex" }}>
                <Font style={styles.eventCardBodyHead}>
                  Guess waste generated in a Cricket Stadium!
                </Font>
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: useThemedValue("#D9D9D9", "#0A0A0A"),
                    borderColor: "#D9D9D9",
                    borderWidth: useThemedValue(0, 3),
                    borderRadius: 25,
                    padding: 5,
                    paddingHorizontal: 10,
                    marginTop: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Font style={{ fontSize: 20, color: "#747474" }}>
                    30,000 kg
                  </Font>
                </View>
              </View>
            </Pressable>
          </HomeCard>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400 }}
        >
          <HomeCard
            heading="LEADERBOARDS"
            color="yellow"
            desc="How you compare against others in your locality!"
          >
            <Pressable
              onPress={() => {
                router.navigate("/map");
              }}
              style={styles.lbCardBody}
            >
              <Font style={{ fontSize: 28 }}>Your Position:</Font>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Font style={{ fontSize: 36 }}>#24</Font>
                <Font style={{ fontSize: 36, color: "#747474" }}>/50</Font>
              </View>
            </Pressable>
          </HomeCard>
        </MotiView>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 550 }}
        >
          <HomeCard
            heading="BOOSTERS"
            desc="Earnings are multiplied on these days!"
            color="orange"
            style={{ marginBottom: 30 }}
          >
            <Pressable
              onPress={() => {
                router.navigate("/map");
              }}
            >
              <NewsDetail day="World Animal Day" date="4th Oct" boost={1.2} />
              <Divider />
              <NewsDetail day="World Food Day" date="16th Oct" boost={1.8} />
              <Divider />
              <NewsDetail day="United Nations Day" date="24th Oct" boost={2} />
            </Pressable>
          </HomeCard>
        </MotiView>
      </MainBodyCard>

      <Footer />
    </ThemedPageView>
  );
}

const styles = StyleSheet.create({
  predictButton: {
    fontSize: 30,
  },
  // event card
  eventCardBodyContentView: {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventCardBodyHead: {
    fontSize: 22,
  },

  // leaderboard cards
  lbCardBody: {
    display: "flex",
    height: "auto",
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  // main card styles
  mainCard: {
    flexGrow: 1,
    width: "100%",
    marginBottom: 10,
    borderRadius: 25,
    padding: 15,
  },
});
