import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { RefObject, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaymentMethod, RideOption } from "../../types/ride";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { RideOptionCard } from "./RideOptionCard";

interface RideSelectionBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  rideOptions: RideOption[];
  paymentMethods: PaymentMethod[];
  selectedRide: RideOption;
  selectedPayment: PaymentMethod;
  isBooking: boolean;
  onRideSelect: (ride: RideOption) => void;
  onPaymentSelect: (payment: PaymentMethod) => void;
  onBookRide: () => void;
}

export const RideSelectionBottomSheet = ({
  bottomSheetRef,
  rideOptions,
  paymentMethods,
  selectedRide,
  selectedPayment,
  isBooking,
  onRideSelect,
  onPaymentSelect,
  onBookRide,
}: RideSelectionBottomSheetProps) => {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showBookingSection, setShowBookingSection] = useState(false);
  const snapPoints = useMemo(() => ["45%", "75%"], []);

  const handleRideSelect = (ride: RideOption) => {
    onRideSelect(ride);
    setShowBookingSection(true);
  };

  const handlePaymentMethodSelect = (payment: PaymentMethod) => {
    onPaymentSelect(payment);
    setShowPaymentMethods(false);
  };

  const handleBackToRides = () => {
    setShowBookingSection(false);
    setShowPaymentMethods(false);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandle}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        {showPaymentMethods ? (
          /* Payment Methods View */
          <View style={styles.paymentMethodsSection}>
            <View style={styles.paymentHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowPaymentMethods(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#374151" />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.paymentMethods}>
              {paymentMethods.map((payment) => (
                <PaymentMethodCard
                  key={payment.id}
                  payment={payment}
                  isSelected={selectedPayment.id === payment.id}
                  onSelect={handlePaymentMethodSelect}
                />
              ))}
            </View>
          </View>
        ) : showBookingSection ? (
          /* Booking Section View */
          <View style={styles.bookingSectionView}>
            <View style={styles.bookingHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToRides}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#374151" />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Book Your Ride</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Selected Ride Summary */}
            <View style={styles.selectedRideSummary}>
              <RideOptionCard
                ride={selectedRide}
                isSelected={true}
                onSelect={() => {}}
              />
            </View>

            {/* Payment & Booking Section */}
            <View style={styles.bookingSection}>
              {/* Payment Method Selector */}
              <TouchableOpacity
                style={styles.paymentSelector}
                onPress={() => setShowPaymentMethods(true)}
                activeOpacity={0.7}
              >
                <View style={styles.paymentSelectorLeft}>
                  <View style={styles.paymentSelectorIcon}>
                    <Ionicons
                      name={selectedPayment.icon}
                      size={20}
                      color="#374151"
                    />
                  </View>
                  <Text style={styles.paymentSelectorText}>
                    {selectedPayment.name}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </TouchableOpacity>

              {/* Driver Info */}
              <View style={styles.driverInfo}>
                <Text style={styles.driverInfoText}>
                  Drivers keep 100% of fare
                </Text>
              </View>

              {/* Book Ride Button */}
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  isBooking && styles.bookButtonDisabled,
                ]}
                onPress={onBookRide}
                disabled={isBooking}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#6366f1", "#4f46e5"]}
                  style={styles.bookButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {isBooking ? (
                    <Text style={styles.bookButtonText}>Booking...</Text>
                  ) : (
                    <Text style={styles.bookButtonText}>Book Ride</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Ride Options View */
          <View style={styles.ridesSection}>
            <Text style={styles.sectionTitle}>Choose your ride</Text>
            <BottomSheetScrollView
              style={styles.ridesList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.ridesListContent}
            >
              {rideOptions.map((ride) => (
                <RideOptionCard
                  key={ride.id}
                  ride={ride}
                  isSelected={selectedRide.id === ride.id}
                  onSelect={handleRideSelect}
                />
              ))}
            </BottomSheetScrollView>
          </View>
        )}
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
  ridesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 16,
  },
  ridesList: {
    flex: 1,
  },
  ridesListContent: {
    paddingBottom: 20,
  },
  bookingSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    flexShrink: 0,
  },
  paymentSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    marginBottom: 16,
  },
  paymentSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentSelectorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentSelectorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  driverInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  driverInfoText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  bookButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  bookButtonDisabled: {
    opacity: 0.7,
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  paymentMethodsSection: {
    flex: 1,
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 40,
  },
  paymentMethods: {
    gap: 8,
  },
  bookingSectionView: {
    flex: 1,
  },
  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectedRideSummary: {
    marginBottom: 20,
  },
});
