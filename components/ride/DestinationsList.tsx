import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { DestinationItem } from "./DestinationItem";
import { ThemedText } from "@/components/ThemedText";
import { EmptyState } from "./EmptyState";
import type { PreviousDestination } from "@/types/ride";

interface DestinationsListProps {
  destinations: PreviousDestination[];
  isSearchFocused: boolean;
  searchQuery: string;
  onDestinationSelect: (destination: PreviousDestination) => void;
  getVehicleColor: (type: "standard" | "premium" | "xl") => string;
}

export const DestinationsList = ({
  destinations,
  isSearchFocused,
  searchQuery,
  onDestinationSelect,
  getVehicleColor,
}: DestinationsListProps) => {
  return (
    <>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Ionicons name="time" size={20} color="#374151" />
        <ThemedText style={styles.sectionTitle}>
          {isSearchFocused && searchQuery
            ? "Search Results"
            : "Recent Destinations"}
        </ThemedText>
        {!isSearchFocused && (
          <TouchableOpacity activeOpacity={0.7}>
            <ThemedText style={styles.seeAllText}>See all</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Destinations List */}
      <BottomSheetScrollView
        style={styles.destinationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.destinationsListContent}
      >
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <DestinationItem
              key={destination.id}
              destination={destination}
              onSelect={onDestinationSelect}
              iconBackgroundColor={getVehicleColor("standard")}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </BottomSheetScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  seeAllText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },
  destinationsList: {
    flex: 1,
  },
  destinationsListContent: {
    paddingBottom: 20,
  },
});
