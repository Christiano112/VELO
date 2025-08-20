import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { RefObject, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteLocation } from "../../types/route";
import { LocationItem } from "./LocationItem";

interface RouteBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: RefObject<TextInput | null>;
  filteredLocations: RouteLocation[];
  selectedOrigin: RouteLocation | null;
  selectedDestination: RouteLocation | null;
  onLocationSelect: (location: RouteLocation) => void;
}

export const RouteBottomSheet = ({
  bottomSheetRef,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  filteredLocations,
  selectedOrigin,
  selectedDestination,
  onLocationSelect,
}: RouteBottomSheetProps) => {
  const snapPoints = useMemo(() => ["30%", "50%", "75%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandle}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search locations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Current Selection */}
        {(selectedOrigin || selectedDestination) && (
          <View style={styles.selectionSection}>
            <Text style={styles.sectionTitle}>Selected Route</Text>
            {selectedOrigin && (
              <View style={styles.selectedItem}>
                <View
                  style={[styles.selectedDot, { backgroundColor: "#10b981" }]}
                />
                <Text style={styles.selectedText}>
                  From: {selectedOrigin.name}
                </Text>
              </View>
            )}
            {selectedDestination && (
              <View style={styles.selectedItem}>
                <View
                  style={[styles.selectedDot, { backgroundColor: "#ef4444" }]}
                />
                <Text style={styles.selectedText}>
                  To: {selectedDestination.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Locations List */}
        <View style={styles.locationsSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? "Search Results" : "Recent Locations"}
          </Text>
          <BottomSheetScrollView
            style={styles.locationsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.locationsListContent}
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <LocationItem
                  key={location.id}
                  location={location}
                  onPress={onLocationSelect}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="location-outline" size={48} color="#d1d5db" />
                <Text style={styles.emptyStateText}>No locations found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try searching with different keywords
                </Text>
              </View>
            )}

            {/* Set location on map option */}
            <TouchableOpacity
              style={styles.mapLocationItem}
              activeOpacity={0.7}
            >
              <View style={styles.mapLocationIcon}>
                <Ionicons name="map" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.mapLocationText}>Set location on map</Text>
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </TouchableOpacity>
          </BottomSheetScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  bottomSheetHandle: {
    backgroundColor: "#d1d5db",
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  selectionSection: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  selectedText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  locationsSection: {
    flex: 1,
  },
  locationsList: {
    flex: 1,
  },
  locationsListContent: {
    paddingBottom: 20,
  },
  mapLocationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 16,
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
    marginTop: 12,
  },
  mapLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  mapLocationText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#3b82f6",
  },
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
