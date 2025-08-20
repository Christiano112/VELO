import type { LocationRegion } from "@/types/ride";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { ShadowView } from "@/components/ui/ShadowView";
import { ThemedText } from "@/components/ThemedText";

interface UserLocationMarkerProps {
  location: LocationRegion;
  pulseAnimation: Animated.Value;
  streetAddress?: string;
}

export const UserLocationMarker = ({
  location,
  streetAddress,
  pulseAnimation,
}: UserLocationMarkerProps) => {
  return (
    <Marker coordinate={location} anchor={{ x: 0.5, y: 0.8 }}>
      <View style={styles.userLocationContainer}>
        {streetAddress && (
          <ShadowView style={styles.addressContainer} type="medium">
            <ThemedText type="tiny" style={styles.addressText}>
              {streetAddress}
            </ThemedText>
          </ShadowView>
        )}
        <View style={styles.userLocationContainer}>
          <Animated.View
            style={[
              styles.userLocationPulse,
              {
                opacity: pulseAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 0],
                }),
                transform: [
                  {
                    scale: pulseAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 2.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <ShadowView style={styles.userLocation} type="card">
            <View style={styles.userLocationInner} />
          </ShadowView>
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  userLocationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  userLocationPulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    opacity: 0.2,
    zIndex: 10,
  },
  userLocation: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
    borderWidth: 4,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  userLocationInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  addressContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  addressText: {
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
});
