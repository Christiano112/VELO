import { AppButton } from "@/components/form/AppButton";
import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Avatar from "@/components/ui/Avatar";
import ConfirmationBottomSheet from "@/components/ui/ConfirmationBottomSheet";
import { LocationTimeline } from "@/components/ui/LocationTimeline";
import { SPACING } from "@/constants/GlobalStyles";
import { rideDetail } from "@/constants/StaticData";
import { theme } from "@/constants/Theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRef } from "react";
import { Pressable, StyleSheet } from "react-native";

const CustomerUpcomingRide = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCancelPress = () => bottomSheetRef.current?.expand();
  const handleConfirmCancellation = () => {
    console.log("Ride Cancelled!");
    // Navigate away or update UI state
  };

  return (
    <>
      <ScrollContainer title="Upcoming Ride">
        <ThemedView style={styles.card}>
          <ThemedView style={styles.car}>
            <Image source={rideDetail.carImage} style={styles.carImage} />
            <ThemedText style={styles.carType}>{rideDetail.carType}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.driverInfo}>
            <ThemedText style={styles.cost}>{rideDetail.price}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.divider} />
        <ThemedView style={styles.card}>
          <ThemedView style={styles.driver}>
            <Avatar
              name={rideDetail.driver.name}
              src={rideDetail.driver.avatar}
              size={80}
            />
            <ThemedView style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color={"#FFC107"} />
              <ThemedText style={styles.ratingText}>
                {rideDetail.rating}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.driverInfo}>
            <ThemedText style={styles.driverName}>
              {rideDetail.driver.name}
            </ThemedText>
            <ThemedText style={styles.licensePlate}>
              {rideDetail.driver.license}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.divider} />
        <ThemedView style={styles.detailsCard}>
          <ThemedView style={styles.detailRow}>
            <Feather
              name="calendar"
              size={20}
              color={theme.colors.textSecondary}
            />
            <ThemedView style={styles.detailTextContainer}>
              <ThemedText style={styles.detailLabel}>Scheduled for</ThemedText>
              <ThemedText style={styles.detailValue}>
                Today, 15 Sept, 8:00 AM
              </ThemedText>
            </ThemedView>
            <Pressable style={styles.editButton}>
              <ThemedText style={styles.editButtonText}>Edit</ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedView style={styles.divider} />
          <LocationTimeline pickup="T1, Airport" dropoff="Potter's Cay" />
        </ThemedView>

        <AppButton
          title="Cancel Ride"
          variant="destructive"
          onPress={() => handleCancelPress()}
        />
      </ScrollContainer>
      <ConfirmationBottomSheet
        ref={bottomSheetRef}
        title="Are you sure you want to cancel your ride?"
        confirmText="Yes Cancel"
        cancelText="No, Don't Cancel"
        onConfirm={handleConfirmCancellation}
        onCancel={() => bottomSheetRef.current?.close()}
      />
    </>
  );
};

export default CustomerUpcomingRide;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: SPACING.normal,
  },
  car: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.medium,
  },
  carImage: {
    width: 80,
    height: 80,
  },
  carType: {
    ...theme.typography.getFont("600", 18),
    color: theme.colors.textPrimary,
  },
  cost: {
    ...theme.typography.getFont("700", 20),
    color: theme.colors.textPrimary,
    textAlign: "right",
  },
  driver: {
    alignItems: "center",
    justifyContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1C1E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    marginTop: -SPACING.normal,
  },
  ratingText: {
    ...theme.typography.getFont("500", 14),
    color: theme.colors.white,
  },
  driverInfo: {
    flex: 1,
    backgroundColor: "transparent",
    gap: SPACING.medium,
  },
  driverName: { ...theme.typography.getFont("400", 18), textAlign: "right" },
  licensePlate: {
    ...theme.typography.getFont("400", 28),
    textAlign: "right",
  },
  detailsCard: {
    flex: 1,
    padding: theme.spacing.m,
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.m,
  },
  detailTextContainer: { flex: 1 },
  detailLabel: {
    ...theme.typography.getFont("400", 12),
    color: theme.colors.textSecondary,
  },
  detailValue: { ...theme.typography.getFont("500", 16) },
  editButton: {
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    ...theme.typography.getFont("600", 14),
    color: theme.colors.danger,
  },
  divider: { height: 1.5, backgroundColor: theme.colors.borderColor },
});
