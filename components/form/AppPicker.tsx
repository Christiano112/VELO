import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { useCallback, useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { Modal, Platform, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";


type PickerOption = { label: string; value: string | number };

interface AppPickerProps extends PickerProps {
  id: string;
  control?: Control<any>;
  isRequired?: boolean;
  errorMessage?: string;
  placeholder?: string;
  label?: string;
  type?: "default" | "form";
  options?: PickerOption[];
}

const AppPicker: React.FC<AppPickerProps> = ({
  id,
  control,
  errorMessage,
  isRequired,
  label,
  options = [],
  onValueChange,
  type = "default",
  placeholder = "Select an option",
  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ItemValue>("");

  const handlePickerChange = useCallback(
    (
      onChange?: (value: ItemValue) => void,
      value?: ItemValue,
      index?: number,
    ) => {
      setSelectedValue(value || "");
      onChange?.(value!);
      onValueChange?.(value!, index!);
    },
    [onValueChange],
  );

  const renderPickerItems = useCallback(
    () =>
      options.map(({ label, value }) => (
        <Picker.Item
          key={value}
          label={label}
          value={value}
          style={styles.pickerText}
          fontFamily="Roboto-Regular"
          color={COLORS.light.placeholderColor}
        />
      )),
    [options],
  );

  const renderPicker = useCallback(
    (
      onChange?: (value: ItemValue) => void,
      value?: ItemValue,
      onBlur?: () => void,
    ) => (
      <Picker
        key={id}
        id={id}
        selectedValue={value || selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          handlePickerChange(onChange, itemValue, itemIndex)
        }
        onBlur={onBlur}
        style={[
          styles.picker,
          {
            backgroundColor:
              rest.enabled === false
                ? COLORS.light.borderColor
                : COLORS.light.inputBg,
          },
        ]}
        dropdownIconColor={COLORS.light.placeholderColor}
        dropdownIconRippleColor={COLORS.light.inputBg}
        selectionColor={COLORS.light.placeholderColor}
        {...rest}
      >
        {placeholder && (
          <Picker.Item
            label={placeholder}
            value=""
            style={styles.pickerText}
            fontFamily="Roboto-Regular"
            color={COLORS.light.placeholderColor}
          />
        )}
        {renderPickerItems()}
      </Picker>
    ),
    [
      id,
      selectedValue,
      rest,
      placeholder,
      renderPickerItems,
      handlePickerChange,
    ],
  );

  const renderIOSModal = useCallback(
    (
      onChange?: (value: ItemValue) => void,
      value?: ItemValue,
      onBlur?: () => void,
    ) => (
      <Modal
        visible={showModal}
        transparent
        statusBarTranslucent
        navigationBarTranslucent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <ThemedView style={styles.modalContainer}>
            {renderPicker(onChange, value, onBlur)}
          </ThemedView>
        </Pressable>
      </Modal>
    ),
    [showModal, renderPicker],
  );

  const renderPressablePicker = useCallback(
    (
      onChange?: (value: ItemValue) => void,
      value?: ItemValue,
      onBlur?: () => void,
    ) => (
      <>
        <Pressable
          onPress={() => setShowModal(true)}
          style={[
            styles.iosPickerButton,
            {
              backgroundColor:
                rest.enabled === false
                  ? COLORS.light.borderColor
                  : COLORS.light.inputBg,
            },
          ]}
          disabled={rest.enabled === false}
        >
          <ThemedView
            style={[
              styles.iosPickerItem,
              {
                backgroundColor:
                  rest.enabled === false
                    ? COLORS.light.borderColor
                    : COLORS.light.inputBg,
              },
            ]}
          >
            <ThemedText style={styles.pickerText}>
              {options?.find(
                (opt) => String(opt?.value) === String(selectedValue),
              )?.label || placeholder}
            </ThemedText>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color={COLORS.light.placeholderColor}
            />
          </ThemedView>
        </Pressable>
        {renderIOSModal(onChange, value, onBlur)}
      </>
    ),
    [options, placeholder, renderIOSModal, selectedValue, rest.enabled],
  );

  return (
    <ThemedView
      style={[
        styles.pickerContainer,
        { marginBottom: type === "form" ? SPACING.mLarge : 0 },
      ]}
    >
      {label && <ThemedText type="subtitle">{label}</ThemedText>}

      {control ? (
        <Controller
          control={control}
          rules={{ required: isRequired }}
          name={id}
          render={({ field: { onChange, value, onBlur } }) =>
            Platform.OS === "ios"
              ? renderPressablePicker(onChange, value, onBlur)
              : renderPicker(onChange, value, onBlur)
          }
        />
      ) : Platform.OS === "ios" ? (
        renderPressablePicker(
          onValueChange
            ? (value) =>
                onValueChange(
                  value,
                  options.findIndex((opt) => opt.value === value),
                )
            : undefined,
          selectedValue,
        )
      ) : (
        renderPicker(
          onValueChange
            ? (value) =>
                onValueChange(
                  value,
                  options.findIndex((opt) => opt.value === value),
                )
            : undefined,
          selectedValue,
        )
      )}

      {errorMessage && (
        <ThemedText type="errorMessage">{errorMessage}</ThemedText>
      )}
    </ThemedView>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    padding: 0,
  },
  picker: {
    color: COLORS.light.placeholderColor,
    height: "auto",
    minHeight: 56,
  },
  iosPickerButton: {
    height: "auto",
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: SPACING.mSmall,
    borderRadius: SPACING.mSmall,
  },
  iosPickerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    color: COLORS.light.placeholderColor,
    fontFamily: "Roboto-Medium",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.light.halfBlack,
  },
  modalContainer: {
    backgroundColor: COLORS.light.white,
    marginHorizontal: "auto",
    borderRadius: 10,
    maxWidth: 360,
    width: "100%",
  },
});
