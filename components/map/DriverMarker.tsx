import React, { useEffect, useRef } from "react";
import { AnimatedRegion, MarkerAnimated } from "react-native-maps";

type Props = { lat: number; lng: number; heading?: number };

export const DriverMarker = ({ lat, lng, heading }: Props) => {
  const region = useRef(
    new AnimatedRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }),
  ).current;

  useEffect(() => {
    region
      .timing({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        duration: 900, // ms
      } as any)
      .start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  return (
    <MarkerAnimated
      coordinate={region as unknown as any}
      flat
      rotation={heading ?? 0}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
};
