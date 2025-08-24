import { AppButton } from "@/components/form/AppButton";
import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedView } from "@/components/ThemedView";
import ConfirmationBottomSheet from "@/components/ui/ConfirmationBottomSheet";
import { LocationTimeline } from "@/components/ui/LocationTimeline";
import { IMAGES } from "@/constants/Images";
import { theme } from "@/constants/Theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CustomerRideReservationConfirmation = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCancelPress = () => bottomSheetRef.current?.expand();
  const handleConfirmCancellation = () => {
    console.log("Ride Cancelled!");
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <ScrollContainer title="Your Reservation is Confirmed">
        <View style={styles.detailsCard}>
          <ThemedView style={styles.detailRow}>
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>23 Sept - 27 Sept</Text>
              <Text style={styles.timeText}>Pickup at 11:32 AM GMT+2</Text>
              <Text style={styles.carModelText}>Sedan Go</Text>
            </View>
            <Image
              source={IMAGES.CAR}
              style={styles.carImage}
              resizeMode="contain"
            />
          </ThemedView>
          <LocationTimeline
            pickup="Phase 3B2, Sector 60"
            dropoff="Potter's Cay"
          />
        </View>
        <AppButton
          title="Cancel Reservation"
          onPress={handleCancelPress}
          variant="destructive"
        />
      </ScrollContainer>

      <ConfirmationBottomSheet
        ref={bottomSheetRef}
        title="Are you sure you want to cancel your reservation?"
        onConfirm={handleConfirmCancellation}
        onCancel={() => bottomSheetRef.current?.close()}
      />
    </>
  );
};

export default CustomerRideReservationConfirmation;

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.m, gap: theme.spacing.l },
  headerContent: { alignItems: "center", marginBottom: theme.spacing.m },
  title: {
    ...theme.typography.getFont("700", 24),
    color: theme.colors.textPrimary,
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: 12,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.m,
    backgroundColor: "transparent",
  },
  dateSection: { marginBottom: theme.spacing.l, gap: 4 },
  dateText: { ...theme.typography.getFont("600", 20) },
  timeText: {
    ...theme.typography.getFont("400", 14),
    color: theme.colors.textSecondary,
  },
  carModelText: {
    ...theme.typography.getFont("500", 14),
    color: theme.colors.textSecondary,
  },
  carImage: { width: 120, height: 120 },
  footer: { padding: theme.spacing.m },
});
