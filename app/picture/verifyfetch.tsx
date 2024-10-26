import React, { useEffect, useState } from "react";
import { Font, useData } from "@/components";
import { View, Text, Pressable } from "react-native";
import axios from "axios";
import { usePoints } from "@/components";
import { router } from "expo-router";
import { Image } from "react-native";

export default function VerifyFetch() {
  const image1 = require("../../assets/images/earth1.png");
  const image2 = require("../../assets/images/earth2.png");
  const image3 = require("../../assets/images/earth3.png");
  const { data, lcURL } = useData();
  const [validationResult, setValidationResult] = useState(null);
  const { addPoints } = usePoints();

  const getImage = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
      case 1:
        return image1;
      case 2:
        return image2;
      case 3:
        return image3;
      default:
        return image1;
    }
  };

  useEffect(() => {
    const validateQRCode = async () => {
      const response = await axios.post(`http://${lcURL.toString()}/verify-otp`, {
        otp: data.qr,
      });
      console.log(response.data.status);
      setValidationResult(response.data.status);
    };
    validateQRCode();
    console.log("QR code validation result:", validationResult);
  }, [data.qr, lcURL]);

  if (validationResult === "Error!") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Font style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          Some error occurred while validating the QR code. Please try again.
        </Font>

        <Font style={{ color: "white", fontSize: 30, textAlign: "center" }}>
          {":("}
        </Font>

        <Pressable
          onPress={() => {
            router.navigate("/");
          }}
        >
          <Font
            style={{
              color: "#a7a7a7",
              fontSize: 18,
              marginTop: 20,
              textDecorationLine: "underline",
            }}
          >
            Go Back!
          </Font>
        </Pressable>
      </View>
    );
  } else if (validationResult === "valid") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Font style={{ color: "white", fontSize: 24 }}>
          Successfully Trashed!
        </Font>
        <Font
          style={{
            color: "white",
            fontSize: 24,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Humanity is now a step towards a pollution-free, green environment!
        </Font>
        <Image
          source={getImage()}
          style={{ width: 350, height: 350, marginVertical: 20 }}
        />
        <Font style={{ color: "white", fontSize: 30, marginTop: 20 }}>
          +{data.points} Points
        </Font>
        <Pressable
          onPress={() => {
            addPoints(data.points);
            router.navigate("/");
          }}
        >
          <Font
            style={{
              color: "#a7a7a7",
              fontSize: 18,
              marginTop: 20,
              textDecorationLine: "underline",
            }}
          >
            Go Back!
          </Font>
        </Pressable>
      </View>
    );
  } else if (validationResult === "invalid") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Font style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          The QR Code was not valid. Please try again.
        </Font>
        <Pressable
          onPress={() => {
            router.navigate("/");
          }}
        >
          <Font
            style={{
              color: "#a7a7a7",
              fontSize: 18,
              marginTop: 20,
              textDecorationLine: "underline",
            }}
          >
            Go Back!
          </Font>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Font style={{ color: "white", fontSize: 30, textAlign: "center" }}>
          A nearby PASUMAI dustbin has opened.
        </Font>
        <Font
          style={{
            color: "white",
            fontSize: 24,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          You have 15s to dispose the trash.
        </Font>
      </View>
    );
  }
}
