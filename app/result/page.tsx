"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./result.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

type Screen = "top3" | "vote" | "winner";

// ─── Members ──────────────────────────────────────────────────────────────────

const MEMBERS: Record<string, { initials: string; color: string; name: string }> = {
  u1: { initials: "JT", color: "#f97316", name: "You"   },
  u2: { initials: "SA", color: "#3b82f6", name: "Sarah" },
  u3: { initials: "JM", color: "#22c55e", name: "James" },
  u4: { initials: "NT", color: "#a855f7", name: "Nat"   },
};

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

const TOP3: MenuItem[] = [
  {
    id: "m1",
    name: "Pad Thai",
    nameLocal: "ผัดไทย",
    cuisine: "Thai",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&q=80",
    accentColor: "#f97316",
    votes: [
      { userId: "u1", dir: "right" },
      { userId: "u2", dir: "up"    },
      { userId: "u3", dir: "right" },
      { userId: "u4", dir: "left"  },
    ],
    score: 5,
  },
  {
    id: "m2",
    name: "Korean BBQ",
    nameLocal: "บาร์บีคิว",
    cuisine: "Korean",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80",
    accentColor: "#ef4444",
    votes: [
      { userId: "u1", dir: "right" },
      { userId: "u2", dir: "right" },
      { userId: "u3", dir: "left"  },
      { userId: "u4", dir: "up"    },
    ],
    score: 5,
  },
  {
    id: "m3",
    name: "Sushi Set",
    nameLocal: "ซูชิ",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80",
    accentColor: "#3b82f6",
    votes: [
      { userId: "u1", dir: "left"  },
      { userId: "u2", dir: "right" },
      { userId: "u3", dir: "right" },
      { userId: "u4", dir: "right" },
    ],
    score: 3,
  },
];

const DIR_ICON: Record<string, string> = {
  right: "🔥",
  up:    "😍",
  left:  "😐",
};

const DIR_COLOR: Record<string, string> = {
  right: "#22c55e",
  up:    "#f97316",
  left:  "#ef4444",
};

// ─── Confetti ─────────────────────────────────────────────────────────────────

const FOOD_CONFETTI = ["🍜","🍕","🍣","🥩","🍛","🧆","🌮","🍔","🥗","🍱"];

