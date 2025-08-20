import { MAP_STYLE } from "@/constants/RideConstants";
import type { Driver, LocationRegion, PreviousDestination } from "@/types/ride";
import React from "react";
import { Animated } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DestinationMarkers } from "./DestinationMarkers";
import { DriverMarkers } from "./DriverMarkers";
import { UserLocationMarker } from "./UserLocationMarker";

interface RideMapProps {
  mapRef: React.RefObject<MapView | null>;
  location: LocationRegion;
  nearbyDrivers: Driver[];
  previousDestinations: PreviousDestination[];
  pulseAnimation: Animated.Value;
  onDestinationSelect: (destination: PreviousDestination) => void;
}

export const RideMap = ({
  mapRef,
  location,
  nearbyDrivers,
  previousDestinations,
  pulseAnimation,
  onDestinationSelect,
}: RideMapProps) => {
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={location}
      customMapStyle={MAP_STYLE}
    >
      <UserLocationMarker
        location={location}
        streetAddress="Lagos, Nigeria"
        pulseAnimation={pulseAnimation}
      />
      <DriverMarkers drivers={nearbyDrivers} />
      <DestinationMarkers
        destinations={previousDestinations}
        onDestinationSelect={onDestinationSelect}
      />
    </MapView>
  );
};
