import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
import { SPACING } from "@/constants/GlobalStyles";
import { notifications } from "@/constants/StaticData";

const CustomerNotification = () => {
  const { headerComponent, scrollProps, headerHeight } = AnimatedHeader({
    title: "My Rides",
    transitionThreshold: 100,
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
          {notifications?.map((item, index) => (
            <ThemedView key={item.id}>
              <ThemedView style={styles.notificationItem}>
                <ThemedText style={styles.notificationTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText style={styles.notificationMessage}>
                  {item.message}
                </ThemedText>
              </ThemedView>
              {index < notifications.length - 1 && (
                <ThemedView style={styles.separator} />
              )}
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default CustomerNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.xxLarge,
  },
  notificationItem: {
    paddingVertical: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#394347",
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 12,
    color: "#394347",
    opacity: 0.5,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#0d0d0d",
    opacity: 0.1,
  },
});
