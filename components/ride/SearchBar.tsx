import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Ref } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  searchInputRef?: Ref<any>;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onFocus,
  onBlur,
  searchInputRef,
}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color="#9ca3af" />
        <BottomSheetTextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Where are you going?"
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor="#9ca3af"
          cursorColor={COLORS.light.brand}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange("")}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
    alignSelf: "stretch",
  },
  clearButton: {
    padding: 4,
  },
});
