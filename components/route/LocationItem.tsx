import { Ionicons } from "@expo/vector-icons";
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

interface LocationItemProps {
  location: RouteLocation;
  onPress: (location: RouteLocation) => void;
}

export const LocationItem = ({ location, onPress }: LocationItemProps) => {
  const getLocationIcon = (type: RouteLocation["type"]) => {
    switch (type) {
      case "home":
        return "home";
      case "work":
        return "business";
      case "university":
        return "school";
      case "mall":
        return "storefront";
      default:
        return "location";
    }
  };

  const getLocationColor = (type: RouteLocation["type"]) => {
    switch (type) {
      case "home":
        return "#10b981";
      case "work":
        return "#3b82f6";
      case "university":
        return "#8b5cf6";
      case "mall":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => onPress(location)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.locationIcon,
          { backgroundColor: getLocationColor(location.type) },
        ]}
      >
        <Ionicons
          name={getLocationIcon(location.type)}
          size={20}
          color="#ffffff"
        />
      </View>

      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationAddress} numberOfLines={2}>
          {location.address}
        </Text>
      </View>

      <View style={styles.locationMeta}>
        <Text style={styles.locationDistance}>{location.distance}</Text>
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },
  locationMeta: {
    alignItems: "flex-end",
    gap: 4,
  },
  locationDistance: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
});
