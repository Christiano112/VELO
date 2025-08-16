import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface PropType {
  children: ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isExpandable?: boolean;
  type?: "default" | "form";
}

const AppButton = ({
  children,
  onPress,
  isDisabled,
  isLoading,
  type = "default",
  isExpandable = false,
}: PropType) => {
  return (
    <ThemedView
      style={[
        styles.buttonOuterContainer,
        { marginTop: type === "form" ? SPACING.medium : 0 },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed && !isExpandable && styles.pressed,
          (isDisabled || isLoading) && styles.disabled,
        ]}
        onPress={onPress}
        android_ripple={{ color: COLORS.light.brand, radius: 0 }}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.light.white} />
        ) : isExpandable ? (
          <ThemedView style={styles.buttonView}>{children}</ThemedView>
        ) : (
          <ThemedText
            type="defaultSemiBold"
            style={styles.buttonText}
            selectable={false}
          >
            {children}
          </ThemedText>
        )}
      </Pressable>
    </ThemedView>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SPACING.medium,
    flexShrink: 1,
  },
  buttonInnerContainer: {
    borderRadius: SPACING.medium,
    backgroundColor: COLORS.light.brand,
    elevation: 5,
    paddingHorizontal: SPACING.xLarge,
    paddingVertical: SPACING.BMedium,
    minWidth: 120,
    width: "100%",
  },
  buttonText: {
    color: COLORS.light.white,
    textAlign: "center",
    userSelect: "none",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.9,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.small,
    backgroundColor: COLORS.light.brand,
  },
});
