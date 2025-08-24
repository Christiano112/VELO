import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, View, type ViewProps } from "react-native";

type ShadowType = "light" | "medium" | "heavy" | "card" | "button";

export type ShadowViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  shadowColor?: string;
  type?: ShadowType;
  shadowOffset?: {
    width: number;
    height: number;
  };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

const shadowPresets = {
  light: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heavy: {
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

export function ShadowView({
  style,
  lightColor,
  darkColor,
  shadowColor,
  type = "medium",
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  elevation,
  ...otherProps
}: ShadowViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const defaultShadowColor = useThemeColor({}, "text");

  // Use preset or custom shadow values
  const preset = shadowPresets[type];
  const finalShadowOffset = shadowOffset || preset.shadowOffset;
  const finalShadowOpacity = shadowOpacity ?? preset.shadowOpacity;
  const finalShadowRadius = shadowRadius ?? preset.shadowRadius;
  const finalElevation = elevation ?? preset.elevation;

  const shadowStyles = Platform.select({
    ios: {
      shadowColor: shadowColor || defaultShadowColor,
      shadowOffset: finalShadowOffset,
      shadowOpacity: finalShadowOpacity,
      shadowRadius: finalShadowRadius,
    },
    android: {
      elevation: finalElevation,
      shadowColor: shadowColor || defaultShadowColor,
    },
  });

  return (
    <View
      style={[
        {
          backgroundColor,
        },
        shadowStyles,
        style,
      ]}
      {...otherProps}
    />
  );
}
