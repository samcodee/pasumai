import React from "react";
import HomeCard from "./HomeCard";
import Font from "./Font";
import { Image, Pressable, View } from "react-native";
import { router } from "expo-router";
import { MotiView } from "moti";
import { usePoints } from "./PointsContext";

export default function Redeemable({
  title,
  value,
  cost,
  index,
  image,
}: {
  title: string;
  value: number;
  cost: number;
  index: number;
  image?: string;
}) {
  const { points, addPoints } = usePoints();
  const getImage = () => {
    if (image === undefined) {
      return <></>;
    } else if (image === "jute_bag") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../assets/images/jute_bag.jpg")}
        />
      );
    } else if (image === "book") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../assets/images/books.jpg")}
        />
      );
    } else if (image === "fabric") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../assets/images/recycled_fabric.jpeg")}
        />
      );
    } else if (image === "vege") {
      return (
        <Image
          style={{ borderRadius: 25, width: 100, height: 100 }}
          source={require("../assets/images/vegetables.jpg")}
        />
      );
    }
  };
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 * index }}
    >
      <View>
        <HomeCard heading={title} color="green">
          {getImage()}
          <Font style={{ fontSize: 28 }}>{cost} points</Font>
          <Font>Worth: {value} INR</Font>
          <Pressable
            onPress={() => {
              if (points.totalPoints < cost) {
                return;
              } else if (points.totalPoints >= cost) {
                addPoints(0-cost)
              }
              router.navigate(`/store/${title}?type=${image === "jute_bag" || image === "book" || image === "fabric" || image === "vege" ? "physical" : "digital"}&imageUrl=${image}`);
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
              justifyContent: "center",
            }}
          >
            <Font
              overrideDarkStyle={true}
              style={{ textAlign: "center", fontSize: 20 }}
            >
              Redeem!{" "}
            </Font>
          </Pressable>
        </HomeCard>
      </View>
    </MotiView>
  );
}