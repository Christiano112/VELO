import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { IMAGES } from "@/constants/Images";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";

interface PropType {
  children: ReactNode;
}

const AuthContainer = ({ children }: PropType) => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {router.canGoBack() && (
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
      )}
      <Image source={IMAGES.WHITE_LOGO} style={styles.logo} alt="Logo" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.container}>{children}</ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.light.brand,
    paddingTop: SPACING.large,
  },
  backButton: {
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 485,
    width: "100%",
    marginHorizontal: "auto",
    paddingTop: SPACING.xLarge,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 74,
    paddingHorizontal: 24,
    paddingTop: SPACING.xmLarge,
    backgroundColor: COLORS.light.background,
  },
  logo: {
    width: 200,
    height: 90,
    objectFit: "contain",
    marginBottom: SPACING.large,
    alignSelf: "center",
  },
});