function Confetti() {
  return (
    <div className="res-confetti" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <motion.span
          key={i}
          className="res-confetti__piece"
          initial={{ y: -20, x: (Math.random() - 0.5) * 220, opacity: 1, rotate: 0, scale: 0.7 }}
          animate={{
            y: 360,
            x: (Math.random() - 0.5) * 260,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
            scale: [0.7, 1.1, 0.8],
          }}
          transition={{ duration: 1.8 + Math.random() * 1.2, delay: Math.random() * 0.6, ease: "easeIn" }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          {FOOD_CONFETTI[i % FOOD_CONFETTI.length]}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Top3 screen ──────────────────────────────────────────────────────────────

function Top3Screen({ onVote }: { onVote: () => void }) {
  return (
    <>
      <div className="res-header">
        <p className="res-header__label">Results are in! 🎊</p>
        <h1 className="res-header__title">Top 3 Picks</h1>
        <p className="res-header__sub">It&apos;s a tie! Vote for your final pick.</p>
      </div>

      <div className="res-top3-list">
        {TOP3.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`res-top3-card${i === 0 ? " res-top3-card--first" : ""}`}
          >
            <div className="res-top3-card__rank">#{i + 1}</div>
            <div className="res-top3-card__thumb">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="52px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="res-top3-card__info">
              <p className="res-top3-card__name">{item.name}</p>
              <p className="res-top3-card__local">{item.nameLocal} · {item.cuisine}</p>
              <div className="res-top3-card__votes">
                {item.votes.map((v, j) => {
                  const member = MEMBERS[v.userId];
                  return (
                    <span
                      key={j}
                      className="res-vote-dot"
                      title={`${member?.name ?? v.userId}: ${v.dir}`}
                    >
                      <span
                        className="res-vote-dot__avatar"
                        style={{ background: member?.color ?? "#a1a1aa" }}
                      >
                        {member?.initials ?? "??"}
                      </span>
                      <span
                        className="res-vote-dot__dir"
                        style={{ background: DIR_COLOR[v.dir] }}
                      >
                        {DIR_ICON[v.dir]}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="res-top3-card__score">
              <span className="res-top3-card__score-val">{item.score}</span>
              <span className="res-top3-card__score-label">pts</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="res-footer">
        <button className="res-btn-primary" onClick={onVote}>
          Vote for Final Pick →
        </button>
        <Link href="/home-screen-v2" className="res-btn-ghost">Skip to Home</Link>
      </div>
    </>
  );
}

// ─── Vote screen ──────────────────────────────────────────────────────────────

function VoteScreen({ onDone }: { onDone: (id: string) => void }) {
  const [voted, setVoted] = useState("");
  const [voteCount, setVoteCount] = useState({ m1: 1, m2: 1, m3: 2 } as Record<string, number>);

  function castVote(id: string) {
    if (voted) return;
    setVoted(id);
    setVoteCount(prev => ({ ...prev, [id]: prev[id] + 1 }));
  }

  return (
    <>
      <div className="res-header">
        <p className="res-header__label">Tie-break vote 🗳️</p>
        <h1 className="res-header__title">Final Vote</h1>
        <p className="res-header__sub">One vote each — majority wins!</p>
      </div>

      <div className="res-vote-list">
        {TOP3.map(item => {
          const total    = Object.values(voteCount).reduce((a, b) => a + b, 0);
          const mine     = voteCount[item.id];
          const pct      = Math.round((mine / total) * 100);
          const isVoted  = voted === item.id;
          const anyVoted = !!voted;

          return (
            <motion.button
              key={item.id}
              onClick={() => castVote(item.id)}
              disabled={anyVoted}
              layout
              className={`res-vote-card${isVoted ? " res-vote-card--voted" : ""}${anyVoted && !isVoted ? " res-vote-card--dim" : ""}`}
            >
              <div className="res-vote-card__thumb">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="48px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="res-vote-card__info">
                <p className="res-vote-card__name">{item.name}</p>
                <div className="res-vote-bar">
                  <motion.div
                    className="res-vote-bar__fill"
                    animate={{ width: anyVoted ? `${pct}%` : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
              {anyVoted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="res-vote-pct"
                >
                  {pct}%
                </motion.span>
              )}
              {isVoted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="res-vote-check"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="res-footer">
        {voted ? (
          <button
            className="res-btn-primary"
            onClick={() => onDone(
              Object.entries(voteCount).sort((a,b) => b[1] - a[1])[0][0]
            )}
          >
            See Winner 🎉
          </button>
        ) : (
          <div className="res-waiting-text">Tap your pick above</div>
        )}
      </div>
    </>
  );
}

// ─── Winner screen ────────────────────────────────────────────────────────────

function WinnerScreen({ winnerId }: { winnerId: string }) {
  const winner = TOP3.find(m => m.id === winnerId) ?? TOP3[0];
  const [shared, setShared] = useState(false);

  return (
    <>
      <Confetti/>
      <div className="res-winner-screen">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 16 }}
          className="res-winner-img-wrap"
        >
          <Image
            src={winner.imageUrl}
            alt={winner.name}
            fill
            sizes="160px"
            style={{ objectFit: "cover" }}
            priority
          />
          <div
            className="res-winner-img-ring"
            style={{ boxShadow: `0 0 0 4px ${winner.accentColor}` }}
          />
        </motion.div>
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="res-winner-info"
        >
          <p className="res-winner-label">Tonight you&apos;re eating</p>
          <h1 className="res-winner-name">{winner.name}</h1>
          <p className="res-winner-local">{winner.nameLocal} · {winner.cuisine}</p>
        </motion.div>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="res-winner-actions"
        >
          <button
            className={`res-btn-line${shared ? " res-btn-line--sent" : ""}`}
            onClick={() => setShared(true)}
          >
            <svg viewBox="0 0 40 40" width="16" height="16">
              <rect width="40" height="40" rx="10" fill="#06C755"/>
              <path fill="#fff" d="M33.5 18.4c0-6.2-6.2-11.2-13.8-11.2S5.9 12.2 5.9 18.4c0 5.5 4.9 10.2 11.5 11.1.4.1 1.1.3 1.2.7.1.4 0 .9-.1 1.3l-.2 1c-.1.4-.3 1.5 1.3.8s8.6-5.1 11.7-8.7c2.2-2.4 3.2-4.8 3.2-6.2z"/>
            </svg>
            {shared ? "Sent to group! ✓" : "Share to LINE Group"}
          </button>

          <Link href="/map" className="res-btn-directions">
            🗺️ Find Nearby Restaurants
          </Link>

          <Link href="/home-screen-v2" className="res-btn-ghost">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ResultPage() {
  const [screen,   setScreen]   = useState<Screen>("top3");
  const [winnerId, setWinnerId] = useState("");

  return (
    <div className={`${baloo.className} res-root`}>
      <div className="res-phone">

        {/* Status bar */}
        <div className="res-status">
          <span>9:41</span>
          <span className="res-battery" aria-hidden="true">
            <span className="res-battery__level"/>
            <span className="res-battery__cap"/>
          </span>
        </div>

        {/* Step dots */}
        <div className="res-steps">
          {(["top3","vote","winner"] as Screen[]).map(s => (
            <div
              key={s}
              className={`res-step${screen === s ? " res-step--active" : ""}${
                (["top3","vote","winner"] as Screen[]).indexOf(s) <
                (["top3","vote","winner"] as Screen[]).indexOf(screen)
                  ? " res-step--done" : ""
              }`}
            />
          ))}
        </div>

        <div className="res-body">
          <AnimatePresence mode="wait">
            {screen === "top3" && (
              <motion.div key="top3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="res-screen">
                <Top3Screen onVote={() => setScreen("vote")} />
              </motion.div>
            )}
            {screen === "vote" && (
              <motion.div key="vote" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="res-screen">
                <VoteScreen onDone={(id) => { setWinnerId(id); setScreen("winner"); }} />
              </motion.div>
            )}
            {screen === "winner" && (
              <motion.div key="winner" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="res-screen">
                <WinnerScreen winnerId={winnerId} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
