import { Ionicons } from "@expo/vector-icons";
import { RefObject } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const { height } = Dimensions.get("window");

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface ChooseRideMapProps {
  mapRef: RefObject<MapView | null>;
  pickup: Coordinate;
  destination: Coordinate;
  pulseAnimation: Animated.Value;
  mapStyle: any[];
}

export const ChooseRideMap = ({
  mapRef,
  pickup,
  destination,
  pulseAnimation,
  mapStyle,
}: ChooseRideMapProps) => {
  const routeCoordinates = [pickup, destination];

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: (pickup.latitude + destination.latitude) / 2,
          longitude: (pickup.longitude + destination.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={mapStyle}
      >
        {/* Pickup Marker */}
        <Marker coordinate={pickup} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.pickupMarkerContainer}>
            <Animated.View
              style={[
                styles.pickupPulse,
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
            <View style={styles.pickupMarker}>
              <Ionicons name="location" size={16} color="#ffffff" />
            </View>
          </View>
        </Marker>

        {/* Destination Marker */}
        <Marker coordinate={destination} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.destinationMarker}>
            <Ionicons name="flag" size={16} color="#ffffff" />
          </View>
        </Marker>

        {/* Route Line */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#3b82f6"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
      </MapView>

      {/* Location Info Cards */}
      <View style={styles.locationCards}>
        <View style={styles.locationCard}>
          <View style={styles.locationDot} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Pickup point</Text>
            <Text style={styles.locationName}>T1, 6301</Text>
          </View>
        </View>

        <View style={styles.locationCard}>
          <View style={[styles.locationDot, { backgroundColor: "#ef4444" }]} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Destination</Text>
            <Text style={styles.locationName}>Potter&apos;s Cay</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: height * 0.4,
    position: "relative",
  },
  pickupMarkerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickupPulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    opacity: 0.3,
  },
  pickupMarker: {
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
  destinationMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  locationCards: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    gap: 12,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
    fontWeight: "500",
  },
  locationName: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
});
