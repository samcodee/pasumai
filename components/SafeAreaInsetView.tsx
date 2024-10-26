import { View } from "moti";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeAreaInsetView({
  children,
}: {
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </View>
  );
}
