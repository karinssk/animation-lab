"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./swipe-v2.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

type SwipeMode = "menu" | "restaurant" | "saved";
type Direction = "left" | "right" | "up" | null;
type SwipeFilterId = "all" | "saved" | "savedWithPartner" | "trendy" | "budget";

// Richer restaurant data for the related-restaurants sheet
type RelatedRestaurant = {
  id: string;
  name: string;
  distance: string;
  rating: string;
  priceRange: string;
};

// V2: superLikers tracks WHO super-liked for the badge display
type GroupSignal = {
  likes: number;
  superLikes: number;
  superLikers: { name: string; emoji: string }[];
};

type SwipeCardData = {
  id: string;
  name: string;
  nameLocal: string;
  emoji: string;
  cuisine: string;
  priceRange: string;
  tags: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  imageUrl: string;
  promoText: string;
  relatedRestaurants: RelatedRestaurant[];
  filterSegments: ("saved" | "savedWithPartner" | "trendy" | "budget")[];
  seedLikes: number;
  seedSuperLikes: number;
};

const CARDS: SwipeCardData[] = [
  {
    id: "c1",
    name: "Pad Thai",
    nameLocal: "Pad Thai",
    emoji: "\u{1F35C}",
    cuisine: "Thai",
    priceRange: "$",
    tags: ["Noodle", "Street Food", "Popular"],
    accentColor: "#f97316",
    gradientFrom: "#431407",
    gradientTo: "#9a3412",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80",
    promoText: "Sponsored: 15% off set menu",
    relatedRestaurants: [
      { id: "r1", name: "Baan Noodle",   distance: "0.3 km", rating: "4.6", priceRange: "$"  },
      { id: "r2", name: "Soi 11 Wok",    distance: "0.7 km", rating: "4.4", priceRange: "$"  },
      { id: "r3", name: "Siam Thai Hub", distance: "1.1 km", rating: "4.7", priceRange: "$$" },
    ],
    filterSegments: ["saved", "trendy", "budget"],
    seedLikes: 2,
    seedSuperLikes: 1,
  },
  {
    id: "c2",
    name: "Sushi Set",
    nameLocal: "Sushi Set",
    emoji: "\u{1F363}",
    cuisine: "Japanese",
    priceRange: "$$$",
    tags: ["Seafood", "Fresh", "Premium"],
    accentColor: "#3b82f6",
    gradientFrom: "#172554",
    gradientTo: "#1e40af",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    promoText: "Partner pick: free miso soup",
    relatedRestaurants: [
      { id: "r4", name: "Tokyo Counter", distance: "0.4 km", rating: "4.9", priceRange: "$$$" },
      { id: "r5", name: "Nori Lane",     distance: "0.8 km", rating: "4.6", priceRange: "$$"  },
      { id: "r6", name: "Bluefin Table", distance: "1.3 km", rating: "4.5", priceRange: "$$$" },
    ],
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 1,
    seedSuperLikes: 0,
  },
  {
    id: "c3",
    name: "Korean BBQ",
    nameLocal: "Korean BBQ",
    emoji: "\u{1F969}",
    cuisine: "Korean",
    priceRange: "$$",
    tags: ["Grill", "Group", "Meat lover"],
    accentColor: "#ef4444",
    gradientFrom: "#450a0a",
    gradientTo: "#991b1b",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    promoText: "Sponsored: combo starts at $18",
    relatedRestaurants: [
      { id: "r7", name: "Seoul House",     distance: "0.5 km", rating: "4.8", priceRange: "$$" },
      { id: "r8", name: "Han River Grill", distance: "0.9 km", rating: "4.5", priceRange: "$$" },
      { id: "r9", name: "Gangnam Fire",    distance: "1.6 km", rating: "4.4", priceRange: "$$" },
    ],
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 2,
    seedSuperLikes: 1,
  },
  {
    id: "c4",
    name: "Green Curry",
    nameLocal: "Green Curry",
    emoji: "\u{1F35B}",
    cuisine: "Thai",
    priceRange: "$",
    tags: ["Spicy", "Rice", "Local fave"],
    accentColor: "#22c55e",
    gradientFrom: "#052e16",
    gradientTo: "#166534",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
    promoText: "Local deal: lunch set $7",
    relatedRestaurants: [
      { id: "r10", name: "Mint Curry Bar", distance: "0.8 km", rating: "4.4", priceRange: "$" },
      { id: "r11", name: "River Spice",    distance: "1.2 km", rating: "4.2", priceRange: "$" },
      { id: "r12", name: "Bangkok Basil",  distance: "1.5 km", rating: "4.3", priceRange: "$" },
    ],
    filterSegments: ["saved", "budget"],
    seedLikes: 1,
    seedSuperLikes: 0,
  },
  {
    id: "c5",
    name: "Margherita Pizza",
    nameLocal: "Margherita Pizza",
    emoji: "\u{1F355}",
    cuisine: "Italian",
    priceRange: "$$",
    tags: ["Cheese", "Crispy", "Shareable"],
    accentColor: "#f59e0b",
    gradientFrom: "#431407",
    gradientTo: "#92400e",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    promoText: "2-for-1 pizza before 7 PM",
    relatedRestaurants: [
      { id: "r13", name: "Luna Slice",  distance: "0.6 km", rating: "4.5", priceRange: "$$" },
      { id: "r14", name: "Roma Crust",  distance: "1.0 km", rating: "4.6", priceRange: "$$" },
      { id: "r15", name: "Napoli Oven", distance: "1.4 km", rating: "4.3", priceRange: "$$" },
    ],
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 3,
    seedSuperLikes: 1,
  },
  {
    id: "c6",
    name: "Ramen",
    nameLocal: "Ramen",
    emoji: "\u{1F35C}",
    cuisine: "Japanese",
    priceRange: "$$",
    tags: ["Noodle", "Warm", "Comfort"],
    accentColor: "#a855f7",
    gradientFrom: "#2e1065",
    gradientTo: "#6b21a8",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    promoText: "Member special: extra egg free",
    relatedRestaurants: [
      { id: "r16", name: "Ramen Dock",    distance: "0.6 km", rating: "4.5", priceRange: "$$" },
      { id: "r17", name: "Shoyu House",   distance: "1.0 km", rating: "4.3", priceRange: "$$" },
      { id: "r18", name: "Noodle Pocket", distance: "1.3 km", rating: "4.1", priceRange: "$"  },
    ],
    filterSegments: ["saved", "budget"],
    seedLikes: 1,
    seedSuperLikes: 0,
  },
];

