import { format } from "date-fns";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/form/AppButton";
import ScrollContainer from "@/components/layout/HeaderScroll";
import { CalendarModal } from "@/components/ui/CalendarModal";
import { Time, TimePickerModal } from "@/components/ui/TimePickerModal";
import { Toast } from "@/components/ui/Toast";
import { theme } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";

const DateTimePickerInput = ({
  icon,
  label,
  value,
  onPress,
  placeholder,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress: () => void;
  placeholder: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Select ${label}`}
      onPress={onPress}
      style={styles.inputPressable}
    >
      <Text style={[styles.inputValue, !value && styles.inputPlaceholder]}>
        {value || placeholder}
      </Text>
      <Ionicons name={icon} size={24} color={theme.colors.primary} />
    </Pressable>
  </View>
);

const CustomerScheduleRide = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
    message: "",
    isVisible: false,
  });

  const isNextDisabled = !date || !time;

  const showToast = (message: string) => setToast({ message, isVisible: true });

  const formatTime = useCallback((t: Time | null): string => {
    if (!t) return "";
    return `${t.hours}:${String(t.minutes).padStart(2, "0")} ${t.period}`;
  }, []);

  const handleConfirmTime = useCallback((selectedTime: Time) => {
    setTime(selectedTime);
    setTimePickerVisible(false);
  }, []);

  const handleConfirmDate = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  }, []);

  const handleNextPress = useCallback(() => {
    if (isNextDisabled) return;
    const formattedDate = date ? format(date, "MMMM d, yyyy") : "";
    const formattedTime = formatTime(time);
    showToast(`Ride scheduled for ${formattedDate} at ${formattedTime}`);
    // Navigation logic would go here
  }, [date, time, isNextDisabled, formatTime]);

  return (
    <>
      <ScrollContainer title="Rides">
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Select your desired pickup date and time to schedule your ride in
            advance.
          </Text>
          <View style={styles.form}>
            <DateTimePickerInput
              label="Choose Date"
              placeholder="Select a date"
              value={date ? format(date, "MMMM d, yyyy") : ""}
              onPress={() => setDatePickerVisible(true)}
              icon="calendar-outline"
            />
            <DateTimePickerInput
              label="Choose Time"
              placeholder="Select a time"
              value={formatTime(time)}
              onPress={() => setTimePickerVisible(true)}
              icon="time-outline"
            />
          </View>

          <AppButton
            title="Next"
            onPress={handleNextPress}
            isDisabled={isNextDisabled}
          />
        </View>
      </ScrollContainer>

      <CalendarModal
        isVisible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onSelectDate={handleConfirmDate}
        selectedDate={date}
      />
      <TimePickerModal
        isVisible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onConfirm={handleConfirmTime}
        initialTime={time}
      />
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onHide={() => setToast({ message: "", isVisible: false })}
      />
    </>
  );
};

export default CustomerScheduleRide;

// Styles (using the new theme)
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  subtitle: {
    ...theme.typography.getFont("400", 16),
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  form: { flex: 1, gap: theme.spacing.l },
  inputContainer: { width: "100%" },
  inputLabel: {
    ...theme.typography.getFont("500", 16),
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  },
  inputPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 18,
  },
  inputValue: {
    ...theme.typography.getFont("400", 16),
    color: theme.colors.textPrimary,
  },
  inputPlaceholder: { color: theme.colors.textPlaceholder },
});
