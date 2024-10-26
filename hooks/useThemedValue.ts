// import { useColorScheme } from "react-native";
import { useTheme } from "@/components/ThemeContext";

const useThemedValue = <T>(lightValue: T, darkValue: T): T => {
  const { theme } = useTheme();
  // const theme = useColorScheme();
  return theme === "dark" ? darkValue : lightValue;
};

export default useThemedValue;
