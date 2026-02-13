export interface LatLng {
  lat: number;
  lng: number;
}

export interface SearchRequestBody {
  query: string;
  location?: LatLng;
  radius?: number;
  type?: string;
  pageToken?: string;
}

export interface PlacePhoto {
  photoReference: string;
  width: number;
  height: number;
}

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  location: LatLng;
  rating: number | null;
  userRatingsTotal: number;
  types: string[];
  priceLevel: number | null;
  openNow: boolean | null;
  photos: PlacePhoto[];
}

export interface PlaceReview {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTime: string;
  text: string;
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  formattedAddress: string;
  formattedPhone: string | null;
  website: string | null;
  rating: number | null;
  userRatingsTotal: number;
  priceLevel: number | null;
  openNow: boolean | null;
  weekdayText: string[];
  photos: PlacePhoto[];
  reviews: PlaceReview[];
  types: string[];
  editorialSummary: string | null;
  location: LatLng;
}

export interface FilterChip {
  id: string;
  label: string;
  icon: string;
  type: string;
}
