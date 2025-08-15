import type { ReactNode, Dispatch, SetStateAction } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface PropType {
  children: ReactNode;
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
  isDisabled?: boolean;
}

const AppRadio = ({
  children,
  isSelected,
  setSelected,
  isDisabled,
}: PropType) => {
  const iconName = isSelected ? "radio-button-on" : "radio-button-off";
  const color = isSelected ? COLORS.light.brand : COLORS.light.inputBg;
  return (
    <Pressable
      onPress={() => {
        if (!isDisabled) setSelected((prev) => !prev);
      }}
      style={styles.radioContainer}
      disabled={isDisabled}
    >
      <ThemedView style={styles.radioCircle}>
        <Ionicons name={iconName} size={24} color={color} />
      </ThemedView>
      <ThemedText style={[styles.radioText, { color: color }]}>
        {children}
      </ThemedText>
    </Pressable>
  );
};

export default AppRadio;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  radioCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  radioText: {
    marginLeft: SPACING.medium,
    fontSize: FONT_SIZE.normal,
  },
});
