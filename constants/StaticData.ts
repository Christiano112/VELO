import { IMAGES } from "./Images";

export const DATES = {
  TODAY: new Date(new Date().setDate(new Date().getDate())),
  TOMORROW: new Date(new Date().setDate(new Date().getDate() + 1)),
};

export const notifications = [
  {
    id: 1,
    title: "Your driver is nearby",
    message:
      "John (Toyota Corolla, GJ-234-XY) is 2 min away. Be ready at pickup.",
  },
  {
    id: 2,
    title: "Trip receipt available",
    message:
      "Receipt for ₦3,450 trip to Admiralty Way is ready. View in Trips.",
  },
  {
    id: 3,
    title: "Promo unlocked: 20% off",
    message: "Use code VELO20 for 20% off next 2 rides (max ₦1,000 each).",
  },
  {
    id: 4,
    title: "Rate your last ride",
    message: "How was your ride with Aisha? Rate your experience.",
  },
  {
    id: 5,
    title: "Safety check-in",
    message: "Share your trip status with a friend from the ride screen.",
  },
  {
    id: 6,
    title: "Payment method updated",
    message:
      "Default payment changed to Visa •••• 4218. If not you, contact support.",
  },
  {
    id: 7,
    title: "Peak hours pricing",
    message: "High demand 5–7pm may affect prices. Book early.",
  },
  {
    id: 8,
    title: "Support replied",
    message: "Support replied to your missing item request. Open Help Center.",
  },
  {
    id: 9,
    title: "Driver changed",
    message: "New driver assigned: Musa (Honda City, KJA-889-FR). ETA 4 min.",
  },
  {
    id: 10,
    title: "Driver arrived",
    message: "Your driver is waiting at the pickup point.",
  },
  {
    id: 11,
    title: "Ride cancelled",
    message: "Your ride was cancelled. No charges applied.",
  },
  {
    id: 12,
    title: "Scheduled ride reminder",
    message: "Reminder: Ride at 7:30 AM tomorrow. Edit or cancel if needed.",
  },
  {
    id: 13,
    title: "Referral bonus earned",
    message: "You earned ₦1,500 for inviting a friend. Applied to next ride.",
  },
  {
    id: 14,
    title: "Account verified",
    message: "Your email and phone number are now verified.",
  },
  {
    id: 15,
    title: "New feature: Saved Places",
    message: "Save Home and Work for faster bookings.",
  },
  {
    id: 16,
    title: "Promo: Airport rides",
    message: "Get ₦800 off airport trips this weekend. Limited slots.",
  },
  {
    id: 17,
    title: "Trip summary ready",
    message: "Your weekly trip summary is available in Trips.",
  },
  {
    id: 18,
    title: "Tip your driver",
    message: "Like your ride with Chinedu? Send a tip from Trip Details.",
  },
  {
    id: 19,
    title: "Document expiring",
    message: "Your ID verification expires soon. Update in Settings.",
  },
  {
    id: 20,
    title: "Outage resolved",
    message: "Earlier payment issues have been fixed. Thanks for patience.",
  },
];

export const helpItems = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login screen and tap 'Forgot Password'. Enter your email address and we'll send you a reset link. Follow the instructions in the email to create a new password.",
  },
  {
    id: 2,
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team through the 'Contact Us' section in Settings, or email us directly at support@example.com. We typically respond within 24 hours.",
  },
  {
    id: 3,
    question: "How do I update my profile information?",
    answer:
      "Navigate to Settings > Profile to update your personal information, including name, email, phone number, and profile picture. Changes are saved automatically.",
  },
  {
    id: 4,
    question: "How do I enable notifications?",
    answer:
      "Go to Settings > Notifications to customize your notification preferences. You can enable or disable different types of notifications and set quiet hours.",
  },
];

export const rides = Array.from({ length: 22 }, (_, index) => ({
  id: index + 1,
  vehicleType: `Sedan ${index + 1}`,
  pickup: `Pickup ${index + 1}`,
  destination: `Destination ${index + 1}`,
  status: index % 2 === 0 ? "completed" : "cancelled",
  date: new Date(Date.now() - index * 86400000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
}));

export const rideDetail = {
  carType: "Sedan x1",
  dateOfRide: "28/10/2024",
  rideId: "RD1561V461321",
  status: "completed",
  driver: {
    name: "Ravi Das",
    license: "PB 65 L 4578",
    avatar: IMAGES.DRIVER,
  },
  distance: "1.25 km",
  duration: "15 mins",
};
