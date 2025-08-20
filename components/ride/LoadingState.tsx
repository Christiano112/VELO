import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ThemedText } from "@/components/ThemedText";

interface LoadingStateProps {
  isLocationLoading: boolean;
  errorMsg: string | null;
  location: any;
  onRetry: () => void;
}

export const LoadingState = ({
  isLocationLoading,
  errorMsg,
  location,
  onRetry,
}: LoadingStateProps) => {
  if (isLocationLoading) {
    return (
      <>
        <LoadingSkeleton />
        {errorMsg && (
          <View style={styles.errorOverlay}>
            <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
          </View>
        )}
      </>
    );
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={styles.errorText}>
          Unable to load location
        </ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    gap: 16,
  },
  errorOverlay: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
