import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  iconFamily?: "Ionicons" | "MaterialIcons";
  color?: string;
  backgroundColor?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onPress,
  iconFamily = "Ionicons",
  color = "#394347",
  backgroundColor = "#ffffff",
}) => {
  const IconComponent =
    iconFamily === "MaterialIcons" ? MaterialIcons : Ionicons;

  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionButtonIconContainer, { backgroundColor }]}>
        <IconComponent name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    gap: 12,
  },
  actionButtonIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#394347",
    textAlign: "center",
    fontWeight: "400",
  },
});
