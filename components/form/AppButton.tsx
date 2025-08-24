import { theme } from "@/constants/Theme";
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";

interface AppButtonProps {
  // Content
  title?: string;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Actions & State
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;

  // Styling
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton = ({
  title,
  children,
  leftIcon,
  rightIcon,
  onPress,
  isLoading = false,
  isDisabled = false,
  variant = "primary",
  style,
  textStyle,
}: AppButtonProps) => {
  const isButtonDisabled = isLoading || isDisabled;
  const variantStyle = variantStyles[variant];

  const loadingIndicatorColor =
    variant === "primary" ? theme.colors.white : theme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isButtonDisabled}
      style={({ pressed }) => [
        styles.baseContainer,
        variantStyle.container,
        pressed && styles.pressed,
        isButtonDisabled && styles.disabledContainer,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isButtonDisabled }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={loadingIndicatorColor} />
      ) : (
        <>
          {leftIcon}
          {title && (
            <Text
              style={[
                styles.baseText,
                variantStyle.text,
                isButtonDisabled && styles.disabledText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}
          {children}
          {rightIcon}
        </>
      )}
    </Pressable>
  );
};

const baseStyles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.l,
    borderRadius: 12,
    gap: theme.spacing.s,
  },
  baseText: {
    ...theme.typography.getFont("600", 16),
    textAlign: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  disabledContainer: {
    backgroundColor: theme.colors.disabled,
    borderColor: theme.colors.disabled,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
});

const variantStyles: Record<
  ButtonVariant,
  { container: ViewStyle; text: TextStyle }
> = {
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.primary,
    },
  },
  destructive: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.danger,
    },
    text: {
      color: theme.colors.danger,
    },
  },
  ghost: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "transparent",
    },
    text: {
      color: theme.colors.primary,
    },
  },
};

const styles = StyleSheet.create({ ...baseStyles });

export default AppButton;
