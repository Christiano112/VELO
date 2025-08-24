import { MAP_STYLE } from "@/constants/RideConstants";
import type { Driver, LocationRegion, PreviousDestination } from "@/types/ride";
import { Animated, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DestinationMarkers } from "./DestinationMarkers";
import { DriverMarkers } from "./DriverMarkers";
import { UserLocationMarker } from "./UserLocationMarker";
import { RefObject } from "react";

interface RideMapProps {
  mapRef: RefObject<MapView | null>;
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
      style={StyleSheet.absoluteFill}
      region={location}
      showsMyLocationButton
      showsUserLocation
      userLocationAnnotationTitle="Your Location"
      showsTraffic
      showsPointsOfInterest
      showsIndoors
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
