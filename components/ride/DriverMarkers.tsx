import { IMAGES } from "@/constants/Images";
import type { Driver } from "@/types/ride";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
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
        >
          <View>
            <Image source={IMAGES.CAR_SVG} style={styles.car} />
          </View>
        </Marker>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  car: {
    height: 20,
    width: 30,
  },
});
