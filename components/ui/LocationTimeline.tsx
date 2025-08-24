import { theme } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface LocationTimelineProps {
  pickup: string;
  dropoff: string;
}

export const LocationTimeline = ({
  pickup,
  dropoff,
}: LocationTimelineProps) => (
  <View style={styles.container}>
    <View style={styles.iconColumn}>
      <Ionicons
        name="radio-button-on-outline"
        size={20}
        color={theme.colors.primary}
      />
      <View style={styles.line} />
      <Ionicons
        name="location-outline"
        size={20}
        color={theme.colors.primary}
      />
    </View>
    <View style={styles.textColumn}>
      <View style={styles.locationRow}>
        <Text style={styles.label}>Pick-up at</Text>
        <Text style={styles.locationText}>{pickup}</Text>
      </View>
      <View style={styles.locationRow}>
        <Text style={styles.label}>Drop-off at</Text>
        <Text style={styles.locationText}>{dropoff}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: theme.spacing.m },
  iconColumn: { alignItems: "center" },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.borderColor,
    marginVertical: 4,
  },
  textColumn: {
    flex: 1,
    justifyContent: "space-between",
    gap: theme.spacing.xl,
  },
  locationRow: { gap: 4 },
  label: {
    ...theme.typography.getFont("400", 12),
    color: theme.colors.textSecondary,
  },
  locationText: {
    ...theme.typography.getFont("500", 16),
    color: theme.colors.textPrimary,
  },
});
