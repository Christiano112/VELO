import { theme } from "@/constants/Theme";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export const Toast = ({ message, isVisible, onHide }: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(onHide);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, fadeAnim, onHide]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: 8,
    padding: theme.spacing.m,
    alignItems: "center",
    elevation: 5,
  },
  text: { ...theme.typography.getFont("500", 16), color: theme.colors.white },
});
