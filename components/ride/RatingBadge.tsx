import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface RatingBadgeProps {
  rating: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  backgroundColor = "#6e00cc",
  textColor = "#ffffff",
  borderColor = "#424042",
}) => (
  <View style={[styles.ratingBadge, { backgroundColor, borderColor }]}>
    <Ionicons name="star" size={14} color={textColor} />
    <Text style={[styles.ratingText, { color: textColor }]}>
      {rating.toFixed(1)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  ratingBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "400",
  },
});
