import * as Location from "expo-location";
import type { PreviousDestination, LocationRegion } from "@/types/ride";

export const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.BestForNavigation,
  timeout: 10000,
  maximumAge: 60000,
} as const;

export const MAP_SETTINGS = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  driverUpdateInterval: 8000,
  driverCount: 12,
  driverRadius: 0.012,
} as const;

export const DEFAULT_LOCATION: LocationRegion = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: MAP_SETTINGS.latitudeDelta,
  longitudeDelta: MAP_SETTINGS.longitudeDelta,
} as const;

export const MOCK_DESTINATIONS: PreviousDestination[] = [
  {
    id: "1",
    name: "Home",
    address: "123 Main Street, San Francisco",
    latitude: 37.7849,
    longitude: -122.4094,
    visits: 15,
    lastVisited: new Date(Date.now() - 86400000),
    iconName: "home",
  },
  {
    id: "2",
    name: "Work",
    address: "456 Market Street, San Francisco",
    latitude: 37.7749,
    longitude: -122.4194,
    visits: 12,
    lastVisited: new Date(Date.now() - 172800000),
    iconName: "business",
  },
  {
    id: "3",
    name: "Westfield Mall",
    address: "865 Market St, San Francisco",
    latitude: 37.7849,
    longitude: -122.4064,
    visits: 3,
    lastVisited: new Date(Date.now() - 604800000),
    iconName: "storefront",
  },
  {
    id: "4",
    name: "Golden Gate Park",
    address: "Golden Gate Park, San Francisco",
    latitude: 37.7694,
    longitude: -122.4862,
    visits: 7,
    lastVisited: new Date(Date.now() - 259200000),
    iconName: "leaf",
  },
  {
    id: "5",
    name: "Airport",
    address: "San Francisco International Airport",
    latitude: 37.6213,
    longitude: -122.379,
    visits: 4,
    lastVisited: new Date(Date.now() - 1209600000),
    iconName: "airplane",
  },
];

export const MAP_STYLE = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
];
