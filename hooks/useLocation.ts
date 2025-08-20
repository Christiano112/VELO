import { useState, useCallback } from "react";
import * as Location from "expo-location";
import { LOCATION_SETTINGS, DEFAULT_LOCATION } from "@/constants/RideConstants";
import type { LocationRegion } from "@/types/ride";

export const useLocation = () => {
  const [location, setLocation] = useState<LocationRegion | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission denied. Using default location.");
        setLocation(DEFAULT_LOCATION);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Permission error:", error);
      setErrorMsg("Failed to request location permission.");
      setLocation(DEFAULT_LOCATION);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) setIsRefreshing(true);
        else setIsLocationLoading(true);

        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        const currentLocation =
          await Location.getCurrentPositionAsync(LOCATION_SETTINGS);
        const newLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setLocation(newLocation);
        setErrorMsg(null);
        return newLocation;
      } catch (error) {
        console.error("Location error:", error);
        setErrorMsg("Failed to get location. Using default location.");
        setLocation(DEFAULT_LOCATION);
        return DEFAULT_LOCATION;
      } finally {
        setIsLocationLoading(false);
        setIsRefreshing(false);
      }
    },
    [requestLocationPermission],
  );

  return {
    location,
    errorMsg,
    isLocationLoading,
    isRefreshing,
    getCurrentLocation,
  };
};
