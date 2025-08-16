import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { IMAGES } from "@/constants/Images";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Image, Modal, StyleSheet } from "react-native";
import AppButton from "../form/AppButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ShadowView } from "./ShadowView";

interface PropType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  buttonText?: string;
  onClose?: () => void;
  type?: "success" | "info";
}

const CustomModal = ({
  showModal,
  setShowModal,
  title,
  onClose,
  text,
  buttonText,
  type = "success",
}: PropType) => {
  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      visible={showModal}
      onRequestClose={() => {
        onClose && onClose();
        setShowModal(!showModal);
      }}
    >
      <ThemedView style={styles.screen}>
        <ShadowView style={styles.modalContainer}>
          <Image
            source={IMAGES.SUCCESS_MARK}
            style={styles.image}
            alt={type === "success" ? "Success" : "Info"}
          />
          <ThemedText type="titleItalic">{title}</ThemedText>
          <ThemedText type="medium" style={styles.text}>
            {text}
          </ThemedText>
          <AppButton
            type="form"
            onPress={() => {
              onClose && onClose();
              setShowModal(false);
            }}
          >
            {buttonText || "Continue"}
          </AppButton>
        </ShadowView>
      </ThemedView>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.light.halfBlack,
    padding: SPACING.large,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: COLORS.light.background,
    paddingVertical: SPACING.xmLarge,
    paddingHorizontal: SPACING.medium,
    borderRadius: SPACING.xmLarge,
    gap: SPACING.medium,
  },
  image: {
    width: 108,
    height: 107,
    alignSelf: "center",
    marginBottom: SPACING.xxLarge,
  },
  text: {
    textAlign: "center",
    marginBottom: SPACING.xLarge,
  },
});