const MEMBER_PROGRESS = [
  { name: "You",   done: 3, total: 6, emoji: "\u{1F9D1}" },
  { name: "Sarah", done: 5, total: 6, emoji: "\u{1F469}" },
  { name: "James", done: 1, total: 6, emoji: "\u{1F9D4}" },
  { name: "Linda", done: 4, total: 6, emoji: "\u{1F9D5}" },
];

const SWIPE_FILTERS: { id: SwipeFilterId; label: string }[] = [
  { id: "all",              label: "All" },
  { id: "saved",            label: "Saved" },
  { id: "savedWithPartner", label: "Saved with partner" },
  { id: "trendy",           label: "Trendy menu" },
  { id: "budget",           label: "End-month budget" },
];

function cardsForFilter(filterId: SwipeFilterId) {
  if (filterId === "all") return CARDS;
  return CARDS.filter((card) => card.filterSegments.includes(filterId));
}

// ── Related Restaurants Sheet (menu mode up-swipe) ──────────────────────────
function RelatedRestaurantSheet({ card, signal, onClose, onSuperLike }: {
  card: SwipeCardData;
  signal: GroupSignal;
  onClose: () => void;
  onSuperLike: () => void;
}) {
  const [superLiked, setSuperLiked] = useState(false);

  function handleSuperLike() {
    if (superLiked) return;
    setSuperLiked(true);
    setTimeout(() => {
      onSuperLike();
      onClose();
    }, 500);
  }

  return (
    <motion.div
      className="sw-sheet-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="sw-sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sw-sheet__handle" />

        {/* Header */}
        <div className="sw-sheet__head">
          <div>
            <p className="sw-sheet__label">Related to · {card.name}</p>
            <h3 className="sw-sheet__title">Nearby Restaurants</h3>
          </div>
          <button className="sw-sheet__close" onClick={onClose}>×</button>
        </div>

        {/* Restaurant list */}
        <div className="sw-sheet__list">
          {card.relatedRestaurants.map((r, i) => (
            <motion.div
              key={r.id}
              className="sw-sheet__item"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="sw-sheet__item-info">
                <p className="sw-sheet__item-name">{r.name}</p>
                <div className="sw-sheet__item-meta">
                  <span className="sw-sheet__meta-dot">⭐ {r.rating}</span>
                  <span className="sw-sheet__meta-dot">{r.distance}</span>
                  <span className="sw-sheet__meta-dot">{r.priceRange}</span>
                </div>
              </div>
              <span className="sw-sheet__arrow">›</span>
            </motion.div>
          ))}
        </div>

        {/* Super Like CTA — the bridge between spec and customer feedback */}
        <div className="sw-sheet__footer">
          {/* Show existing super-likers if any */}
          {signal.superLikers.length > 0 && (
            <div className="sw-sheet__super-signal">
              {signal.superLikers.slice(0, 3).map((l, i) => (
                <span key={i} className="sw-sheet__super-emoji">{l.emoji}</span>
              ))}
              <span className="sw-sheet__super-text">
                {signal.superLikers[0].name}
                {signal.superLikers.length > 1 ? ` +${signal.superLikers.length - 1}` : ""} super liked this
              </span>
            </div>
          )}
          <motion.button
            className={`sw-sheet__super-btn ${superLiked ? "sw-sheet__super-btn--done" : ""}`}
            onClick={handleSuperLike}
            disabled={superLiked}
            animate={superLiked ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            {superLiked ? "⭐ Super Liked!" : "⭐ Super Like this Menu"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SwipeCard({
  card,
  onSwipe,
  onSaveLater,
  isTop,
  stackIndex,
  signal,
  isMatched,
  isSavedLater,
  swipeMode,
}: {
  card: SwipeCardData;
  onSwipe: (id: string, dir: Direction) => void;
  onSaveLater: (id: string) => void;
  isTop: boolean;
  stackIndex: number;
  signal: GroupSignal;
  isMatched: boolean;
  isSavedLater: boolean;
  swipeMode: SwipeMode;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-120, 120], [-18, 18]);
  const opacity = useTransform(x, [-120, -60, 0, 60, 120], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [20, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, -20], [1, 0]);
  const upOpacity = useTransform(y, [-80, -30], [1, 0]);
  const dragging = useRef(false);

  // Hybrid: menu mode up → open sheet; restaurant/saved up → direct super like
  const isMenuMode = swipeMode === "menu";

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    const { x: ox, y: oy } = info.offset;
    if (oy < -80 && Math.abs(ox) < 60) {
      if (isMenuMode) {
        setSheetOpen(true); // open related restaurants sheet
      } else {
        onSwipe(card.id, "up"); // direct super like
      }
    } else if (ox > 80) onSwipe(card.id, "right");
    else if (ox < -80) onSwipe(card.id, "left");
  }

  // V2: use sw-card--hot (amber glow) instead of sw-card--super
  const cardClass = [
    "sw-card",
    isTop ? "sw-card--top" : "sw-card--stack",
    signal.superLikes > 0 ? "sw-card--hot" : "",
    isMatched ? "sw-card--matched" : "",
  ].filter(Boolean).join(" ");

  if (!isTop) {
    return (
      <div
        className={cardClass}
        style={{
          transform: `scale(${1 - stackIndex * 0.04}) translateY(${stackIndex * 10}px)`,
          zIndex: 10 - stackIndex,
        }}
      >
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          sizes="220px"
          className="sw-card__img"
          style={{ objectFit: "cover", borderRadius: 20, opacity: 0.6 }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cardClass}
      style={{ x, y, rotate, opacity, zIndex: 20 }}
      drag
      dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
      dragElastic={0.8}
      onDragStart={() => { dragging.current = true; }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      <Image
        src={card.imageUrl}
        alt={card.name}
        fill
        sizes="220px"
        className="sw-card__img"
        style={{ objectFit: "cover", borderRadius: 20 }}
        priority
        draggable={false}
      />

      <div
        className="sw-card__overlay"
        style={{
          background: `linear-gradient(to top, ${card.gradientFrom} 0%, ${card.gradientFrom}cc 40%, transparent 75%)`,
        }}
      />

      <motion.div className="sw-stamp sw-stamp--like" style={{ opacity: likeOpacity }}>
        YES! {"\u{1F525}"}
      </motion.div>
      <motion.div className="sw-stamp sw-stamp--nope" style={{ opacity: nopeOpacity }}>
        PASS {"\u{1F610}"}
      </motion.div>
      {/* Hybrid: menu mode = "EXPLORE 🍽️", restaurant = "SUPER ⭐" */}
      <motion.div className="sw-stamp sw-stamp--super" style={{ opacity: upOpacity }}>
        {isMenuMode ? "EXPLORE 🍽️" : "SUPER ⭐"}
      </motion.div>

      <button
        className={`sw-save-chip${isSavedLater ? " sw-save-chip--on" : ""}`}
        onClick={() => onSaveLater(card.id)}
        type="button"
      >
        {isSavedLater ? "Saved" : "Save for later"}
      </button>

      {/* V2: group signal with super-liker avatars + amber badge */}
      <div className="sw-card__group-signal">
        {signal.superLikers.length > 0 && (
          <span className="sw-card__signal sw-card__signal--hot">
            {signal.superLikers.slice(0, 3).map((liker, i) => (
              <span key={i} className="sw-card__super-liker">{liker.emoji}</span>
            ))}
            ⭐ {signal.superLikers.length}
          </span>
        )}
        {signal.likes > 0 && (
          <span className="sw-card__signal sw-card__signal--like">
            {"\u{1F525}"} {signal.likes}
          </span>
        )}
        {isMatched && (
          <span className="sw-card__signal sw-card__signal--match">Matched</span>
        )}
      </div>

      <div className="sw-card__info">
        <div className="sw-card__name-row">
          <h2 className="sw-card__name">{card.name}</h2>
          <span className="sw-card__price">{card.priceRange}</span>
        </div>
        <p className="sw-card__local">{card.nameLocal}</p>
        {swipeMode === "restaurant" && (
          <p className="sw-card__promo">{card.promoText}</p>
        )}
        <div className="sw-card__bottom-row">
          <span
            className="sw-card__cuisine"
            style={{
              background: `${card.accentColor}33`,
              color: "#fff",
              borderColor: card.accentColor,
            }}
          >
            {card.cuisine}
          </span>
          <div className="sw-card__tags">
            {card.tags.map((t) => (
              <span key={t} className="sw-card__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="sw-card__hint">
        <span>{"\u2190"} Pass</span>
        {/* Hybrid: menu = Explore, restaurant = Super Like */}
        <span>{"\u2B06"} {isMenuMode ? "Explore" : "Super Like"}</span>
        <span>Yes {"\u2192"}</span>
      </div>

      {/* Related restaurants sheet — only in menu mode, inside the card so it overlays correctly */}
      <AnimatePresence>
        {sheetOpen && isMenuMode && (
          <RelatedRestaurantSheet
            card={card}
            signal={signal}
            onClose={() => setSheetOpen(false)}
            onSuperLike={() => onSwipe(card.id, "up")}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SwipePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryMode = searchParams.get("mode");
  const isSolo = entryMode === "solo";
  const isGroup = !isSolo;
  const isHost = isGroup && searchParams.get("host") !== "0";
  const playMode = searchParams.get("play") ?? "all";
  const allowBoost = searchParams.get("boost") !== "0";
  const matchThreshold = 4;

  const initialSwipeMode: SwipeMode =
    entryMode === "restaurant" ? "restaurant" : entryMode === "saved" ? "saved" : "menu";

  // V2: seed superLikers from MEMBER_PROGRESS (non-"You" members) for pre-seeded super likes
  const initialSignals = Object.fromEntries(
    CARDS.map((card) => {
      const superLikers = MEMBER_PROGRESS
        .slice(1) // skip "You"
        .slice(0, card.seedSuperLikes)
        .map((m) => ({ name: m.name, emoji: m.emoji }));
      return [
        card.id,
        { likes: card.seedLikes, superLikes: card.seedSuperLikes, superLikers },
      ];
    }),
  ) as Record<string, GroupSignal>;

  const [swipeMode, setSwipeMode] = useState<SwipeMode>(initialSwipeMode);
  const [activeFilter, setActiveFilter] = useState<SwipeFilterId>(
    initialSwipeMode === "saved" ? "saved" : "all",
  );
  const [deck, setDeck] = useState<SwipeCardData[]>(() =>
    cardsForFilter(initialSwipeMode === "saved" ? "saved" : "all"),
  );
  const [history, setHistory] = useState<{ id: string; dir: Direction }[]>([]);
  const [lastDir, setLastDir] = useState<Direction>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [includePrefs, setIncludePrefs] = useState(true);
  const [signals, setSignals] = useState<Record<string, GroupSignal>>(initialSignals);
  const [savedLaterIds, setSavedLaterIds] = useState<Set<string>>(new Set());
  const [matchedIds, setMatchedIds] = useState<Set<string>>(() =>
    new Set(
      CARDS.filter(
        (card) => card.seedLikes + card.seedSuperLikes * 2 >= matchThreshold,
      ).map((card) => card.id),
    ),
  );
  const [liveMatch, setLiveMatch] = useState<{ id: string; name: string } | null>(null);
  const [superMatch, setSuperMatch] = useState<{ id: string; name: string } | null>(null);
  const [forceEnded, setForceEnded] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    playMode === "3m" ? 180 : playMode === "5m" ? 300 : playMode === "15m" ? 900 : 0,
  );

  const totalInFilter = cardsForFilter(activeFilter).length;
  const activeFilterLabel =
    SWIPE_FILTERS.find((item) => item.id === activeFilter)?.label ?? "All";
  const filterCardIds = new Set(cardsForFilter(activeFilter).map((card) => card.id));
  const liveMatchCount = Array.from(matchedIds).filter((id) =>
    filterCardIds.has(id),
  ).length;
  const timeExpired = playMode !== "all" && secondsLeft <= 0;
  const isDone = deck.length === 0 || forceEnded || timeExpired;

  useEffect(() => {
    if (!liveMatch) return;
    const timer = setTimeout(() => setLiveMatch(null), 2400);
    return () => clearTimeout(timer);
  }, [liveMatch]);

  useEffect(() => {
    if (!superMatch) return;
    const timer = setTimeout(() => {
      const resultMode = swipeMode === "restaurant" ? "restaurant" : "menu";
      router.push(`/result-v2?mode=${resultMode}&super=1`);
    }, 1400);
    return () => clearTimeout(timer);
  }, [router, superMatch, swipeMode]);

  useEffect(() => {
    if (playMode === "all" || isDone || secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [playMode, isDone, secondsLeft]);

  useEffect(() => {
    if (!isDone || !!superMatch) return;
    const resultMode = swipeMode === "restaurant" ? "restaurant" : "menu";
    const timer = setTimeout(() => {
      router.push(`/result-v2?mode=${resultMode}`);
    }, isGroup ? 1400 : 900);
    return () => clearTimeout(timer);
  }, [isDone, isGroup, router, superMatch, swipeMode]);

  function handleSwipe(id: string, dir: Direction) {
    const swipedCard = deck.find((card) => card.id === id);
    if (!swipedCard) return;

    setLastDir(dir);

    const prevSignal = signals[id] ?? { likes: 0, superLikes: 0, superLikers: [] };
    const isSuperLike = dir === "up";
    const isLike = dir === "right";

    // V2: track who super-liked — "You" is always MEMBER_PROGRESS[0]
    const you = MEMBER_PROGRESS[0];
    const nextSuperLikers = isSuperLike
      ? [...prevSignal.superLikers, { name: you.name, emoji: you.emoji }]
      : prevSignal.superLikers;

    const nextSignal: GroupSignal = {
      likes: prevSignal.likes + (isLike ? 1 : 0),
      superLikes: prevSignal.superLikes + (isSuperLike && allowBoost ? 1 : 0),
      superLikers: isSuperLike && allowBoost ? nextSuperLikers : prevSignal.superLikers,
    };

    setSignals((prev) => ({ ...prev, [id]: nextSignal }));

    const score = nextSignal.likes + nextSignal.superLikes * 2;
    if (score >= matchThreshold && !matchedIds.has(id)) {
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setLiveMatch({ id, name: swipedCard.name });
    }

    if (isGroup && nextSignal.superLikes >= 2 && score >= matchThreshold) {
      setSuperMatch({ id, name: swipedCard.name });
    }

    setHistory((prev) => [...prev, { id, dir }]);
    setDeck((prev) => prev.filter((c) => c.id !== id));
  }

  function handleButtonSwipe(dir: Direction) {
    if (deck.length === 0) return;
    handleSwipe(deck[0].id, dir);
  }

  function handleFilterSelect(filterId: SwipeFilterId) {
    setActiveFilter(filterId);
    setDeck(cardsForFilter(filterId));
    setHistory([]);
    setLastDir(null);
    setShowProgress(false);
  }

  function handleModeChange(mode: SwipeMode) {
    setSwipeMode(mode);
    const modeFilter: SwipeFilterId = mode === "saved" ? "saved" : activeFilter;
    setActiveFilter(modeFilter);
    setDeck(cardsForFilter(modeFilter));
    setHistory([]);
    setLastDir(null);
    setShowProgress(false);
  }

  function toggleSaveLater(id: string) {
    setSavedLaterIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const clockLabel = useMemo(() => {
    if (playMode === "all") return "All Match";
    const m = Math.floor(Math.max(0, secondsLeft) / 60);
    const s = Math.max(0, secondsLeft) % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [playMode, secondsLeft]);

  const doneCtaHref = `/result-v2?mode=${swipeMode === "restaurant" ? "restaurant" : "menu"}`;

  return (
    <div className={`${baloo.className} sw-root`}>
      <div className="sw-phone">
        <div className="sw-status">
          <span>9:41</span>
          <span className="sw-battery" aria-hidden="true">
            <span className="sw-battery__level" />
            <span className="sw-battery__cap" />
          </span>
        </div>

        <div className="sw-header">
          <Link href="/waiting-room" className="sw-back">{"\u00D7"}</Link>
          <div>
            <p className="sw-header__label">
              {swipeMode === "menu" ? "Menu" : swipeMode === "restaurant" ? "Restaurant" : "Saved"} Swipe | {isGroup ? "Group" : "Solo"}
            </p>
            <p className="sw-header__sub">
              {activeFilterLabel} - {totalInFilter - deck.length}/{totalInFilter} swiped - {liveMatchCount} live matches
            </p>
          </div>
          {isGroup ? (
            <button className="sw-progress-btn" onClick={() => setShowProgress((p) => !p)}>
              {"\u{1F465}"} {MEMBER_PROGRESS.filter((m) => m.done === m.total).length}/{MEMBER_PROGRESS.length}
            </button>
          ) : (
            <Link href="/waiting-room?invite=friday-food-squad" className="sw-progress-btn">
              Invite
            </Link>
          )}
        </div>

        <div className="sw-mode-strip">
          {(["menu", "restaurant", "saved"] as SwipeMode[]).map((mode) => (
            <button
              key={mode}
              className={`sw-mode-btn${swipeMode === mode ? " sw-mode-btn--active" : ""}`}
              onClick={() => handleModeChange(mode)}
            >
              {mode === "menu" ? "Menu" : mode === "restaurant" ? "Restaurant" : "Saved"}
            </button>
          ))}
        </div>

        <div className="sw-tools-row">
          <label className="sw-pref-check">
            <input
              type="checkbox"
              checked={includePrefs}
              onChange={(e) => setIncludePrefs(e.target.checked)}
            />
            <span>Include My Preferences</span>
          </label>
          <div className="sw-timer">{clockLabel}</div>
          {isSolo && (
            <Link href="/waiting-room?invite=friday-food-squad" className="sw-invite-btn">
              Invite Friends
            </Link>
          )}
          {isGroup && isHost && (
            <button className="sw-host-end" onClick={() => setForceEnded(true)}>
              End Game
            </button>
          )}
        </div>

        <div className="sw-filter-strip" role="tablist" aria-label="Swipe filters">
          {SWIPE_FILTERS.map((item) => (
            <button
              key={item.id}
              className={`sw-filter-pill${activeFilter === item.id ? " sw-filter-pill--active" : ""}`}
              onClick={() => handleFilterSelect(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {liveMatch && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="sw-live-match"
            >
              <div>
                <p className="sw-live-match__title">Food matched now</p>
                <p className="sw-live-match__sub">{liveMatch.name} has enough group votes.</p>
              </div>
              <Link href="/map" className="sw-live-match__cta">See restaurants</Link>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {superMatch && (
            <motion.div
              className="sw-super-banner"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className="sw-super-banner__title">Super Match</p>
              <p className="sw-super-banner__sub">
                {superMatch.name} reached super match. Moving to results...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showProgress && isGroup && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="sw-progress-panel"
            >
              <p className="sw-progress-panel__title">Group Progress</p>
              {MEMBER_PROGRESS.map((m) => (
                <div key={m.name} className="sw-progress-row">
                  <span>{m.emoji} {m.name}</span>
                  <div className="sw-progress-bar">
                    <motion.div
                      className="sw-progress-bar__fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(m.done / m.total) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="sw-progress-count">{m.done}/{m.total}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sw-deck-area">
          {isDone ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="sw-done-card"
            >
              <span className="sw-done-card__emoji">{"\u{1F389}"}</span>
              <p className="sw-done-card__title">
                {timeExpired ? "Time is up!" : "You're done!"}
              </p>
              <p className="sw-done-card__sub">
                {forceEnded
                  ? "Host ended this round."
                  : timeExpired
                  ? "Round moved to results."
                  : "Waiting for others..."}
              </p>
              <Link href={doneCtaHref} className="sw-done-card__btn">
                See Results →
              </Link>
            </motion.div>
          ) : (
            <div className="sw-deck">
              {deck.slice(0, 3).map((card, i) => (
                <SwipeCard
                  key={card.id}
                  card={card}
                  isTop={i === 0}
                  stackIndex={i}
                  signal={signals[card.id] ?? { likes: 0, superLikes: 0, superLikers: [] }}
                  isMatched={matchedIds.has(card.id)}
                  isSavedLater={savedLaterIds.has(card.id)}
                  onSwipe={handleSwipe}
                  onSaveLater={toggleSaveLater}
                  swipeMode={swipeMode}
                />
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {lastDir && (
            <motion.div
              key={history.length}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`sw-feedback sw-feedback--${lastDir}`}
            >
              {lastDir === "right" && `\u{1F525} Yes!`}
              {lastDir === "left" && `\u{1F610} Pass`}
              {/* Hybrid: menu mode up = Explore, restaurant = Super Like */}
              {lastDir === "up" && (swipeMode === "menu" ? `🍽️ Exploring...` : `⭐ Super Like!`)}
            </motion.div>
          )}
        </AnimatePresence>

        {!isDone && (
          <div className="sw-actions">
            <button
              className="sw-action-btn sw-action-btn--nope"
              onClick={() => handleButtonSwipe("left")}
              title="Pass"
            >
              <span>{"\u{1F610}"}</span>
            </button>
            {/* Hybrid: menu mode = Explore 🍽️ (opens sheet), restaurant = Super Like ⭐ */}
            <button
              className={`sw-action-btn sw-action-btn--super${swipeMode !== "menu" && !allowBoost ? " sw-action-btn--used" : ""}`}
              onClick={() => handleButtonSwipe("up")}
              title={swipeMode === "menu" ? "Explore Restaurants" : "Super Like"}
              disabled={swipeMode !== "menu" && !allowBoost}
            >
              <span>{swipeMode === "menu" ? "🍽️" : "⭐"}</span>
            </button>
            <button
              className="sw-action-btn sw-action-btn--like"
              onClick={() => handleButtonSwipe("right")}
              title="Yes!"
            >
              <span>{"\u{1F525}"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SwipeV2Page() {
  return (
    <Suspense fallback={<div className={`${baloo.className} sw-root`} />}>
      <SwipePageContent />
    </Suspense>
  );
}
