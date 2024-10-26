import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Font, Footer, Header, HomeCard, ThemedPageView } from "@/components";
import { MotiView } from "moti";
import { Image } from "react-native";

export default function Redeemed() {
  const { name, type, imageUrl } = useLocalSearchParams();
  const getImage = (image) => {
    if (image === undefined) {
      return <></>;
    } else if (image === "jute_bag") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../../assets/images/jute_bag.jpg")}
        />
      );
    } else if (image === "book") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../../assets/images/books.jpg")}
        />
      );
    } else if (image === "fabric") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../../assets/images/recycled_fabric.jpeg")}
        />
      );
    } else if (image === "vege") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../../assets/images/vegetables.jpg")}
        />
      );
    }
  };
  return (
    <ThemedPageView>
      <Header />
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 }}
        style={{
          height: "100%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HomeCard heading={name.toString()} color="green" style={{justifyContent: "center", alignItems:"center"}}>
          {getImage(imageUrl)}
          <Font>Redeem Successful!</Font>
          {type === "physical" ? (
            <Font>Item will be delivered to you soon.</Font>
          ) : (
            <Font>Amount has been credited.</Font>
          )}
        </HomeCard>
      </MotiView>
      <Footer />
    </ThemedPageView>
  );
}