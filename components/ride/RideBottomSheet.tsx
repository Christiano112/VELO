import type { PreviousDestination } from "@/types/ride";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
import { DestinationsList } from "./DestinationsList";
import { SearchBar } from "./SearchBar";

interface RideBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  searchInputRef: React.RefObject<TextInput | null>;
  filteredDestinations: PreviousDestination[];
  onDestinationSelect: (destination: PreviousDestination) => void;
  getVehicleColor: (type: "standard" | "premium" | "xl") => string;
}

export const RideBottomSheet = ({
  bottomSheetRef,
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
  searchInputRef,
  filteredDestinations,
  onDestinationSelect,
  getVehicleColor,
}: RideBottomSheetProps) => {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef, setIsSearchFocused]);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
    if (!searchQuery.trim()) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [bottomSheetRef, searchQuery, setIsSearchFocused]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.3}
        enableTouchThrough={false}
        pressBehavior="none"
        style={{ zIndex: 3 }}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      enableOverDrag={false}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      backgroundStyle={styles.bottomSheetBackground}
      onChange={(index) => {
        if (index === -1) {
          Keyboard.dismiss();
        }
      }}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          searchInputRef={searchInputRef}
        />

        <DestinationsList
          destinations={filteredDestinations}
          isSearchFocused={isSearchFocused}
          searchQuery={searchQuery}
          onDestinationSelect={onDestinationSelect}
          getVehicleColor={getVehicleColor}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetIndicator: {
    backgroundColor: "#d1d5db",
    width: 40,
  },
  bottomSheetBackground: {
    backgroundColor: "#ffffff",
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
