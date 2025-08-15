import { COLORS } from "@/constants/Colors";
import {
  FONT_SIZE,
  SPACING,
} from "@/constants/GlobalStyles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "defaultMedium"
    | "defaultSemiBold"
    | "defaultBold"
    | "defaultExtraBold"
    | "defaultBlack"
    | "header"
    | "titleItalic"
    | "errorMessage"
    | "successMessage"
    | "tiny"
    | "medium"
    | "link";
};

const typeStyles = {
  default: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    // fontFamily: FONT_FAMILY.poppins,
  },
  defaultMedium: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    fontWeight: "500",
    // fontFamily: FONT_FAMILY.poppinsMedium,
  },
  defaultSemiBold: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    fontWeight: "600",
    // fontFamily: FONT_FAMILY.poppinsSemiBold,
  },
  defaultBold: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    fontWeight: "700",
    // fontFamily: FONT_FAMILY.poppinsBold,
  },
  defaultExtraBold: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    fontWeight: "800",
    // fontFamily: FONT_FAMILY.poppinsExtraBold,
  },
  defaultBlack: {
    fontSize: FONT_SIZE.normal,
    lineHeight: 24,
    fontWeight: "900",
    // fontFamily: FONT_FAMILY.poppinsBlack,
  },
  header: {
    fontWeight: "700",
    color: COLORS.light.black,
    fontSize: FONT_SIZE.xxLarge,
    marginBottom: SPACING.large,
    // fontFamily: FONT_FAMILY.poppinsBold,
  },
  titleItalic: {
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.light.black,
    // fontFamily: FONT_FAMILY.poppinsMediumItalic,
    fontSize: FONT_SIZE.large,
  },
  errorMessage: {
    color: COLORS.light.red,
    fontSize: FONT_SIZE.tiny,
    // fontFamily: FONT_FAMILY.poppins,
  },
  successMessage: {
    color: COLORS.light.brand,
    fontSize: FONT_SIZE.small,
    // fontFamily: FONT_FAMILY.poppins,
  },
  tiny: {
    fontSize: FONT_SIZE.tiny,
    // fontFamily: FONT_FAMILY.poppins,
  },
  medium: {
    fontSize: FONT_SIZE.medium,
    // fontFamily: FONT_FAMILY.poppins,
  },
  link: {
    fontWeight: "500",
    color: COLORS.light.brand,
    // fontFamily: FONT_FAMILY.poppinsMediumItalic,
  },
} as const;

export const ThemedText = ({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const selectedStyle = styles[type] || styles.default;

  return (
    <Text
      style={[
        { color },
        selectedStyle,
        style,
        { flexShrink: 1 },
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create(typeStyles);
