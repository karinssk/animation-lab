"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// DATA
// ============================================================

interface MenuCard {
  id: string;
  emoji: string;
  name: string;
  price: string;
  matchCount: number;      // how many people swiped right
  totalPeople: number;     // total people in group
  superLikedBy: string[];  // avatars who super-liked
  isMatched: boolean;
}

const PEOPLE = [
  { id: "you",   emoji: "😎", label: "You"   },
  { id: "sarah", emoji: "👩‍🦰", label: "Sarah" },
  { id: "tom",   emoji: "🧑‍🦱", label: "Tom"   },
];

const RESTAURANTS = [
  { name: "The Grill House",   distance: "0.3 km", rating: "4.8", tag: "Steak" },
  { name: "Ember & Oak",       distance: "0.7 km", rating: "4.6", tag: "Steak" },
  { name: "Sakura Garden",     distance: "1.1 km", rating: "4.7", tag: "Sushi" },
  { name: "Ramen Republic",    distance: "0.5 km", rating: "4.5", tag: "Ramen" },
];

// Sequence of swipe events that happen in real-time
// Each event: who swiped what, and whether it's a super like
const SWIPE_EVENTS = [
  { delay: 800,  cardId: "steak",  person: "sarah", action: "like"       },
  { delay: 1400, cardId: "sushi",  person: "tom",   action: "superlike"  },
  { delay: 2000, cardId: "steak",  person: "tom",   action: "like"       },
  { delay: 2700, cardId: "ramen",  person: "sarah", action: "like"       },
  { delay: 3200, cardId: "steak",  person: "you",   action: "like"       }, // → match!
  { delay: 4200, cardId: "sushi",  person: "sarah", action: "superlike"  },
  { delay: 5000, cardId: "sushi",  person: "you",   action: "like"       }, // → match!
];

const INITIAL_CARDS: MenuCard[] = [
  { id: "steak", emoji: "🥩", name: "Grilled Steak",  price: "฿420", matchCount: 0, totalPeople: 3, superLikedBy: [], isMatched: false },
  { id: "sushi", emoji: "🍣", name: "Salmon Sushi",   price: "฿380", matchCount: 0, totalPeople: 3, superLikedBy: [], isMatched: false },
  { id: "ramen", emoji: "🍜", name: "Tonkotsu Ramen", price: "฿290", matchCount: 0, totalPeople: 3, superLikedBy: [], isMatched: false },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

function Avatar({ emoji, label, size = "md" }: { emoji: string; label: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-7 h-7 text-base" : "w-10 h-10 text-xl";
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`${dim} rounded-full bg-zinc-100 border-2 border-white shadow flex items-center justify-center`}>
        <span>{emoji}</span>
      </div>
      <span className="text-[8px] text-zinc-400 font-medium">{label}</span>
    </div>
  );
}

function SuperLikeFlash({ person }: { person: string }) {
  const p = PEOPLE.find(p => p.id === person);
  return (
    <motion.div
      className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-amber-400 text-amber-950 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap z-50"
      initial={{ opacity: 0, y: 4, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.8 }}
      transition={{ duration: 0.25 }}
    >
      ⭐ {p?.emoji} Super Like!
    </motion.div>
  );
}

