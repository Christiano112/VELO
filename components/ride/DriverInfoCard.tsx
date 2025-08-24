import { Image, StyleSheet, Text, View } from "react-native";
import { RatingBadge } from "./RatingBadge";

interface DriverInfoCardProps {
  name: string;
  plateNumber: string;
  vehicleType: string;
  rating: number;
  imageUrl?: string;
}

export const DriverInfoCard = ({
  name,
  plateNumber,
  vehicleType,
  rating,
  imageUrl = "https://via.placeholder.com/75x75",
}: DriverInfoCardProps) => (
  <View style={styles.driverSection}>
    <Image source={{ uri: imageUrl }} style={styles.driverImage} />
    <View style={styles.ratingBadgeContainer}>
      <RatingBadge rating={rating} />
    </View>

    <View style={styles.driverDetails}>
      <Text style={styles.driverName}>{name}</Text>
      <Text style={styles.plateNumber}>{plateNumber}</Text>
      <Text style={styles.vehicleType}>{vehicleType}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  driverSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    position: "relative",
  },
  driverImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  ratingBadgeContainer: {
    position: "absolute",
    top: 50,
    left: 7,
  },
  driverDetails: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: 22,
  },
  driverName: {
    fontSize: 18,
    color: "#394347",
    fontWeight: "400",
    textAlign: "right",
    alignSelf: "stretch",
  },
  plateNumber: {
    fontSize: 30,
    color: "#394347",
    fontWeight: "400",
    textAlign: "right",
    width: 234,
    marginTop: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: "#394347",
    opacity: 0.5,
    textAlign: "right",
    alignSelf: "stretch",
  },
});
