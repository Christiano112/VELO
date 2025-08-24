import { IMAGES } from "@/constants/Images";
import type { Driver } from "@/types/ride";
import { Marker } from "react-native-maps";

interface DriverMarkersProps {
  drivers: Driver[];
}

export const DriverMarkers = ({ drivers }: DriverMarkersProps) => {
  return (
    <>
      {drivers.map((driver) => (
        <Marker
          key={driver.id}
          coordinate={{
            latitude: driver.latitude,
            longitude: driver.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          title={driver.type}
          description={`${driver.rating} (${driver.eta})`}
          image={IMAGES.MAP_CAR}
        />
      ))}
    </>
  );
};
