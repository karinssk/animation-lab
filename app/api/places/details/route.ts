import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACE_API_KEY!;
const BASE = "https://maps.googleapis.com/maps/api/place/details/json";

const FIELDS = [
  "name", "formatted_address", "formatted_phone_number", "geometry",
  "photos", "rating", "user_ratings_total", "reviews", "opening_hours",
  "website", "types", "price_level", "editorial_summary", "business_status",
].join(",");

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "Missing placeId" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: FIELDS,
      key: API_KEY,
      language: "th",
    });

    const res = await fetch(`${BASE}?${params}`);
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || data.status },
        { status: 400 }
      );
    }

    const r = data.result;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const details = {
      placeId,
      name: r.name || "",
      formattedAddress: r.formatted_address || "",
      formattedPhone: r.formatted_phone_number || null,
      website: r.website || null,
      rating: r.rating ?? null,
      userRatingsTotal: r.user_ratings_total ?? 0,
      priceLevel: r.price_level ?? null,
      openNow: r.opening_hours?.open_now ?? null,
      weekdayText: r.opening_hours?.weekday_text || [],
      photos: (r.photos || []).slice(0, 8).map((p: any) => ({
        photoReference: p.photo_reference,
        width: p.width,
        height: p.height,
      })),
      reviews: (r.reviews || []).slice(0, 5).map((rv: any) => ({
        authorName: rv.author_name || "Anonymous",
        authorPhotoUrl: rv.profile_photo_url || "",
        rating: rv.rating ?? 0,
        relativeTime: rv.relative_time_description || "",
        text: rv.text || "",
      })),
      types: r.types || [],
      editorialSummary: r.editorial_summary?.overview || null,
      location: r.geometry?.location || { lat: 0, lng: 0 },
    };

    return NextResponse.json(details, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Place details error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
