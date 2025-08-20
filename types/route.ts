export interface RouteLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: string;
  type: "home" | "work" | "location" | "university" | "mall";
}

export interface RouteStep {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  instruction: string;
  distance: string;
  duration: string;
}

// Sample data
export const SAMPLE_LOCATIONS: RouteLocation[] = [
  {
    id: "1",
    name: "House Garden",
    address: "House No. 123, Phase 3B2, Sector 60, Mohali, Punjab 160059",
    latitude: 30.7046,
    longitude: 76.7179,
    distance: "8.8km",
    type: "home",
  },
  {
    id: "2",
    name: "TDI Business Centre",
    address:
      "TDI Business Centre, Sector 118, Landran-Banur Road, Mohali, Punjab 140307",
    latitude: 30.7333,
    longitude: 76.7794,
    distance: "12.3km",
    type: "work",
  },
  {
    id: "3",
    name: "Phase 3B2 Market",
    address: "Phase 3B2, Sector 60, Mohali, Punjab 160059",
    latitude: 30.7123,
    longitude: 76.7245,
    distance: "5.2km",
    type: "mall",
  },
  {
    id: "4",
    name: "Chandigarh University",
    address:
      "Chandigarh University, NH-95 Chandigarh-Ludhiana Highway, Mohali, Punjab 140413",
    latitude: 30.7588,
    longitude: 76.7747,
    distance: "15.7km",
    type: "university",
  },
];

export const SAMPLE_ROUTE: RouteStep[] = [
  {
    coordinate: { latitude: 30.7046, longitude: 76.7179 },
    instruction: "Start from House Garden",
    distance: "0km",
    duration: "0 min",
  },
  {
    coordinate: { latitude: 30.7123, longitude: 76.7245 },
    instruction: "Head northeast on Main Road",
    distance: "2.1km",
    duration: "5 min",
  },
  {
    coordinate: { latitude: 30.7333, longitude: 76.7794 },
    instruction: "Arrive at TDI Business Centre",
    distance: "8.8km",
    duration: "18 min",
  },
];

// Map style
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
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];
