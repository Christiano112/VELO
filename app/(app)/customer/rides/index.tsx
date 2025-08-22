import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { rides } from "@/constants/StaticData";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CustomerRides = () => {
  const [activeTab, setActiveTab] = useState("completed");

  const filteredRides = useMemo(
    () => rides.filter((ride) => ride.status === activeTab),
    [activeTab],
  );

  const renderRide = useCallback(
    ({ item: ride }: { item: any }) => (
      <TouchableOpacity style={styles.rideCard}>
        <ThemedView style={styles.rideHeader}>
          <ThemedText style={styles.vehicleType}>{ride.vehicleType}</ThemedText>
          <ThemedText style={styles.dateText}>{ride.date}</ThemedText>
          <ThemedView
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  ride.status === "completed" ? "#27ae60" : "#e74c3c",
              },
            ]}
          >
            <ThemedText style={styles.statusText}>
              {ride.status === "completed" ? "Completed" : "Cancelled"}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.separator} />

        <ThemedView style={styles.routeContainer}>
          <ThemedView style={styles.routeIndicator}>
            <ThemedView style={styles.startDot} />
            <ThemedView style={styles.routeLine} />
            <ThemedView style={styles.endDot} />
          </ThemedView>

          <ThemedView style={styles.locationContainer}>
            <ThemedView style={styles.locationRow}>
              <Ionicons name="radio-button-on" size={16} color="#394347" />
              <ThemedText style={styles.locationText}>{ride.pickup}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#394347" />
              <ThemedText style={styles.locationText}>
                {ride.destination}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    ),
    [],
  );

  const { headerComponent, scrollProps, headerHeight, isCompact } =
    AnimatedHeader({
      title: "My Rides",
    });

  return (
    <ThemedView style={styles.container}>
      {headerComponent}

      <ThemedView
        style={[
          styles.tabContainer,
          { paddingTop: isCompact ? 50 : headerHeight },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("cancelled")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "cancelled" && styles.activeTabText,
            ]}
          >
            Cancelled
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Rides List */}
      <FlashList
        data={filteredRides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>
              No {activeTab} rides found
            </ThemedText>
          </ThemedView>
        }
        {...scrollProps}
      />
    </ThemedView>
  );
};

export default CustomerRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: SPACING.large,
    marginTop: 16,
    marginBottom: SPACING.large,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#DFDFDF",
  },
  activeTab: {
    borderBottomColor: COLORS.light.brand,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#394347",
    opacity: 0.6,
  },
  activeTabText: {
    opacity: 1,
  },
  content: {
    paddingHorizontal: SPACING.large,
  },
  rideCard: {
    backgroundColor: "#f7f8f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    padding: 16,
    marginBottom: 16,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  vehicleType: {
    fontSize: 14,
    color: "#394347",
    opacity: 0.7,
  },
  dateText: {
    fontSize: 14,
    color: "#394347",
    opacity: 0.7,
    flex: 1,
    marginHorizontal: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#394347",
    opacity: 0.1,
    marginBottom: 12,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: SPACING.medium,
  },
  routeIndicator: {
    alignItems: "center",
    gap: SPACING.small,
  },
  startDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#27ae60",
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: "#394347",
    marginVertical: 2,
  },
  endDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e74c3c",
  },
  locationContainer: {
    flex: 1,
    gap: SPACING.large,
    backgroundColor: "transparent",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  locationText: {
    fontSize: 16,
    color: "#394347",
    marginLeft: SPACING.mSmall,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#394347",
    opacity: 0.6,
  },
});
