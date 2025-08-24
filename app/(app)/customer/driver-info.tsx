import { ActionButton } from "@/components/ride/ActionButton";
import { DriverInfoCard } from "@/components/ride/DriverInfoCard";
import { DriverTrackingMap } from "@/components/ride/DriverTrackingMap";
import { ETABadge } from "@/components/ride/ETABadge";
import { useDriverTracking } from "@/hooks/useDriverTracking";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Alert,
  Animated,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView from "react-native-maps";

// Constants
const COLORS = {
  primary: "#6e00cc",
  error: "#eb5757",
  text: "#394347",
  textLight: "#fff",
  border: "#e8ecf4",
  background: "#fff",
  overlay: "rgba(255, 255, 255, 0.8)",
  shadow: "rgba(0, 0, 0, 0.16)",
} as const;

const DriverInfo = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  // Sample locations
  const userLocation = { latitude: 30.7046, longitude: 76.7179 };
  const pickupLocation = { latitude: 30.7046, longitude: 76.7179 };

  // Driver tracking hook
  const {
    driverData,
    isLoading,
    error,
    lastUpdate,
    connectionStatus,
    actions,
  } = useDriverTracking({
    driverId: "driver-123",
    pickupLocation,
  });

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ["25%", "60%"], []);

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

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  const handleCancel = useCallback(async () => {
    Alert.alert("Cancel Ride", "Are you sure you want to cancel this ride?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await actions.cancelRide();
          router.back();
        },
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions.cancelRide]);

  const handleSOS = useCallback(() => {
    Alert.alert(
      "Emergency SOS",
      "This will send an emergency alert. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send SOS",
          style: "destructive",
          onPress: actions.sendSOS,
        },
      ],
    );
  }, [actions.sendSOS]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Finding your driver...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !driverData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || "Driver not found"}</Text>
          <Pressable style={styles.retryButton} onPress={handleBackPress}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Generate route coordinates (simplified)
  const routeCoordinates = [
    driverData.location,
    {
      latitude: (driverData.location.latitude + pickupLocation.latitude) / 2,
      longitude: (driverData.location.longitude + pickupLocation.longitude) / 2,
    },
    pickupLocation,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Driver Tracking Map */}
      <DriverTrackingMap
        mapRef={mapRef}
        userLocation={userLocation}
        driverLocation={driverData.location}
        pickupLocation={pickupLocation}
        routeCoordinates={routeCoordinates}
        onBackPress={handleBackPress}
        pulseAnimation={pulseAnimation}
      />

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerContent}>
              <Text style={styles.headerText}>Meet at the pickup point</Text>
              <ETABadge minutes={driverData.eta} />
            </View>

            {/* Connection Status */}
            <View style={styles.connectionStatus}>
              <View
                style={[
                  styles.connectionDot,
                  {
                    backgroundColor:
                      connectionStatus === "connected"
                        ? "#10b981"
                        : connectionStatus === "reconnecting"
                          ? "#f59e0b"
                          : "#ef4444",
                  },
                ]}
              />
              <Text style={styles.connectionText}>
                {connectionStatus === "connected"
                  ? "Live tracking"
                  : connectionStatus === "reconnecting"
                    ? "Reconnecting..."
                    : "Connection lost"}
              </Text>
              <Text style={styles.lastUpdateText}>
                Updated{" "}
                {lastUpdate &&
                  Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}
                s ago
              </Text>
            </View>

            <LinearGradient
              colors={[COLORS.border, COLORS.overlay]}
              style={styles.progressBar}
            />
          </View>

          {/* Driver Info Section */}
          <DriverInfoCard
            name={driverData.name}
            rating={driverData.rating}
            plateNumber={driverData.plateNumber}
            vehicleType={driverData.vehicleType}
            imageUrl={driverData.imageUrl}
          />

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <ActionButton icon="warning" label="SOS" onPress={handleSOS} />
            <ActionButton
              icon="call"
              label="Call Driver"
              onPress={actions.callDriver}
            />
            <ActionButton
              icon="share"
              label="Share Ride"
              onPress={actions.shareRide}
            />
          </View>

          {/* Cancel Button */}
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 20,
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
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
    backgroundColor: COLORS.background,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 16,
  },
  pickupLocationText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textLight,
  },
  locationText: {
    position: "absolute",
    top: 105,
    left: 154,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "400",
  },
  bottomSheetBackground: {
    backgroundColor: COLORS.overlay,
  },
  bottomSheetIndicator: {
    backgroundColor: "#292929",
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 34,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  etaBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: "center",
  },
  etaNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textLight,
    lineHeight: 20,
  },
  etaLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textLight,
    marginTop: -2,
  },
  progressBar: {
    height: 2,
    borderRadius: 10,
  },
  driverSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    position: "relative",
  },
  driverImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  ratingBadge: {
    position: "absolute",
    top: 50,
    left: 7,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    borderColor: "#424042",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "400",
  },
  driverDetails: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: 22,
  },
  driverName: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "400",
    textAlign: "right",
    alignSelf: "stretch",
  },
  plateNumber: {
    fontSize: 30,
    color: COLORS.text,
    fontWeight: "400",
    textAlign: "right",
    width: 234,
    marginTop: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.5,
    textAlign: "right",
    alignSelf: "stretch",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
    gap: 12,
  },
  actionButtonIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "400",
  },
  cancelButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.error,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  connectionText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: "500",
    marginRight: 8,
  },
  lastUpdateText: {
    fontSize: 10,
    color: COLORS.text,
    opacity: 0.6,
  },
});

export default DriverInfo;
