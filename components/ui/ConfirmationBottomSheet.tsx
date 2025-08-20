import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
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

interface ConfirmationBottomSheetProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
}

const ConfirmationBottomSheet = forwardRef<
  BottomSheet,
  ConfirmationBottomSheetProps
>(
  (
    {
      title,
      onConfirm,
      onCancel,
      confirmText = "Confirm",
      cancelText = "Cancel",
      children,
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
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#F7F8F9" }}
        style={{ zIndex: 4 }}
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
          {children}
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

ConfirmationBottomSheet.displayName = "ConfirmationBottomSheet";

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
});

export default ConfirmationBottomSheet;
