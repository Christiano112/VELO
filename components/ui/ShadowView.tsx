import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Platform, View, type ViewProps } from "react-native";

export type ShadowViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  shadowColor?: string;
  shadowOffset?: {
    width: number;
    height: number;
  };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

export function ShadowView({
  style,
  lightColor,
  darkColor,
  shadowColor,
  shadowOffset = { width: 0, height: 4 },
  shadowOpacity = 0.15,
  shadowRadius = 8,
  elevation = 8,
  ...otherProps
}: ShadowViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const defaultShadowColor = useThemeColor({}, "text");

  const shadowStyles = Platform.select({
    ios: {
      shadowColor: shadowColor || defaultShadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    },
    android: {
      elevation,
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
