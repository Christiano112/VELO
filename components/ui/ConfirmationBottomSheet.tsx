import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, ReactNode, RefObject, useCallback } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/components/form/AppButton";
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
  children?: ReactNode;
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
          pressBehavior="close"
          style={{ zIndex: 3 }}
        />
      ),
      [],
    );

    const handleConfirm = () => {
      Keyboard.dismiss();
      onConfirm();
      (ref as RefObject<BottomSheet>).current?.close();
    };

    const handleCancel = () => {
      Keyboard.dismiss();
      onCancel();
      (ref as RefObject<BottomSheet>).current?.close();
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
            <AppButton
              title={cancelText}
              onPress={handleCancel}
              variant="destructive"
            />
            <AppButton title={confirmText} onPress={handleConfirm} />
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
});

export default ConfirmationBottomSheet;