function MenuCardItem({ card, justMatched, latestSuperLike }: {
  card: MenuCard;
  justMatched: boolean;
  latestSuperLike: string | null;
}) {
  const matchRatio = card.matchCount / card.totalPeople;
  const hasSuperLike = card.superLikedBy.length > 0;

  // Border color logic
  const borderClass = card.isMatched
    ? "border-emerald-400 shadow-emerald-100"
    : hasSuperLike
    ? "border-amber-400 shadow-amber-100"
    : "border-zinc-200 shadow-zinc-100";

  return (
    <motion.div
      layout
      className={`relative flex items-center gap-3 rounded-2xl border-2 bg-white px-3 py-2.5 shadow-md transition-colors duration-500 ${borderClass}`}
      animate={justMatched ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Super like toast */}
      <AnimatePresence>
        {latestSuperLike && <SuperLikeFlash person={latestSuperLike} />}
      </AnimatePresence>

      {/* Emoji */}
      <div className="text-2xl w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-50 shrink-0">
        {card.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-bold text-zinc-900 truncate">{card.name}</span>
          {card.isMatched && (
            <motion.span
              className="text-[8px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              MATCHED
            </motion.span>
          )}
          {hasSuperLike && !card.isMatched && (
            <motion.span
              className="text-[8px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ⭐ HOT
            </motion.span>
          )}
        </div>
        <span className="text-[10px] text-zinc-400">{card.price}</span>

        {/* Match progress bar */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex-1 h-1 rounded-full bg-zinc-100 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${card.isMatched ? "bg-emerald-400" : hasSuperLike ? "bg-amber-400" : "bg-zinc-300"}`}
              animate={{ width: `${(matchRatio * 100).toFixed(0)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-[9px] text-zinc-400 shrink-0">
            {card.matchCount}/{card.totalPeople}
          </span>
        </div>
      </div>

      {/* Super-liker avatars */}
      {card.superLikedBy.length > 0 && (
        <div className="flex -space-x-1 shrink-0">
          {card.superLikedBy.map((pid) => {
            const p = PEOPLE.find(p => p.id === pid);
            return (
              <motion.div
                key={pid}
                className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-[10px]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {p?.emoji}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function LiveSwipeToast({ person, cardName, action }: { person: string; cardName: string; action: string }) {
  const p = PEOPLE.find(p => p.id === person);
  return (
    <motion.div
      className="absolute top-[38px] left-3 right-3 z-50 flex items-center gap-2 rounded-xl bg-zinc-900/90 backdrop-blur px-3 py-2 shadow-lg"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-base">{p?.emoji}</span>
      <span className="text-[10px] text-white font-medium flex-1">
        <span className="text-zinc-300">{p?.label}</span>
        {action === "superlike" ? " ⭐ super liked " : " liked "}
        <span className="text-zinc-300">{cardName}</span>
      </span>
    </motion.div>
  );
}

function RestaurantList({ matchedCards }: { matchedCards: MenuCard[] }) {
  const matchedNames = matchedCards.map(c => c.name);
  const relevant = RESTAURANTS.filter(r =>
    matchedCards.some(c =>
      c.name.toLowerCase().includes(r.tag.toLowerCase()) ||
      r.tag.toLowerCase().includes(c.emoji === "🥩" ? "steak" : c.emoji === "🍣" ? "sushi" : "ramen")
    )
  );

  return (
    <motion.div
      className="absolute inset-0 bg-white z-40 flex flex-col"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-3 border-b border-zinc-100">
        <h2 className="text-[16px] font-bold text-zinc-900">Restaurants Near You</h2>
        <p className="text-[10px] text-zinc-400 mt-0.5">Serving your matched menus · {relevant.length} found</p>
        {/* Matched menu pills */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {matchedCards.map(c => (
            <span key={c.id} className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              {c.emoji} {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {relevant.map((r, i) => (
          <motion.div
            key={r.name}
            className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-3 py-3 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-xl shrink-0">
              {r.tag === "Steak" ? "🥩" : r.tag === "Sushi" ? "🍣" : "🍜"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-zinc-900 truncate">{r.name}</p>
              <p className="text-[9px] text-zinc-400">{r.distance} away</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] font-bold text-zinc-700">★ {r.rating}</span>
              <span className="text-[8px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded-full">{r.tag}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-2 border-t border-zinc-100">
        <button className="w-full py-3 bg-zinc-900 text-white rounded-2xl font-bold text-sm shadow-md">
          Book a Table
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CongratulationsFoodFound() {
  const [cards, setCards] = useState<MenuCard[]>(INITIAL_CARDS);
  const [toast, setToast] = useState<{ person: string; cardName: string; action: string } | null>(null);
  const [justMatched, setJustMatched] = useState<string | null>(null);
  const [latestSuperLike, setLatestSuperLike] = useState<{ cardId: string; person: string } | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);

  // Loop the whole sequence
  useEffect(() => {
    let mounted = true;

    const runLoop = async () => {
      while (mounted) {
        // Reset
        setCards(INITIAL_CARDS.map(c => ({ ...c })));
        setToast(null);
        setJustMatched(null);
        setLatestSuperLike(null);
        setShowRestaurants(false);
        setEventIndex(0);

        // Fire each swipe event
        for (let i = 0; i < SWIPE_EVENTS.length; i++) {
          const ev = SWIPE_EVENTS[i];
          const waitTime = i === 0 ? ev.delay : ev.delay - SWIPE_EVENTS[i - 1].delay;
          await new Promise(r => setTimeout(r, waitTime));
          if (!mounted) return;

          setEventIndex(i + 1);

          setCards(prev => prev.map(card => {
            if (card.id !== ev.cardId) return card;
            const newCount = card.matchCount + 1;
            const newSuperLiked = ev.action === "superlike"
              ? [...card.superLikedBy, ev.person]
              : card.superLikedBy;
            const isMatched = newCount >= card.totalPeople;
            return { ...card, matchCount: newCount, superLikedBy: newSuperLiked, isMatched };
          }));

          // Show toast
          const cardName = INITIAL_CARDS.find(c => c.id === ev.cardId)?.name ?? "";
          setToast({ person: ev.person, cardName, action: ev.action });
          setTimeout(() => setToast(null), 1500);

          // Super like glow
          if (ev.action === "superlike") {
            setLatestSuperLike({ cardId: ev.cardId, person: ev.person });
            setTimeout(() => setLatestSuperLike(null), 2000);
          }

          // Match pulse
          const newCount = cards.find(c => c.id === ev.cardId)?.matchCount ?? 0;
          if (newCount + 1 >= PEOPLE.length) {
            setJustMatched(ev.cardId);
            setTimeout(() => setJustMatched(null), 800);
          }
        }

        // Pause then show restaurants
        await new Promise(r => setTimeout(r, 1200));
        if (!mounted) return;
        setShowRestaurants(true);

        // Hold restaurants view, then loop
        await new Promise(r => setTimeout(r, 4000));
        if (!mounted) return;
        setShowRestaurants(false);
        await new Promise(r => setTimeout(r, 400));
      }
    };

    runLoop();
    return () => { mounted = false; };
  }, []);

  const matchedCards = cards.filter(c => c.isMatched);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone Mockup */}
      <div
        className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl"
        style={{ width: 300, height: 620 }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900" />

        {/* Status Bar */}
        <div className="absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1">
          <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor" className="text-zinc-900">
              <rect x="0" y="6" width="2" height="4" rx="0.5" />
              <rect x="3" y="4" width="2" height="6" rx="0.5" />
              <rect x="6" y="2" width="2" height="8" rx="0.5" />
              <rect x="9" y="0" width="2" height="10" rx="0.5" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" className="text-zinc-900" strokeWidth="1">
              <rect x="0.5" y="1.5" width="10" height="7" rx="1" />
              <rect x="11" y="3.5" width="2" height="3" rx="0.5" fill="currentColor" />
              <rect x="1.5" y="2.5" width="7" height="5" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Live swipe toast */}
        <AnimatePresence>
          {toast && (
            <LiveSwipeToast
              person={toast.person}
              cardName={toast.cardName}
              action={toast.action}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="absolute left-0 right-0 top-[34px] bottom-0 flex flex-col bg-white overflow-hidden">

          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-zinc-900 leading-tight">Live Matching</h2>
                <p className="text-[10px] text-zinc-400 mt-0.5">Results update as everyone swipes</p>
              </div>
              {/* Group avatars */}
              <div className="flex items-end gap-1.5">
                {PEOPLE.map(p => <Avatar key={p.id} emoji={p.emoji} label={p.label} size="sm" />)}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-zinc-100 overflow-hidden">
                <motion.div
                  className="h-full bg-zinc-900 rounded-full"
                  animate={{ width: `${(eventIndex / SWIPE_EVENTS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-[9px] text-zinc-400 shrink-0">{eventIndex}/{SWIPE_EVENTS.length} swipes</span>
            </div>
          </div>

          {/* Menu Cards */}
          <div className="flex-1 px-4 flex flex-col gap-2.5 overflow-y-auto pb-4">

            {/* Matched section */}
            <AnimatePresence>
              {matchedCards.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Matched
                  </p>
                  <div className="flex flex-col gap-2">
                    {matchedCards.map(card => (
                      <MenuCardItem
                        key={card.id}
                        card={card}
                        justMatched={justMatched === card.id}
                        latestSuperLike={latestSuperLike?.cardId === card.id ? latestSuperLike.person : null}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-progress section */}
            {cards.filter(c => !c.isMatched).length > 0 && (
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">In Progress</p>
                <div className="flex flex-col gap-2">
                  {cards.filter(c => !c.isMatched).map(card => (
                    <MenuCardItem
                      key={card.id}
                      card={card}
                      justMatched={justMatched === card.id}
                      latestSuperLike={latestSuperLike?.cardId === card.id ? latestSuperLike.person : null}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* See Restaurants CTA */}
          <AnimatePresence>
            {matchedCards.length > 0 && !showRestaurants && (
              <motion.div
                className="px-5 pb-8 pt-2 border-t border-zinc-100"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setShowRestaurants(true)}
                  className="w-full py-3 bg-zinc-900 text-white rounded-2xl font-bold text-sm shadow-md"
                >
                  See Restaurants →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Restaurant list overlay */}
          <AnimatePresence>
            {showRestaurants && (
              <RestaurantList matchedCards={matchedCards} />
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20 z-50" />
      </div>

      {/* Stage indicator */}
      <div className="flex items-center gap-2">
        {["Swiping", "Matching", "Restaurants"].map((label, i) => {
          const active = i === 0
            ? eventIndex < SWIPE_EVENTS.length
            : i === 1
            ? eventIndex >= SWIPE_EVENTS.length && !showRestaurants
            : showRestaurants;
          return (
            <div key={label} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full transition-all duration-300 ${active ? "bg-emerald-500 scale-125" : "bg-zinc-300"}`} />
              <span className={`text-[9px] ${active ? "text-zinc-700 font-semibold" : "text-zinc-400"}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
