import BottomSheet from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet, TextInput } from "react-native";
import MapView from "react-native-maps";

import { RouteBottomSheet } from "@/components/route/RouteBottomSheet";
import { RouteHeader } from "@/components/route/RouteHeader";
import { RouteInfoCard } from "@/components/route/RouteInfoCard";
import { RouteLoadingSkeleton } from "@/components/route/RouteLoadingSkeleton";
import { RouteMap } from "@/components/route/RouteMap";
import { RouteLocation, SAMPLE_LOCATIONS, MAP_STYLE } from "@/types/route";

const RouteSearchScreen = () => {
  // State
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<RouteLocation | null>(
    null,
  );
  const [selectedDestination, setSelectedDestination] =
    useState<RouteLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [showRoute, setShowRoute] = useState(false);

  // Refs
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchInputRef = useRef<TextInput>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Filtered locations
  const filteredLocations = SAMPLE_LOCATIONS.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get current location
  const getCurrentLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(location);

      // Animate to current location
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          1000,
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  // Handle location selection
  const handleLocationSelect = (location: RouteLocation) => {
    if (!selectedOrigin) {
      setSelectedOrigin(location);
    } else if (!selectedDestination) {
      setSelectedDestination(location);
      setShowRoute(true);
      // Animate to show both points
      if (mapRef.current) {
        mapRef.current.fitToCoordinates(
          [
            {
              latitude: selectedOrigin.latitude,
              longitude: selectedOrigin.longitude,
            },
            { latitude: location.latitude, longitude: location.longitude },
          ],
          {
            edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
            animated: true,
          },
        );
      }
    } else {
      // Reset and start new route
      setSelectedOrigin(location);
      setSelectedDestination(null);
      setShowRoute(false);
    }
    setSearchQuery("");
    bottomSheetRef.current?.snapToIndex(0);
  };

  // Clear route
  const clearRoute = () => {
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setShowRoute(false);
  };

  // Pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // Initialize location
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  if (isLoadingLocation) {
    return <RouteLoadingSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <RouteHeader onClear={clearRoute} />

      <RouteMap
        mapRef={mapRef}
        currentLocation={currentLocation}
        selectedOrigin={selectedOrigin}
        selectedDestination={selectedDestination}
        showRoute={showRoute}
        pulseAnim={pulseAnim}
        mapStyle={MAP_STYLE}
      />

      {showRoute && selectedOrigin && selectedDestination && (
        <RouteInfoCard
          selectedOrigin={selectedOrigin}
          selectedDestination={selectedDestination}
        />
      )}

      <RouteBottomSheet
        bottomSheetRef={bottomSheetRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
        filteredLocations={filteredLocations}
        selectedOrigin={selectedOrigin}
        selectedDestination={selectedDestination}
        onLocationSelect={handleLocationSelect}
      />
    </SafeAreaView>
  );
};

export default RouteSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
