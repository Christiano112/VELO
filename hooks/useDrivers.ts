import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { MAP_SETTINGS } from "@/constants/RideConstants";
import type { Driver, LocationRegion } from "@/types/ride";

export const useDrivers = (location: LocationRegion | null) => {
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([]);
  const driverUpdateRef = useRef<number | null>(null);

  const vehicleTypes = useMemo(
    () => ["standard", "premium", "xl"] as const,
    [],
  );

  const getVehicleColor = useCallback((type: Driver["type"]) => {
    switch (type) {
      case "premium":
        return "#8b5cf6";
      case "xl":
        return "#06b6d4";
      default:
        return "#374151";
    }
  }, []);

  const getVehicleIcon = useCallback((type: Driver["type"]) => {
    switch (type) {
      case "premium":
        return "car-sport";
      case "xl":
        return "bus";
      default:
        return "car";
    }
  }, []);

  const generateRandomDriver = useCallback(
    (index: number, baseLocation: LocationRegion): Driver => {
      const latOffset = (Math.random() - 0.5) * MAP_SETTINGS.driverRadius;
      const lngOffset = (Math.random() - 0.5) * MAP_SETTINGS.driverRadius;

      return {
        id: `driver-${index}`,
        latitude: baseLocation.latitude + latOffset,
        longitude: baseLocation.longitude + lngOffset,
        rotation: Math.random() * 360,
        eta: Math.floor(Math.random() * 8) + 2,
        type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
      };
    },
    [vehicleTypes],
  );

  const updateDriverPositions = useCallback(() => {
    setNearbyDrivers((prevDrivers) =>
      prevDrivers.map((driver) => ({
        ...driver,
        latitude: driver.latitude + (Math.random() - 0.5) * 0.0003,
        longitude: driver.longitude + (Math.random() - 0.5) * 0.0003,
        rotation: (driver.rotation + (Math.random() - 0.5) * 30) % 360,
        eta: Math.max(1, driver.eta + Math.floor((Math.random() - 0.5) * 2)),
      })),
    );
  }, []);

  const generateDrivers = useCallback(
    (baseLocation: LocationRegion) => {
      const drivers: Driver[] = [];
      for (let i = 0; i < MAP_SETTINGS.driverCount; i++) {
        drivers.push(generateRandomDriver(i, baseLocation));
      }
      setNearbyDrivers(drivers);
    },
    [generateRandomDriver],
  );

  useEffect(() => {
    if (!location) return;

    generateDrivers(location);

    driverUpdateRef.current = setInterval(
      updateDriverPositions,
      MAP_SETTINGS.driverUpdateInterval,
    );

    return () => {
      if (driverUpdateRef.current) {
        clearInterval(driverUpdateRef.current);
      }
    };
  }, [location, generateDrivers, updateDriverPositions]);

  return {
    nearbyDrivers,
    getVehicleColor,
    getVehicleIcon,
  };
};
