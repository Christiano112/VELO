import { useEffect, useState, useCallback, useRef, useMemo } from "react";

// Types
interface DriverLocation {
  latitude: number;
  longitude: number;
}

type DriverStatus =
  | "connecting"
  | "en_route"
  | "arriving"
  | "arrived"
  | "cancelled";
type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface DriverData {
  id: string;
  name: string;
  plateNumber: string;
  vehicleType: string;
  rating: number;
  eta: number;
  status: DriverStatus;
  location: DriverLocation;
  imageUrl?: string;
}

interface UseDriverTrackingProps {
  driverId: string;
  pickupLocation: DriverLocation;
  updateInterval?: number; // Configurable update interval
  enabled?: boolean; // Allow pausing tracking
}

interface UseDriverTrackingReturn {
  driverData: DriverData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  connectionStatus: ConnectionStatus;
  actions: {
    cancelRide: () => Promise<void>;
    callDriver: () => void;
    shareRide: () => void;
    sendSOS: () => void;
    retryConnection: () => Promise<void>;
  };
}

// Constants
const DEFAULT_UPDATE_INTERVAL = 3000; // 3 seconds
const CONNECTION_CHECK_INTERVAL = 10000; // 10 seconds
const ARRIVAL_THRESHOLD = 0.0001; // Distance threshold for arrival
const ARRIVING_THRESHOLD = 0.0005; // Distance threshold for "arriving" status
const MOVE_SPEED_BASE = 0.0002; // Base movement speed
const SPEED_VARIATION = { min: 0.8, max: 1.2 }; // Speed variation range
const FAILURE_RATES = {
  initialization: 0.05, // 5% chance of init failure
  connection: 0.03, // 3% chance of connection issues
};

// Utility functions
const calculateDistance = (
  point1: DriverLocation,
  point2: DriverLocation,
): number => {
  const latDiff = point2.latitude - point1.latitude;
  const lngDiff = point2.longitude - point1.longitude;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
};

const calculateETA = (distance: number): number => {
  // Convert coordinate distance to approximate meters and then to minutes
  const distanceInMeters = distance * 111000; // Rough conversion (1 degree ≈ 111km)
  const speedMps = 8.33; // ~30 km/h in m/s
  return Math.max(1, Math.round(distanceInMeters / speedMps / 60));
};

const getDriverStatus = (distance: number, eta: number): DriverStatus => {
  if (distance < ARRIVAL_THRESHOLD) return "arrived";
  if (distance < ARRIVING_THRESHOLD || eta <= 1) return "arriving";
  return "en_route";
};

