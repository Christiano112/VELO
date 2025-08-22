import { theme } from "@/constants/Theme";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const BaseModal = ({
  isVisible,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "OK",
  cancelText = "CANCEL",
}: BaseModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{title}</Text>
          </View>
          {children}
          <View style={styles.modalActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={cancelText}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>{cancelText}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={confirmText}
              onPress={onConfirm}
            >
              <Text style={styles.modalButtonTextOk}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: theme.colors.modalBackdrop,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.l,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    width: "100%",
    maxWidth: 380,
    overflow: "hidden",
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
  },
  modalHeaderText: {
    ...theme.typography.getFont("600", 18),
    color: theme.colors.white,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: theme.spacing.m,
    gap: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderColor,
  },
  modalButtonText: {
    ...theme.typography.getFont("600", 16),
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
  },
  modalButtonTextOk: {
    ...theme.typography.getFont("600", 16),
    color: theme.colors.textPlaceholder,
    paddingHorizontal: theme.spacing.s,
  },
});
