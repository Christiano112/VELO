import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ShadowView } from "@/components/ui/ShadowView";
import { ThemedText } from "@/components/ThemedText";

export const DriversCard = ({
  nearbyDriversLength,
}: {
  nearbyDriversLength: number;
}) => {
  return (
    <ShadowView style={styles.driversCard} type="heavy">
      <View style={styles.onlineIndicator} />
      <ThemedText style={styles.driversText}>
        {nearbyDriversLength || 0} driver{nearbyDriversLength !== 1 ? "s" : ""}{" "}
        nearby
      </ThemedText>
      <Ionicons name="car" size={16} color={COLORS.light.white} />
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  driversCard: {
    position: "absolute",
    top: 120,
    right: 20,
    backgroundColor: COLORS.light.brand,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.light.white,
  },
  driversText: {
    color: COLORS.light.white,
    fontWeight: "600",
    fontSize: 13,
  },
});
