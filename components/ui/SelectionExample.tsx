import { SPACING } from "@/constants/GlobalStyles";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { SelectionComponent } from "./SelectionComponent";

interface Option {
  id: string;
  fieldText: string;
  newOption: string;
}

const sampleOptions: Option[] = [
  { id: "1", fieldText: "Payment Method", newOption: "Credit Card" },
  { id: "2", fieldText: "Vehicle Type", newOption: "Sedan" },
  { id: "3", fieldText: "Pickup Location", newOption: "Current Location" },
  { id: "4", fieldText: "Drop-off Location", newOption: "Enter Destination" },
];

export function SelectionExample() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (optionId: string) => {
    setSelectedOption(selectedOption === optionId ? null : optionId);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="header" style={styles.title}>
        Selection Options
      </ThemedText>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {sampleOptions.map((option) => (
          <SelectionComponent
            key={option.id}
            fieldText={option.fieldText}
            newOption={option.newOption}
            isSelected={selectedOption === option.id}
            onPress={() => handleOptionPress(option.id)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.large,
  },
  title: {
    marginBottom: SPACING.xLarge,
  },
  scrollView: {
    // flex: 1,
  },
});
