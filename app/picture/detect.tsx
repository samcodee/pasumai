import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Font, useData, usePoints } from "@/components";
import { router } from "expo-router";

export default function Detect() {
  const { data, setData, lcURL } = useData();
  const {
    image,
    nearestDustbinDistance,
    nearestDustbinLocation,
    currentLocation,
  } = data;
  const [label, setLabel] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addPoints } = usePoints();

  useEffect(() => {
    if (image && lcURL) {
      classifyImage(image);
      console.log(data);
    }
  }, [image, lcURL]);

  const classifyImage = async (uri: string) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await fetch(`http://${lcURL.toString()}/classify`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.label) {
        const detectedLabel = result.label;
        setLabel(detectedLabel);

        if (detectedLabel.toLowerCase().includes("plastic")) {
          setPoints(11);
        } else if (detectedLabel.toLowerCase().includes("paper")) {
          setPoints(4);
        } else if (detectedLabel.toLowerCase().includes("bottle")) {
          setPoints(10);
        } else if (detectedLabel.toLowerCase().includes("biological")) {
          setPoints(0);
        } else if (detectedLabel.toLowerCase().includes("battery")) {
          setPoints(4);
        } else if (detectedLabel.toLowerCase().includes("cardboard")) {
          setPoints(4);
        } else if (detectedLabel.toLowerCase().includes("glass")) {
          setPoints(6);
        } else if (detectedLabel.toLowerCase().includes("metal")) {
          setPoints(10);
        } else if (detectedLabel.toLowerCase().includes("shoes")) {
          setPoints(7);
        } else if (detectedLabel.toLowerCase().includes("bag")) {
          setPoints(10);
        } else if (detectedLabel.toLowerCase().includes("toilet")) {
          setPoints(8);
        } else if (detectedLabel.toLowerCase().includes("oil")) {
          setPoints(6);
        } else if (detectedLabel.toLowerCase().includes("can")) {
          setPoints(12);
        } else {
          setPoints(0);
        }
      } else {
        console.error("Error from backend:", result.error);
      }
      console.log("Image classification result:", result.label);
      setIsLoading(false);
    } catch (error) {
      console.error("Error classifying image:", error);
      setIsLoading(false);
    }
  };

  if (!image) {
    return (
      <View style={styles.container}>
        <Text>No image available.</Text>
        <Button title="Go Back" onPress={() => router.replace("/")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Font style={{ fontSize: 30, textAlign: "justify" }}>
          {label
            ? `This trash is valued for ${points} points`
            : "Classifying..."}
        </Font>
      )}
      {nearestDustbinDistance !== null && (
        <View style={styles.dustbinInfo}>
          <Font style={styles.text}>
            Nearest dustbin is {nearestDustbinDistance} meters away
          </Font>
          <Font style={styles.text}>
            Your Coordinates: ({currentLocation.latitude},{" "}
            {currentLocation.longitude})
          </Font>
        </View>
      )}
      <Pressable
        onPress={() => {
          setData((prevState) => {
            return { ...prevState, points: points };
          });
          router.replace("/picture/verify");
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1f81b3",
          padding: 16,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 4,
        }}
      >
        <Font style={{ color: "#FFF", fontSize: 20 }}>Trash it!</Font>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  dustbinInfo: {
    marginTop: 20,
  },
});
