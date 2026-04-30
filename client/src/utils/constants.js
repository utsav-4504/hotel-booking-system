// API Configuration
const PROD_API_FALLBACK =
  "https://hotel-booking-system-production-f1d1.up.railway.app/api";
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? PROD_API_FALLBACK : "http://localhost:5000/api");
export const API_TIMEOUT = 10000;

// App Configuration
export const APP_NAME = "StayLux";
export const APP_TAGLINE = "Where Luxury Meets Convenience";
export const APP_VERSION = "1.0.0";

// Storage Keys
export const STORAGE_KEYS = {
  USER: "staylux_user",
  TOKEN: "staylux_token",
  BOOKINGS: "staylux_bookings",
  THEME: "staylux_theme",
  PREFERENCES: "staylux_preferences"
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  GUEST: "guest"
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NO_SHOW: "No Show"
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: "Credit Card",
  DEBIT: "Debit Card",
  WALLET: "Digital Wallet",
  BANK_TRANSFER: "Bank Transfer",
  UPI: "UPI"
};

// Room Types
export const ROOM_TYPES = {
  SINGLE: "Single Room",
  DOUBLE: "Double Room",
  SUITE: "Suite",
  DELUXE: "Deluxe",
  LUXURY: "Luxury Suite",
  PENTHOUSE: "Penthouse"
};

// Amenities
export const AMENITIES = [
  "Free WiFi",
  "Swimming Pool",
  "Parking",
  "Restaurant",
  "Air Conditioning",
  "Fitness Center",
  "Spa",
  "Room Service",
  "Concierge",
  "Business Center",
  "Meeting Rooms",
  "Laundry Service",
  "TV",
  "Minibar",
  "Bathtub"
];

// Hotel Categories
export const HOTEL_CATEGORIES = [
  "Resort",
  "City Hotel",
  "Heritage",
  "Retreat",
  "Beach Hotel",
  "Mountain Lodge",
  "Villa Resort",
  "Luxury Hotel",
  "Safari Resort",
  "Budget Hotel",
  "Boutique Hotel",
  "Business Hotel"
];

// Filter Options
export const FILTER_OPTIONS = {
  PRICE_RANGES: [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $300", min: 200, max: 300 },
    { label: "Above $300", min: 300, max: 1000 }
  ],
  RATINGS: [
    { label: "4+ Stars", value: 4 },
    { label: "4.5+ Stars", value: 4.5 },
    { label: "4.7+ Stars", value: 4.7 },
    { label: "4.9+ Stars", value: 4.9 }
  ]
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: "DD/MM/YYYY",
  LONG: "DD MMM YYYY",
  DISPLAY: "MMM DD, YYYY",
  ISO: "YYYY-MM-DD"
};

// Currency
export const CURRENCY = {
  DEFAULT: "INR",
  SYMBOL: "₹",
  LOCALE: "en-IN"
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-()]{7,}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  BOOKING_ID_FORMAT: /^BK\d{10}$/
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  WEAK_PASSWORD: "Password must be at least 6 characters long",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  REQUIRED_FIELD: "This field is required",
  NETWORK_ERROR: "Network error. Please try again later.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "Resource not found"
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back! You have successfully logged in.",
  REGISTRATION_SUCCESS: "Your account has been created successfully.",
  BOOKING_SUCCESS: "Your booking has been confirmed successfully!",
  PAYMENT_SUCCESS: "Payment processed successfully.",
  UPDATE_SUCCESS: "Changes have been saved successfully.",
  LOGOUT_SUCCESS: "You have been logged out successfully."
};

// Confirmation Messages
export const CONFIRMATION_MESSAGES = {
  DELETE_BOOKING: "Are you sure you want to cancel this booking?",
  LOGOUT: "Are you sure you want to logout?",
  DELETE_ACCOUNT: "Are you sure you want to delete your account? This action cannot be undone."
};

// Navigation Links
export const NAVIGATION = {
  MAIN: [
    { label: "Home", path: "/" },
    { label: "Hotels", path: "/hotels" },
    { label: "Bookings", path: "/my-bookings" },
    { label: "Profile", path: "/profile" }
  ],
  AUTH: [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" }
  ],
  ADMIN: [
    { label: "Dashboard", path: "/admin" },
    { label: "Hotels", path: "/admin/hotels" },
    { label: "Bookings", path: "/admin/bookings" },
    { label: "Users", path: "/admin/users" }
  ]
};

// Animation Durations (ms)
export const ANIMATION_DURATIONS = {
  SHORT: 300,
  MEDIUM: 500,
  LONG: 1000,
  EXTRA_LONG: 1500
};

// Breakpoints
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Icons
export const ICONS = {
  SUCCESS: "✓",
  ERROR: "✕",
  WARNING: "⚠",
  INFO: "ℹ",
  LOADING: "↻"
};

// Rating Ranges
export const RATING_RANGES = {
  EXCELLENT: { min: 4.7, label: "Excellent" },
  VERY_GOOD: { min: 4.3, max: 4.69, label: "Very Good" },
  GOOD: { min: 3.9, max: 4.29, label: "Good" },
  AVERAGE: { min: 3.5, max: 3.89, label: "Average" },
  BELOW_AVERAGE: { max: 3.49, label: "Below Average" }
};

// Demo Data
export const DEMO_CREDENTIALS = {
  EMAIL: "user@staylux.com",
  PASSWORD: "demo123"
};

export default {
  API_BASE_URL,
  APP_NAME,
  STORAGE_KEYS,
  USER_ROLES,
  BOOKING_STATUS,
  PAYMENT_METHODS,
  ROOM_TYPES,
  AMENITIES,
  HOTEL_CATEGORIES,
  FILTER_OPTIONS,
  PAGINATION,
  DATE_FORMATS,
  CURRENCY,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  NAVIGATION,
  BREAKPOINTS,
  HTTP_STATUS
};
