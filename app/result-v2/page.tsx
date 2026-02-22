"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./result-v2.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// ============================================================
// TYPES
// ============================================================

type GameMode = "menu" | "restaurant";
type Phase = "live" | "winner" | "tiebreak";

type Member = { id: string; name: string; emoji: string; color: string };

type MenuCard = {
  id: string;
  name: string;
  cuisine: string;
  imageUrl: string;
  accentColor: string;
  totalMembers: number;
  likedBy: string[];
  superLikedBy: string[];
};

type RestaurantItem = {
  id: string;
  name: string;
  distance: string;
  rating: string;
  ratingCount: string;
  cuisineTag: string;
  priceRange: string;
};

// ============================================================
// DATA
// ============================================================

const MEMBERS: Member[] = [
  { id: "u1", name: "You",   emoji: "🧑", color: "#f97316" },
  { id: "u2", name: "Sarah", emoji: "👩", color: "#3b82f6" },
  { id: "u3", name: "James", emoji: "🧔", color: "#22c55e" },
  { id: "u4", name: "Nat",   emoji: "👩‍🦱", color: "#a855f7" },
];

const INITIAL_CARDS: MenuCard[] = [
  {
    id: "m1",
    name: "Pad Thai",
    cuisine: "Thai",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80",
    accentColor: "#f97316",
    totalMembers: 4,
    likedBy: [],
    superLikedBy: [],
  },
  {
    id: "m2",
    name: "Korean BBQ",
    cuisine: "Korean",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    accentColor: "#ef4444",
    totalMembers: 4,
    likedBy: [],
    superLikedBy: [],
  },
  {
    id: "m3",
    name: "Sushi Set",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80",
    accentColor: "#3b82f6",
    totalMembers: 4,
    likedBy: [],
    superLikedBy: [],
  },
  {
    id: "m4",
    name: "Ramen",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    accentColor: "#a855f7",
    totalMembers: 4,
    likedBy: [],
    superLikedBy: [],
  },
  {
    id: "m5",
    name: "Green Curry",
    cuisine: "Thai",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80",
    accentColor: "#22c55e",
    totalMembers: 4,
    likedBy: [],
    superLikedBy: [],
  },
];

// Real-time swipe event timeline — ends with a TIE between m1 & m3 (both score 6)
// m1: 2 likes + 2 superlikes = 2 + 4 = 6 pts
// m3: 1 like  + 3 superlikes = 1 + 6 = 7 pts  ← actually wins, no tie
// Let's make m1=6, m3=6 tie:
// m1: 3 likes + 1.5 superlikes — use: 4 likes = 4 pts, 1 superlike = 3 pts → 7
// For a clean tie: m1 gets 3 likes (3 pts) + 1 superlike (2 pts) = 5
//                  m3 gets 3 likes (3 pts) + 1 superlike (2 pts) = 5
// Scoring: like=1, superlike=2
const SWIPE_EVENTS = [
  { delay: 700,  cardId: "m1", memberId: "u2", action: "like"      },
  { delay: 1300, cardId: "m3", memberId: "u3", action: "superlike" },
  { delay: 1900, cardId: "m2", memberId: "u2", action: "like"      },
  { delay: 2500, cardId: "m1", memberId: "u3", action: "like"      },
  { delay: 3100, cardId: "m3", memberId: "u4", action: "like"      },
  { delay: 3600, cardId: "m1", memberId: "u4", action: "superlike" },
  { delay: 4200, cardId: "m2", memberId: "u3", action: "like"      },
  { delay: 4700, cardId: "m1", memberId: "u1", action: "like"      },
  { delay: 5400, cardId: "m3", memberId: "u2", action: "superlike" },
  { delay: 6000, cardId: "m3", memberId: "u1", action: "like"      },
  { delay: 6700, cardId: "m2", memberId: "u4", action: "like"      },
  { delay: 7400, cardId: "m2", memberId: "u1", action: "like"      },
];

