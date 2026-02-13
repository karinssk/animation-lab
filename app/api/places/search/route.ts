import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACE_API_KEY!;
const BASE = "https://maps.googleapis.com/maps/api/place";

const ALLOWED_TYPES = new Set([
  "restaurant", "cafe", "bar", "bakery",
  "meal_delivery", "meal_takeaway", "night_club",
]);

interface SearchBody {
  query?: string;
  location?: { lat: number; lng: number };
  radius?: number;
  type?: string;
  pageToken?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchBody = await request.json();
    const {
      query = "restaurant",
      location,
      radius = 5000,
      type,
      pageToken,
    } = body;

    const safeQuery = (query || "restaurant").slice(0, 200);
    const safeRadius = Math.min(Math.max(Number(radius) || 5000, 100), 50000);
    const safeType = type && ALLOWED_TYPES.has(type) ? type : undefined;

    // ALWAYS use Text Search for better natural language understanding ("vibe search")
    // Nearby Search is too strict with keywords.
    const params = new URLSearchParams({
      query: safeQuery,
      key: API_KEY,
      language: "th",
    });

    if (location) {
      params.set("location", `${location.lat},${location.lng}`);
      params.set("radius", String(safeRadius));
    }

    if (safeType) params.set("type", safeType);
    if (pageToken) params.set("pagetoken", pageToken);

    const url = `${BASE}/textsearch/json?${params}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
      console.error("❌ Google Search API Error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { results: [], nextPageToken: null, status: data.status, error: data.error_message },
        { status: 429 }
      );
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const results = (data.results || []).map((r: any) => ({
      placeId: r.place_id,
      name: r.name,
      address: r.formatted_address || r.vicinity || "",
      location: r.geometry?.location || { lat: 0, lng: 0 },
      rating: r.rating ?? null,
      userRatingsTotal: r.user_ratings_total ?? 0,
      types: r.types || [],
      priceLevel: r.price_level ?? null,
      openNow: r.opening_hours?.open_now ?? null,
      photos: (r.photos || []).slice(0, 10).map((p: any) => ({
        photoReference: p.photo_reference,
        width: p.width,
        height: p.height,
      })),
    }));

    return NextResponse.json({
      results,
      nextPageToken: data.next_page_token || null,
      status: data.status,
    });
  } catch (err) {
    console.error("Places search error:", err);
    return NextResponse.json(
      { results: [], nextPageToken: null, status: "ERROR" },
      { status: 500 }
    );
  }
}
