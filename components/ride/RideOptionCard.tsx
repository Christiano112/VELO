import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RideOption } from "../../types/ride";

interface RideOptionCardProps {
  ride: RideOption;
  isSelected: boolean;
  onSelect: (ride: RideOption) => void;
}

export const RideOptionCard = ({
  ride,
  isSelected,
  onSelect,
}: RideOptionCardProps) => {
  const getRideColor = (type: RideOption["type"]) => {
    switch (type) {
      case "economy":
        return "#10b981";
      case "premium":
        return "#3b82f6";
      case "xl":
        return "#f59e0b";
      case "luxury":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.rideOption,
        isSelected && styles.rideOptionSelected,
        { borderColor: isSelected ? getRideColor(ride.type) : "#e5e7eb" },
      ]}
      onPress={() => onSelect(ride)}
      activeOpacity={0.7}
    >
      <View style={styles.rideIconContainer}>
        <View
          style={[
            styles.rideIcon,
            { backgroundColor: getRideColor(ride.type) },
          ]}
        >
          <Ionicons name={ride.icon} size={24} color="#ffffff" />
        </View>
      </View>

      <View style={styles.rideInfo}>
        <View style={styles.rideHeader}>
          <Text style={styles.rideName}>{ride.name}</Text>
          <Text style={styles.ridePrice}>
            {ride.currency}
            {ride.price.toFixed(2)}
          </Text>
        </View>

        <Text style={styles.rideDescription}>{ride.description}</Text>

        <View style={styles.rideDetails}>
          <View style={styles.rideDetailItem}>
            <Ionicons name="time" size={12} color="#6b7280" />
            <Text style={styles.rideDetailText}>{ride.eta} mins away</Text>
          </View>
          <Text style={styles.rideDot}>•</Text>
          <View style={styles.rideDetailItem}>
            <Ionicons name="people" size={12} color="#6b7280" />
            <Text style={styles.rideDetailText}>{ride.capacity} seats</Text>
          </View>
          <Text style={styles.rideDot}>•</Text>
          <Text style={styles.rideDetailText}>15:24 ETA</Text>
        </View>
      </View>

      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={getRideColor(ride.type)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rideOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  rideOptionSelected: {
    backgroundColor: "#f8fafc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  rideIconContainer: {
    marginRight: 16,
  },
  rideIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  rideInfo: {
    flex: 1,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  rideName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  rideDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  rideDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rideDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rideDetailText: {
    fontSize: 12,
    color: "#6b7280",
  },
  rideDot: {
    fontSize: 12,
    color: "#6b7280",
  },
  selectedIndicator: {
    marginLeft: 12,
  },
});
