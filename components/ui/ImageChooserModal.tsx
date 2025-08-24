import { SPACING } from "@/constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

type Props = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onPickCamera: () => void;
  onPickLibrary: () => void;
};

export const ImageChooserModal = ({
  visible,
  title = "Add your profile picture",
  onClose,
  onPickCamera,
  onPickLibrary,
}: Props) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View style={styles.modalCard}>
          <ThemedText type="header" style={styles.modalTitle}>
            {title}
          </ThemedText>
          <View style={styles.optionsRow}>
            <Pressable style={styles.optionBox} onPress={onPickCamera}>
              <View style={styles.optionInner}>
                <Ionicons name="camera" size={28} color="#394347" />
                <ThemedText type="default" style={styles.optionLabel}>
                  Take a Picture
                </ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.optionBox} onPress={onPickLibrary}>
              <View style={styles.optionInner}>
                <Ionicons name="image" size={28} color="#394347" />
                <ThemedText type="default" style={styles.optionLabel}>
                  Upload Photo
                </ThemedText>
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.medium,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: SPACING.xLarge,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    gap: SPACING.large,
  },
  modalTitle: {
    textAlign: "center",
    color: "#394347",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.medium,
  },
  optionBox: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8ecf4",
    backgroundColor: "#f7f8f9",
  },
  optionInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.small,
  },
  optionLabel: {
    color: "#394347",
    fontSize: 12,
  },
});

export default ImageChooserModal;
