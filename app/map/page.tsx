"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import type L from "leaflet";
import "./map.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const DynamicMapView = dynamic(() => import("./MapView"), { ssr: false });

// ─── Icon Components ──────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.41-5.17L17 9l-7.83 3.41L6 17l5.59-2.17z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconLocate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACES = [
  {
    id: "p1",
    name: "Kenny's BKK - Ari",
    category: "Burger · Western",
    tagline: "Bangkok's most-loved comfort burgers",
    rating: "4.7",
    ratingCount: "1,181",
    price: "$$",
    distance: "0.8 km",
    status: "Open Now",
    hours: "11 AM – 10 PM",
    address: "12, Soi Ari 1, Phaya Thai Rd, BKK 10400",
    phone: "090 995 2040",
    website: "kennysbkk.com",
    tags: ["Dine-in", "Takeaway", "Kid-friendly", "Wifi"],
    photos: ["/food-pizza.jpg", "/food-steak.avif", "/food-pizza.jpg"],
    reviews: [
      { author: "Sarah M.", stars: 5, text: "Best burgers in Bangkok — crispy fries, quick service. Will 100% return." },
      { author: "James T.", stars: 4, text: "Great spot. Gets packed on weekends but totally worth the wait." },
    ],
    latlng: [13.7757, 100.5494] as [number, number],
  },
  {
    id: "p2",
    name: "Cayo Caribe",
    category: "Seafood · Caribbean",
    tagline: "Fresh catches with a Caribbean twist",
    rating: "3.9",
    ratingCount: "161",
    price: "$$$",
    distance: "2.1 km",
    status: "Closed",
    hours: "11 AM – 9 PM",
    address: "San Juan A, Coastal Market, Bangkok",
    phone: "02 144 8899",
    website: "cayocaribe.co.th",
    tags: ["Outdoor Seating", "Reservations", "Live Music"],
    photos: ["/food-steak.avif", "/food-pizza.jpg", "/food-steak.avif"],
    reviews: [
      { author: "Linda P.", stars: 4, text: "Unique flavors you won't find elsewhere. The ceviche is a must-try." },
      { author: "Mike R.", stars: 3, text: "Good food but portions are a bit small for the price." },
    ],
    latlng: [13.7722, 100.5452] as [number, number],
  },
  {
    id: "p3",
    name: "Spicy Squad House",
    category: "Thai · Street Food",
    tagline: "Fiery Thai classics in the heart of Ari",
    rating: "4.5",
    ratingCount: "903",
    price: "$",
    distance: "1.5 km",
    status: "Open Now",
    hours: "10 AM – 9 PM",
    address: "Ari Soi 4, Bangkok 10400",
    phone: "02 999 1732",
    website: "spicysquad.th",
    tags: ["Local Fav", "Spicy", "Cash Only", "No Reservations"],
    photos: ["/food-pizza.jpg", "/food-steak.avif", "/food-pizza.jpg"],
    reviews: [
      { author: "Nat B.", stars: 5, text: "Authentic Thai food at its finest. The pad kra pao here is life-changing!" },
      { author: "Chris W.", stars: 4, text: "Cash only but totally worth it. Order the green curry — no regrets." },
    ],
    latlng: [13.778, 100.5528] as [number, number],
  },
];

const FILTER_PILLS = ["Restaurant", "Seafood", "Thai", "Halal", "Vegan"];

