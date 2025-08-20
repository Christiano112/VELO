import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { useCallback, useState } from "react";

export type UseImagePickerOptions = {
  onPicked: (uri: string) => void;
  maxSizeBytes?: number; // default 5MB
};

export function useImagePicker({
  onPicked,
  maxSizeBytes = 5 * 1024 * 1024,
}: UseImagePickerOptions) {
  const [visible, setVisible] = useState(false);

  const ensureMediaLibraryPermission = useCallback(async () => {
    const current = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (current.status === "granted") return true;
    if (current.canAskAgain === false) {
      Linking.openSettings();
      return false;
    }
    const requested = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return requested.status === "granted";
  }, []);

  const ensureCameraPermission = useCallback(async () => {
    const current = await ImagePicker.getCameraPermissionsAsync();
    if (current.status === "granted") return true;
    if (current.canAskAgain === false) {
      Linking.openSettings();
      return false;
    }
    const requested = await ImagePicker.requestCameraPermissionsAsync();
    return requested.status === "granted";
  }, []);

  const openCamera = useCallback(async () => {
    const hasPermission = await ensureCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result?.canceled) return;

    const asset = result?.assets?.[0];
    if (!asset) return;

    if (Number(asset.fileSize) > maxSizeBytes) {
      // Let caller handle UI for errors if desired
      return;
    }

    onPicked(asset.uri);
  }, [ensureCameraPermission, maxSizeBytes, onPicked]);

  const openImageLibrary = useCallback(async () => {
    const hasPermission = await ensureMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result?.canceled) return;

    const asset = result?.assets?.[0];
    if (!asset) return;

    if (Number(asset.fileSize) > maxSizeBytes) {
      return;
    }

    onPicked(asset.uri);
  }, [ensureMediaLibraryPermission, maxSizeBytes, onPicked]);

  const selectImage = useCallback(async () => {
    const hasPermission = await ensureMediaLibraryPermission();
    if (!hasPermission) return;
    setVisible(true);
  }, [ensureMediaLibraryPermission]);

  return {
    visible,
    setVisible,
    selectImage,
    openCamera,
    openImageLibrary,
  };
}
