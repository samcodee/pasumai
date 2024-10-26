import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Redeemable,
  MainBodyCard,
  Footer,
  Header,
  ThemedPageView,
} from "@/components/";

export default function Store() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedPageView>
      <Header />
      <MainBodyCard>
        <Redeemable index={1} title="Amazon Pay" cost={129} value={50} />
        <Redeemable index={2} title="Google Pay" cost={132} value={60} />
        <Redeemable
          index={3}
          title="Jute Bag"
          image="jute_bag"
          cost={129}
          value={50}
        />
        <Redeemable
          index={4}
          title="Recycled Books"
          image="book"
          cost={132}
          value={75}
        />
        <Redeemable
          index={5}
          title="Recycled Fabric"
          image="fabric"
          cost={531}
          value={124}
        />
        <Redeemable
          index={6}
          title="Green Groceries"
          image="vege"
          cost={312}
          value={301}
        />
        <Redeemable index={7} title="Demo" cost={1} value={1} />
      </MainBodyCard>
      <Footer />
    </ThemedPageView>
  );
}
