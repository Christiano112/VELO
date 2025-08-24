import { DriverMarker } from "@/components/map/DriverMarker";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";

type Props = {
  driverPos?: { lat: number; lng: number; heading?: number };
  routePolyline?: LatLng[];
};

export const RideInProgressMap = ({ driverPos, routePolyline }: Props) => {
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!mapRef.current || !driverPos) return;
    // Recenter only when off-screen or distance > ~150m
    // You can compute distance and conditionally animateCamera
    mapRef.current.animateCamera({
      center: { latitude: driverPos.lat, longitude: driverPos.lng },
      pitch: 0,
      heading: driverPos.heading ?? 0,
      zoom: 16,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverPos?.lat, driverPos?.lng]);

  return (
    <MapView ref={mapRef} style={StyleSheet.absoluteFillObject}>
      {routePolyline?.length ? (
        <Polyline coordinates={routePolyline} strokeWidth={4} />
      ) : null}
      {driverPos ? (
        <DriverMarker
          lat={driverPos.lat}
          lng={driverPos.lng}
          heading={driverPos.heading}
        />
      ) : null}
    </MapView>
  );
};
