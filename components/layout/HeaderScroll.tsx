import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
import { theme } from "@/constants/Theme";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const ScrollContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { headerComponent, scrollProps, headerHeight } = AnimatedHeader({
    title,
  });

  return (
    <ThemedView style={styles.container}>
      {headerComponent}

      <Animated.ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: headerHeight },
        ]}
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        <Animated.View style={styles.content}>{children}</Animated.View>
      </Animated.ScrollView>
    </ThemedView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    paddingHorizontal: theme.spacing.m,
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing.s,
    marginBottom: theme.spacing.xl,
  },
});
