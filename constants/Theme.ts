import { Platform } from "react-native";

type FontWeight = "400" | "500" | "600" | "700";

export const theme = {
  colors: {
    primary: "#6E00CC",
    primaryLight: "#7C15D5",
    primaryDark: "#540796",
    white: "#FFFFFF",
    black: "#000000",
    textPrimary: "#394347",
    textSecondary: "#6B7F85",
    textPlaceholder: "#8BA1A8",
    background: "#FFFFFF",
    inputBackground: "#F7F8F9",
    borderColor: "#E8ECF4",
    cardBackground: "#FAF3FF",
    cardBorder: "rgba(110, 0, 204, 0.5)",
    danger: "#EB5757",
    disabled: "#E0E0E0",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
  },
  typography: {
    getFont: (weight: FontWeight = "400", size: number = 16) => ({
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: weight,
      fontSize: size,
    }),
  },
  spacing: { s: 8, m: 16, l: 24, xl: 40 },
};
