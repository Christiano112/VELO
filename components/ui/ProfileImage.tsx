import { SPACING } from "@/constants/GlobalStyles";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ImageChooserModal } from "./ImageChooserModal";

type Props = {
  id: string;
  control: Control<any>;
};

export const ProfileImage = ({ id, control }: Props) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name: id, control });

  const profileImage: string | null = useMemo(
    () => (typeof value === "string" ? value : (value ?? null)),
    [value],
  );

  const { visible, setVisible, selectImage, openCamera, openImageLibrary } =
    useImagePicker({ onPicked: onChange });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={selectImage}
        activeOpacity={0.7}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="person" size={48} />
          </View>
        )}

        <View style={styles.editButton}>
          <Ionicons name="camera" size={16} color="white" />
        </View>
      </TouchableOpacity>
      <ImageChooserModal
        visible={visible}
        onClose={() => setVisible(false)}
        onPickCamera={async () => {
          setVisible(false);
          await openCamera();
        }}
        onPickLibrary={async () => {
          setVisible(false);
          await openImageLibrary();
        }}
      />
      {error?.message && (
        <ThemedText type="errorMessage" style={styles.errorMessage}>
          {error?.message}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100 / 2,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  errorMessage: {
    marginTop: SPACING.mSmall,
  },
});
