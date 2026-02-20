"use client";

import Link from "next/link";
import { useState } from "react";
import { Baloo_2 } from "next/font/google";
import "./appointment.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// ─── Types ────────────────────────────────────────────────────────────────────

type AvailStatus = "avail" | "maybe" | "unavail";
type Screen = "setup" | "selection" | "result";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_GROUPS = [
  { id: "g1", name: "Friday Food Squad", emoji: "🍔", count: 5, source: "LINE Group" },
  { id: "g2", name: "Work Lunch Crew",   emoji: "🍱", count: 4, source: "LINE OA" },
  { id: "g3", name: "Weekend Foodies",   emoji: "🍕", count: 7, source: "LINE Group" },
];

// submitted = true means they've already submitted availability
const MEMBERS = [
  { id: "m1", emoji: "🧑", name: "You",   submitted: false },
  { id: "m2", emoji: "👩", name: "Sarah", submitted: true  },
  { id: "m3", emoji: "🧔", name: "James", submitted: true  },
  { id: "m4", emoji: "👱", name: "Nat",   submitted: false },
  { id: "m5", emoji: "🧕", name: "Linda", submitted: true  },
];

// Mock other members' avail keyed by date index mod pattern
const MEMBER_MOCK_PATTERNS: AvailStatus[][] = [
  ["avail", "avail", "maybe",  "avail",  "unavail"],
  ["avail", "maybe", "avail",  "avail",  "maybe"  ],
  ["avail", "avail", "unavail","avail",  "avail"  ],
];

const DOW    = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August",
                "September","October","November","December"];

const STATUS_COLOR: Record<AvailStatus, string> = {
  avail:   "#16a34a",
  maybe:   "#ca8a04",
  unavail: "#dc2626",
};
const STATUS_LABEL: Record<AvailStatus, string> = {
  avail:   "Available",
  maybe:   "Maybe",
  unavail: "Busy",
};

