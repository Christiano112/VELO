import { COLORS } from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";
import { DATES } from "@/constants/StaticData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import type { StyleProp, TextInputProps, ViewStyle } from "react-native";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface PropType extends TextInputProps {
  id: string;
  label?: string;
  secureTextEntry?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  control?: Control<any>;
  errorMessage?: string;
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  disabled?: boolean;
  setShowFilter?: Dispatch<SetStateAction<boolean>>;
  variant?: "default" | "form";
  type?:
    | "email"
    | "search"
    | "select"
    | "text"
    | "none"
    | "decimal"
    | "numeric"
    | "tel"
    | "url"
    | "date"
    | "time";
  leftIconName?:
    | "account"
    | "lock"
    | "cellphone-key"
    | "map-marker"
    | "phone"
    | "email"
    | "account-search"
    | "weight-lifter"
    | "human-male-height"
    | "calendar-month"
    | "comment-quote-outline";
  containerStyle?: StyleProp<ViewStyle>;
  setValue?: UseFormSetValue<any>;
}

const AppInput = ({
  id,
  label,
  placeholder,
  control,
  errorMessage,
  showRightIcon,
  setValue,
  onChange,
  onPress,
  setShowFilter,
  type = "text",
  variant = "form",
  disabled = false,
  isRequired = true,
  secureTextEntry = false,
  leftIconName = "account",
  showLeftIcon = true,
  containerStyle,
  ...props
}: PropType) => {
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [borderColor, setBorderColor] = useState(COLORS.light.borderColor);
  const [pickedDate, setPickedDate] = useState<Date | undefined>(undefined);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const bgColor = disabled ? COLORS.light.borderColor : COLORS.light.inputBg;

  const handleAndroidPicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: type as "date" | "time",
      is24Hour: true,
      maximumDate: DATES.TODAY,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setValue &&
            setValue(id, selectedDate, {
              shouldValidate: true,
            });
        }
      },
      accessibilityLabel: "Select date or time",
      accessibilityHint: "Press to select date or time",
      accessibilityRole: "adjustable",
      accessibilityState: { busy: true },
    });
  };

  const getValue = (value: string | Date, type: string): string => {
    const isDateTime = type === "date" || type === "time";
    if (isDateTime) {
      return value instanceof Date && !isNaN(value.getTime())
        ? value.toLocaleDateString()
        : typeof value === "string" && !isNaN(Date.parse(value))
          ? new Date(value).toLocaleDateString()
          : (value as string);
    } else {
      return value as string;
    }
  };

  return (
    <ThemedView
      style={[
        {
          marginBottom: variant === "form" ? SPACING.medium : 0,
        },
        containerStyle,
      ]}
    >
      {label && (
        <ThemedText
          type="medium"
          accessibilityLabel={`${label} input`}
          accessibilityRole="text"
        >
          {label}
        </ThemedText>
      )}
      <ThemedView
        style={[
          styles.inputContainer,
          {
            backgroundColor: bgColor,
            borderColor: errorMessage ? COLORS.light.red : borderColor,
          },
        ]}
      >
        {showLeftIcon && (
          <ThemedView
            style={[
              {
                backgroundColor: bgColor,
              },
            ]}
            accessibilityLabel="Input icon"
          >
            {type === "search" ? (
              <Ionicons name="search" size={20} />
            ) : (
              <MaterialCommunityIcons name={leftIconName} size={20} />
            )}
          </ThemedView>
        )}
        {control ? (
          <Controller
            control={control}
            rules={{
              required: isRequired,
            }}
            name={id}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    textAlignVertical: props.multiline ? "top" : "center",
                    height: props.multiline
                      ? (props.numberOfLines || 5.6) * 10
                      : "auto",
                    paddingTop: props.multiline ? SPACING.medium : 0,
                  },
                ]}
                editable={!disabled}
                id={id}
                placeholder={placeholder}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={COLORS.light.placeholderColor}
                cursorColor={COLORS.light.brand}
                onFocus={() => setBorderColor(COLORS.light.brand)}
                onEndEditing={() => setBorderColor(COLORS.light.borderColor)}
                onChangeText={onChange}
                onBlur={onBlur}
                value={getValue(value, type)}
                inputMode={
                  type === "date" || type === "time" || type === "select"
                    ? "none"
                    : type
                }
                onPress={() => {
                  if (type === "date" || type === "time") {
                    if (Platform.OS === "android") {
                      handleAndroidPicker();
                    } else {
                      setShowIOSPicker(true);
                    }
                  }
                }}
                caretHidden={
                  type === "date" || type === "time" || type === "select"
                }
                {...props}
              />
            )}
          />
        ) : (
          <TextInput
            style={[
              styles.input,
              {
                textAlignVertical: props.multiline ? "top" : "center",
                height: props.multiline
                  ? (props.numberOfLines || 5.6) * 10
                  : "auto",
                paddingTop: props.multiline ? SPACING.medium : 0,
              },
            ]}
            editable={!disabled}
            id={id}
            placeholder={placeholder}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={COLORS.light.placeholderColor}
            cursorColor={COLORS.light.brand}
            onFocus={() => setBorderColor(COLORS.light.brand)}
            onEndEditing={() => setBorderColor(COLORS.light.borderColor)}
            inputMode={
              type === "date" || type === "time" || type === "select"
                ? "none"
                : type
            }
            onPress={(e) => {
              if (type === "date" || type === "time") {
                if (Platform.OS === "android") {
                  handleAndroidPicker();
                } else {
                  setShowIOSPicker(true);
                }
              }
              if (type === "select") {
                onPress && onPress(e);
              }
            }}
            caretHidden={
              type === "date" || type === "time" || type === "select"
            }
            {...props}
          />
        )}
        {showRightIcon && (
          <ThemedView
            style={[
              styles.rightIcon,
              {
                backgroundColor: bgColor,
              },
            ]}
            accessibilityLabel="Input icon"
          >
            {type === "date" ? (
              <MaterialCommunityIcons name="calendar-month" size={20} />
            ) : type === "time" ? (
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={20}
              />
            ) : type === "search" ? (
              <MaterialCommunityIcons
                name="filter"
                size={24}
                onPress={() => {
                  setShowFilter && setShowFilter((prev) => !prev);
                }}
              />
            ) : (
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </ThemedView>
        )}
      </ThemedView>

      {Platform.OS === "ios" && showIOSPicker && (
        <Modal
          transparent
          statusBarTranslucent
          navigationBarTranslucent
          animationType="slide"
          onRequestClose={() => setShowIOSPicker(false)}
        >
          <ThemedView style={styles.modalContainer}>
            <ThemedView style={styles.picker}>
              <ThemedView style={styles.pickerHeader}>
                <Pressable
                  onPress={() => {
                    setShowIOSPicker(false);
                    setValue &&
                      setValue(id, "", {
                        shouldValidate: true,
                      });
                    setPickedDate(undefined);
                  }}
                >
                  <ThemedText type="defaultSemiBold">Cancel</ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setValue &&
                      setValue(id, pickedDate, {
                        shouldValidate: true,
                      });
                    setShowIOSPicker(false);
                    setPickedDate(undefined);
                  }}
                >
                  <ThemedText type="defaultSemiBold">Done</ThemedText>
                </Pressable>
              </ThemedView>
              <DateTimePicker
                is24Hour
                display="spinner"
                mode={type as "date" | "time"}
                value={pickedDate || new Date()}
                style={styles.dateTime}
                accentColor={COLORS.light.black}
                textColor={COLORS.light.black}
                maximumDate={DATES.TODAY}
                onChange={(event, selectedDate) => {
                  setPickedDate(selectedDate);
                }}
                accessibilityLabel="Select date or time"
                accessibilityHint="Press to select date or time"
                accessibilityRole="adjustable"
                accessibilityState={{ busy: true }}
              />
            </ThemedView>
          </ThemedView>
        </Modal>
      )}

      {errorMessage && (
        <ThemedText type="errorMessage">{errorMessage}</ThemedText>
      )}
    </ThemedView>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: SPACING.mSmall,
    borderRadius: SPACING.mSmall,
    height: "auto",
    minHeight: 56,
    paddingHorizontal: SPACING.mSmall,
    borderStyle: "solid",
    borderWidth: 1,
  },
  input: {
    flexShrink: 1,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: FONT_SIZE.normal,
    fontFamily: "Roboto-Regular",
    color: COLORS.light.black,
  },
  rightIcon: {
    marginRight: "auto",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.light.halfBlack,
  },
  picker: {
    backgroundColor: COLORS.light.white,
    marginHorizontal: "auto",
    maxWidth: 400,
    width: "90%",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.borderColor,
  },
  dateTime: {
    marginHorizontal: "auto",
    maxWidth: 400,
  },
});
