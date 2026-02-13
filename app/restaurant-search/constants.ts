import type { FilterChip, LatLng } from "./types";

export const DEFAULT_CENTER: LatLng = { lat: 13.7563, lng: 100.5018 };
export const DEFAULT_ZOOM = 14;
export const SEARCH_RADIUS = 5000;
export const DEBOUNCE_MS = 500;

export const FILTER_CHIPS: FilterChip[] = [
  { id: "all", label: "All", icon: "🍽️", type: "" },
  { id: "restaurant", label: "Restaurants", icon: "🍴", type: "restaurant" },
  { id: "cafe", label: "Cafes", icon: "☕", type: "cafe" },
  { id: "bar", label: "Bars", icon: "🍸", type: "bar" },
  { id: "bakery", label: "Bakeries", icon: "🥐", type: "bakery" },
  { id: "meal_delivery", label: "Delivery", icon: "🛵", type: "meal_delivery" },
  { id: "meal_takeaway", label: "Takeaway", icon: "🥡", type: "meal_takeaway" },
];