// ─── Calendar helpers ─────────────────────────────────────────────────────────

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number)    { return new Date(y, m, 1).getDay(); }
function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function parseKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function fmtShort(k: string) {
  return parseKey(k).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function fmtFull(k: string) {
  return parseKey(k).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"
         strokeLinecap="round" width="10" height="10">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" width="12" height="12">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function IconLine() {
  return (
    <svg viewBox="0 0 40 40" width="16" height="16">
      <rect width="40" height="40" rx="10" fill="#06C755"/>
      <path fill="#fff" d="M33.5 18.4c0-6.2-6.2-11.2-13.8-11.2S5.9 12.2 5.9 18.4c0 5.5 4.9 10.2 11.5 11.1.4.1 1.1.3 1.2.7.1.4 0 .9-.1 1.3l-.2 1c-.1.4-.3 1.5 1.3.8s8.6-5.1 11.7-8.7c2.2-2.4 3.2-4.8 3.2-6.2z"/>
    </svg>
  );
}

// ─── Screen 1: Setup ─────────────────────────────────────────────────────────

function SetupScreen({ onNext }: { onNext: (name: string, groupId: string, start: string, end: string) => void }) {
  const today = new Date();
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const [name,      setName]      = useState("");
  const [groupId,   setGroupId]   = useState("");
  const [start,     setStart]     = useState("");
  const [end,       setEnd]       = useState("");
  const [pickingFor,setPickingFor]= useState<"start"|"end"|null>(null);
  const [calYear,   setCalYear]   = useState(today.getFullYear());
  const [calMonth,  setCalMonth]  = useState(today.getMonth());

  const diff = start && end
    ? (parseKey(end).getTime() - parseKey(start).getTime()) / 86400000
    : null;
  const rangeError = diff !== null && (diff > 31 ? "Max 31 days." : diff < 0 ? "End must be after start." : "");
  const isValid    = name.trim() && groupId && start && end && !rangeError;

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay    = getFirstDay(calYear, calMonth);

  function clickDay(day: number) {
    const k = dateKey(calYear, calMonth, day);
    if (k < todayKey) return;
    if (pickingFor === "start") {
      setStart(k);
      if (end && end < k) setEnd("");
      setPickingFor("end");
    } else {
      if (k < start) { setStart(k); setEnd(""); }
      else { setEnd(k); setPickingFor(null); }
    }
  }

  function dayCls(day: number) {
    const k = dateKey(calYear, calMonth, day);
    const base = "apt-mini-cal__day";
    if (k < todayKey) return `${base} apt-mini-cal__day--past`;
    if (k === start && k === end) return `${base} apt-mini-cal__day--range-start apt-mini-cal__day--range-end`;
    if (k === start) return `${base} apt-mini-cal__day--range-start`;
    if (k === end)   return `${base} apt-mini-cal__day--range-end`;
    if (start && end && k > start && k < end) return `${base} apt-mini-cal__day--in-range`;
    if (k === todayKey) return `${base} apt-mini-cal__day--today`;
    return base;
  }

  function prevMonth() { calMonth === 0 ? (setCalMonth(11), setCalYear(y => y-1)) : setCalMonth(m => m-1); }
  function nextMonth() { calMonth === 11? (setCalMonth(0),  setCalYear(y => y+1)) : setCalMonth(m => m+1); }

  return (
    <>
      {/* Gradient header */}
      <div className="apt-header">
        <Link href="/home-screen-v2" className="apt-header__back"><IconBack /></Link>
        <div className="apt-header__text">
          <p className="apt-header__label">New Appointment</p>
          <h1 className="apt-header__title">Plan your squad 🗓️</h1>
        </div>
      </div>

      <div className="apt-steps">
        <div className="apt-step apt-step--active"/>
        <div className="apt-step"/>
        <div className="apt-step"/>
      </div>

      <div className="apt-content">
        {/* Name */}
        <div className="apt-field">
          <label className="apt-label">Appointment Name</label>
          <input className="apt-input" placeholder="e.g. Team Lunch, Friday Dinner…"
            value={name} onChange={e => setName(e.target.value)} maxLength={40}/>
        </div>

        {/* Group */}
        <div className="apt-field">
          <label className="apt-label">Group</label>
          <div className="apt-groups">
            {MOCK_GROUPS.map(g => (
              <button key={g.id}
                className={`apt-group-item${groupId === g.id ? " apt-group-item--selected" : ""}`}
                onClick={() => setGroupId(g.id)}>
                <div className="apt-group-item__avatar">{g.emoji}</div>
                <div className="apt-group-item__info">
                  <span className="apt-group-item__name">{g.name}</span>
                  <span className="apt-group-item__meta">{g.source} · {g.count} members</span>
                </div>
                <div className="apt-group-item__check">
                  {groupId === g.id && <IconCheck/>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div className="apt-field">
          <label className="apt-label">Date Range <span className="apt-label--note">(max 31 days)</span></label>
          <div className="apt-date-row">
            <button className={`apt-date-btn${pickingFor==="start"||(start&&!pickingFor)?" apt-date-btn--active":""}`}
              onClick={() => setPickingFor("start")}>
              <div className="apt-date-btn__label">Start</div>
              <div className={`apt-date-btn__val${!start?" apt-date-btn__val--empty":""}`}>
                {start ? fmtShort(start) : "Pick date"}
              </div>
            </button>
            <button className={`apt-date-btn${pickingFor==="end"||(end&&!pickingFor)?" apt-date-btn--active":""}`}
              onClick={() => setPickingFor("end")}>
              <div className="apt-date-btn__label">End</div>
              <div className={`apt-date-btn__val${!end?" apt-date-btn__val--empty":""}`}>
                {end ? fmtShort(end) : "Pick date"}
              </div>
            </button>
          </div>
          {rangeError && <p className="apt-date-error">⚠️ {rangeError}</p>}

          {pickingFor && (
            <div className="apt-mini-cal">
              <div className="apt-mini-cal__header">
                <button className="apt-mini-cal__nav" onClick={prevMonth}>‹</button>
                <span className="apt-mini-cal__month">{MONTHS[calMonth]} {calYear}</span>
                <button className="apt-mini-cal__nav" onClick={nextMonth}>›</button>
              </div>
              <div className="apt-mini-cal__grid">
                {DOW.map(d => <div key={d} className="apt-mini-cal__dow">{d}</div>)}
                {Array.from({length: firstDay}, (_,i) => (
                  <div key={`e${i}`} className="apt-mini-cal__day apt-mini-cal__day--empty"/>
                ))}
                {Array.from({length: daysInMonth}, (_,i) => {
                  const day = i+1;
                  const k   = dateKey(calYear, calMonth, day);
                  return (
                    <button key={day} className={dayCls(day)}
                      onClick={() => clickDay(day)} disabled={k < todayKey}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="apt-footer">
        <button className="apt-btn-primary" disabled={!isValid}
          onClick={() => onNext(name, groupId, start, end)}>
          Continue →
        </button>
      </div>
    </>
  );
}

// ─── Screen 2: Availability selection ────────────────────────────────────────

function SelectionScreen({ appointmentName, start, end, onBack, onSubmit }: {
  appointmentName: string;
  start: string;
  end: string;
  onBack: () => void;
  onSubmit: (av: Record<string, AvailStatus>) => void;
}) {
  const [calYear,   setCalYear]   = useState(parseKey(start).getFullYear());
  const [calMonth,  setCalMonth]  = useState(parseKey(start).getMonth());
  const [selected,  setSelected]  = useState<Set<string>>(new Set());
  const [avail,     setAvail]     = useState<Record<string, AvailStatus>>({});
  const [submitted, setSubmitted] = useState(false);

  // members who haven't submitted yet (excluding self since self just submitted)
  const pendingMembers = MEMBERS.filter(m => m.id !== "m1" && !m.submitted);

  function isInRange(k: string) { return k >= start && k <= end; }

  const dim  = getDaysInMonth(calYear, calMonth);
  const fd   = getFirstDay(calYear, calMonth);

  function toggleDay(day: number) {
    if (submitted) return;
    const k = dateKey(calYear, calMonth, day);
    if (!isInRange(k)) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  }

  function applyStatus(s: AvailStatus) {
    if (!selected.size) return;
    const update = { ...avail };
    selected.forEach(k => { update[k] = s; });
    setAvail(update);
    setSelected(new Set());
  }

  function cellCls(day: number) {
    const k = dateKey(calYear, calMonth, day);
    const cls = ["apt-cal__cell"];
    if (!isInRange(k))           cls.push("apt-cal__cell--out-range");
    if (selected.has(k))         cls.push("apt-cal__cell--selecting");
    if (avail[k] === "avail")    cls.push("apt-cal__cell--avail");
    if (avail[k] === "maybe")    cls.push("apt-cal__cell--maybe");
    if (avail[k] === "unavail")  cls.push("apt-cal__cell--unavail");
    if (submitted)               cls.push("apt-cal__cell--locked");
    return cls.join(" ");
  }

  function prevMonth() { calMonth===0?(setCalMonth(11),setCalYear(y=>y-1)):setCalMonth(m=>m-1); }
  function nextMonth() { calMonth===11?(setCalMonth(0),setCalYear(y=>y+1)):setCalMonth(m=>m+1); }

  function handleSubmit() {
    setSubmitted(true);
    setSelected(new Set());
    onSubmit(avail);
  }

  return (
    <>
      <div className="apt-header">
        <button className="apt-header__back" onClick={onBack}><IconBack/></button>
        <div className="apt-header__text">
          <p className="apt-header__label">{appointmentName}</p>
          <h1 className="apt-header__title">When are you free? 👀</h1>
        </div>
      </div>

      <div className="apt-steps">
        <div className="apt-step apt-step--done"/>
        <div className="apt-step apt-step--active"/>
        <div className="apt-step"/>
      </div>

      <div className="apt-content">
        {/* Submitted banner */}
        {submitted && (
          <div className="apt-submitted-banner">
            <IconLock/>
            <span>Availability submitted! Waiting for others…</span>
          </div>
        )}

        {!submitted && (
          <p className="apt-screen-sub">Tap dates to select, then mark your status.</p>
        )}

        {/* Legend */}
        <div className="apt-avail-legend">
          {(["avail","maybe","unavail"] as AvailStatus[]).map(s => (
            <div key={s} className="apt-avail-dot">
              <div className="apt-avail-dot__circle" style={{background: STATUS_COLOR[s]}}/>
              {STATUS_LABEL[s]}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className={`apt-cal${submitted?" apt-cal--locked":""}`}>
          <div className="apt-cal__header">
            <button className="apt-cal__nav" onClick={prevMonth} disabled={submitted}>‹</button>
            <span className="apt-cal__month">{MONTHS[calMonth]} {calYear}</span>
            <button className="apt-cal__nav" onClick={nextMonth} disabled={submitted}>›</button>
          </div>
          <div className="apt-cal__grid">
            {DOW.map(d => <div key={d} className="apt-cal__dow">{d}</div>)}
            {Array.from({length: fd}, (_,i) => (
              <div key={`e${i}`} className="apt-cal__cell apt-cal__cell--empty"/>
            ))}
            {Array.from({length: dim}, (_,i) => {
              const day = i+1;
              const k   = dateKey(calYear, calMonth, day);
              const st  = avail[k];
              return (
                <button key={day} className={cellCls(day)} onClick={() => toggleDay(day)}>
                  {day}
                  {st && <div className="apt-cal__cell__dot" style={{background: STATUS_COLOR[st]}}/>}
                  {!st && selected.has(k) && <div className="apt-cal__cell__dot" style={{background:"#7c3aed"}}/>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status picker */}
        {selected.size > 0 && !submitted && (
          <div>
            <p className="apt-label" style={{marginBottom:6}}>
              {selected.size} date{selected.size>1?"s":""} selected — mark as:
            </p>
            <div className="apt-status-bar">
              {(["avail","maybe","unavail"] as AvailStatus[]).map(s => (
                <button key={s} className={`apt-status-btn apt-status-btn--${s}`}
                  onClick={() => applyStatus(s)}>
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Members + nudge — nudge only targets pending members */}
        <div>
          <div className="flex items-center justify-between" style={{marginBottom:6}}>
            <span className="apt-label">Members ({MEMBERS.filter(m=>m.submitted).length}/{MEMBERS.length} submitted)</span>
            {pendingMembers.length > 0 && (
              <button className="apt-nudge-btn">
                Nudge {pendingMembers.map(m=>m.emoji).join("")} 👋
              </button>
            )}
          </div>
          <div className="apt-members">
            {MEMBERS.map(m => (
              <div key={m.id} className="apt-member-wrap" title={`${m.name}${m.submitted?" · Submitted":" · Pending"}`}>
                <div className={`apt-member-avatar${m.submitted?" apt-member-avatar--done":""}`}>
                  {m.emoji}
                </div>
                <div className={`apt-member-status-dot apt-member-status-dot--${m.submitted?"done":"pending"}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="apt-footer">
        {!submitted ? (
          <button className="apt-btn-primary" disabled={!Object.keys(avail).length}
            onClick={handleSubmit}>
            Submit Availability ✓
          </button>
        ) : (
          <button className="apt-btn-primary" onClick={() => onSubmit(avail)}>
            View Results →
          </button>
        )}
      </div>
    </>
  );
}

// ─── Screen 3: Result ─────────────────────────────────────────────────────────

function ResultScreen({ appointmentName, start, end, availability, onHome }: {
  appointmentName: string;
  start: string;
  end: string;
  availability: Record<string, AvailStatus>;
  onHome: () => void;
}) {
  // Build all dates in range
  const allDates: string[] = [];
  for (let d = new Date(parseKey(start)); d <= parseKey(end); d.setDate(d.getDate()+1)) {
    allDates.push(dateKey(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  // Deterministic mock avail for other 4 members (seeded by date index)
  const scored = allDates.map((key, idx) => {
    const myStatus = availability[key] ?? "unavail";
    const others: AvailStatus[] = MEMBER_MOCK_PATTERNS.map(p => p[idx % p.length]);
    const all: AvailStatus[] = [myStatus, ...others];
    const availCount = all.filter(s => s === "avail").length;
    const maybeCount = all.filter(s => s === "maybe").length;
    const total      = all.length;
    const availPct   = availCount / total;
    const softPct    = (availCount + maybeCount) / total;
    return { key, availCount, maybeCount, total, availPct, softPct, all };
  });

  // Tier 1: everyone available
  const tier1 = scored.filter(d => d.availPct === 1);
  // Tier 2: ≥70% available
  const tier2 = scored.filter(d => d.availPct >= 0.7 && d.availPct < 1);
  // Tier 3: available+maybe fallback (≥70% combined) — only shown if no tier1/2
  const tier3 = scored.filter(d => d.softPct >= 0.7 && d.availPct < 0.7);

  const bestDates   = tier1.length ? tier1 : tier2.length ? tier2 : tier3;
  const tierLabel   = tier1.length ? "Everyone is available 🎉" : tier2.length ? "70%+ available 🙌" : tier3.length ? "Best possible (maybe counts) 🤞" : "";
  const hasBest     = bestDates.length > 0;
  const memberEmojis= ["🧑","👩","🧔","👱","🧕"];

  return (
    <>
      <div className="apt-header apt-header--result">
        <span style={{width:32}}/>
        <div className="apt-header__text" style={{textAlign:"center"}}>
          <p className="apt-header__label">{appointmentName}</p>
          <h1 className="apt-header__title">{hasBest ? "Results are in! 🎊" : "No match found 😅"}</h1>
        </div>
        <span style={{width:32}}/>
      </div>

      <div className="apt-steps">
        <div className="apt-step apt-step--done"/>
        <div className="apt-step apt-step--done"/>
        <div className="apt-step apt-step--active"/>
      </div>

      <div className="apt-content">
        {hasBest ? (
          <>
            <div className="apt-tier-badge">{tierLabel}</div>
            <div className="apt-result-dates">
              {bestDates.slice(0,3).map((d, i) => (
                <div key={d.key} className={`apt-result-date${i===0?" apt-result-date--best":""}`}>
                  <div className="apt-result-date__left">
                    {i === 0 && <span className="apt-result-date__badge">Best pick</span>}
                    <div className="apt-result-date__day">{fmtFull(d.key)}</div>
                    <div className="apt-result-date__avail">
                      ✅ {d.availCount} available
                      {d.maybeCount > 0 && <span style={{color:"#ca8a04"}}> · 🤔 {d.maybeCount} maybe</span>}
                    </div>
                  </div>
                  <div className="apt-result-date__avatars">
                    {d.all.map((s, j) => (
                      <div key={j} className="apt-result-avatar"
                        style={{background: STATUS_COLOR[s]+"22", border:`1.5px solid ${STATUS_COLOR[s]}`}}>
                        {memberEmojis[j]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Show other tiers as secondary if tier1 was hit */}
            {tier1.length > 0 && tier2.length > 0 && (
              <div>
                <p className="apt-label" style={{marginBottom:6}}>Also good (70%+)</p>
                {tier2.slice(0,2).map(d => (
                  <div key={d.key} className="apt-result-date apt-result-date--secondary">
                    <div className="apt-result-date__day" style={{fontSize:11}}>{fmtFull(d.key)}</div>
                    <div className="apt-result-date__avail">{d.availCount}/{d.total} free</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="apt-no-match">
            <div className="apt-no-match__emoji">📅</div>
            <p className="apt-no-match__title">No date matched</p>
            <p className="apt-no-match__sub">No date reached 70% availability. Try a wider date range or fewer constraints.</p>
            {/* Show closest anyway */}
            <div className="apt-result-dates" style={{marginTop:10}}>
              {scored.sort((a,b) => b.softPct - a.softPct).slice(0,2).map(d => (
                <div key={d.key} className="apt-result-date">
                  <div className="apt-result-date__day">{fmtFull(d.key)}</div>
                  <div className="apt-result-date__avail" style={{color:"#9ca3af"}}>{d.availCount}/{d.total} available</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="apt-footer" style={{display:"flex",flexDirection:"column",gap:8}}>
        <button className="apt-share-btn">
          <IconLine/>
          Share to LINE Group
        </button>
        <button className="apt-home-btn" onClick={onHome}>Back to Home</button>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AppointmentSetupPage() {
  const [screen,   setScreen]   = useState<Screen>("setup");
  const [aptName,  setAptName]  = useState("");
  const [start,    setStart]    = useState("");
  const [end,      setEnd]      = useState("");
  const [avail,    setAvail]    = useState<Record<string, AvailStatus>>({});

  return (
    <div className={`${baloo.className} apt-root`}>
      <div className="apt-phone">
        <div className="apt-status">
          <span>9:41</span>
          <span className="apt-battery" aria-hidden="true">
            <span className="apt-battery__level"/>
            <span className="apt-battery__cap"/>
          </span>
        </div>
        <div className="apt-body">
          {screen === "setup" && (
            <SetupScreen onNext={(name, _gid, s, e) => {
              setAptName(name); setStart(s); setEnd(e);
              setScreen("selection");
            }}/>
          )}
          {screen === "selection" && (
            <SelectionScreen
              appointmentName={aptName} start={start} end={end}
              onBack={() => setScreen("setup")}
              onSubmit={av => { setAvail(av); setScreen("result"); }}
            />
          )}
          {screen === "result" && (
            <ResultScreen
              appointmentName={aptName} start={start} end={end} availability={avail}
              onHome={() => { setScreen("setup"); setAvail({}); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
