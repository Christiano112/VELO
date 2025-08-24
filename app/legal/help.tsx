import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SPACING } from "@/constants/GlobalStyles";
import { helpItems } from "@/constants/StaticData";
import { Ionicons } from "@expo/vector-icons";

const Help = () => {
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({
    1: true,
  });

  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <ScrollContainer title="Help">
      <ThemedView style={styles.helpContainer}>
        {helpItems?.map((item, index) => (
          <ThemedView key={item.id}>
            <TouchableOpacity
              style={styles.helpItem}
              onPress={() => toggleExpand(item.id)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.questionText}>
                {item.question}
              </ThemedText>
              <Ionicons
                name={expandedItems[item.id] ? "remove" : "add"}
                size={20}
                color="#394347"
              />
            </TouchableOpacity>

            {expandedItems[item.id] && (
              <ThemedView style={styles.answerContainer}>
                <ThemedText style={styles.answerText}>{item.answer}</ThemedText>
              </ThemedView>
            )}

            {index < helpItems.length - 1 && (
              <ThemedView style={styles.separator} />
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollContainer>
  );
};

export default Help;

const styles = StyleSheet.create({
  content: {
    gap: SPACING.medium,
  },
  helpContainer: {
    margin: SPACING.normal,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(151, 81, 212, 0.15)",
    backgroundColor: "#fff",
    paddingHorizontal: SPACING.normal,
  },
  helpItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.normal,
    paddingVertical: SPACING.normal,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#394347",
  },
  answerContainer: {
    paddingBottom: SPACING.normal,
  },
  answerText: {
    fontSize: 12,
    color: "#394347",
    opacity: 0.7,
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: "#394347",
    opacity: 0.1,
  },
});
