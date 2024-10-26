import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
import Mapbox, {
  MapView,
  Camera,
  PointAnnotation,
  UserTrackingMode,
  LocationPuck,
} from "@rnmapbox/maps";
import Font from "./Font";

Mapbox.setAccessToken(
  "<use ur mapbox access token here>"
);

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: "black",
  },
  map: {
    flex: 1,
  },
  dustbinMarker: {
    width: 20,
    height: 20,
    backgroundColor: "green",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
  },
});

const MapComponent = ({
  dustbinLocations,
  userLocation,
  locationPermissionGranted,
  width,
  height,
}) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
        }
      } else {
        setHasLocationPermission(true);
      }
    };

    requestLocationPermission();
  }, []);

  const renderDustbinAnnotations = () => {
    return dustbinLocations.map((dustbin, index) => (
      <PointAnnotation
        key={`dustbin-${index}`}
        id={`dustbin-${index}`}
        coordinate={[dustbin.longitude, dustbin.latitude]}
      >
        <View style={styles.dustbinMarker} />
      </PointAnnotation>
    ));
  };

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      {hasLocationPermission && (
        <MapView style={styles.map} styleURL={Mapbox.StyleURL.Street}>
          <Camera
            followZoomLevel={17}
            followUserLocation={true}
            followUserMode={UserTrackingMode.Follow}
          />
          <LocationPuck
            visible={true}
            puckBearing="heading"
            puckBearingEnabled={true}
          />
          {renderDustbinAnnotations()}
        </MapView>
      )}
    </View>
  );
};

export default MapComponent;
