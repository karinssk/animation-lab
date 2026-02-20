"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./result.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

type Screen = "top3" | "winner";
type TieMode = "time" | "all";
type GameMode = "menu" | "restaurant";

type VoteEntry = { userId: string; dir: "right" | "up" | "left" };
type MenuItem = {
  id: string;
  name: string;
  nameLocal: string;
  cuisine: string;
  imageUrl: string;
  accentColor: string;
  votes: VoteEntry[];
  score: number;
};

const MEMBERS: Record<string, { initials: string; color: string; name: string }> = {
  u1: { initials: "JT", color: "#f97316", name: "You" },
  u2: { initials: "SA", color: "#3b82f6", name: "Sarah" },
  u3: { initials: "JM", color: "#22c55e", name: "James" },
  u4: { initials: "NT", color: "#a855f7", name: "Nat" },
};

const TOP3: MenuItem[] = [
  {
    id: "m1",
    name: "Pad Thai",
    nameLocal: "Pad Thai",
    cuisine: "Thai",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&q=80",
    accentColor: "#f97316",
    votes: [
      { userId: "u1", dir: "right" },
      { userId: "u2", dir: "up" },
      { userId: "u3", dir: "right" },
      { userId: "u4", dir: "left" },
    ],
    score: 5,
  },
  {
    id: "m2",
    name: "Korean BBQ",
    nameLocal: "Korean BBQ",
    cuisine: "Korean",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80",
    accentColor: "#ef4444",
    votes: [
      { userId: "u1", dir: "right" },
      { userId: "u2", dir: "right" },
      { userId: "u3", dir: "left" },
      { userId: "u4", dir: "up" },
    ],
    score: 5,
  },
  {
    id: "m3",
    name: "Sushi Set",
    nameLocal: "Sushi Set",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80",
    accentColor: "#3b82f6",
    votes: [
      { userId: "u1", dir: "left" },
      { userId: "u2", dir: "right" },
      { userId: "u3", dir: "right" },
      { userId: "u4", dir: "right" },
    ],
    score: 3,
  },
];

const DIR_ICON: Record<string, string> = {
  right: "\u{1F525}",
  up: "\u{1F60D}",
  left: "\u{1F610}",
};

const DIR_COLOR: Record<string, string> = {
  right: "#22c55e",
  up: "#f97316",
  left: "#ef4444",
};

const WINNER_CONFETTI = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  left: 4 + (i * 4) % 92,
  duration: 2.4 + (i % 5) * 0.35,
  delay: (i % 8) * 0.16,
  size: 8 + (i % 3) * 3,
  color: ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"][i % 6],
  drift: i % 2 === 0 ? 12 : -12,
}));
const FOOD_CONFETTI_ICONS = ["🍕", "🍣", "🍜", "🍤", "🍔", "🌮", "🥟", "🍩"];

