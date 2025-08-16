import { COLORS } from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo } from "react";
import type { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface FileUploadProps {
  id: string;
  files?: { name: string; uri: string }[];
  file?: { name: string; uri: string };
  pickFile?: () => void;
  pickFiles?: () => void;
  removeFile?: (index: number) => void;
  clearFiles?: () => void;
  isUploading?: boolean;
  label?: string;
  formattedTotalSize?: string;
  placeholder?: string;
  isMultiple?: boolean;
  errorMessage?: string;
  trigger?: UseFormTrigger<any>;
  setValue: UseFormSetValue<any>;
  maxFiles?: number;
}

const FileUploadInput = ({
  id,
  files = [],
  file,
  pickFile,
  pickFiles,
  removeFile,
  clearFiles,
  formattedTotalSize,
  isUploading = false,
  label = "Upload Files",
  placeholder = "Choose files",
  isMultiple = false,
  errorMessage,
  trigger,
  setValue,
  maxFiles = 5,
}: FileUploadProps) => {
  const fileUris = useMemo(
    () => (isMultiple ? files.map((f) => f?.uri) : file?.uri),
    [files, file, isMultiple],
  );

  const handleSetValue = useCallback(() => {
    if (fileUris) {
      setValue(id, fileUris);
      trigger?.(id);
    }
  }, [fileUris, id, setValue, trigger]);

  useEffect(() => {
    handleSetValue();
  }, [handleSetValue]);

  const handlePickFile = useCallback(() => {
    if (isMultiple) {
      pickFiles?.();
    } else {
      pickFile?.();
    }
  }, [pickFiles, pickFile, isMultiple]);

  const handleRemoveFile = useCallback(
    (index: number) => {
      removeFile?.(index);
    },
    [removeFile],
  );

  const handleClearAllFiles = useCallback(() => {
    if (clearFiles) {
      clearFiles();
    }
  }, [clearFiles]);

  const canAddMoreFiles = isMultiple && files.length < maxFiles;
  const hasFiles = isMultiple ? files.length > 0 : !!file;

  return (
    <ThemedView style={styles.uploadContainer}>
      {label && (
        <ThemedView style={styles.labelContainer}>
          <ThemedText type="medium">{label}</ThemedText>
          {isMultiple && (
            <ThemedText style={styles.fileCount}>
              {files.length}/{maxFiles}
            </ThemedText>
          )}
        </ThemedView>
      )}

      <TouchableOpacity
        style={[
          styles.uploadButton,
          isUploading && styles.uploadButtonDisabled,
          errorMessage && styles.uploadButtonError,
        ]}
        activeOpacity={0.7}
        onPress={handlePickFile}
        disabled={isUploading || (!isMultiple && hasFiles) || !canAddMoreFiles}
      >
        <ThemedView style={styles.content}>
          <MaterialCommunityIcons
            name={isUploading ? "loading" : "file-upload"}
            size={24}
            color={isUploading ? COLORS.light.inputBg : COLORS.light.blue}
          />
          <ThemedText
            style={[
              styles.uploadText,
              isUploading && styles.uploadTextDisabled,
            ]}
          >
            {isUploading
              ? "Uploading..."
              : hasFiles && !isMultiple
                ? "File selected"
                : canAddMoreFiles || !isMultiple
                  ? placeholder
                  : `Maximum ${maxFiles} files reached`}
          </ThemedText>
        </ThemedView>

        {hasFiles && canAddMoreFiles && (
          <ThemedView style={styles.plus}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={COLORS.light.white}
            />
          </ThemedView>
        )}
      </TouchableOpacity>

      {hasFiles && (
        <ThemedView style={styles.filesContainer}>
          <ThemedView style={styles.filesHeader}>
            <ThemedText style={styles.filesTitle}>
              {isMultiple
                ? `Selected Files (${files.length})`
                : "Selected File"}{" "}
              {formattedTotalSize}
            </ThemedText>
            {isMultiple && files.length > 1 && (
              <TouchableOpacity
                onPress={handleClearAllFiles}
                style={styles.clearAllButton}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.clearAllText}>Clear All</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>

          <ThemedView style={styles.files}>
            {(isMultiple ? files : [file])
              .filter(Boolean)
              .map((currentFile, index) => (
                <ThemedView
                  key={`${currentFile?.uri}-${index}`}
                  style={styles.fileItem}
                >
                  <MaterialCommunityIcons
                    name="attachment"
                    size={20}
                    color={COLORS.light.inputBg}
                  />
                  <ThemedText style={styles.fileName} numberOfLines={1}>
                    {currentFile?.name}
                  </ThemedText>
                  <TouchableOpacity
                    onPress={() => handleRemoveFile(index)}
                    style={styles.removeButton}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={16}
                      color={COLORS.light.white}
                    />
                  </TouchableOpacity>
                </ThemedView>
              ))}
          </ThemedView>
        </ThemedView>
      )}

      {errorMessage && (
        <ThemedText style={styles.errorMessage} type="errorMessage">
          {errorMessage}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default FileUploadInput;

const styles = StyleSheet.create({
  uploadContainer: {
    gap: SPACING.small,
    marginBottom: SPACING.normal,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileCount: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.light.inputBg,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.normal,
    borderRadius: SPACING.small,
    backgroundColor: COLORS.light.inputBg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonError: {
    borderColor: COLORS.light.red,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.medium,
    backgroundColor: COLORS.light.transparent,
    flex: 1,
  },
  uploadText: {
    color: COLORS.light.placeholderColor,
    flex: 1,
  },
  uploadTextDisabled: {
    color: COLORS.light.inputBg,
  },
  plus: {
    backgroundColor: COLORS.light.blue,
    padding: SPACING.small,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  filesContainer: {
    gap: SPACING.small,
  },
  filesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filesTitle: {
    fontSize: FONT_SIZE.medium,
    fontWeight: "500",
    color: COLORS.light.placeholderColor,
  },
  clearAllButton: {
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.mSmall,
  },
  clearAllText: {
    fontSize: FONT_SIZE.small,
    color: COLORS.light.red,
  },
  files: {
    gap: SPACING.small,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.small,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.light.inputBg,
    borderRadius: SPACING.mSmall,
    borderWidth: 1,
    borderColor: COLORS.light.borderColor || COLORS.light.inputBg + "20",
  },
  fileName: {
    color: COLORS.light.brand,
    flex: 1,
    fontSize: FONT_SIZE.medium,
  },
  removeButton: {
    backgroundColor: COLORS.light.red,
    padding: SPACING.mSmall,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    marginTop: -SPACING.small,
  },
});
