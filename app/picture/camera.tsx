import React, { useRef } from "react";
import { Font } from "@/components";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaInsetView, useData } from "@/components";
import { Image } from "moti";
import { router } from "expo-router";

export default function Picture() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { setData } = useData();

  const cameraRef = useRef<CameraView>(null);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    if (response) {
      console.log("Picture URI:", response.uri);
      setData((prevState) => {
        return {
          image: response.uri,
          nearestDustbinDistance: prevState.nearestDustbinDistance,
          nearestDustbinLocation: prevState.nearestDustBinLocation,
          currentLocation: prevState.currentLocation,
        };
      });
      router.navigate("/picture/detect");
    }
  }

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View>
          <Font overrideDarkStyle={true} style={styles.permissionText}>
            This app requires your permission to use the camera!
          </Font>
          <Button onPress={requestCameraPermission} title="Grant Permission" />
        </View>
      </View>
    );
  }

  return (
    <CameraView
      ref={cameraRef}
      style={styles.camera}
      mode={"picture"}
      facing={"back"}
      ratio="16:9"
      pictureSize="1536x1040"
    >
      <SafeAreaInsetView>
        <View style={styles.instructionContainer}>
          <Font style={styles.instructionText}>
            Press the shutter button with the trash on frame!
          </Font>
        </View>
        <View style={styles.frameContainer}>
          <Image
            source={require("../../assets/images/frame.png")}
            style={styles.frame}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
            <Ionicons
              name={"ellipse-outline"}
              style={styles.shutter}
              size={80}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaInsetView>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    backgroundColor: "#0A0A0A",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  permissionText: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },
  camera: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  instructionContainer: {
    width: "95%",
    margin: 10,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 25,
    padding: 10,
  },
  instructionText: {
    flexWrap: "wrap",
    textAlign: "center",
    color: "#FFF",
  },
  distanceContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  distanceText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  frameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  frame: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 32,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  shutter: {
    fontWeight: "bold",
    color: "white",
  },
});
