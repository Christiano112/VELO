import { Ionicons } from "@expo/vector-icons";

export interface Driver {
  id: string;
  latitude: number;
  longitude: number;
  rotation: number;
  eta: number;
  type: "standard" | "premium" | "xl";
  rating: number;
}

export interface LocationRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface PreviousDestination {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  visits: number;
  lastVisited: Date;
  iconName: keyof typeof Ionicons.glyphMap;
}

export interface RideOption {
  id: string;
  name: string;
  type: "economy" | "premium" | "luxury" | "xl";
  price: number;
  currency: string;
  eta: number;
  capacity: number;
  description: string;
  features: string[];
  icon: keyof typeof Ionicons.glyphMap;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "cash" | "card" | "wallet" | "digital";
  icon: keyof typeof Ionicons.glyphMap;
  isDefault: boolean;
}

// Sample data
export const RIDE_OPTIONS: RideOption[] = [
  {
    id: "1",
    name: "Economy",
    type: "economy",
    price: 93.2,
    currency: "R",
    eta: 2,
    capacity: 4,
    description: "Affordable everyday rides",
    features: ["Standard car", "AC included"],
    icon: "car",
  },
  {
    id: "2",
    name: "Sedan",
    type: "premium",
    price: 103.2,
    currency: "R",
    eta: 3,
    capacity: 4,
    description: "More comfort and space",
    features: ["Premium sedan", "Professional driver"],
    icon: "car-sport",
  },
  {
    id: "3",
    name: "SUV",
    type: "xl",
    price: 145.8,
    currency: "R",
    eta: 5,
    capacity: 6,
    description: "Extra space for groups",
    features: ["7-seater SUV", "Extra luggage space"],
    icon: "bus",
  },
  {
    id: "4",
    name: "Luxury",
    type: "luxury",
    price: 189.5,
    currency: "R",
    eta: 4,
    capacity: 4,
    description: "Premium luxury experience",
    features: ["Luxury car", "VIP service", "Complimentary water"],
    icon: "diamond",
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "1",
    name: "Cash",
    type: "cash",
    icon: "cash",
    isDefault: true,
  },
  {
    id: "2",
    name: "Credit Card",
    type: "card",
    icon: "card",
    isDefault: false,
  },
  {
    id: "3",
    name: "Digital Wallet",
    type: "wallet",
    icon: "wallet",
    isDefault: false,
  },
];
