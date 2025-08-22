import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
import { SPACING } from "@/constants/GlobalStyles";

const PrivacyPolicy = () => {
  const { headerComponent, scrollProps, headerHeight } = AnimatedHeader({
    title: "Privacy Policy",
  });

  return (
    <ThemedView style={styles.container}>
      {headerComponent}

      <ScrollView
        contentContainerStyle={[{ paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        <ThemedView style={styles.content}>
          <ThemedText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ThemedText>
          <ThemedText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.xxLarge,
    gap: SPACING.medium,
    marginTop: SPACING.normal,
  },
  text: {
    fontSize: 16,
    color: "#394347",
    lineHeight: 20,
    marginBottom: 4,
  },
});
