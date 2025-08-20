import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ShadowView } from "./ShadowView";
import { SPACING } from "@/constants/GlobalStyles";

// Design tokens from Figma
const DESIGN_COLORS = {
  blue: "#2b8beb",
  white: "#FFFFFF",
} as const;

const DESIGN_FONTS = {
  regular: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 16.25, // 1.25 * 13
  },
  semiBold: {
    fontSize: 13,
    fontWeight: "600" as const,
    lineHeight: 13, // 100% line height
  },
} as const;

interface SelectionComponentProps {
  fieldText?: string;
  newOption?: string;
  onPress?: () => void;
  isSelected?: boolean;
}

export function SelectionComponent({
  fieldText = "Field Text",
  newOption = "New option",
  onPress,
  isSelected = false,
}: SelectionComponentProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ShadowView
        style={[styles.container, isSelected && styles.selectedContainer]}
      >
        <ThemedView style={styles.content}>
          <ThemedText
            style={[styles.fieldText, isSelected && styles.selectedFieldText]}
          >
            {fieldText}
          </ThemedText>
          <ThemedText
            style={[styles.newOption, isSelected && styles.selectedNewOption]}
          >
            {newOption}
          </ThemedText>
        </ThemedView>
      </ShadowView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DESIGN_COLORS.white,
    borderRadius: SPACING.medium,
    padding: SPACING.medium,
    marginVertical: SPACING.small,
  },
  selectedContainer: {
    backgroundColor: DESIGN_COLORS.blue,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldText: {
    ...DESIGN_FONTS.regular,
    color: "#11181C", // Using project's text color
  },
  selectedFieldText: {
    color: DESIGN_COLORS.white,
  },
  newOption: {
    ...DESIGN_FONTS.semiBold,
    color: "#11181C", // Using project's text color
  },
  selectedNewOption: {
    color: DESIGN_COLORS.white,
  },
});
