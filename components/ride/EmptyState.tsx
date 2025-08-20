import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState = ({
  title = "No destinations found",
  subtitle = "Try searching for a different location",
  iconName = "location-outline",
}: EmptyStateProps) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={iconName} size={48} color="#d1d5db" />
      <ThemedText style={styles.emptyStateText}>{title}</ThemedText>
      <ThemedText style={styles.emptyStateSubtext}>{subtitle}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
});
