import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import MapView from "react-native-maps";

// Components
import { DriversCard } from "@/components/ride/DriversCard";
import { HeaderControls } from "@/components/ride/HeaderControls";
import { LoadingState } from "@/components/ride/LoadingState";
import { RideBottomSheet } from "@/components/ride/RideBottomSheet";
import { RideMap } from "@/components/ride/RideMap";

// Hooks
import { useDrivers } from "@/hooks/useDrivers";
import { useLocation } from "@/hooks/useLocation";

// Constants and Types
import { MOCK_DESTINATIONS } from "@/constants/RideConstants";
import type { PreviousDestination } from "@/types/ride";

const Customer = () => {
  // Custom hooks
  const { location, errorMsg, isLocationLoading, getCurrentLocation } =
    useLocation();
  const { nearbyDrivers, getVehicleColor } = useDrivers(location);

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [previousDestinations] =
    useState<PreviousDestination[]>(MOCK_DESTINATIONS);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchInputRef = useRef<TextInput>(null);
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  // Memoized values
  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return previousDestinations;
    return previousDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, previousDestinations]);

  // Pulse animation for user location
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnimation]);

  // Event handlers
  const handleDestinationSelect = useCallback(
    (destination: PreviousDestination) => {
      Alert.alert(
        "Select Destination",
        `Would you like to go to ${destination.name}?\n${destination.address}`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Book Ride",
            onPress: () => {
              console.log("Navigate to:", destination.name);
              bottomSheetRef.current?.close();
            },
          },
        ],
      );
    },
    [],
  );

  const handleMenuPress = useCallback(() => {
    console.log("Open menu");
  }, []);

  // Effects
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Loading state
  const loadingState = (
    <LoadingState
      isLocationLoading={isLocationLoading}
      errorMsg={errorMsg}
      location={location}
      onRetry={() => getCurrentLocation()}
    />
  );

  if (isLocationLoading || !location) {
    return loadingState;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderControls onMenuPress={handleMenuPress} />

      <RideMap
        mapRef={mapRef}
        location={location}
        nearbyDrivers={nearbyDrivers}
        previousDestinations={previousDestinations}
        pulseAnimation={pulseAnimation}
        onDestinationSelect={handleDestinationSelect}
      />

      <DriversCard nearbyDriversLength={nearbyDrivers.length} />

      <RideBottomSheet
        bottomSheetRef={bottomSheetRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        searchInputRef={searchInputRef}
        filteredDestinations={filteredDestinations}
        onDestinationSelect={handleDestinationSelect}
        getVehicleColor={getVehicleColor}
      />
    </SafeAreaView>
  );
};

export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