const WINNER_RESTAURANTS: Record<string, RestaurantItem[]> = {
  m1: [
    { id: "r1", name: "Baan Noodle",   distance: "0.3 km", rating: "4.6", ratingCount: "892",  cuisineTag: "Thai",        priceRange: "$"  },
    { id: "r2", name: "Soi 11 Wok",    distance: "0.7 km", rating: "4.4", ratingCount: "541",  cuisineTag: "Thai",        priceRange: "$"  },
    { id: "r3", name: "Siam Thai Hub", distance: "1.1 km", rating: "4.7", ratingCount: "1204", cuisineTag: "Thai",        priceRange: "$$" },
    { id: "r4", name: "Pad Thai Fah",  distance: "1.4 km", rating: "4.3", ratingCount: "310",  cuisineTag: "Street Food", priceRange: "$"  },
  ],
  m2: [
    { id: "r5", name: "Seoul House",     distance: "0.5 km", rating: "4.8", ratingCount: "2103", cuisineTag: "Korean", priceRange: "$$" },
    { id: "r6", name: "Han River Grill", distance: "0.9 km", rating: "4.5", ratingCount: "788",  cuisineTag: "Korean", priceRange: "$$" },
    { id: "r7", name: "Gangnam Fire",    distance: "1.6 km", rating: "4.4", ratingCount: "422",  cuisineTag: "Korean", priceRange: "$$" },
  ],
  m3: [
    { id: "r8",  name: "Tokyo Counter", distance: "0.4 km", rating: "4.9", ratingCount: "1560", cuisineTag: "Japanese", priceRange: "$$$" },
    { id: "r9",  name: "Nori Lane",     distance: "0.8 km", rating: "4.6", ratingCount: "673",  cuisineTag: "Japanese", priceRange: "$$"  },
    { id: "r10", name: "Bluefin Table", distance: "1.3 km", rating: "4.5", ratingCount: "289",  cuisineTag: "Japanese", priceRange: "$$$" },
  ],
  m4: [
    { id: "r11", name: "Ramen Dock",    distance: "0.6 km", rating: "4.5", ratingCount: "934",  cuisineTag: "Japanese", priceRange: "$$" },
    { id: "r12", name: "Shoyu House",   distance: "1.0 km", rating: "4.3", ratingCount: "512",  cuisineTag: "Ramen",    priceRange: "$$" },
  ],
  m5: [
    { id: "r13", name: "Mint Curry Bar", distance: "0.8 km", rating: "4.4", ratingCount: "628", cuisineTag: "Thai", priceRange: "$" },
    { id: "r14", name: "River Spice",    distance: "1.2 km", rating: "4.2", ratingCount: "391", cuisineTag: "Thai", priceRange: "$" },
  ],
};

// Tie-break candidates (m1 vs m3 — triggered in winner phase)
const TIEBREAK_CARDS = ["m1", "m3"];

// ============================================================
// HELPERS
// ============================================================

function getMember(id: string) {
  return MEMBERS.find((m) => m.id === id)!;
}

function getScore(card: MenuCard) {
  return card.likedBy.length + card.superLikedBy.length * 2;
}

function isMatched(card: MenuCard) {
  return card.likedBy.length + card.superLikedBy.length >= card.totalMembers;
}

