import { StyleSheet } from "react-native";

import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SPACING } from "@/constants/GlobalStyles";
import { notifications } from "@/constants/StaticData";

const CustomerNotification = () => {
  return (
    <ScrollContainer title="Notification">
      <ThemedView>
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
    </ScrollContainer>
  );
};

export default CustomerNotification;

const styles = StyleSheet.create({
  notificationItem: {
    paddingVertical: SPACING.normal,
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
