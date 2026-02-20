"use client";

import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import { useSearchParams } from "next/navigation";
import "./waiting-room.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

type Member = {
  id: string;
  name: string;
  emoji: string;
  isHost: boolean;
  joined: boolean;
};

const INITIAL_MEMBERS: Member[] = [
  { id: "m1", name: "You (Host)", emoji: "🧑", isHost: true,  joined: true  },
  { id: "m2", name: "Sarah",      emoji: "👩", isHost: false, joined: true  },
  { id: "m3", name: "James",      emoji: "🧔", isHost: false, joined: false },
  { id: "m4", name: "Nat",        emoji: "👱", isHost: false, joined: false },
  { id: "m5", name: "Linda",      emoji: "🧕", isHost: false, joined: true  },
];

const TIME_MODES = [
  { id: "3m",  label: "3 min",  sub: "Quick pick" },
  { id: "5m",  label: "5 min",  sub: "Standard"   },
  { id: "15m", label: "15 min", sub: "Relaxed"     },
  { id: "all", label: "All Match", sub: "Everyone must swipe all" },
];

const GROUPS = [
  { id: "g1", name: "Friday Food Squad", emoji: "🍔", inviteToken: "friday-food-squad" },
  { id: "g2", name: "Work Lunch Crew", emoji: "🍱", inviteToken: "work-lunch-crew" },
  { id: "g3", name: "Weekend Foodies", emoji: "🍕", inviteToken: "weekend-foodies" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
    </svg>
  );
}

// ─── Countdown timer ──────────────────────────────────────────────────────────

function useCountdown(seconds: number, running: boolean) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, running]);
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function WaitingRoomContent() {
  const searchParams                  = useSearchParams();
  const inviteToken                   = searchParams.get("invite");
  const groupIdFromQuery              = searchParams.get("group");
  const matchedByInvite               = GROUPS.find((group) => group.inviteToken === inviteToken);
  const matchedByGroupId              = GROUPS.find((group) => group.id === groupIdFromQuery);
  const activeGroup                   = matchedByInvite ?? matchedByGroupId ?? GROUPS[0];
  const roomName                      = activeGroup.name;
  const roomEmoji                     = activeGroup.emoji;
  const shareLink                     = `https://toast.line.me/invite/${activeGroup.inviteToken}`;
  const joinedFromInviteLink          = Boolean(matchedByInvite);

  const [members, setMembers]       = useState<Member[]>(INITIAL_MEMBERS);
  const [timeMode, setTimeMode]     = useState("5m");
  const [started, setStarted]       = useState(false);
  const [countdown, setCountdown]   = useState(false);
  const [nudged, setNudged]         = useState<Set<string>>(new Set());
  const [copied, setCopied]         = useState(false);

  const isHost       = true; // "You" is always host in this prototype
  const joinedCount  = members.filter(m => m.joined).length;
  const totalCount   = members.length;
  const allJoined    = joinedCount === totalCount;
  const pendingMembers = members.filter(m => !m.joined);
  const timer        = useCountdown(5, countdown);

  // Simulate a member joining after 4s
  useEffect(() => {
    const t = setTimeout(() => {
      setMembers(prev => prev.map(m => m.id === "m3" ? { ...m, joined: true } : m));
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  function nudgeMember(id: string) {
    setNudged(prev => new Set(prev).add(id));
    setTimeout(() => setNudged(prev => { const n = new Set(prev); n.delete(id); return n; }), 2500);
  }

  function handleStart() {
    setCountdown(true);
    setTimeout(() => setStarted(true), 5500);
  }

  function handleCopyLink() {
    void navigator.clipboard?.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`${baloo.className} wr-root`}>
      <div className="wr-phone">

        {/* Status bar */}
        <div className="wr-status">
          <span>9:41</span>
          <span className="wr-battery" aria-hidden="true">
            <span className="wr-battery__level"/>
            <span className="wr-battery__cap"/>
          </span>
        </div>

        <div className="wr-body">

          {/* Header */}
          <div className="wr-header">
            <Link href="/game-setup" className="wr-back"><IconBack/></Link>
            <div>
              <p className="wr-header__label">Waiting Room</p>
              <h1 className="wr-header__title">{roomName} {roomEmoji}</h1>
            </div>
          </div>

          {/* Invite link */}
          <div className="wr-invite-row">
            <div className="wr-invite-code">
              <span className="wr-invite-code__label">Invite via LINE link</span>
              <span className="wr-invite-code__code">{shareLink}</span>
              <p className="wr-invite-hint">
                {joinedFromInviteLink
                  ? "Joined from LINE invite link. No room code required."
                  : "No room code required. Friends tap invite and join directly."}
              </p>
            </div>
            <button className="wr-share-btn" onClick={handleCopyLink}>
              <IconShare/>
              {copied ? "Copied!" : "Share to LINE"}
            </button>
          </div>

          {/* Member count */}
          <div className="wr-member-count">
            <span className="wr-member-count__text">
              {joinedCount}/{totalCount} joined
            </span>
            <div className="wr-member-count__bar">
              <motion.div
                className="wr-member-count__fill"
                animate={{ width: `${(joinedCount / totalCount) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Members grid */}
          <div className="wr-members">
            {members.map(m => (
              <motion.div
                key={m.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="wr-member"
              >
                <div className={`wr-member__avatar${m.joined ? " wr-member__avatar--joined" : ""}`}>
                  {m.emoji}
                  {m.isHost && <span className="wr-member__crown">👑</span>}
                  {!m.joined && (
                    <div className="wr-member__pending">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                        className="wr-member__spinner"
                      />
                    </div>
                  )}
                </div>
                <p className="wr-member__name">{m.name}</p>
                {!m.joined && isHost && (
                  <AnimatePresence>
                    {nudged.has(m.id) ? (
                      <motion.p
                        key="nudged"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="wr-member__nudged"
                      >
                        Nudged! 👋
                      </motion.p>
                    ) : (
                      <motion.button
                        key="nudge"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="wr-member__nudge-btn"
                        onClick={() => nudgeMember(m.id)}
                      >
                        Nudge
                      </motion.button>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          {/* Time mode selector */}
          <div className="wr-section">
            <p className="wr-label">Play Mode</p>
            <div className="wr-modes">
              {TIME_MODES.map(t => (
                <button
                  key={t.id}
                  disabled={started || countdown}
                  className={`wr-mode-btn${timeMode === t.id ? " wr-mode-btn--active" : ""}`}
                  onClick={() => setTimeMode(t.id)}
                >
                  <span className="wr-mode-btn__label">{t.label}</span>
                  <span className="wr-mode-btn__sub">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div style={{height: 80}}/>
        </div>

        {/* Footer */}
        <div className="wr-footer">
          {countdown && !started ? (
            <div className="wr-countdown">
              <motion.span
                key={timer}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="wr-countdown__time"
              >
                {timer}
              </motion.span>
              <span className="wr-countdown__label">Starting…</span>
            </div>
          ) : started ? (
            <Link href="/swipe?mode=group" className="wr-btn-primary">
              Game is Live → Swipe Now 🔥
            </Link>
          ) : isHost ? (
            <button
              className={`wr-btn-primary${!allJoined ? " wr-btn-primary--warn" : ""}`}
              onClick={handleStart}
            >
              {allJoined
                ? "Start Game →"
                : `Start anyway (${pendingMembers.length} not joined)`}
            </button>
          ) : (
            <div className="wr-waiting-text">Waiting for host to start…</div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function WaitingRoomPage() {
  return (
    <Suspense fallback={<div className={`${baloo.className} wr-root`} />}>
      <WaitingRoomContent />
    </Suspense>
  );
}