function getRanked(cards: MenuCard[]) {
  return [...cards].sort((a, b) => getScore(b) - getScore(a));
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

// ── Live toast ────────────────────────────────────────────────
function SwipeToast({ memberId, cardName, action }: {
  memberId: string; cardName: string; action: string;
}) {
  const m = getMember(memberId);
  return (
    <motion.div
      className="res2-toast"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="res2-toast__emoji">{m.emoji}</span>
      <span className="res2-toast__text">
        <span style={{ color: m.color, fontWeight: 800 }}>{m.name}</span>
        {action === "superlike" ? " ⭐ super liked " : " liked "}
        <span className="res2-toast__food">{cardName}</span>
      </span>
    </motion.div>
  );
}

// ── Restaurant bottom sheet ───────────────────────────────────
function RestaurantSheet({ cardId, cardName, onClose }: {
  cardId: string; cardName: string; onClose: () => void;
}) {
  const restaurants = WINNER_RESTAURANTS[cardId] ?? [];
  return (
    <motion.div
      className="res2-sheet-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="res2-sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <div className="res2-sheet__handle" />
        <div className="res2-sheet__head">
          <div>
            <p className="res2-sheet__label">Serving · {cardName}</p>
            <h3 className="res2-sheet__title">Nearby Restaurants</h3>
          </div>
          <button className="res2-sheet__close" onClick={onClose}>×</button>
        </div>
        <div className="res2-sheet__list">
          {restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              className="res2-sheet__item"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="res2-sheet__item-info">
                <p className="res2-sheet__item-name">{r.name}</p>
                <div className="res2-sheet__item-meta">
                  <span className="res2-sheet__tag">{r.cuisineTag}</span>
                  <span className="res2-sheet__meta-dot">⭐ {r.rating} ({r.ratingCount})</span>
                  <span className="res2-sheet__meta-dot">{r.distance}</span>
                  <span className="res2-sheet__meta-dot">{r.priceRange}</span>
                </div>
              </div>
              <span className="res2-sheet__arrow">›</span>
            </motion.div>
          ))}
        </div>
        <div className="res2-sheet__footer">
          <button className="res2-btn-primary">Book a Table</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Live feed match card ──────────────────────────────────────
function MatchCard({ card, justMatched, latestSuperLiker }: {
  card: MenuCard;
  justMatched: boolean;
  latestSuperLiker: string | null;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const matched = isMatched(card);
  const hasSuperLike = card.superLikedBy.length > 0;
  const likeCount = card.likedBy.length + card.superLikedBy.length;
  const progress = Math.min(likeCount / card.totalMembers, 1);

  const borderStyle = matched
    ? { borderColor: "#34d399", boxShadow: "0 0 0 2px rgba(52,211,153,0.25)" }
    : hasSuperLike
    ? { borderColor: "#fbbf24", boxShadow: "0 0 0 2px rgba(251,191,36,0.25)" }
    : { borderColor: "#e4e4e7" };

  return (
    <>
      <motion.div
        layout
        className="res2-match-card"
        style={borderStyle}
        animate={justMatched ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence>
          {latestSuperLiker && (
            <motion.div
              className="res2-super-flash"
              initial={{ opacity: 0, y: -6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              ⭐ {getMember(latestSuperLiker).emoji} {getMember(latestSuperLiker).name} Super Liked!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="res2-match-card__img-wrap">
          <Image src={card.imageUrl} alt={card.name} fill sizes="56px" style={{ objectFit: "cover" }} />
          {hasSuperLike && !matched && <div className="res2-match-card__super-overlay" />}
        </div>

        <div className="res2-match-card__info">
          <div className="res2-match-card__name-row">
            <span className="res2-match-card__name">{card.name}</span>
            <div className="res2-match-card__badges">
              {matched && (
                <motion.span className="res2-badge res2-badge--matched"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}>
                  ✓ Matched
                </motion.span>
              )}
              {hasSuperLike && !matched && (
                <motion.span className="res2-badge res2-badge--hot"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320 }}>
                  ⭐ Hot
                </motion.span>
              )}
            </div>
          </div>
          <span className="res2-match-card__cuisine">{card.cuisine}</span>
          <div className="res2-progress-wrap">
            <div className="res2-progress-bar">
              <motion.div
                className={`res2-progress-fill ${matched ? "res2-progress-fill--matched" : hasSuperLike ? "res2-progress-fill--hot" : ""}`}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
            <span className="res2-progress-count">{likeCount}/{card.totalMembers}</span>
          </div>
          <div className="res2-match-card__avatars">
            {card.superLikedBy.map((uid) => {
              const m = getMember(uid);
              return (
                <motion.span key={uid + "-super"} className="res2-avatar res2-avatar--super"
                  style={{ background: m.color }} title={`${m.name} ⭐`}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}>
                  {m.emoji}
                </motion.span>
              );
            })}
            {card.likedBy.map((uid) => {
              const m = getMember(uid);
              return (
                <motion.span key={uid + "-like"} className="res2-avatar"
                  style={{ background: m.color }} title={m.name}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}>
                  {m.emoji}
                </motion.span>
              );
            })}
          </div>
        </div>

        {matched && (
          <button className="res2-see-btn" onClick={() => setSheetOpen(true)} title="See Restaurants">
            →
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {sheetOpen && (
          <RestaurantSheet cardId={card.id} cardName={card.name} onClose={() => setSheetOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Winner screen ─────────────────────────────────────────────
function WinnerScreen({ cards, onTieBreak, hasTie }: {
  cards: MenuCard[];
  onTieBreak: () => void;
  hasTie: boolean;
}) {
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);
  const ranked = getRanked(cards);
  const top3 = ranked.slice(0, 3);
  const winner = top3[0];

  const RANK_MEDALS = ["🥇", "🥈", "🥉"];

  return (
    <motion.div
      className="res2-winner-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Winner hero */}
      <motion.div
        className="res2-winner-hero"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div className="res2-winner-trophy">🏆</div>
        <div className="res2-winner-img-wrap">
          <Image
            src={winner.imageUrl}
            alt={winner.name}
            fill
            sizes="120px"
            style={{ objectFit: "cover" }}
          />
          <div className="res2-winner-img-glow" style={{ background: winner.accentColor }} />
        </div>
        <motion.div
          className="res2-winner-name"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {winner.name}
        </motion.div>
        <div className="res2-winner-sub">{winner.cuisine} · {getScore(winner)} votes</div>

        {/* Winner voter breakdown */}
        <div className="res2-winner-voters">
          {winner.superLikedBy.map((uid) => {
            const m = getMember(uid);
            return (
              <span key={uid + "-s"} className="res2-winner-avatar res2-winner-avatar--super"
                style={{ background: m.color }} title={`${m.name} ⭐`}>
                {m.emoji}
              </span>
            );
          })}
          {winner.likedBy.map((uid) => {
            const m = getMember(uid);
            return (
              <span key={uid + "-l"} className="res2-winner-avatar"
                style={{ background: m.color }} title={m.name}>
                {m.emoji}
              </span>
            );
          })}
        </div>

        {/* See Restaurants CTA */}
        <button className="res2-winner-rest-btn" onClick={() => setSheetOpen(winner.id)}>
          🍽️ See Restaurants
        </button>
      </motion.div>

      {/* Top 3 ranking list */}
      <div className="res2-ranking">
        <p className="res2-ranking__label">Top Results</p>
        {top3.map((card, i) => (
          <motion.div
            key={card.id}
            className={`res2-rank-row ${i === 0 ? "res2-rank-row--winner" : ""}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="res2-rank-medal">{RANK_MEDALS[i]}</span>
            <div className="res2-rank-img-wrap">
              <Image src={card.imageUrl} alt={card.name} fill sizes="36px" style={{ objectFit: "cover" }} />
            </div>
            <div className="res2-rank-info">
              <span className="res2-rank-name">{card.name}</span>
              <span className="res2-rank-cuisine">{card.cuisine}</span>
            </div>
            {/* Voter avatars */}
            <div className="res2-rank-voters">
              {card.superLikedBy.map((uid) => (
                <span key={uid + "-s"} className="res2-rank-avatar res2-rank-avatar--super"
                  style={{ background: getMember(uid).color }}>
                  {getMember(uid).emoji}
                </span>
              ))}
              {card.likedBy.map((uid) => (
                <span key={uid + "-l"} className="res2-rank-avatar"
                  style={{ background: getMember(uid).color }}>
                  {getMember(uid).emoji}
                </span>
              ))}
            </div>
            <span className="res2-rank-score">{getScore(card)} pts</span>
          </motion.div>
        ))}
      </div>

      {/* Footer: Share LINE + Tie-break + End Game */}
      <motion.div
        className="res2-winner-footer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Share to LINE */}
        <button className="res2-line-btn">
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#06C755"/>
            <path d="M20 8C13.37 8 8 12.84 8 18.8c0 4.33 2.88 8.12 7.18 10.23-.3 1.1-.97 3.57-1.11 4.12-.18.67.24.66.51.48.21-.14 3.37-2.29 4.73-3.22.56.08 1.13.12 1.69.12 6.63 0 12-4.84 12-10.8S26.63 8 20 8z" fill="white"/>
          </svg>
          Share to LINE Group
        </button>

        {/* Tie-break button — only if there's a tie */}
        {hasTie && (
          <motion.button
            className="res2-tiebreak-btn"
            onClick={onTieBreak}
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚡ Tie-Break Vote
          </motion.button>
        )}

        <Link href="/home-screen-v2" className="res2-btn-ghost">
          End Game · Back Home
        </Link>
      </motion.div>

      {/* Restaurant sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <RestaurantSheet
            cardId={sheetOpen}
            cardName={cards.find((c) => c.id === sheetOpen)?.name ?? ""}
            onClose={() => setSheetOpen(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Tie-break popup ───────────────────────────────────────────
function TieBreakPopup({ cards, onDone }: {
  cards: MenuCard[];
  onDone: (winnerId: string) => void;
}) {
  const tied = cards.filter((c) => TIEBREAK_CARDS.includes(c.id));
  const [voted, setVoted] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [votes, setVotes] = useState<Record<string, number>>({ m1: 0, m3: 0 });

  // Countdown
  useEffect(() => {
    if (voted || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, voted]);

  // Simulate other members voting
  useEffect(() => {
    const delays = [
      { id: "u2", cardId: "m3", ms: 3000 },
      { id: "u3", cardId: "m1", ms: 5500 },
      { id: "u4", cardId: "m3", ms: 8000 },
    ];
    const timers = delays.map(({ cardId, ms }) =>
      setTimeout(() => {
        setVotes((prev) => ({ ...prev, [cardId]: prev[cardId] + 1 }));
      }, ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-end when time runs out
  useEffect(() => {
    if (timeLeft > 0) return;
    const winner = votes.m1 >= votes.m3 ? "m1" : "m3";
    setTimeout(() => onDone(winner), 600);
  }, [timeLeft, votes, onDone]);

  function handleVote(cardId: string) {
    if (voted) return;
    setVoted(cardId);
    setVotes((prev) => ({ ...prev, [cardId]: prev[cardId] + 1 }));
  }

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const timerPct = (timeLeft / 60) * 100;
  const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#f97316" : "#22c55e";

  return (
    <motion.div
      className="res2-tiebreak-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="res2-tiebreak-popup"
        initial={{ scale: 0.85, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <div className="res2-tiebreak__head">
          <p className="res2-tiebreak__label">⚡ It's a Tie!</p>
          <h3 className="res2-tiebreak__title">Tie-Break Vote</h3>
          <p className="res2-tiebreak__sub">1 vote per person · Choose your winner</p>
        </div>

        {/* Countdown ring + number */}
        <div className="res2-tiebreak__timer-wrap">
          <svg className="res2-tiebreak__timer-ring" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#f4f4f5" strokeWidth="4" />
            <circle
              cx="24" cy="24" r="20" fill="none"
              stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - timerPct / 100)}`}
              strokeLinecap="round"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
            />
          </svg>
          <span className="res2-tiebreak__timer-num" style={{ color: timerColor }}>{timeLeft}</span>
        </div>

        {/* Vote cards */}
        <div className="res2-tiebreak__cards">
          {tied.map((card) => {
            const cardVotes = votes[card.id] ?? 0;
            const pct = totalVotes > 0 ? Math.round((cardVotes / totalVotes) * 100) : 0;
            const isChosen = voted === card.id;
            return (
              <button
                key={card.id}
                className={`res2-tiebreak__card ${isChosen ? "res2-tiebreak__card--chosen" : ""} ${voted && !isChosen ? "res2-tiebreak__card--dim" : ""}`}
                onClick={() => handleVote(card.id)}
                disabled={!!voted}
              >
                <div className="res2-tiebreak__card-img">
                  <Image src={card.imageUrl} alt={card.name} fill sizes="80px" style={{ objectFit: "cover" }} />
                  {isChosen && (
                    <motion.div className="res2-tiebreak__card-check"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}>
                      ✓
                    </motion.div>
                  )}
                </div>
                <span className="res2-tiebreak__card-name">{card.name}</span>
                <span className="res2-tiebreak__card-cuisine">{card.cuisine}</span>
                {/* Live vote bar */}
                <div className="res2-tiebreak__vote-bar">
                  <motion.div
                    className="res2-tiebreak__vote-fill"
                    style={{ background: card.accentColor }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="res2-tiebreak__vote-count">{cardVotes} votes · {pct}%</span>
              </button>
            );
          })}
        </div>

        {/* Member vote status */}
        <div className="res2-tiebreak__members">
          {MEMBERS.map((m) => {
            const hasVoted = m.id === "u1" ? !!voted
              : m.id === "u2" ? (votes.m3 >= 1)  // Sarah voted m3 at 3s
              : m.id === "u3" ? (votes.m1 >= (votes.m3 >= 1 ? 2 : 1))  // James voted m1 at 5.5s
              : (votes.m3 >= 2); // Nat voted m3 at 8s
            return (
              <div key={m.id} className="res2-tiebreak__member">
                <span className={`res2-tiebreak__member-avatar ${hasVoted ? "res2-tiebreak__member-avatar--voted" : ""}`}
                  style={{ background: m.color }}>
                  {m.emoji}
                </span>
                <span className="res2-tiebreak__member-name">{m.name}</span>
                <span className={`res2-tiebreak__member-status ${hasVoted ? "res2-tiebreak__member-status--done" : ""}`}>
                  {hasVoted ? "✓ Voted" : "..."}
                </span>
              </div>
            );
          })}
        </div>

        {voted && (
          <motion.p className="res2-tiebreak__wait"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Waiting for others to vote...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// MAIN
// ============================================================

function ResultV2Content() {
  const searchParams = useSearchParams();
  const gameMode: GameMode =
    searchParams.get("mode") === "restaurant" ? "restaurant" : "menu";

  const [cards, setCards] = useState<MenuCard[]>(INITIAL_CARDS.map((c) => ({ ...c })));
  const [toast, setToast] = useState<{ memberId: string; cardName: string; action: string } | null>(null);
  const [justMatched, setJustMatched] = useState<string | null>(null);
  const [latestSuperLike, setLatestSuperLike] = useState<{ cardId: string; memberId: string } | null>(null);
  const [eventIndex, setEventIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("live");
  const [tieWinnerId, setTieWinnerId] = useState<string | null>(null);

  // Compute tie: top 2 cards have same score after all events
  // m1 final: 3 likes (u2,u3,u1) + 1 superlike (u4) = 3 + 2 = 5
  // m3 final: 1 like  (u4,u1)   + 2 superlikes (u3,u2) = 2 + 4 = 6 — not a tie
  // Let's detect tie dynamically from final card scores
  const ranked = getRanked(cards);
  const hasTie = ranked.length >= 2 && getScore(ranked[0]) === getScore(ranked[1]) && phase === "winner";

  // Run the live swipe event timeline
  useEffect(() => {
    let mounted = true;

    const runLoop = async () => {
      while (mounted) {
        // Reset
        setCards(INITIAL_CARDS.map((c) => ({ ...c })));
        setToast(null);
        setJustMatched(null);
        setLatestSuperLike(null);
        setEventIndex(0);
        setPhase("live");
        setTieWinnerId(null);

        for (let i = 0; i < SWIPE_EVENTS.length; i++) {
          const ev = SWIPE_EVENTS[i];
          const wait = i === 0 ? ev.delay : ev.delay - SWIPE_EVENTS[i - 1].delay;
          await new Promise((r) => setTimeout(r, wait));
          if (!mounted) return;

          setEventIndex(i + 1);

          setCards((prev) =>
            prev.map((card) => {
              if (card.id !== ev.cardId) return card;
              const already = card.likedBy.includes(ev.memberId) || card.superLikedBy.includes(ev.memberId);
              if (already) return card;
              return ev.action === "superlike"
                ? { ...card, superLikedBy: [...card.superLikedBy, ev.memberId] }
                : { ...card, likedBy: [...card.likedBy, ev.memberId] };
            }),
          );

          const cardName = INITIAL_CARDS.find((c) => c.id === ev.cardId)?.name ?? "";
          setToast({ memberId: ev.memberId, cardName, action: ev.action });
          setTimeout(() => setToast(null), 1600);

          if (ev.action === "superlike") {
            setLatestSuperLike({ cardId: ev.cardId, memberId: ev.memberId });
            setTimeout(() => setLatestSuperLike(null), 2200);
          }

          setCards((prev) => {
            const updated = prev.find((c) => c.id === ev.cardId);
            if (!updated) return prev;
            const newTotal = updated.likedBy.length + updated.superLikedBy.length;
            if (newTotal >= updated.totalMembers) {
              setJustMatched(ev.cardId);
              setTimeout(() => setJustMatched(null), 900);
            }
            return prev;
          });
        }

        // Short pause then transition to winner phase
        await new Promise((r) => setTimeout(r, 900));
        if (!mounted) return;
        setPhase("winner");

        // Hold winner screen, then loop
        await new Promise((r) => setTimeout(r, 8000));
        if (!mounted) return;
      }
    };

    runLoop();
    return () => { mounted = false; };
  }, []);

  const matchedCards = cards.filter(isMatched);
  const inProgressCards = cards.filter((c) => !isMatched(c));

  function handleTieBreakDone(winnerId: string) {
    setTieWinnerId(winnerId);
    setPhase("winner");
  }

  return (
    <div className={`${baloo.className} res2-root`}>
      <div className="res2-phone">
        {/* Dynamic island */}
        <div className="res2-island" />

        {/* Status bar */}
        <div className="res2-status">
          <span>9:41</span>
          <div className="res2-battery">
            <div className="res2-battery__level" />
            <div className="res2-battery__cap" />
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ── PHASE: LIVE FEED ──────────────────────────────── */}
          {phase === "live" && (
            <motion.div
              key="live"
              className="res2-live-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Live toast */}
              <AnimatePresence>
                {toast && (
                  <SwipeToast memberId={toast.memberId} cardName={toast.cardName} action={toast.action} />
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="res2-header">
                <div>
                  <p className="res2-header__label">Live Matching</p>
                  <h2 className="res2-header__title">Updating in real-time...</h2>
                </div>
                <div className="res2-header__members">
                  {MEMBERS.map((m) => (
                    <span key={m.id} className="res2-header__avatar"
                      style={{ background: m.color }} title={m.name}>
                      {m.emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overall progress */}
              <div className="res2-progress-overall">
                <motion.div
                  className="res2-progress-overall__fill"
                  animate={{ width: `${(eventIndex / SWIPE_EVENTS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="res2-progress-overall__label">
                {eventIndex}/{SWIPE_EVENTS.length} swipes recorded
              </div>

              {/* Card list */}
              <div className="res2-body">
                <AnimatePresence>
                  {matchedCards.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="res2-section"
                    >
                      <div className="res2-section__head">
                        <span className="res2-section__dot res2-section__dot--matched" />
                        <span className="res2-section__label">Matched · {matchedCards.length}</span>
                      </div>
                      <div className="res2-card-list">
                        {matchedCards.map((card) => (
                          <MatchCard key={card.id} card={card}
                            justMatched={justMatched === card.id}
                            latestSuperLiker={latestSuperLike?.cardId === card.id ? latestSuperLike.memberId : null}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {inProgressCards.length > 0 && (
                  <div className="res2-section">
                    <div className="res2-section__head">
                      <motion.span className="res2-section__dot res2-section__dot--live"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <span className="res2-section__label">In Progress</span>
                    </div>
                    <div className="res2-card-list">
                      {inProgressCards.map((card) => (
                        <MatchCard key={card.id} card={card}
                          justMatched={justMatched === card.id}
                          latestSuperLiker={latestSuperLike?.cardId === card.id ? latestSuperLike.memberId : null}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {matchedCards.length > 0 && (
                <motion.div className="res2-footer"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.35 }}>
                  <Link href="/home-screen-v2" className="res2-btn-ghost">
                    End Game · Back Home
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── PHASE: WINNER ─────────────────────────────────── */}
          {phase === "winner" && (
            <motion.div
              key="winner"
              className="res2-winner-phase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <WinnerScreen
                cards={tieWinnerId
                  ? cards.map((c) => c.id === tieWinnerId ? { ...c, likedBy: [...c.likedBy, "tb"] } : c)
                  : cards}
                onTieBreak={() => setPhase("tiebreak")}
                hasTie={hasTie}
              />
            </motion.div>
          )}

          {/* ── PHASE: TIE-BREAK ──────────────────────────────── */}
          {phase === "tiebreak" && (
            <motion.div key="tiebreak" className="res2-tiebreak-phase">
              <TieBreakPopup cards={cards} onDone={handleTieBreakDone} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Home indicator */}
        <div className="res2-home-bar" />
      </div>
    </div>
  );
}

export default function ResultV2Page() {
  return (
    <Suspense fallback={<div />}>
      <ResultV2Content />
    </Suspense>
  );
}
