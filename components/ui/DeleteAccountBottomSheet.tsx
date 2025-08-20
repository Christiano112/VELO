import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppButton from "@/components/form/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";

interface DeleteAccountBottomSheetProps {
  title?: string;
  reason: string;
  onChangeReason: (text: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
}

const DeleteAccountBottomSheet = forwardRef<
  BottomSheet,
  DeleteAccountBottomSheetProps
>(
  (
    {
      title = "Are you sure you want to Delete your account?",
      reason,
      onChangeReason,
      onConfirm,
      onCancel,
      confirmText = "Confirm",
      cancelText = "Cancel",
      placeholder = "Tell us why you are leaving",
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
          enableTouchThrough={false}
          pressBehavior="none"
          style={{ zIndex: 3 }}
        />
      ),
      [],
    );

    const handleConfirm = () => {
      Keyboard.dismiss();
      onConfirm();
    };

    const handleCancel = () => {
      Keyboard.dismiss();
      onCancel();
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enableDynamicSizing
        detached
        bottomInset={insets.bottom}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enablePanDownToClose
        android_keyboardInputMode="adjustPan"
        backgroundStyle={{ backgroundColor: "#F7F8F9" }}
        style={{ zIndex: 5 }}
        onChange={(index) => {
          if (index === -1) {
            Keyboard.dismiss();
          }
        }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <ThemedText type="defaultSemiBold" style={styles.sheetTitle}>
            {title}
          </ThemedText>
          <BottomSheetTextInput
            placeholder={placeholder}
            value={reason}
            onChangeText={onChangeReason}
            style={styles.sheetTextInput}
            placeholderTextColor="#9ca3af"
            cursorColor={COLORS.light.brand}
          />
          <ThemedView style={styles.sheetButtons}>
            <Pressable onPress={handleCancel} style={styles.cancelButton}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.cancelButtonText}
                selectable={false}
              >
                {cancelText}
              </ThemedText>
            </Pressable>
            <AppButton onPress={handleConfirm}>{confirmText}</AppButton>
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

DeleteAccountBottomSheet.displayName = "DeleteAccountBottomSheet";

const styles = StyleSheet.create({
  sheetContent: {
    padding: SPACING.normal,
    gap: SPACING.xLarge,
  },
  sheetTitle: {
    fontSize: FONT_SIZE.large,
    color: "#394347",
    textAlign: "center",
    fontWeight: "600",
  },
  sheetButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.large,
    backgroundColor: COLORS.light.transparent,
    marginBottom: SPACING.large,
  },
  cancelButton: {
    paddingHorizontal: SPACING.xLarge,
    paddingVertical: SPACING.BMedium,
    borderRadius: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.light.red,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.light.red,
  },
  sheetTextInput: {
    borderWidth: 1,
    borderColor: COLORS.light.borderColor,
    borderRadius: SPACING.mSmall,
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.light.white,
    color: COLORS.light.text,
    height: "auto",
    minHeight: 56,
    paddingHorizontal: SPACING.mSmall,
  },
});

export default DeleteAccountBottomSheet;
