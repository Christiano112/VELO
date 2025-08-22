import { theme } from "@/constants/Theme";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { BaseModal } from "./DateTimeBaseModal";

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export const CalendarModal = ({
  isVisible,
  onClose,
  onSelectDate,
  selectedDate,
}: CalendarModalProps) => {
  const [tempDate, setTempDate] = useState(selectedDate || new Date());

  useEffect(() => {
    if (isVisible) {
      setTempDate(selectedDate || new Date());
    }
  }, [isVisible, selectedDate]);

  const handleDayPress = (day: DateData) =>
    setTempDate(new Date(day.timestamp));
  const handleConfirm = () => {
    onSelectDate(tempDate);
    onClose();
  };

  const formattedHeaderDate = format(tempDate, "eee, dd MMM yyyy");
  const markedDateKey = format(tempDate, "yyyy-MM-dd");

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={formattedHeaderDate}
    >
      <View style={styles.calendarWrapper}>
        <Calendar
          current={format(tempDate, "yyyy-MM-dd")}
          onDayPress={handleDayPress}
          markedDates={{
            [markedDateKey]: {
              selected: true,
              selectedColor: theme.colors.primary,
            },
          }}
          theme={{
            arrowColor: theme.colors.primary,
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            textSectionTitleColor: theme.colors.primary,
            monthTextColor: theme.colors.primary,
            textMonthFontSize: 16,
            textMonthFontWeight: "bold",
          }}
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: { height: 360, justifyContent: "center" },
});
