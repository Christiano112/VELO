import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

interface AppCheckBoxProps {
  checked?: boolean;
  onValueChange: (checked: boolean) => void;
  label?: ReactNode;
  labelPosition?: "left" | "right";
  iconSize?: number;
  style?: ViewStyle;
}

const AppCheckBox = ({
  checked,
  onValueChange,
  label,
  style,
  iconSize = 28,
  labelPosition = "right",
}: AppCheckBoxProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        labelPosition === "left" && { justifyContent: "space-between" },
      ]}
      onPress={() => onValueChange(!checked)}
      accessibilityLabel={`${label} checkbox`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityHint={`Press to ${checked ? "uncheck" : "check"} the box`}
    >
      {labelPosition === "left" && <ThemedText>{label}</ThemedText>}
      <>
        {checked ? (
          <AntDesign
            name="checksquare"
            size={iconSize}
            color={COLORS.light.brand}
          />
        ) : (
          <MaterialIcons
            name="check-box-outline-blank"
            size={iconSize}
            color="#00000599"
          />
        )}
      </>
      {labelPosition === "right" && (
        <ThemedText>{label}</ThemedText>
      )}
    </Pressable>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.medium,
  },
});
