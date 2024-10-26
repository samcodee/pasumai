import { Slot } from "expo-router";
import { LexendExa_400Regular } from "@expo-google-fonts/lexend-exa";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  DataProvider,
  usePoints,
  PointsProvider,
  ThemeProvider,
} from "@/components";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LexendExa_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <PointsProvider>
      <DataProvider>
        <ThemeProvider>
          <StatusBar style="inverted" />
          <Slot />
        </ThemeProvider>
      </DataProvider>
    </PointsProvider>
  );
}
