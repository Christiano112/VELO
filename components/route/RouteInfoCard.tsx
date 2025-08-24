import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RouteLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: string;
  type: "home" | "work" | "location" | "university" | "mall";
}

interface RouteInfoCardProps {
  selectedOrigin: RouteLocation;
  selectedDestination: RouteLocation;
  distance?: string;
  duration?: string;
}

export const RouteInfoCard = ({
  selectedOrigin,
  selectedDestination,
  distance = "8.8 km",
  duration = "18 min",
}: RouteInfoCardProps) => {
  return (
    <View style={styles.routeInfoCard}>
      <LinearGradient
        colors={["#3b82f6", "#1d4ed8"]}
        style={styles.routeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.routeInfo}>
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, { backgroundColor: "#10b981" }]} />
            <Text style={styles.routeText} numberOfLines={1}>
              {selectedOrigin.name}
            </Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, { backgroundColor: "#ef4444" }]} />
            <Text style={styles.routeText} numberOfLines={1}>
              {selectedDestination.name}
            </Text>
          </View>
        </View>
        <View style={styles.routeStats}>
          <Text style={styles.routeDistance}>{distance}</Text>
          <Text style={styles.routeTime}>{duration}</Text>
        </View>
      </LinearGradient>

      <TouchableOpacity
        style={styles.bookRideButton}
        onPress={() => router.push("/customer/book-ride")}
        activeOpacity={0.7}
      >
        <Text style={styles.bookRideText}>Book Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  routeInfoCard: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  routeGradient: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeInfo: {
    flex: 1,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: "#ffffff",
    marginLeft: 4,
    marginVertical: 4,
  },
  routeStats: {
    alignItems: "flex-end",
  },
  routeDistance: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  routeTime: {
    color: "#ffffff",
    fontSize: 12,
    opacity: 0.9,
  },
  bookRideButton: {
    backgroundColor: "#ffffff",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookRideText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },
});
