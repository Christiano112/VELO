import { ChooseRideMap } from "@/components/ride/ChooseRideMap";
import { RideSelectionBottomSheet } from "@/components/ride/RideSelectionBottomSheet";
import {
  PAYMENT_METHODS,
  PaymentMethod,
  RIDE_OPTIONS,
  RideOption,
} from "@/types/ride";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";

const ChooseRideScreen = () => {
  // State
  const [selectedRide, setSelectedRide] = useState<RideOption>(RIDE_OPTIONS[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
    PAYMENT_METHODS[0],
  );
  const [isBooking, setIsBooking] = useState(false);

  // Refs
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  // Sample coordinates
  const pickup = { latitude: 30.7046, longitude: 76.7179 };
  const destination = { latitude: 30.7333, longitude: 76.7794 };

  // Handle ride selection
  const handleRideSelect = (ride: RideOption) => {
    setSelectedRide(ride);
  };

  // Handle payment method selection
  const handlePaymentSelect = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
  };

  // Handle booking
  const handleBookRide = async () => {
    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      Alert.alert(
        "Ride Booked!",
        `Your ${selectedRide.name} ride has been booked. Driver will arrive in ${selectedRide.eta} minutes.`,
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to tracking screen
              console.log("Navigate to ride tracking");
            },
          },
        ],
      );
    }, 2000);
  };

  // Pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnimation]);

  // Map style
  const mapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Ride</Text>
        <View style={styles.headerRight} />
      </View>

      <ChooseRideMap
        mapRef={mapRef}
        pickup={pickup}
        destination={destination}
        pulseAnimation={pulseAnimation}
        mapStyle={mapStyle}
      />

      <RideSelectionBottomSheet
        bottomSheetRef={bottomSheetRef}
        rideOptions={RIDE_OPTIONS}
        paymentMethods={PAYMENT_METHODS}
        selectedRide={selectedRide}
        selectedPayment={selectedPayment}
        isBooking={isBooking}
        onRideSelect={handleRideSelect}
        onPaymentSelect={handlePaymentSelect}
        onBookRide={handleBookRide}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.5,
  },
  headerRight: {
    width: 40,
    height: 40,
  },
});

export default ChooseRideScreen;
