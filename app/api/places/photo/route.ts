import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACE_API_KEY!;

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  const maxWidth = request.nextUrl.searchParams.get("maxWidth") || "400";

  if (!ref) {
    return new NextResponse("Missing ref parameter", { status: 400 });
  }

  const safeWidth = Math.min(Math.max(Number(maxWidth) || 400, 1), 1600);

  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${encodeURIComponent(ref)}&maxwidth=${safeWidth}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return new NextResponse("Photo not found", { status: response.status });
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("Photo proxy error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
