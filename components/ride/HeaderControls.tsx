import { ShadowView } from "@/components/ui/ShadowView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface HeaderControlsProps {
  onMenuPress: () => void;
}

export const HeaderControls = ({ onMenuPress }: HeaderControlsProps) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  headerControls: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 2,
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
});