function WinnerScreen({
  winnerId,
  gameMode,
}: {
  winnerId: string;
  gameMode: GameMode;
}) {
  const winner = TOP3.find((m) => m.id === winnerId) ?? TOP3[0];
  const [shared, setShared] = useState(false);

  return (
    <div className="res-winner-screen">
      <div className="res-confetti" aria-hidden="true">
        {WINNER_CONFETTI.map((piece) => (
          <motion.span
            key={piece.id}
            className="res-confetti__piece"
            style={{ left: `${piece.left}%`, color: piece.color, fontSize: piece.size }}
            initial={{ y: -24, opacity: 0, rotate: 0, x: 0 }}
            animate={{ y: 440, opacity: [0, 1, 1, 0], rotate: 360, x: [0, piece.drift, 0] }}
            transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity, ease: "linear" }}
          >
            {FOOD_CONFETTI_ICONS[piece.id % FOOD_CONFETTI_ICONS.length]}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        className="res-winner-img-wrap"
      >
        <Image src={winner.imageUrl} alt={winner.name} fill sizes="160px" style={{ objectFit: "cover" }} priority />
        <div className="res-winner-img-ring" style={{ boxShadow: `0 0 0 4px ${winner.accentColor}` }} />
      </motion.div>

      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="res-winner-info">
        <p className="res-winner-label">Winner</p>
        <h1 className="res-winner-name">{winner.name}</h1>
        <p className="res-winner-local">{winner.nameLocal} · {winner.cuisine}</p>
      </motion.div>

      <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="res-winner-actions">
        <button className={`res-btn-line${shared ? " res-btn-line--sent" : ""}`} onClick={() => setShared(true)}>
          {shared ? "Sent to group! ✓" : "Share to LINE Group"}
        </button>
        {gameMode === "menu" && (
          <Link href="/map" className="res-btn-directions">
            Select Restaurant
          </Link>
        )}
        <Link href="/home-screen-v2" className="res-btn-ghost">End Game · Back Home</Link>
      </motion.div>
    </div>
  );
}

function ResultPageContent() {
  const searchParams = useSearchParams();
  const gameMode: GameMode = searchParams.get("mode") === "restaurant" ? "restaurant" : "menu";

  const [screen, setScreen] = useState<Screen>("top3");
  const [winnerId, setWinnerId] = useState("");
  const [tieOpen, setTieOpen] = useState(false);
  const [tieMode, setTieMode] = useState<TieMode>("time");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [notified, setNotified] = useState(false);
  const [finalVotes, setFinalVotes] = useState<Record<string, string>>({});

  const sortedByScore = useMemo(() => [...TOP3].sort((a, b) => b.score - a.score), []);
  const topScore = sortedByScore[0]?.score ?? 0;
  const tiedItems = sortedByScore.filter((item) => item.score === topScore);
  const isTie = tiedItems.length > 1;
  const memberIds = Object.keys(MEMBERS);
  const votedCount = Object.keys(finalVotes).length;
  const allVoted = votedCount === memberIds.length;
  const myVote = finalVotes.u1 ?? "";

  const tally = useMemo(() => {
    const score: Record<string, number> = {};
    tiedItems.forEach((item) => { score[item.id] = 0; });
    Object.values(finalVotes).forEach((pick) => { if (score[pick] !== undefined) score[pick] += 1; });
    return score;
  }, [finalVotes, tiedItems]);

  const highestVote = Math.max(0, ...Object.values(tally));
  const leaders = Object.entries(tally).filter(([, value]) => value === highestVote).map(([id]) => id);
  const tieResolved = leaders.length === 1 && highestVote > 0;

  useEffect(() => {
    if (!tieOpen || tieMode !== "time" || tieResolved || secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [tieOpen, tieMode, tieResolved, secondsLeft]);

  function openTieBreak() {
    setTieOpen(true);
    setFinalVotes({});
    setNotified(false);
    setSecondsLeft(60);
  }

  function castMyVote(itemId: string) {
    if (myVote) return;
    setFinalVotes((prev) => ({ ...prev, u1: itemId }));
  }

  function simulateMemberVotes() {
    const pending = memberIds.filter((id) => !finalVotes[id] && id !== "u1");
    if (pending.length === 0) return;
    const next = { ...finalVotes };
    pending.forEach((id, idx) => { next[id] = tiedItems[idx % tiedItems.length].id; });
    setFinalVotes(next);
  }

  function letToastChoose() {
    const weighted = tiedItems.flatMap((item) => {
      const preferenceBoost = item.cuisine === "Thai" ? 2 : 1;
      const locationBoost = item.id === "m1" ? 1 : 0;
      const weight = Math.max(1, item.score + preferenceBoost + locationBoost);
      return Array.from({ length: weight }, () => item.id);
    });
    const chosen = weighted[weighted.length - 1];
    setWinnerId(chosen);
    setTieOpen(false);
    setScreen("winner");
  }

  function finalizeTieBreak() {
    if (!tieResolved) return;
    setWinnerId(leaders[0]);
    setTieOpen(false);
    setScreen("winner");
  }

  function openWinnerIfNoTie() {
    if (isTie) return;
    setWinnerId(sortedByScore[0].id);
    setScreen("winner");
  }

  return (
    <div className={`${baloo.className} res-root`}>
      <div className="res-phone">
        <div className="res-status">
          <span>9:41</span>
          <span className="res-battery" aria-hidden="true">
            <span className="res-battery__level" />
            <span className="res-battery__cap" />
          </span>
        </div>

        <div className="res-steps">
          {(["top3", "winner"] as Screen[]).map((s) => (
            <div key={s} className={`res-step${screen === s ? " res-step--active" : ""}${screen === "winner" && s === "top3" ? " res-step--done" : ""}`} />
          ))}
        </div>

        <div className="res-body">
          <AnimatePresence mode="wait">
            {screen === "top3" && (
              <motion.div key="top3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="res-screen">
                <div className="res-header">
                  <p className="res-header__label">Result Summary</p>
                  <h1 className="res-header__title">Top 3 Picks</h1>
                  <p className="res-header__sub">{isTie ? "Tie detected: tie-break is required." : "Winner ready."}</p>
                </div>
                <div className="res-top3-list">
                  {sortedByScore.map((item, i) => (
                    <div key={item.id} className={`res-top3-card${i === 0 ? " res-top3-card--first" : ""}`}>
                      <div className="res-top3-card__rank">#{i + 1}</div>
                      <div className="res-top3-card__thumb">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="52px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="res-top3-card__info">
                        <p className="res-top3-card__name">{item.name}</p>
                        <p className="res-top3-card__local">{item.nameLocal} · {item.cuisine}</p>
                        <div className="res-top3-card__votes">
                          {item.votes.map((v, j) => (
                            <span key={j} className="res-vote-dot" title={`${MEMBERS[v.userId]?.name}: ${v.dir}`}>
                              <span className="res-vote-dot__avatar" style={{ background: MEMBERS[v.userId]?.color ?? "#a1a1aa" }}>{MEMBERS[v.userId]?.initials ?? "??"}</span>
                              <span className="res-vote-dot__dir" style={{ background: DIR_COLOR[v.dir] }}>{DIR_ICON[v.dir]}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="res-top3-card__score">
                        <span className="res-top3-card__score-val">{item.score}</span>
                        <span className="res-top3-card__score-label">pts</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="res-footer">
                  {isTie ? (
                    <button className="res-btn-primary" onClick={openTieBreak}>Open Tie-break Vote</button>
                  ) : (
                    <button className="res-btn-primary" onClick={openWinnerIfNoTie}>See Winner</button>
                  )}
                  <Link href="/home-screen-v2" className="res-btn-ghost">End Game · Back Home</Link>
                </div>
              </motion.div>
            )}

            {screen === "winner" && (
              <motion.div key="winner" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="res-screen">
                <WinnerScreen winnerId={winnerId} gameMode={gameMode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {tieOpen && (
            <motion.div className="res-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="res-modal" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
                <div className="res-modal__head">
                  <p className="res-modal__label">Tie-break</p>
                  <button className="res-modal__close" onClick={() => setTieOpen(false)}>×</button>
                </div>
                <h3 className="res-modal__title">Vote Again</h3>
                <p className="res-modal__sub">Each person can vote once.</p>

                <div className="res-mode-row">
                  <button className={`res-mode-btn${tieMode === "time" ? " res-mode-btn--active" : ""}`} onClick={() => setTieMode("time")}>Time Limit (1m)</button>
                  <button className={`res-mode-btn${tieMode === "all" ? " res-mode-btn--active" : ""}`} onClick={() => setTieMode("all")}>All Match</button>
                </div>

                <div className="res-notify-row">
                  <button className="res-btn-ghost" onClick={() => setNotified(true)}>Notify Group Members</button>
                  {notified && <span className="res-notify-ok">Notification sent</span>}
                </div>

                {tieMode === "time" && <p className="res-countdown">00:{String(secondsLeft).padStart(2, "0")}</p>}

                <div className="res-vote-list">
                  {tiedItems.map((item) => (
                    <button key={item.id} className={`res-vote-card${myVote === item.id ? " res-vote-card--voted" : ""}`} onClick={() => castMyVote(item.id)} disabled={!!myVote}>
                      <div className="res-vote-card__thumb">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="48px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="res-vote-card__info">
                        <p className="res-vote-card__name">{item.name}</p>
                        <div className="res-vote-bar">
                          <div className="res-vote-bar__fill" style={{ width: `${((tally[item.id] ?? 0) / Math.max(1, votedCount)) * 100}%` }} />
                        </div>
                      </div>
                      <span className="res-vote-pct">{tally[item.id] ?? 0} votes</span>
                    </button>
                  ))}
                </div>

                <p className="res-modal__sub">Votes cast: {votedCount}/{memberIds.length}</p>

                <div className="res-modal__actions">
                  <button className="res-btn-ghost" onClick={simulateMemberVotes}>Simulate others voting</button>
                  <button className="res-btn-ghost" onClick={letToastChoose}>Let Toast Choose</button>
                  <button
                    className="res-btn-primary"
                    disabled={tieMode === "all" ? !allVoted || !tieResolved : !tieResolved}
                    onClick={finalizeTieBreak}
                  >
                    Finalize Winner
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className={`${baloo.className} res-root`} />}>
      <ResultPageContent />
    </Suspense>
  );
}