export const useDriverTracking = ({
  driverId,
  pickupLocation,
  updateInterval = DEFAULT_UPDATE_INTERVAL,
  enabled = true,
}: UseDriverTrackingProps): UseDriverTrackingReturn => {
  // State
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connected");

  // Refs to prevent stale closures
  const driverDataRef = useRef<DriverData | null>(null);
  const pickupLocationRef = useRef(pickupLocation);
  const enabledRef = useRef(enabled);
  const connectionStatusRef = useRef<ConnectionStatus>("connected");

  // Update refs when props change
  useEffect(() => {
    driverDataRef.current = driverData;
  }, [driverData]);

  useEffect(() => {
    pickupLocationRef.current = pickupLocation;
  }, [pickupLocation]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    connectionStatusRef.current = connectionStatus;
  }, [connectionStatus]);

  // Memoized initial driver data factory
  const createInitialDriverData = useMemo(() => {
    return (id: string, pickup: DriverLocation): DriverData => ({
      id,
      name: "Ravi Das",
      plateNumber: "PB 65 L 4578",
      vehicleType: "Sedan",
      rating: 4.5,
      eta: 8,
      status: "en_route",
      location: {
        latitude: pickup.latitude + 0.005,
        longitude: pickup.longitude + 0.005,
      },
      imageUrl: "https://via.placeholder.com/75x75",
    });
  }, []);

  // Initialize driver data
  const initializeDriver = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      // Simulate occasional initialization failures
      if (Math.random() < FAILURE_RATES.initialization) {
        throw new Error("Failed to connect to driver. Please try again.");
      }

      const initialData = createInitialDriverData(
        driverId,
        pickupLocationRef.current,
      );
      setDriverData(initialData);
      setLastUpdate(new Date());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Driver initialization failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [driverId, createInitialDriverData]);

  // Update driver position
  const updateDriverPosition = useCallback(() => {
    const currentDriver = driverDataRef.current;
    const currentPickup = pickupLocationRef.current;
    const isEnabled = enabledRef.current;

    if (
      !currentDriver ||
      !isEnabled ||
      currentDriver.status === "arrived" ||
      currentDriver.status === "cancelled"
    ) {
      return;
    }

    setDriverData((prevData) => {
      if (!prevData) return null;

      // Calculate distance to pickup
      const distance = calculateDistance(prevData.location, currentPickup);

      // If driver has arrived, stop updating
      if (distance < ARRIVAL_THRESHOLD) {
        return {
          ...prevData,
          eta: 0,
          status: "arrived",
        };
      }

      // Calculate movement
      const speedVariation =
        SPEED_VARIATION.min +
        Math.random() * (SPEED_VARIATION.max - SPEED_VARIATION.min);
      const moveDistance = MOVE_SPEED_BASE * speedVariation;
      const moveRatio = Math.min(moveDistance / distance, 1);

      // Calculate new position (move towards pickup)
      const latDiff = currentPickup.latitude - prevData.location.latitude;
      const lngDiff = currentPickup.longitude - prevData.location.longitude;

      const newLocation: DriverLocation = {
        latitude: prevData.location.latitude + latDiff * moveRatio,
        longitude: prevData.location.longitude + lngDiff * moveRatio,
      };

      // Calculate new ETA and status
      const newDistance = calculateDistance(newLocation, currentPickup);
      const newEta = calculateETA(newDistance);
      const newStatus = getDriverStatus(newDistance, newEta);

      return {
        ...prevData,
        location: newLocation,
        eta: newEta,
        status: newStatus,
      };
    });

    setLastUpdate(new Date());
  }, []);

  // Simulate connection issues
  const simulateConnectionIssues = useCallback(() => {
    const currentStatus = connectionStatusRef.current;
    const shouldDisconnect = Math.random() < FAILURE_RATES.connection;

    if (shouldDisconnect && currentStatus === "connected") {
      setConnectionStatus("disconnected");

      // Auto-reconnect sequence
      setTimeout(
        () => {
          setConnectionStatus("reconnecting");
          setTimeout(
            () => {
              setConnectionStatus("connected");
            },
            1500 + Math.random() * 1000,
          ); // 1.5-2.5 seconds
        },
        800 + Math.random() * 400,
      ); // 0.8-1.2 seconds
    }
  }, []);

  // Action handlers with proper error handling
  const actions = useMemo(
    () => ({
      cancelRide: async (): Promise<void> => {
        try {
          setIsLoading(true);
          // Simulate API call
          await new Promise((resolve) =>
            setTimeout(resolve, 800 + Math.random() * 400),
          );

          setDriverData((prev) =>
            prev ? { ...prev, status: "cancelled" as const } : null,
          );
          console.log("Ride cancelled successfully");
        } catch (err) {
          const errorMessage = "Failed to cancel ride. Please try again.";
          setError(errorMessage);
          console.error("Cancel ride failed:", err);
          throw new Error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      },

      callDriver: (): void => {
        const driver = driverDataRef.current;
        if (driver) {
          console.log(
            `Initiating call to ${driver.name} (${driver.plateNumber})`,
          );
          // In real app: Linking.openURL(`tel:${driver.phoneNumber}`)
        } else {
          console.warn("No driver data available for call");
        }
      },

      shareRide: (): void => {
        const driver = driverDataRef.current;
        const pickup = pickupLocationRef.current;

        if (driver && pickup) {
          const shareData = {
            driver: driver.name,
            vehicle: `${driver.vehicleType} - ${driver.plateNumber}`,
            pickup: `${pickup.latitude}, ${pickup.longitude}`,
            eta: `${driver.eta} minutes`,
          };
          console.log("Sharing ride details:", shareData);
          // In real app: Share API or deep linking
        } else {
          console.warn("Insufficient data for ride sharing");
        }
      },

      sendSOS: (): void => {
        const driver = driverDataRef.current;
        const pickup = pickupLocationRef.current;

        console.log("🚨 EMERGENCY SOS ALERT SENT 🚨");
        if (driver && pickup) {
          console.log("Emergency context:", {
            driverId: driver.id,
            driverName: driver.name,
            vehicle: driver.plateNumber,
            location: pickup,
            timestamp: new Date().toISOString(),
          });
        }
        // In real app: Send to emergency services/support
      },

      retryConnection: async (): Promise<void> => {
        if (connectionStatusRef.current === "connected") {
          console.log("Connection is already active");
          return;
        }

        setConnectionStatus("reconnecting");
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setConnectionStatus("connected");

          // Reinitialize if driver data was lost
          if (!driverDataRef.current) {
            await initializeDriver();
          }
        } catch (err) {
          setConnectionStatus("disconnected");
          setError("Failed to reconnect. Please try again.");
          throw err;
        }
      },
    }),
    [initializeDriver],
  );

  // Initialize driver on mount or when driverId changes
  useEffect(() => {
    if (enabled) {
      initializeDriver();
    }

    return () => {
      // Cleanup on unmount
      setDriverData(null);
      setError(null);
      setIsLoading(false);
    };
  }, [driverId, enabled, initializeDriver]);

  // Driver position updates
  useEffect(() => {
    if (!enabled || !driverData) return;

    const interval = setInterval(updateDriverPosition, updateInterval);
    return () => clearInterval(interval);
  }, [enabled, driverData, updateInterval, updateDriverPosition]);

  // Connection monitoring
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(
      simulateConnectionIssues,
      CONNECTION_CHECK_INTERVAL,
    );
    return () => clearInterval(interval);
  }, [enabled, simulateConnectionIssues]);

  return {
    driverData,
    isLoading,
    error,
    lastUpdate,
    connectionStatus,
    actions,
  };
};
