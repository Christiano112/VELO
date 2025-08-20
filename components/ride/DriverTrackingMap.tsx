import { Ionicons } from "@expo/vector-icons";
import React, { RefObject, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface DriverTrackingMapProps {
  mapRef: RefObject<MapView | null>;
  userLocation: Coordinate;
  driverLocation: Coordinate;
  pickupLocation: Coordinate;
  routeCoordinates: Coordinate[];
  onBackPress: () => void;
  pulseAnimation?: Animated.Value;
}

export const DriverTrackingMap = ({
  mapRef,
  userLocation,
  driverLocation,
  pickupLocation,
  routeCoordinates,
  onBackPress,
  pulseAnimation,
}: DriverTrackingMapProps) => {
  // Auto-fit map to show all markers
  useEffect(() => {
    if (mapRef.current) {
      const coordinates = [userLocation, driverLocation, pickupLocation];
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 300,
          left: 50,
        },
        animated: true,
      });
    }
  }, [mapRef, userLocation, driverLocation, pickupLocation]);

  // Update map when driver location changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: (driverLocation.latitude + pickupLocation.latitude) / 2,
          longitude: (driverLocation.longitude + pickupLocation.longitude) / 2,
          latitudeDelta:
            Math.abs(driverLocation.latitude - pickupLocation.latitude) * 1.5,
          longitudeDelta:
            Math.abs(driverLocation.longitude - pickupLocation.longitude) * 1.5,
        },
        1000,
      );
    }
  }, [driverLocation, pickupLocation, mapRef]);
  const mapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
  ];

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: (userLocation.latitude + driverLocation.latitude) / 2,
          longitude: (userLocation.longitude + driverLocation.longitude) / 2,
          latitudeDelta:
            Math.abs(userLocation.latitude - driverLocation.latitude) * 2 ||
            0.02,
          longitudeDelta:
            Math.abs(userLocation.longitude - driverLocation.longitude) * 2 ||
            0.02,
        }}
        customMapStyle={mapStyle}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={false}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        {/* User Location Marker */}
        <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.userMarkerContainer}>
            {pulseAnimation && (
              <Animated.View
                style={[
                  styles.userPulse,
                  {
                    opacity: pulseAnimation,
                    transform: [
                      {
                        scale: pulseAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
            <View style={styles.userMarker}>
              <Ionicons name="person" size={16} color="#ffffff" />
            </View>
          </View>
        </Marker>

        {/* Driver Location Marker */}
        <Marker
          coordinate={driverLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          title="Driver Location"
          description="Your driver is here"
        >
          <View style={styles.driverMarker}>
            <Ionicons name="car" size={20} color="#ffffff" />
          </View>
        </Marker>

        {/* Pickup Location Marker */}
        <Marker
          coordinate={pickupLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          title="Pickup Point"
          description="Meet your driver here"
        >
          <View style={styles.pickupMarker}>
            <Ionicons name="location" size={16} color="#ffffff" />
          </View>
        </Marker>

        {/* Route Line */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#6e00cc"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />
        )}
      </MapView>

      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={20} color="#394347" />
      </Pressable>

      {/* Pickup Location Info */}
      <View style={styles.pickupLocationContainer}>
        <Text style={styles.pickupLocationText}>Pickup Location</Text>
        <Ionicons name="chevron-down" size={16} color="#394347" />
      </View>

      {/* Current Location Button */}
      <Pressable
        style={styles.currentLocationButton}
        onPress={() => {
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              1000,
            );
          }
        }}
      >
        <Ionicons name="locate" size={20} color="#6e00cc" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  userMarkerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  userPulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    opacity: 0.3,
  },
  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  driverMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6e00cc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pickupMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 20,
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8ecf4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  pickupLocationContainer: {
    position: "absolute",
    top: 100,
    left: 117,
    width: 136,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 16,
  },
  pickupLocationText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#394347",
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 320,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8ecf4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
