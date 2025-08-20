import MapView, { type LatLng, Marker, Polyline } from "react-native-maps";

export const RideTracking = ({
  driverLocation,
  routeCoords,
}: {
  driverLocation: LatLng;
  routeCoords: LatLng[];
}) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: driverLocation.latitude,
      longitude: driverLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker coordinate={driverLocation} title="Driver" />
    <Polyline coordinates={routeCoords} strokeWidth={4} />
  </MapView>
);
