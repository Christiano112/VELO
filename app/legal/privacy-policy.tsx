import { StyleSheet } from "react-native";

import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SPACING } from "@/constants/GlobalStyles";

const PrivacyPolicy = () => {
  return (
    <ScrollContainer title="Privacy Policy">
      <ThemedView style={styles.content}>
        <ThemedText style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ThemedText>
        <ThemedText style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ThemedText>
      </ThemedView>
    </ScrollContainer>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  content: {
    gap: SPACING.medium,
  },
  text: {
    fontSize: 16,
    color: "#394347",
    lineHeight: 20,
    marginBottom: 4,
  },
});
