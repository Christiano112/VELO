import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import type { PreviousDestination } from "@/types/ride";
import { ShadowView } from "@/components/ui/ShadowView";

interface DestinationMarkersProps {
  destinations: PreviousDestination[];
  onDestinationSelect: (destination: PreviousDestination) => void;
}

export const DestinationMarkers = ({
  destinations,
  onDestinationSelect,
}: DestinationMarkersProps) => {
  return (
    <>
      {destinations.map((destination) => (
        <Marker
          key={destination.id}
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          onPress={() => onDestinationSelect(destination)}
        >
          <ShadowView style={styles.destinationMarker} type="medium">
            <Ionicons name={destination.iconName} size={14} color="#ffffff" />
          </ShadowView>
        </Marker>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  destinationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6b7280",
    justifyContent: "center",
    alignItems: "center",
  },
});
