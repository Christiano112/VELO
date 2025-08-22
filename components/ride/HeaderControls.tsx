import { ShadowView } from "@/components/ui/ShadowView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderControlsProps {
  onMenuPress: () => void;
  onLocationPress: () => void;
  isRefreshing: boolean;
}

export const HeaderControls = ({
  onMenuPress,
  onLocationPress,
  isRefreshing,
}: HeaderControlsProps) => {
  return (
    <View style={styles.headerControls}>
      <ShadowView type="button">
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#374151" />
        </TouchableOpacity>
      </ShadowView>

      <ShadowView type="button">
        <TouchableOpacity
          style={[styles.menuButton, isRefreshing && styles.refreshingButton]}
          onPress={onLocationPress}
          activeOpacity={0.7}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator size={20} color="#3b82f6" />
          ) : (
            <Ionicons name="locate" size={22} color="#3b82f6" />
          )}
        </TouchableOpacity>
      </ShadowView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerControls: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  refreshingButton: {
    opacity: 0.7,
  },
});
