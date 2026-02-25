"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useDragControls, type PanInfo } from "framer-motion";
import { useState, type FormEvent, type ReactNode } from "react";
import "./toast-home-v2.css";

const ToastHomeV2Map = dynamic(() => import("./ToastHomeV2Map"), { ssr: false });
type LatLng = [number, number];
type ThailandSearchResult = {
  lat: string;
  lon: string;
  display_name: string;
};
const DEFAULT_MAP_CENTER: LatLng = [13.7464, 100.5393];
const DEFAULT_MAP_ZOOM = 14.8;

type ModeCard = {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  tone?: "soft" | "warm";
  span?: "single" | "double";
  hot?: boolean;
};

type RestaurantCard = {
  id: string;
  image: string;
  title: string;
  cuisine: string;
  score: string;
  distance: string;
};

function ModeIconBudget() {
  return (
    <svg viewBox="0 0 30 34" width="26" height="30" aria-hidden="true">
      {/* Knot */}
      <ellipse cx="15" cy="6.5" rx="4" ry="2.5" fill="#F9A825" />
      {/* Neck */}
      <rect x="12" y="8.5" width="6" height="4" fill="#F9A825" />
      {/* Body */}
      <ellipse cx="15" cy="22" rx="12" ry="11" fill="#FFCA28" />
      {/* $ sign */}
      <text
        x="15"
        y="26.5"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        $
      </text>
    </svg>
  );
}

function ModeIconBTS() {
  return (
    <Image src="/BTS-Logo.svg.png" alt="BTS" width={32} height={32} style={{ objectFit: "contain" }} aria-hidden="true" />
  );
}

function ModeIconTrendy() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      {/* Trend line */}
      <polyline
        points="3,26 10,17 17,22 27,8"
        fill="none"
        stroke="#43A047"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head */}
      <polyline
        points="22,5 28,8 25,14"
        fill="none"
        stroke="#43A047"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Star 1 */}
      <path d="M6,8 L7,10.8 L10,10.8 L7.6,12.5 L8.6,15.3 L6,13.6 L3.4,15.3 L4.4,12.5 L2,10.8 L5,10.8 Z" fill="#FFCA28" />
      {/* Star 2 (small) */}
      <path d="M25,22 L25.6,23.8 L27.5,23.8 L26,24.9 L26.6,26.7 L25,25.6 L23.4,26.7 L24,24.9 L22.5,23.8 L24.4,23.8 Z" fill="#FFCA28" />
    </svg>
  );
}

function ModeIconHot() {
  return (
    <svg viewBox="0 0 24 30" width="20" height="26" aria-hidden="true">
      {/* Outer flame */}
      <path d="M12 1C9 7 4 9 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-2-5.5-3-7.5-1 3-2 4.5-3 4.5 0-3-2-8.5-2-12z" fill="#FF6F00" />
      {/* Mid flame */}
      <path d="M12 8c-1.5 4-4 6-4 10 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1-3-1.5-4-.5 1.5-1 2.5-1.5 2.5 0-1.5-1-5.5-1-8.5z" fill="#FFA726" />
      {/* Core */}
      <path d="M12 15c-.8 1.5-2 2.5-2 4 0 1.1.9 2 2 2s2-.9 2-2c0-1-.5-1.5-.8-2-.2.8-.5 1.2-.7 1.2 0-.8-.5-2.5-.5-3.2z" fill="#FFEE58" />
    </svg>
  );
}

function ModeIconNight() {
  return (
    <svg viewBox="0 0 30 30" width="26" height="26" aria-hidden="true">
      {/* Crescent moon (evenodd: outer circle minus offset inner circle) */}
      <path
        fillRule="evenodd"
        d="M13,3 A12,12 0 0,1 13,27 A12,12 0 0,1 13,3 Z M18,5 A9.5,9.5 0 0,1 18,23 A9.5,9.5 0 0,1 18,5 Z"
        fill="#FFCA28"
      />
      {/* Stars */}
      <circle cx="24" cy="7" r="1.5" fill="#FFCA28" />
      <circle cx="27.5" cy="14" r="1" fill="#FFCA28" />
      <circle cx="25" cy="21" r="1.2" fill="#FFCA28" />
    </svg>
  );
}

