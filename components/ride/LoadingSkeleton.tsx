import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonItem = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}: LoadingSkeletonProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f0f0f0", "#e0e0e0"],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

export const LoadingSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header Controls Skeleton */}
      <View style={styles.headerControls}>
        <SkeletonItem width={48} height={48} borderRadius={24} />
      </View>

      {/* Map Area Skeleton */}
      <View style={styles.mapArea}>
        <SkeletonItem width="100%" height={400} borderRadius={0} />
        {/* Drivers Card Skeleton */}
        <View style={styles.driversCardPosition}>
          <SkeletonItem width={140} height={40} borderRadius={16} />
        </View>
      </View>

      {/* Bottom Sheet Skeleton */}
      <View style={styles.bottomSheetContainer}>
        {/* Handle */}
        <View style={styles.handleContainer}>
          <SkeletonItem width={40} height={4} borderRadius={2} />
        </View>

        {/* Search Bar Skeleton */}
        <View style={styles.searchContainer}>
          <SkeletonItem width="100%" height={48} borderRadius={16} />
        </View>

        {/* Section Header Skeleton */}
        <View style={styles.sectionHeader}>
          <SkeletonItem width={20} height={20} borderRadius={10} />
          <SkeletonItem
            width={150}
            height={20}
            borderRadius={4}
            style={{ marginLeft: 8 }}
          />
          <View style={{ flex: 1 }} />
          <SkeletonItem width={50} height={16} borderRadius={4} />
        </View>

        {/* Destination Items Skeleton */}
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.destinationItem}>
            <SkeletonItem width={44} height={44} borderRadius={22} />
            <View style={styles.destinationInfo}>
              <SkeletonItem width="70%" height={16} borderRadius={4} />
              <SkeletonItem
                width="90%"
                height={14}
                borderRadius={4}
                style={{ marginTop: 4 }}
              />
              <SkeletonItem
                width="50%"
                height={12}
                borderRadius={4}
                style={{ marginTop: 4 }}
              />
            </View>
            <SkeletonItem width={16} height={16} borderRadius={4} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerControls: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    zIndex: 30,
  },
  mapArea: {
    flex: 1,
    position: "relative",
  },
  driversCardPosition: {
    position: "absolute",
    top: 120,
    right: 20,
    zIndex: 20,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    height: 400,
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  destinationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  destinationInfo: {
    flex: 1,
    marginLeft: 16,
  },
});
