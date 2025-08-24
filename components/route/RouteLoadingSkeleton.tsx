import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const RouteLoadingSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const ShimmerView = ({ style }: { style: any }) => (
    <Animated.View
      style={[
        style,
        {
          opacity: shimmerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
          }),
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <ShimmerView style={styles.headerButton} />
        <ShimmerView style={styles.headerTitle} />
        <ShimmerView style={styles.headerButton} />
      </View>

      {/* Map Skeleton */}
      <View style={styles.mapContainer}>
        <ShimmerView style={styles.mapSkeleton} />

        {/* Floating markers skeleton */}
        <View style={styles.markerContainer}>
          <ShimmerView style={styles.marker} />
          <ShimmerView style={[styles.marker, styles.marker2]} />
          <ShimmerView style={[styles.marker, styles.marker3]} />
        </View>
      </View>

      {/* Bottom Sheet Skeleton */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />

        {/* Search Bar Skeleton */}
        <View style={styles.searchSection}>
          <ShimmerView style={styles.searchBar} />
        </View>

        {/* Location Items Skeleton */}
        <View style={styles.locationsSection}>
          <ShimmerView style={styles.sectionTitle} />

          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.locationItem}>
              <ShimmerView style={styles.locationIcon} />
              <View style={styles.locationInfo}>
                <ShimmerView style={styles.locationName} />
                <ShimmerView style={styles.locationAddress} />
              </View>
              <ShimmerView style={styles.locationDistance} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },
  headerTitle: {
    width: 120,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapSkeleton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  markerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d1d5db",
  },
  marker2: {
    top: "30%",
    left: "60%",
  },
  marker3: {
    top: "60%",
    left: "40%",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d1d5db",
    alignSelf: "center",
    marginBottom: 16,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchBar: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
  locationsSection: {
    flex: 1,
  },
  sectionTitle: {
    width: 140,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },
  locationInfo: {
    flex: 1,
    gap: 6,
  },
  locationName: {
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    width: "70%",
  },
  locationAddress: {
    height: 14,
    borderRadius: 7,
    backgroundColor: "#f3f4f6",
    width: "90%",
  },
  locationDistance: {
    width: 40,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
});
