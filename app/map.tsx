import React, { useState, useEffect, useRef } from "react";
import { Font, ThemedPageView, useData } from "@/components";
import { StyleSheet, View, ActivityIndicator, Pressable } from "react-native";
import * as Location from "expo-location";
import { getDistance, orderByDistance } from "geolib";
import { router } from "expo-router";
import MapScreen from "@/components/MapScreen";

// Types
type DustbinLocation = {
  id: number;
  latitude: number;
  longitude: number;
};

interface LocationState {
  status: "waiting" | "error" | "success";
  location: Location.LocationObject | null;
  errorMsg: string | null;
}

const dustbinLocations: DustbinLocation[] = [
  { id: 1, latitude: 32.02998, longitude: 35.57393 },
  { id: 2, latitude: 45.26688, longitude: -75.52865 },
  { id: 3, latitude: -40.42840, longitude: 17.58326 },
  { id: 4, latitude: -49.76628, longitude: 6.45403 },
  { id: 5, latitude: -3.19787, longitude: -51.74001 }, 
];

export default function Picture() {
  const [locationState, setLocationState] = useState<LocationState>({
    status: "waiting",
    location: null,
    errorMsg: null,
  });
  const [nearestDustbinDistance, setNearestDustbinDistance] = useState<
    number | null
  >(null);
  const [nearestDustbinLocation, setNearestDustbinLocation] =
    useState<DustbinLocation | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );
  const [nearBin, setNearBin] = useState<boolean>(false);
  const { setData } = useData();
  useEffect(() => {
    let isMounted = true;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        if (isMounted) {
          setLocationState({
            status: "error",
            location: null,
            errorMsg: "Permission to access location was denied",
          });
        }
        return;
      }

      let backgroundPermission =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status !== "granted") {
        if (isMounted) {
          setLocationState({
            status: "error",
            location: null,
            errorMsg: "Permission to access background location was denied",
          });
        }
        return;
      }

      try {
        locationSubscription.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (newLocation) => {
            if (isMounted) {
              setLocationState({
                status: "success",
                location: newLocation,
                errorMsg: null,
              });

              const nearbyDustbins = getNearbyDustbins(
                newLocation.coords,
                dustbinLocations,
                50
              );
              setNearBin(true);
              if (nearbyDustbins.length === 0) {
                setNearBin(false);
              }
            }
          }
        );
      } catch (error) {
        if (isMounted) {
          setLocationState({
            status: "error",
            location: null,
            errorMsg: "Failed to get location",
          });
        }
      }
    })();

    return () => {
      isMounted = false;
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);
  const getNearbyDustbins = (
    currentLocation,
    dustbins: DustbinLocation[],
    radius: number
  ): DustbinLocation[] => {
    const orderedLocations = orderByDistance(
      currentLocation,
      dustbins
    ) as DustbinLocation[];
    const nearest = orderedLocations[0];
    const distance = getDistance(currentLocation, nearest);

    setNearestDustbinDistance(distance);
    setNearestDustbinLocation(nearest);

    console.log("Nearest Dustbin Distance:", distance);
    console.log("Nearest Dustbin Location:", nearest);

    return orderedLocations.filter(
      (dustbin) => getDistance(currentLocation, dustbin) <= radius
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <MapScreen
        width={"100%"}
        height={"70%"}
        dustbinLocations={dustbinLocations}
        locationPermissionGranted={true}
        userLocation={locationState.location?.coords}
      />
      <View
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Font style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
            {locationState.status === "waiting" || nearestDustbinDistance > 50
              ? "Finding nearby dustbins..."
              : "Found nearby dustbins!"}
          </Font>
          {locationState.status === "success" && (
            <Font style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Nearest PASUMAI dustbin is in: {"\n"} ~{nearestDustbinDistance}{" "}
              metres
            </Font>
          )}
        </View>

        <Pressable
          style={{
            width: "95%",
            height: 40,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "#D9D9D9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            marginBottom: 25,
            marginTop: 25,
          }}
          onPress={() => {
            if (nearBin) {
              setData((prevState) => {
                return {
                  image: "",
                  nearestDustbinDistance: nearestDustbinDistance,
                  nearestDustbinLocation: nearestDustbinLocation,
                  currentLocation: locationState.location?.coords,
                };
              });
              router.navigate("/picture/camera");
            } else {
              router.navigate("/");
            }
          }}
        >
          <Font style={{ color: "black" }}>
            {nearBin ? "I am ready!" : "Go Back"}
          </Font>
        </Pressable>
      </View>
    </View>
  );
}
