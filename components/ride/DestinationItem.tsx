import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PreviousDestination } from "@/types/ride";
import { ThemedText } from "@/components/ThemedText";

interface DestinationItemProps {
  destination: PreviousDestination;
  onSelect: (destination: PreviousDestination) => void;
  iconBackgroundColor?: string;
}

export const DestinationItem = ({
  destination,
  onSelect,
  iconBackgroundColor = "#374151",
}: DestinationItemProps) => {
  return (
    <TouchableOpacity
      style={styles.destinationItem}
      onPress={() => onSelect(destination)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.destinationIcon,
          { backgroundColor: iconBackgroundColor },
        ]}
      >
        <Ionicons name={destination.iconName} size={16} color="#ffffff" />
      </View>
      <View style={styles.destinationInfo}>
        <ThemedText style={styles.destinationName}>
          {destination.name}
        </ThemedText>
        <ThemedText style={styles.destinationAddress} numberOfLines={1}>
          {destination.address}
        </ThemedText>
        <ThemedText style={styles.destinationMeta}>
          {destination.visits} visit{destination.visits !== 1 ? "s" : ""} •{" "}
          {Math.floor(
            (Date.now() - destination.lastVisited.getTime()) /
              (1000 * 60 * 60 * 24),
          )}{" "}
          days ago
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  destinationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 16,
  },
  destinationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  destinationAddress: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  destinationMeta: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
