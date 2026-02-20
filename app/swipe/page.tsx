"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./swipe.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type SwipeCard = {
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
  filterSegments: ("saved" | "savedWithPartner" | "trendy" | "budget")[];
  seedLikes: number;
  seedSuperLikes: number;
};

const CARDS: SwipeCard[] = [
  {
    id: "c1",
    name: "Pad Thai", nameLocal: "Pad Thai",
    emoji: "\u{1F35C}", cuisine: "Thai", priceRange: "$",
    tags: ["Noodle", "Street Food", "Popular"],
    accentColor: "#f97316",
    gradientFrom: "#431407", gradientTo: "#9a3412",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80",
    filterSegments: ["saved", "trendy", "budget"],
    seedLikes: 2,
    seedSuperLikes: 1,
  },
  {
    id: "c2",
    name: "Sushi Set", nameLocal: "Sushi Set",
    emoji: "\u{1F363}", cuisine: "Japanese", priceRange: "$$$",
    tags: ["Seafood", "Fresh", "Premium"],
    accentColor: "#3b82f6",
    gradientFrom: "#172554", gradientTo: "#1e40af",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 1,
    seedSuperLikes: 0,
  },
  {
    id: "c3",
    name: "Korean BBQ", nameLocal: "Korean BBQ",
    emoji: "\u{1F969}", cuisine: "Korean", priceRange: "$$",
    tags: ["Grill", "Group", "Meat lover"],
    accentColor: "#ef4444",
    gradientFrom: "#450a0a", gradientTo: "#991b1b",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 2,
    seedSuperLikes: 1,
  },
  {
    id: "c4",
    name: "Green Curry", nameLocal: "Green Curry",
    emoji: "\u{1F35B}", cuisine: "Thai", priceRange: "$",
    tags: ["Spicy", "Rice", "Local fave"],
    accentColor: "#22c55e",
    gradientFrom: "#052e16", gradientTo: "#166534",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
    filterSegments: ["saved", "budget"],
    seedLikes: 1,
    seedSuperLikes: 0,
  },
  {
    id: "c5",
    name: "Margherita Pizza", nameLocal: "Margherita Pizza",
    emoji: "\u{1F355}", cuisine: "Italian", priceRange: "$$",
    tags: ["Cheese", "Crispy", "Shareable"],
    accentColor: "#f59e0b",
    gradientFrom: "#431407", gradientTo: "#92400e",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    filterSegments: ["savedWithPartner", "trendy"],
    seedLikes: 3,
    seedSuperLikes: 1,
  },
  {
    id: "c6",
    name: "Ramen", nameLocal: "Ramen",
    emoji: "\u{1F35C}", cuisine: "Japanese", priceRange: "$$",
    tags: ["Noodle", "Warm", "Comfort"],
    accentColor: "#a855f7",
    gradientFrom: "#2e1065", gradientTo: "#6b21a8",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
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

type SwipeFilterId = "all" | "saved" | "savedWithPartner" | "trendy" | "budget";

const SWIPE_FILTERS: { id: SwipeFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "saved", label: "Saved" },
  { id: "savedWithPartner", label: "Saved with partner" },
  { id: "trendy", label: "Trendy menu" },
  { id: "budget", label: "End-month budget" },
];

function cardsForFilter(filterId: SwipeFilterId) {
  if (filterId === "all") return CARDS;
  return CARDS.filter((card) => card.filterSegments.includes(filterId));
}

// â”€â”€â”€ Swipe Card Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Direction = "left" | "right" | "up" | null;
type GroupSignal = { likes: number; superLikes: number };

function SwipeCard({
  card,
  onSwipe,
  isTop,
  stackIndex,
  signal,
  isMatched,
}: {
  card: SwipeCard;
  onSwipe: (id: string, dir: Direction) => void;
  isTop: boolean;
  stackIndex: number;
  signal: GroupSignal;
  isMatched: boolean;
}) {
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const rotate = useTransform(x, [-120, 120], [-18, 18]);
  const opacity= useTransform(x, [-120, -60, 0, 60, 120], [0, 1, 1, 1, 0]);

  const likeOpacity   = useTransform(x, [20, 80], [0, 1]);
  const nopeOpacity   = useTransform(x, [-80, -20], [1, 0]);
  const superOpacity  = useTransform(y, [-80, -30], [1, 0]);

  const dragging = useRef(false);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    const { x: ox, y: oy } = info.offset;
    if (oy < -80 && Math.abs(ox) < 60) {
      onSwipe(card.id, "up");
    } else if (ox > 80) {
      onSwipe(card.id, "right");
    } else if (ox < -80) {
      onSwipe(card.id, "left");
    }
  }

  // Safety guard â€” never pass empty src to Image
  const imgSrc = card.imageUrl || null;

  if (!isTop) {
    return (
      <div
        className={`sw-card sw-card--stack${signal.superLikes > 0 ? " sw-card--super" : ""}${isMatched ? " sw-card--matched" : ""}`}
        style={{
          transform: `scale(${1 - stackIndex * 0.04}) translateY(${stackIndex * 10}px)`,
          zIndex: 10 - stackIndex,
        }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={card.name}
            fill
            sizes="220px"
            className="sw-card__img"
            style={{ objectFit: "cover", borderRadius: 20, opacity: 0.6 }}
          />
        )}
        {!imgSrc && (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
            {card.emoji}
          </div>
        )}
        <div className="sw-card__group-signal">
          {signal.superLikes > 0 && <span className="sw-card__signal sw-card__signal--super">{"\u{1F60D}"} {signal.superLikes}</span>}
          {signal.likes > 0 && <span className="sw-card__signal sw-card__signal--like">{"\u{1F525}"} {signal.likes}</span>}
          {isMatched && <span className="sw-card__signal sw-card__signal--match">Matched</span>}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`sw-card sw-card--top${signal.superLikes > 0 ? " sw-card--super" : ""}${isMatched ? " sw-card--matched" : ""}`}
      style={{ x, y, rotate, opacity, zIndex: 20 }}
      drag
      dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
      dragElastic={0.8}
      onDragStart={() => { dragging.current = true; }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      {/* Full-bleed food photo */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={card.name}
          fill
          sizes="220px"
          className="sw-card__img"
          style={{ objectFit: "cover", borderRadius: 20 }}
          priority
          draggable={false}
        />
      )}
      {!imgSrc && (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>
          {card.emoji}
        </div>
      )}

      {/* Gradient overlay â€” bottom info panel */}
      <div
        className="sw-card__overlay"
        style={{
          background: `linear-gradient(to top, ${card.gradientFrom} 0%, ${card.gradientFrom}cc 40%, transparent 75%)`,
        }}
      />

      {/* CRAVING stamp */}
      <motion.div className="sw-stamp sw-stamp--like" style={{ opacity: likeOpacity }}>
        YES! {"\u{1F525}"}
      </motion.div>
      {/* PASS stamp */}
      <motion.div className="sw-stamp sw-stamp--nope" style={{ opacity: nopeOpacity }}>
        PASS {"\u{1F610}"}
      </motion.div>
      {/* MUST TRY stamp */}
      <motion.div className="sw-stamp sw-stamp--super" style={{ opacity: superOpacity }}>
        MUST TRY {"\u{1F60D}"}
      </motion.div>

      <div className="sw-card__group-signal">
        {signal.superLikes > 0 && <span className="sw-card__signal sw-card__signal--super">{"\u{1F60D}"} {signal.superLikes}</span>}
        {signal.likes > 0 && <span className="sw-card__signal sw-card__signal--like">{"\u{1F525}"} {signal.likes}</span>}
        {isMatched && <span className="sw-card__signal sw-card__signal--match">Matched</span>}
      </div>

      {/* Card info â€” sits on top of gradient */}
      <div className="sw-card__info">
        <div className="sw-card__name-row">
          <h2 className="sw-card__name">{card.name}</h2>
          <span className="sw-card__price">{card.priceRange}</span>
        </div>
        <p className="sw-card__local">{card.nameLocal}</p>
        <div className="sw-card__bottom-row">
          <span
            className="sw-card__cuisine"
            style={{ background: card.accentColor + "33", color: "#fff", borderColor: card.accentColor }}
          >
            {card.cuisine}
          </span>
          <div className="sw-card__tags">
            {card.tags.map(t => (
              <span key={t} className="sw-card__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <div className="sw-card__hint">
        <span>{"\u2190"} Pass</span>
        <span>{"\u2B06"} Must try</span>
        <span>Yes {"\u2192"}</span>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function SwipePage() {
  const MATCH_THRESHOLD = 4;
  const initialSignals = Object.fromEntries(
    CARDS.map((card) => [card.id, { likes: card.seedLikes, superLikes: card.seedSuperLikes }])
  ) as Record<string, GroupSignal>;

  const [activeFilter,setActiveFilter]= useState<SwipeFilterId>("all");
  const [deck,        setDeck]        = useState<SwipeCard[]>(() => cardsForFilter("all"));
  const [history,     setHistory]     = useState<{ id: string; dir: Direction }[]>([]);
  const [lastDir,     setLastDir]     = useState<Direction>(null);
  const [superUsed,   setSuperUsed]   = useState(false);
  const [showProgress,setShowProgress]= useState(false);
  const [signals,     setSignals]     = useState<Record<string, GroupSignal>>(initialSignals);
  const [matchedIds,  setMatchedIds]  = useState<Set<string>>(() => {
    const seeded = CARDS
      .filter((card) => (card.seedLikes + card.seedSuperLikes * 2) >= MATCH_THRESHOLD)
      .map((card) => card.id);
    return new Set(seeded);
  });
  const [liveMatch,   setLiveMatch]   = useState<{ id: string; name: string } | null>(null);
  const totalInFilter = cardsForFilter(activeFilter).length;
  const activeFilterLabel = SWIPE_FILTERS.find((item) => item.id === activeFilter)?.label ?? "All";
  const filterCardIds = new Set(cardsForFilter(activeFilter).map((card) => card.id));
  const liveMatchCount = Array.from(matchedIds).filter((id) => filterCardIds.has(id)).length;

  const isDone = deck.length === 0;

  useEffect(() => {
    if (!liveMatch) return;
    const timer = setTimeout(() => setLiveMatch(null), 2400);
    return () => clearTimeout(timer);
  }, [liveMatch]);

  function handleSwipe(id: string, dir: Direction) {
    setLastDir(dir);
    if (dir === "up") setSuperUsed(true);
    const swipedCard = deck.find((card) => card.id === id);
    const prevSignal = signals[id] ?? { likes: 0, superLikes: 0 };
    const nextSignal = {
      likes: prevSignal.likes + (dir === "right" || dir === "up" ? 1 : 0),
      superLikes: prevSignal.superLikes + (dir === "up" ? 1 : 0),
    };

    setSignals((prev) => ({ ...prev, [id]: nextSignal }));
    if (nextSignal.likes + nextSignal.superLikes * 2 >= MATCH_THRESHOLD) {
      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      if (swipedCard) setLiveMatch({ id, name: swipedCard.name });
    }

    setHistory(prev => [...prev, { id, dir }]);
    setDeck(prev => prev.filter(c => c.id !== id));
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
    setSuperUsed(false);
    setShowProgress(false);
  }

  return (
    <div className={`${baloo.className} sw-root`}>
      <div className="sw-phone">

        {/* Status bar */}
        <div className="sw-status">
          <span>9:41</span>
          <span className="sw-battery" aria-hidden="true">
            <span className="sw-battery__level"/>
            <span className="sw-battery__cap"/>
          </span>
        </div>

        {/* Header */}
        <div className="sw-header">
          <Link href="/waiting-room" className="sw-back">{"\u00D7"}</Link>
          <div>
            <p className="sw-header__label">Menu Swipe | Group</p>
            <p className="sw-header__sub">{activeFilterLabel} · {totalInFilter - deck.length}/{totalInFilter} swiped · {liveMatchCount} live matches</p>
          </div>
          <button className="sw-progress-btn" onClick={() => setShowProgress(p => !p)}>
            {"\u{1F465}"} {MEMBER_PROGRESS.filter(m => m.done === m.total).length}/{MEMBER_PROGRESS.length}
          </button>
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
              <Link href="/map" className="sw-live-match__cta">
                See restaurants
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress panel (overlay) */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="sw-progress-panel"
            >
              <p className="sw-progress-panel__title">Group Progress</p>
              {MEMBER_PROGRESS.map(m => (
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

        {/* Card stack */}
        <div className="sw-deck-area">
          {isDone ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="sw-done-card"
            >
              <span className="sw-done-card__emoji">{"\u{1F389}"}</span>
              <p className="sw-done-card__title">{totalInFilter === 0 ? "No cards in this filter" : "You&apos;re done!"}</p>
              <p className="sw-done-card__sub">
                {totalInFilter === 0 ? "Try another filter mode above." : "Waiting for others..."}
              </p>
              <Link href="/map" className="sw-done-card__btn">
                See Restaurants →
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
                  signal={signals[card.id] ?? { likes: 0, superLikes: 0 }}
                  isMatched={matchedIds.has(card.id)}
                  onSwipe={handleSwipe}
                />
              ))}
            </div>
          )}
        </div>

        {/* Last action feedback */}
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
              {lastDir === "left"  && `\u{1F610} Pass`}
              {lastDir === "up"    && `\u{1F60D} Must try!`}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        {!isDone && (
          <div className="sw-actions">
            <button
              className="sw-action-btn sw-action-btn--nope"
              onClick={() => handleButtonSwipe("left")}
              title="Pass"
            >
              <span>{"\u{1F610}"}</span>
            </button>

            <button
              className={`sw-action-btn sw-action-btn--super${superUsed ? " sw-action-btn--used" : ""}`}
              onClick={() => !superUsed && handleButtonSwipe("up")}
              disabled={superUsed}
              title={superUsed ? "Must try used" : "Must try!"}
            >
              <span>{"\u{1F60D}"}</span>
              {superUsed && <span className="sw-action-btn__badge">Used</span>}
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


