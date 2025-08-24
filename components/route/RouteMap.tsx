import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { RefObject } from "react";
import { Animated, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

interface RouteLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: string;
  type: "home" | "work" | "location" | "university" | "mall";
}

interface RouteMapProps {
  mapRef: RefObject<MapView | null>;
  currentLocation: Location.LocationObject | null;
  selectedOrigin: RouteLocation | null;
  selectedDestination: RouteLocation | null;
  showRoute: boolean;
  pulseAnim: Animated.Value;
  mapStyle: any[];
}

export const RouteMap = ({
  mapRef,
  currentLocation,
  selectedOrigin,
  selectedDestination,
  showRoute,
  pulseAnim,
  mapStyle,
}: RouteMapProps) => {
  const renderCurrentLocationMarker = () => {
    if (!currentLocation) return null;

    return (
      <Marker
        coordinate={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.currentLocationContainer}>
          <Animated.View
            style={[
              styles.currentLocationPulse,
              {
                opacity: pulseAnim,
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 2],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.currentLocationDot} />
        </View>
      </Marker>
    );
  };

  const renderRouteMarkers = () => {
    const markers = [];

    if (selectedOrigin) {
      markers.push(
        <Marker
          key="origin"
          coordinate={{
            latitude: selectedOrigin.latitude,
            longitude: selectedOrigin.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={[styles.routeMarker, { backgroundColor: "#10b981" }]}>
            <Ionicons name="location" size={16} color="#ffffff" />
          </View>
        </Marker>,
      );
    }

    if (selectedDestination) {
      markers.push(
        <Marker
          key="destination"
          coordinate={{
            latitude: selectedDestination.latitude,
            longitude: selectedDestination.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={[styles.routeMarker, { backgroundColor: "#ef4444" }]}>
            <Ionicons name="flag" size={16} color="#ffffff" />
          </View>
        </Marker>,
      );
    }

    return markers;
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 30.7333,
        longitude: 76.7794,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      customMapStyle={mapStyle}
      showsUserLocation={false}
      showsMyLocationButton={false}
    >
      {renderCurrentLocationMarker()}
      {renderRouteMarkers()}

      {/* Route polyline */}
      {showRoute && selectedOrigin && selectedDestination && (
        <Polyline
          coordinates={[
            {
              latitude: selectedOrigin.latitude,
              longitude: selectedOrigin.longitude,
            },
            {
              latitude: selectedDestination.latitude,
              longitude: selectedDestination.longitude,
            },
          ]}
          strokeColor="#3b82f6"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  currentLocationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationPulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    opacity: 0.3,
  },
  currentLocationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  routeMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
