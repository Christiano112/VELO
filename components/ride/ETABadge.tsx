import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ETABadgeProps {
  minutes: number;
  backgroundColor?: string;
  textColor?: string;
}

export const ETABadge: React.FC<ETABadgeProps> = ({
  minutes,
  backgroundColor = "#6e00cc",
  textColor = "#ffffff",
}) => (
  <View style={[styles.etaBadge, { backgroundColor }]}>
    <Text style={[styles.etaNumber, { color: textColor }]}>{minutes}</Text>
    <Text style={[styles.etaLabel, { color: textColor }]}>Mins</Text>
  </View>
);

const styles = StyleSheet.create({
  etaBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: "center",
  },
  etaNumber: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  etaLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: -2,
  },
});