function ModeIconOutdoor() {
  return (
    <svg viewBox="0 0 34 34" width="28" height="28" aria-hidden="true">
      {/* Umbrella dome */}
      <path d="M17 4C8.2 4 1 10.5 1 19h32C33 10.5 25.8 4 17 4z" fill="#FF8A65" />
      {/* White stripe left */}
      <path d="M17 4C15 4 13 8.5 12.5 15L17 19V4z" fill="white" opacity="0.45" />
      {/* White stripe right */}
      <path d="M17 4C19 4 21 8.5 21.5 15L17 19V4z" fill="white" opacity="0.25" />
      {/* Pole */}
      <line x1="17" y1="19" x2="17" y2="30" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
      {/* Table */}
      <rect x="8" y="27" width="18" height="2.5" rx="1.2" fill="#795548" />
      {/* Table legs */}
      <line x1="11" y1="29.5" x2="9.5" y2="33.5" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="29.5" x2="24.5" y2="33.5" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const MODE_CARDS: ModeCard[] = [
  { id: "budget", icon: <ModeIconBudget />, title: "Budget mode", subtitle: "B0 | Save money", tone: "warm" },
  { id: "bts", icon: <ModeIconBTS />, title: "Near BTS", subtitle: "Convenient rides", tone: "soft" },
  { id: "trendy", icon: <ModeIconTrendy />, title: "Trendy now", subtitle: "Popular spots", tone: "soft" },
  { id: "hot", icon: <ModeIconHot />, title: "Currently hot", subtitle: "Trending places", tone: "warm", hot: true },
  { id: "night", icon: <ModeIconNight />, title: "Late night", subtitle: "Open after hours", tone: "soft", span: "double" },
  { id: "outdoor", icon: <ModeIconOutdoor />, title: "Outdoor dining", subtitle: "Al fresco spots", tone: "soft", span: "double" },
];

const RESTAURANTS: RestaurantCard[] = [
  {
    id: "sol-and-luna",
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
    title: "Sol and Luna",
    cuisine: "Modern Italian",
    score: "B0",
    distance: "1 km",
  },
  {
    id: "ojo-bangkok",
    image: "https://media.istockphoto.com/id/639067562/photo/modern-room-with-tables-and-chairs.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jq_gSTeWbX0fggZjzrQpKvOj7eBVQ0bM80kiilPkMJg=",
    title: "Ojo Bangkok",
    cuisine: "Mexican",
    score: "BBB",
    distance: "1 km",
  },
  {
    id: "baan-kapomthai",
    image: "https://media.istockphoto.com/id/639067562/photo/modern-room-with-tables-and-chairs.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jq_gSTeWbX0fggZjzrQpKvOj7eBVQ0bM80kiilPkMJg=",
    title: "Baan KapomThai",
    cuisine: "Thai dessert",
    score: "B",
    distance: "1 km",
  },
];

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th2-search-icon">
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function IconDecide() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.1 1.7 3.8 3.8 4V22h2.4v-9c2.1-.2 3.8-1.9 3.8-4V2h-2v7zm5-3v8h2.3v8H21V2c-2.8 0-5 2.2-5 4z" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
      <circle cx="12" cy="12" r="8" strokeWidth="2" />
      <path d="M12 8v5l3 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
      <circle cx="12" cy="8" r="4" strokeWidth="2" />
      <path d="M4 20c1.5-3 4.2-4.5 8-4.5s6.5 1.5 8 4.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSoloAvatar() {
  return (
    <svg viewBox="0 0 36 38" width="28" height="30" aria-hidden="true">
      {/* Hair */}
      <ellipse cx="18" cy="10" rx="9" ry="6.5" fill="#5C3317" />
      {/* Ears */}
      <ellipse cx="8.8" cy="15" rx="1.8" ry="2.4" fill="#FFCA28" />
      <ellipse cx="27.2" cy="15" rx="1.8" ry="2.4" fill="#FFCA28" />
      {/* Head */}
      <circle cx="18" cy="15" r="9" fill="#FFCA28" />
      {/* Body */}
      <path d="M3 38c0-8.3 6.7-15 15-15s15 6.7 15 15H3z" fill="#FFCA28" />
    </svg>
  );
}

function IconGroupAvatar() {
  return (
    <svg viewBox="0 0 52 38" width="40" height="30" aria-hidden="true">
      {/* === Left person (woman) === */}
      {/* Hair */}
      <ellipse cx="15" cy="9.5" rx="8" ry="6" fill="#5C3317" />
      {/* Ear left */}
      <ellipse cx="7.2" cy="14" rx="1.6" ry="2.1" fill="#FFB74D" />
      {/* Head */}
      <circle cx="15" cy="14" r="8" fill="#FFB74D" />
      {/* Body */}
      <path d="M1 38c0-7.7 6.3-14 14-14s14 6.3 14 14H1z" fill="#FF8A65" />
      {/* === Right person (man) === */}
      {/* Hair */}
      <ellipse cx="37" cy="9.5" rx="8" ry="6" fill="#3D2314" />
      {/* Ear right */}
      <ellipse cx="44.8" cy="14" rx="1.6" ry="2.1" fill="#FFCA28" />
      {/* Head */}
      <circle cx="37" cy="14" r="8" fill="#FFCA28" />
      {/* Body */}
      <path d="M23 38c0-7.7 6.3-14 14-14s14 6.3 14 14H23z" fill="#64B5F6" />
    </svg>
  );
}

export default function ToastHomeV2Page() {
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLng>(DEFAULT_MAP_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_MAP_ZOOM);
  const [mapBadgeLabel, setMapBadgeLabel] = useState("TH");
  const dragControls = useDragControls();
  const sheetCollapsedY = 390;

  const handleSheetDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 650) {
      setIsSheetCollapsed(true);
      return;
    }

    if (info.offset.y < -60 || info.velocity.y < -650) {
      setIsSheetCollapsed(false);
      return;
    }
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const params = new URLSearchParams({
        format: "jsonv2",
        limit: "1",
        countrycodes: "th",
        q: query,
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("search_failed");
      }

      const results = (await response.json()) as ThailandSearchResult[];
      if (!results.length) {
        setSearchError("No location found in Thailand.");
        return;
      }

      const top = results[0];
      const lat = Number.parseFloat(top.lat);
      const lng = Number.parseFloat(top.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        setSearchError("Invalid location result.");
        return;
      }

      setMapCenter([lat, lng]);
      setMapZoom(15.6);
      setMapBadgeLabel(top.display_name.split(",")[0].trim());
    } catch {
      setSearchError("Search is unavailable. Try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="th2-root">
      <div className="th2-shell">
        <div className="th2-phone">
          <div className="th2-notch" aria-hidden="true">
            <span className="th2-speaker" />
            <span className="th2-camera" />
          </div>

          <header className="th2-status">
            <span className="th2-time">9:41</span>
            <div className="th2-status-right" aria-hidden="true">
              <span className="th2-cell" />
              <span className="th2-wifi" />
              <span className="th2-battery">
                <span className="th2-battery-level" />
              </span>
            </div>
          </header>

          <div className="th2-map-layer">
            <ToastHomeV2Map center={mapCenter} zoom={mapZoom} />
          </div>
          <div className={`th2-map-fade${isSheetCollapsed ? " th2-map-fade--map" : ""}`} aria-hidden="true" />
          <span className="th2-map-badge" aria-hidden="true" title={mapBadgeLabel}>
            {mapBadgeLabel}
          </span>

          <main className={`th2-content${isSheetCollapsed ? " th2-content--map" : ""}`}>
            <form className="th2-search" onSubmit={handleSearch}>
              <IconSearch />
              <input
                type="text"
                placeholder="Where to? (Thailand)"
                aria-label="Search location in Thailand"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button type="submit" className="th2-search-go" disabled={isSearching}>
                {isSearching ? "..." : "Go"}
              </button>
            </form>
            {searchError && <p className="th2-search-note">{searchError}</p>}

            <motion.section
              className={`th2-surface${isSheetCollapsed ? " th2-surface--collapsed" : ""}`}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: sheetCollapsedY }}
              dragElastic={0.02}
              dragMomentum={false}
              animate={{ y: isSheetCollapsed ? sheetCollapsedY : 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              onDragEnd={handleSheetDragEnd}
            >
              <button
                type="button"
                className="th2-grabber-hit"
                aria-label={isSheetCollapsed ? "Expand home panel" : "Collapse home panel"}
                onPointerDown={(event) => dragControls.start(event)}
                onClick={() => setIsSheetCollapsed((prev) => !prev)}
              >
                <span className="th2-grabber" />
              </button>

              <h1 className="th2-title">
                Let <span>Toast</span> help decide
              </h1>

              <div className="th2-player-grid">
                <button type="button" className="th2-player-card th2-player-card--active">
                  <span className="th2-player-icon">
                    <IconSoloAvatar />
                  </span>
                  <span className="th2-player-copy">
                    <strong>Solo</strong>
                    <small>Just for you</small>
                  </span>
                </button>
                <button type="button" className="th2-player-card">
                  <span className="th2-player-icon">
                    <IconGroupAvatar />
                  </span>
                  <span className="th2-player-copy">
                    <strong>Group</strong>
                    <small>With friends</small>
                  </span>
                </button>
              </div>

              <h2 className="th2-section-title">Pick a mode</h2>
              <div className="th2-mode-grid">
                <div className="th2-mode-grid-top">
                  {MODE_CARDS.filter((card) => card.span !== "double").map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className={`th2-mode-card${card.tone === "warm" ? " th2-mode-card--warm" : ""}${card.hot ? " th2-mode-card--hot" : ""}`}
                    >
                      <span className="th2-mode-icon" aria-hidden="true">
                        {card.icon}
                      </span>
                      <span className="th2-mode-title">{card.title}</span>
                      <span className="th2-mode-subtitle">{card.subtitle}</span>
                      {card.hot && <span className="th2-mode-arrow">→</span>}
                    </button>
                  ))}
                </div>
                <div className="th2-mode-grid-bottom">
                  {MODE_CARDS.filter((card) => card.span === "double").map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className={`th2-mode-card th2-mode-card--double${card.tone === "warm" ? " th2-mode-card--warm" : ""}`}
                    >
                      <span className="th2-mode-icon" aria-hidden="true">
                        {card.icon}
                      </span>
                      <span className="th2-mode-title">{card.title}</span>
                      <span className="th2-mode-subtitle">{card.subtitle}</span>
                      {card.hot && <span className="th2-mode-arrow">→</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="th2-list-head">
                <h2 className="th2-section-title">New restaurants in Central World</h2>
                <span className="th2-list-arrow">›</span>
              </div>

              <div className="th2-restaurant-grid">
                {RESTAURANTS.map((item) => (
                  <article key={item.id} className="th2-restaurant-card">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={160}
                      height={96}
                      className="th2-restaurant-image"
                    />
                    <div className="th2-restaurant-body">
                      <h3>{item.title}</h3>
                      <p className="th2-cuisine">{item.cuisine}</p>
                      <p className="th2-meta">
                        <span>{item.score}</span>
                        <small>{item.distance}</small>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          </main>

          <button
            type="button"
            className={`th2-grabber-float${isSheetCollapsed ? " th2-grabber-float--visible" : ""}`}
            aria-label="Drag up to show menu"
            onPointerDown={(event) => {
              if (isSheetCollapsed) dragControls.start(event);
            }}
            onClick={() => setIsSheetCollapsed(false)}
          >
            <span className="th2-grabber" />
          </button>

          <nav className="th2-tabbar" aria-label="Bottom navigation">
            <Link href="/toast-home-v2" className="th2-tab th2-tab--active">
              <IconHome />
              <span>Home</span>
            </Link>
            <Link href="/swipe" className="th2-tab th2-tab--active">
              <IconDecide />
              <span>Decide</span>
            </Link>
            <Link href="/result" className="th2-tab">
              <IconHistory />
              <span>History</span>
            </Link>
            <Link href="/preferences-setup" className="th2-tab">
              <IconProfile />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="th2-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
