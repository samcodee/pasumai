import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useThemedValue from "@/hooks/useThemedValue";
import { router, usePathname } from "expo-router";
import Font from "./Font";

const Footer = () => {
  const pathname = usePathname();
  const isActive = (route: string) => {
    if (route === "/") {
      return pathname === route;
    } else {
      return pathname.includes(route);
    }
  };

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: useThemedValue("#D9D9D9", "#222222"),
          borderWidth: useThemedValue(0, 3),
          borderColor: "#D9D9D9",
          height: 80,
          borderRadius: 35,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          router.navigate("/map");
        }}
        style={styles.cameraButtonContainer}
      >
        <Ionicons name="camera" style={styles.cameraIcon} />
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isActive("/") && { opacity: 0.5 },
        ]}
        onPress={() => !isActive("/") && router.navigate("/")}
        disabled={isActive("/")}
      >
        <Ionicons
          name="home"
          style={[styles.icon, { color: useThemedValue("#000", "#FFF") }]}
        />
        <Font style={styles.label}>Home</Font>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isActive("/store") && { opacity: 0.5 },
        ]}
        onPress={() => !isActive("/store") && router.navigate("/store")}
        disabled={isActive("/store")}
      >
        <MaterialIcons
          name="store"
          style={[styles.icon, { color: useThemedValue("#000", "#FFF") }]}
        />
        <Font style={styles.label}>Store</Font>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isActive("/predict") && { opacity: 0.5 },
        ]}
        onPress={() => !isActive("/predict") && router.navigate("/predict")}
        disabled={isActive("/predict")}
      >
        <Ionicons
          name="stats-chart"
          style={[styles.icon, { color: useThemedValue("#000", "#FFF") }]}
        />
        <Font style={styles.label}>Predict</Font>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          isActive("/settings") && { opacity: 0.5 },
        ]}
        onPress={() => !isActive("/settings") && router.navigate("/settings")}
        disabled={isActive("/settings")}
      >
        <Ionicons
          name="settings"
          style={[styles.icon, { color: useThemedValue("#000", "#FFF") }]}
        />
        <Font style={styles.label}>Settings</Font>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cameraButtonContainer: {
    backgroundColor: "#6979E3",
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "#FFF",
    borderWidth: 2,
    zIndex: 100,
  },
  cameraIcon: {
    fontSize: 35,
    color: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 120,
  },
  button: {
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 30,
  },
  label: {
    fontSize: 14,
  },
});

export default Footer;