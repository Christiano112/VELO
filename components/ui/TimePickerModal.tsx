import { theme } from "@/constants/Theme";
import { FlashList } from "@shopify/flash-list";
import type { FlashListRef } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { InteractionManager, StyleSheet, Text, View } from "react-native";
import { BaseModal } from "./DateTimeBaseModal";

// Type definitions
export type Time = { hours: number; minutes: number; period: "AM" | "PM" };
const ITEM_HEIGHT = 60;

// Data generation
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const periods: ("AM" | "PM")[] = ["AM", "PM"];

// Memoized item component to prevent re-renders (as per FlashList docs)
const TimeCell = memo(
  ({
    item,
    isSelected,
    formatLabel,
  }: {
    item: string | number;
    isSelected: boolean;
    formatLabel: (i: any) => string;
  }) => (
    <View style={styles.timePickerItem}>
      <Text
        style={[
          styles.timePickerText,
          isSelected && styles.timePickerTextSelected,
        ]}
      >
        {formatLabel(item)}
      </Text>
    </View>
  ),
);

TimeCell.displayName = "TimeCell";

// The TimeColumn component, now using FlashList
interface TimeColumnProps<T> {
  data: T[];
  selectedValue: T;
  onSelect: (value: T) => void;
  formatLabel?: (value: T) => string;
}
function TimeColumn<T extends string | number>({
  data,
  selectedValue,
  onSelect,
  formatLabel = (v) => String(v),
}: TimeColumnProps<T>) {
  const flashListRef = useRef<FlashListRef<T>>(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const selectedIndex = data.indexOf(selectedValue);
      if (selectedIndex !== -1 && flashListRef.current) {
        flashListRef.current.scrollToOffset({
          offset: selectedIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
    });
  }, [selectedValue, data]);

  const handleMomentumScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
      const newValue = data[index];
      if (newValue !== undefined) {
        onSelect(newValue);
        flashListRef.current?.scrollToOffset({
          offset: index * ITEM_HEIGHT,
          animated: true,
        });
      }
    },
    [data, onSelect],
  );

  const renderItem = useCallback(
    ({ item }: { item: T }) => (
      <TimeCell
        item={item}
        isSelected={item === selectedValue}
        formatLabel={formatLabel}
      />
    ),
    [selectedValue, formatLabel],
  );

  return (
    <FlashList
      ref={flashListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => String(item)}
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingTop: ITEM_HEIGHT * 2,
        paddingBottom: ITEM_HEIGHT * 2,
      }}
    />
  );
}

// The main TimePickerModal
interface TimePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (time: Time) => void;
  initialTime: Time | null;
}

export const TimePickerModal = ({
  isVisible,
  onClose,
  onConfirm,
  initialTime,
}: TimePickerModalProps) => {
  const getDefaultTime = (): Time => {
    const now = new Date();
    let hours = now.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    return { hours, minutes: now.getMinutes(), period };
  };

  const [time, setTime] = useState<Time>(initialTime || getDefaultTime());

  useEffect(() => {
    if (isVisible) {
      setTime(initialTime || getDefaultTime());
    }
  }, [isVisible, initialTime]);

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={() => onConfirm(time)}
      title="Set Pickup Time"
    >
      <View style={styles.timePickerContent}>
        <TimeColumn
          data={hours}
          selectedValue={time.hours}
          onSelect={(h) => setTime((t) => ({ ...t, hours: h }))}
        />
        <Text style={styles.timePickerSeparator}>:</Text>
        <TimeColumn
          data={minutes}
          selectedValue={time.minutes}
          onSelect={(m) => setTime((t) => ({ ...t, minutes: m }))}
          formatLabel={(m) => String(m).padStart(2, "0")}
        />
        <TimeColumn
          data={periods}
          selectedValue={time.period}
          onSelect={(p) => setTime((t) => ({ ...t, period: p }))}
        />
        <View style={styles.pickerOverlay} pointerEvents="none">
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF00"]}
            style={styles.pickerOverlayGradient}
          />
          <View style={styles.pickerSelector} />
          <LinearGradient
            colors={["#FFFFFF00", "#FFFFFF"]}
            style={[styles.pickerOverlayGradient, { bottom: 0 }]}
          />
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  timePickerContent: {
    flexDirection: "row",
    alignItems: "center",
    height: ITEM_HEIGHT * 5,
    overflow: "hidden",
  },
  timePickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  timePickerText: {
    ...theme.typography.getFont("400", 22),
    color: theme.colors.textPlaceholder,
  },
  timePickerTextSelected: {
    ...theme.typography.getFont("600", 22),
    color: theme.colors.textPrimary,
  },
  timePickerSeparator: {
    ...theme.typography.getFont("600", 22),
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.s,
  },
  pickerOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  pickerOverlayGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 2,
  },
  pickerSelector: {
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    left: theme.spacing.m,
    right: theme.spacing.m,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderColor,
  },
});