const NAV_ITEMS = [
  { href: "/home-screen-v2",    label: "Home",    Icon: IconHome },
  { href: "/explore",           label: "Explore", Icon: IconCompass },
  { href: "/map",               label: "Map",     Icon: IconMapPin },
  { href: "/appointment-setup", label: "Plan",    Icon: IconCalendar },
  { href: "/preferences-setup", label: "Profile", Icon: IconUser },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MapPage() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(PLACES[0].id);
  const [sheetOpen, setSheetOpen] = useState(true);
  const [hasActiveGame] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<L.Map | null>(null);

  const matchedIds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return new Set<string>();
    return new Set(
      PLACES.filter((p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ).map((p) => p.id)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    if (matchedIds.size === 1) {
      setActiveId([...matchedIds][0]);
    }
  }, [matchedIds]);

  const handleMapReady = useCallback((m: L.Map) => {
    mapRef.current = m;
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    setSheetOpen(true);
  }, []);

  const activePlace = PLACES.find((p) => p.id === activeId) ?? PLACES[0];

  return (
    <div className={`${jakarta.className} map-root`}>
      <div className="map-phone">
        <div className="map-page">

          {/* Status Bar */}
          <div className="map-status">
            <span>9:41</span>
            <span className="map-battery" aria-hidden="true">
              <span className="map-battery__level" />
              <span className="map-battery__cap" />
            </span>
          </div>

          {/* Map + Sheet */}
          <div className="map-body">

            {/* Map Canvas */}
            <div className="map-canvas">

              {/* Real Leaflet map */}
              <DynamicMapView
                places={PLACES}
                activeId={activeId}
                isSearching={isSearching}
                matchedIds={matchedIds}
                onSelect={handleSelect}
                onMapReady={handleMapReady}
              />

              {/* Search + Filter overlay */}
              <div className="map-search-overlay">
                <label className="map-search-bar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="map-search-icon">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search area or restaurant"
                    className="map-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isSearching && (
                    <button onClick={() => setSearchQuery("")} className="map-search-clear">✕</button>
                  )}
                </label>

                <div className="map-filter-strip">
                  {FILTER_PILLS.map((pill) => (
                    <button key={pill} className="map-filter-pill">{pill}</button>
                  ))}
                </div>
              </div>

              {/* Zoom controls — wired to Leaflet instance */}
              <div className="map-zoom-controls">
                <button
                  className="map-zoom-btn"
                  onClick={() => mapRef.current?.zoomIn()}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  className="map-zoom-btn"
                  onClick={() => mapRef.current?.zoomOut()}
                  aria-label="Zoom out"
                >
                  −
                </button>
              </div>

              {/* My location — re-centers map */}
              <button
                className="map-my-location"
                aria-label="My location"
                onClick={() => mapRef.current?.setView([13.7755, 100.549], 15)}
              >
                <IconLocate />
              </button>
            </div>

            {/* Bottom Sheet */}
            <section className={`map-sheet${sheetOpen ? "" : " map-sheet--hidden"}`}>
              <div className="map-sheet__handle" />
              <div className="map-sheet__content space-y-3">

                {/* Place chips */}
                <div className="map-nav">
                  {PLACES.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => { setActiveId(place.id); setSheetOpen(true); }}
                      className={`map-nav__chip ${activeId === place.id ? "map-nav__chip--active" : ""}`}
                    >
                      {place.name}
                    </button>
                  ))}
                </div>

                {/* Share + Close */}
                <div className="map-top-actions">
                  <button className="map-pressable map-icon-btn" aria-label="Share">
                    <IconShare />
                  </button>
                  <button className="map-pressable map-icon-btn" aria-label="Close" onClick={() => setSheetOpen(false)}>
                    <IconClose />
                  </button>
                </div>

                {/* Place Info */}
                <div>
                  <h1 className="text-2xl leading-7 font-extrabold text-zinc-900">{activePlace.name}</h1>
                  <p className="text-xs text-zinc-500">{activePlace.category} · {activePlace.reviews} reviews</p>
                  <p className="text-sm font-semibold text-zinc-700">
                    ★ {activePlace.rating} · <span className={activePlace.status === "Open Now" ? "text-emerald-600" : "text-red-500"}>{activePlace.status}</span>
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="map-actions-grid">
                  <button className="map-pressable map-mini-btn">Directions</button>
                  <button className="map-pressable map-mini-btn">Call</button>
                  <button className="map-pressable map-mini-btn">Website</button>
                  <button className="map-pressable map-mini-btn">Share</button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 divide-x divide-zinc-200 rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-center">
                  <div>
                    <p className="text-[10px] text-zinc-500">Hours</p>
                    <p className={`text-xs font-bold ${activePlace.status === "Open Now" ? "text-emerald-600" : "text-red-500"}`}>
                      {activePlace.status === "Open Now" ? "Open" : "Closed"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Rating</p>
                    <p className="text-xs font-bold text-zinc-800">{activePlace.rating}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Reviews</p>
                    <p className="text-xs font-bold text-zinc-800">{activePlace.reviews}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Distance</p>
                    <p className="text-xs font-bold text-zinc-800">1.3 km</p>
                  </div>
                </div>

                {/* Address / Contact */}
                <div>
                  <h2 className="text-sm font-extrabold text-zinc-800">Info</h2>
                  <p className="text-sm text-zinc-600">{activePlace.address}</p>
                  <p className="text-sm font-semibold text-sky-700">{activePlace.phone}</p>
                  <p className="text-sm font-semibold text-sky-700">{activePlace.website}</p>
                </div>

                {/* Food photos */}
                <div className="map-food-row">
                  <div className="map-food"><Image src="/food-pizza.jpg" alt="Food" width={240} height={160} /></div>
                  <div className="map-food"><Image src="/food-steak.avif" alt="Food" width={240} height={160} /></div>
                  <div className="map-food"><Image src="/food-pizza.jpg" alt="Food" width={240} height={160} /></div>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="text-sm font-extrabold text-zinc-800">Ratings &amp; Reviews</h2>
                  <p className="text-xs text-zinc-600">
                    &quot;Average might be a tad harsh. The first meal I had here was surprisingly good and service was quick.&quot;
                  </p>
                </div>

              </div>
            </section>
          </div>

          {/* Persistent Game Resume Bar */}
          {hasActiveGame && (
            <Link href="/swipe?resume=true" className="map-game-bar">
              <span className="map-game-bar__dot" />
              <div className="min-w-0 flex-1">
                <p className="map-game-bar__name">Friday Food Squad</p>
                <p className="map-game-bar__sub">4 members · 00:58 left</p>
              </div>
              <span className="map-game-bar__cta">Resume →</span>
            </Link>
          )}

          {/* Bottom Nav */}
          <nav className="map-bottom-nav" aria-label="Bottom navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`map-bottom-nav__item ${active ? "map-bottom-nav__item--active" : ""}`}>
                  <item.Icon />
                  <span className="map-bottom-nav__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
