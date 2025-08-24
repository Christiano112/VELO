import { StyleSheet } from "react-native";

import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Avatar from "@/components/ui/Avatar";
import { SPACING } from "@/constants/GlobalStyles";
import { rideDetail } from "@/constants/StaticData";

const CustomerRideDetails = () => {
  return (
    <ScrollContainer title="Ride Details">
      <ThemedView style={styles.content}>
        {/* Ride Information Card */}
        <ThemedView style={styles.infoCard}>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Car Type</ThemedText>
            <ThemedText style={styles.value}>{rideDetail.carType}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Date of Ride</ThemedText>
            <ThemedText style={styles.value}>
              {rideDetail.dateOfRide}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Ride ID</ThemedText>
            <ThemedText style={styles.value}>{rideDetail.rideId}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.label}>Status</ThemedText>
            <ThemedText
              style={[
                styles.value,
                {
                  color:
                    rideDetail.status === "completed" ? "#27ae60" : "#e74c3c",
                },
              ]}
            >
              {rideDetail.status.charAt(0).toUpperCase() +
                rideDetail.status.slice(1)}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Driver Information Card */}
        <ThemedView style={styles.driverCard}>
          <Avatar
            name={rideDetail.driver.name}
            src={rideDetail.driver.avatar}
            size={80}
          />
          <ThemedView style={styles.driverInfo}>
            <ThemedText style={styles.driverName}>
              {rideDetail.driver.name}
            </ThemedText>
            <ThemedText style={styles.licensePlate}>
              {rideDetail.driver.license}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Trip Statistics Card */}
        <ThemedView style={styles.statsCard}>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Distance</ThemedText>
            <ThemedText style={styles.statValue}>
              {rideDetail.distance}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.statDivider} />

          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Duration</ThemedText>
            <ThemedText style={styles.statValue}>
              {rideDetail.duration}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollContainer>
  );
};

export default CustomerRideDetails;

const styles = StyleSheet.create({
  content: {
    gap: SPACING.large,
  },
  infoCard: {
    backgroundColor: "#f7f8f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    padding: 20,
    gap: SPACING.medium,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    color: "#394347",
    opacity: 0.5,
  },
  value: {
    fontSize: 14,
    color: "#394347",
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f8f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    padding: 20,
    gap: SPACING.normal,
  },
  driverInfo: {
    flex: 1,
    backgroundColor: "transparent",
    gap: SPACING.medium,
  },
  driverName: {
    fontSize: 18,
    color: "#394347",
    textAlign: "right",
  },
  licensePlate: {
    fontSize: 24,
    color: "#394347",
    textAlign: "right",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#f7f8f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.normal,
  },
  statItem: {
    backgroundColor: "transparent",
    gap: SPACING.medium,
  },
  statLabel: {
    fontSize: 14,
    color: "#394347",
    opacity: 0.5,
    textAlign: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "500",
    color: "#394347",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#394347",
    opacity: 0.2,
  },
});
