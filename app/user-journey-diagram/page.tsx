"use client";

import Link from "next/link";
import { Baloo_2 } from "next/font/google";
import "./user-journey-diagram.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

type JourneyFlow = {
  id: string;
  title: string;
  goal: string;
  notes?: string;
  steps: string[];
};

type RequirementGroup = {
  id: string;
  title: string;
  source: "vendor" | "additional";
  anchors: string[];
  items: string[];
};

type TraceRow = {
  id: string;
  source: "vendor" | "additional";
  ref: string;
  requirement: string;
  mappedFlow: string;
  status: "mapped" | "partial";
};

const FLOWS: JourneyFlow[] = [
  {
    id: "group-core",
    title: "Group Core Flow",
    goal: "Create room, swipe together, reach one shared result.",
    notes: "Vendor path: Home -> Game Setup -> Waiting Room -> Swipe -> Result",
    steps: ["Home", "Game Setup", "Waiting Room", "Swipe", "Result"],
  },
  {
    id: "solo-core",
    title: "Solo Core Flow",
    goal: "Single player can skip waiting and go straight to decision flow.",
    notes: "Vendor path: Single player -> Swipe directly or via setup -> Result",
    steps: ["Home", "Game Setup (Solo)", "Swipe", "Result"],
  },
  {
    id: "shortcut",
    title: "Shortcut / Explore Flow",
    goal: "Fast entry with preset constraints and fewer clicks.",
    notes: "Vendor path: Home shortcut/explore -> Swipe (setup may be skipped) -> Result",
    steps: ["Home Shortcut / Explore", "Swipe (Preset Filters)", "Result"],
  },
  {
    id: "appointment",
    title: "Appointment Flow",
    goal: "Collect availability and pick best date/time for group.",
    notes: "Vendor path: Appointment Setup -> Appointment Selection -> Appointment Result",
    steps: ["Appointment Setup", "Appointment Selection", "Appointment Result"],
  },
];

const REQUIREMENT_GROUPS: RequirementGroup[] = [
  {
    id: "v-ia",
    title: "IA and Main Routes",
    source: "vendor",
    anchors: ["VENDOR §4", "VENDOR §10"],
    items: [
      "Home, Explore, Map, Current Game, Appointment, Profile",
      "Group route: Home -> Setup -> Waiting -> Swipe -> Result",
      "Shortcut route: Home shortcut/explore -> Swipe -> Result",
      "Solo route: Single player -> Swipe -> Result",
      "Appointment route: Setup -> Selection -> Result",
    ],
  },
  {
    id: "v-screens-core",
    title: "Core Game Screens",
    source: "vendor",
    anchors: ["VENDOR §5.1", "VENDOR §5.3", "VENDOR §5.4", "VENDOR §5.5", "VENDOR §5.7"],
    items: [
      "Home with banner, entries, trending, game shortcut, current game card",
      "Game setup with solo/group, room config, mode, filters, include preferences",
      "Waiting room with members, countdown, host-only controls, nudge",
      "Swipe with mode indicator, filters, invite/end-game, gestures, timer, match feedback",
      "Result with top results, winner, voter breakdown, tie-break popup, share to LINE group",
    ],
  },
  {
    id: "v-screens-support",
    title: "Map and Detail Screens",
    source: "vendor",
    anchors: ["VENDOR §5.2", "VENDOR §5.6"],
    items: [
      "Map search, filters, pins, zoom/pan, pin-to-detail flow",
      "Restaurant detail with menu highlights, promotions, locations, share/save, reservation CTA",
      "Directions and share actions must have supported fallback flows",
    ],
  },
  {
    id: "v-appointment",
    title: "Appointment Screens",
    source: "vendor",
    anchors: ["VENDOR §5.8", "VENDOR §5.9", "VENDOR §5.10"],
    items: [
      "Setup with group source behavior and date range max 31 days",
      "Selection calendar with Available/Maybe/Unavailable + multi-select + submit",
      "Result deterministic logic (everyone available, >=70%, fallback maybe) + LINE notify",
    ],
  },
  {
    id: "v-crosscut",
    title: "Cross-Cutting Rules",
    source: "vendor",
    anchors: ["VENDOR §6", "VENDOR §7", "VENDOR §8"],
    items: [
      "Host-only actions and participant role boundaries",
      "Realtime sync for members, timers, swipe aggregation, tie-break and results",
      "LINE touchpoints: invite, nudge, result share, appointment updates",
      "Constraint inheritance from entry point and locked dimensions",
      "Minimum entities/events + mobile-first + failure fallback + performance target",
    ],
  },
  {
    id: "a-user-app",
    title: "User App Detailed Features",
    source: "additional",
    anchors: ["ADDITIONAL A1-A8"],
    items: [
      "A1 onboarding/login via LINE + location permission fallback",
      "A2 home/discover with first-time explanation and continue-session behavior",
      "A3 swipe discovery with quick filters, save/unsave, menu-to-restaurant drilldown",
      "A4 group room invite/waiting/countdown/result sync and nudge",
      "A5 top3/final vote/share to LINE group with synchronized final result",
      "A6 explore/map/detail/directions + deep link direction option",
      "A7 saved list flow and optional swipe-saved mode",
      "A8 profile/settings, basic gamification, feature toggle",
    ],
  },
  {
    id: "a-user-flows",
    title: "End-User Operational Flows",
    source: "additional",
    anchors: ["ADDITIONAL U0-U4", "ADDITIONAL H1-H3"],
    items: [
      "U0 first entry flow from LINE rich menu/invite",
      "U1 solo play end-to-end with result and directions/share",
      "U2 join group via invite link and synchronized result",
      "U3 saved tab behavior",
      "U4 explore/map/detail/search/filter path",
      "H1 create room and share invite",
      "H2 waiting-room host management and start countdown",
      "H3 post-final restaurant selection and share to group",
    ],
  },
  {
    id: "a-ops",
    title: "Partner/Admin/Platform Foundations",
    source: "additional",
    anchors: ["ADDITIONAL B1-B5", "ADDITIONAL C1-C7", "ADDITIONAL D"],
    items: [
      "Partner portal: register/login, restaurant CRUD, menu CRUD, promo, sponsored request",
      "Admin backoffice: moderation, curation, promotions, manual notification campaign, analytics, support tools",
      "Foundation: auth/roles, event logging, feature toggles, scheduling, API caching/rate limits",
    ],
  },
];

const SHOW_TRACEABILITY = false;

const TRACE_ROWS: TraceRow[] = [
  { id: "V-IA-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:62", requirement: "Group route Home -> Setup -> Waiting -> Swipe -> Result", mappedFlow: "Group Core", status: "mapped" },
  { id: "V-IA-02", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:63", requirement: "Shortcut/explore route to Swipe -> Result", mappedFlow: "Shortcut / Explore", status: "mapped" },
  { id: "V-IA-03", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:64", requirement: "Single player route to Swipe -> Result", mappedFlow: "Solo Core", status: "mapped" },
  { id: "V-APP-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:67", requirement: "Appointment Setup -> Selection -> Result route", mappedFlow: "Appointment", status: "mapped" },
  { id: "V-LINE-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:120-122", requirement: "LINE group/OA source behavior + no room code join", mappedFlow: "Group Core", status: "mapped" },
  { id: "V-WAIT-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:148-159", requirement: "Waiting room join guidance + nudge behavior", mappedFlow: "Group Core", status: "mapped" },
  { id: "V-SWIPE-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:166-199", requirement: "Swipe required UI/behavior/acceptance", mappedFlow: "Group Core / Solo", status: "mapped" },
  { id: "V-RESULT-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:221-240", requirement: "Result top ranks + tie-break + share + end game", mappedFlow: "Group Core / Solo", status: "mapped" },
  { id: "V-CROSS-01", source: "vendor", ref: "VENDOR_UX_UI_IMPLEMENTATION_SPEC.md:314", requirement: "LINE sharing/notification touchpoints", mappedFlow: "All Flows", status: "mapped" },
  { id: "A-FB-01", source: "additional", ref: "additional-requirement.MD:2-3", requirement: "Join by LINE invite + swipe quick filters", mappedFlow: "Group Core / Swipe", status: "mapped" },
  { id: "A-A3-01", source: "additional", ref: "additional-requirement.MD:41-47", requirement: "Swipe discovery with save and menu-card to restaurant list", mappedFlow: "Solo / Group Swipe", status: "mapped" },
  { id: "A-A4-01", source: "additional", ref: "additional-requirement.MD:48-54", requirement: "Group room invite, waiting, countdown, result sync", mappedFlow: "Group Core", status: "mapped" },
  { id: "A-A5-01", source: "additional", ref: "additional-requirement.MD:56-61", requirement: "Match -> Top3 -> Final vote -> Share LINE group", mappedFlow: "Result Flow", status: "mapped" },
  { id: "A-U1-01", source: "additional", ref: "additional-requirement.MD:158-169", requirement: "Detailed solo operational flow", mappedFlow: "Solo Core", status: "mapped" },
  { id: "A-U2-01", source: "additional", ref: "additional-requirement.MD:171-182", requirement: "Detailed member join-from-link group flow", mappedFlow: "Group Core", status: "mapped" },
  { id: "A-H1-01", source: "additional", ref: "additional-requirement.MD:201-208", requirement: "Host create/share room flow", mappedFlow: "Group Core", status: "mapped" },
  { id: "A-H3-01", source: "additional", ref: "additional-requirement.MD:216-222", requirement: "Post-final restaurant selection + group share", mappedFlow: "Result + Map", status: "mapped" },
  { id: "A-OPS-01", source: "additional", ref: "additional-requirement.MD:86-136", requirement: "Partner/Admin/Foundation capabilities", mappedFlow: "Operations Layer", status: "partial" },
];

function JourneyMapSvg({ idPrefix }: { idPrefix: string }) {
  const arrowId = `${idPrefix}-arrow`;

  return (
    <svg className="uj-map-svg" viewBox="0 0 1020 620" role="img" aria-label="User journey flowchart">
      <defs>
        <marker id={arrowId} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#f97316" />
        </marker>
      </defs>

      <rect x="40" y="60" width="170" height="56" rx="16" className="uj-svg-node uj-svg-node--start" />
      <text x="125" y="94" className="uj-svg-label">Home</text>

      <rect x="260" y="50" width="190" height="70" rx="14" className="uj-svg-node" />
      <text x="355" y="82" className="uj-svg-label">Game Setup</text>
      <text x="355" y="102" className="uj-svg-sub">Single or Group</text>

      <rect x="500" y="50" width="190" height="70" rx="14" className="uj-svg-node" />
      <text x="595" y="82" className="uj-svg-label">Waiting Room</text>
      <text x="595" y="102" className="uj-svg-sub">Group only</text>

      <rect x="740" y="50" width="160" height="70" rx="14" className="uj-svg-node uj-svg-node--action" />
      <text x="820" y="82" className="uj-svg-label">Swipe</text>
      <text x="820" y="102" className="uj-svg-sub">Group mode</text>

      <rect x="930" y="50" width="70" height="70" rx="14" className="uj-svg-node uj-svg-node--end" />
      <text x="965" y="92" className="uj-svg-label">Result</text>

      <rect x="500" y="180" width="190" height="70" rx="14" className="uj-svg-node uj-svg-node--action" />
      <text x="595" y="212" className="uj-svg-label">Swipe</text>
      <text x="595" y="232" className="uj-svg-sub">Solo mode</text>

      <rect x="740" y="180" width="160" height="70" rx="14" className="uj-svg-node uj-svg-node--end" />
      <text x="820" y="222" className="uj-svg-label">Result</text>

      <rect x="260" y="320" width="190" height="70" rx="14" className="uj-svg-node" />
      <text x="355" y="350" className="uj-svg-label">Shortcut / Explore</text>
      <text x="355" y="370" className="uj-svg-sub">Preset filters</text>

      <rect x="500" y="320" width="190" height="70" rx="14" className="uj-svg-node uj-svg-node--action" />
      <text x="595" y="350" className="uj-svg-label">Swipe</text>
      <text x="595" y="370" className="uj-svg-sub">Setup may skip</text>

      <rect x="740" y="320" width="160" height="70" rx="14" className="uj-svg-node uj-svg-node--end" />
      <text x="820" y="362" className="uj-svg-label">Result</text>

      <rect x="260" y="470" width="190" height="70" rx="14" className="uj-svg-node" />
      <text x="355" y="502" className="uj-svg-label">Appointment Setup</text>
      <text x="355" y="522" className="uj-svg-sub">Date range + group</text>

      <rect x="500" y="470" width="190" height="70" rx="14" className="uj-svg-node" />
      <text x="595" y="502" className="uj-svg-label">Appointment Selection</text>
      <text x="595" y="522" className="uj-svg-sub">Mark availability</text>

      <rect x="740" y="470" width="160" height="70" rx="14" className="uj-svg-node uj-svg-node--end" />
      <text x="820" y="512" className="uj-svg-label">Appointment Result</text>

      <path d="M210 88 L260 88" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M450 85 L500 85" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M690 85 L740 85" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M900 85 L930 85" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />

      <path d="M450 110 L470 180 L500 215" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M690 215 L740 215" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />

      <path d="M210 105 L250 320 L260 355" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M450 355 L500 355" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M690 355 L740 355" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />

      <path d="M210 110 L250 470 L260 505" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M450 505 L500 505" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
      <path d="M690 505 L740 505" className="uj-svg-edge" markerEnd={`url(#${arrowId})`} />
    </svg>
  );
}

function RequirementCoverage() {
  return (
    <section className="uj-coverage">
      <div className="uj-card__head">
        <h2>Detailed Requirement Coverage</h2>
        <span className="uj-badge">Spec Map</span>
      </div>
      <p className="uj-goal">This maps detailed requirement groups from both documents to the journey design.</p>

      <div className="uj-req-list">
        {REQUIREMENT_GROUPS.map((group) => (
          <article key={group.id} className={`uj-req uj-req--${group.source}`}>
            <div className="uj-req__head">
              <h3>{group.title}</h3>
              <span className="uj-req__source">{group.source === "vendor" ? "Vendor" : "Additional"}</span>
            </div>
            <p className="uj-req__anchors">{group.anchors.join(" | ")}</p>
            <ul className="uj-req__items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function TraceabilityTable() {
  return (
    <section className="uj-trace">
      <div className="uj-card__head">
        <h2>Requirement Traceability</h2>
        <span className="uj-badge">Line-by-Line</span>
      </div>
      <p className="uj-goal">Each row ties one requirement reference line to a mapped journey flow.</p>

      <div className="uj-trace-wrap">
        <table className="uj-trace-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Source</th>
              <th>Line Ref</th>
              <th>Requirement</th>
              <th>Mapped Flow</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TRACE_ROWS.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.source === "vendor" ? "Vendor" : "Additional"}</td>
                <td><code>{row.ref}</code></td>
                <td>{row.requirement}</td>
                <td>{row.mappedFlow}</td>
                <td>
                  <span className={`uj-trace-status uj-trace-status--${row.status}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function UserJourneyDiagramPage() {
  return (
    <div className={`${baloo.className} uj-root`}>
      <section className="uj-desktop">
        <header className="uj-desktop__head">
          <div>
            <p className="uj-kicker">Product Blueprint</p>
            <h1 className="uj-title">User Journey Diagram</h1>
            <p className="uj-sub">Presentation version: full-width journey map for planning and review.</p>
          </div>
          <Link href="/home-screen-v2" className="uj-back uj-back--desktop">Back to Home</Link>
        </header>

        <div className="uj-desktop__board">
          <JourneyMapSvg idPrefix="desktop" />
        </div>

        <RequirementCoverage />
        {SHOW_TRACEABILITY && <TraceabilityTable />}
      </section>

      <div className="uj-phone">
        <div className="uj-status">
          <span>9:41</span>
          <span className="uj-battery" aria-hidden="true">
            <span className="uj-battery__level" />
            <span className="uj-battery__cap" />
          </span>
        </div>

        <div className="uj-content">
          <div className="uj-head">
            <p className="uj-kicker">Product Blueprint</p>
            <h1 className="uj-title">User Journey Diagram</h1>
            <p className="uj-sub">ภาพรวมว่าแต่ละ flow เดินอย่างไร ตั้งแต่เข้าใช้งานจนจบผลลัพธ์</p>
          </div>

          <section className="uj-master">
            <div className="uj-card__head">
              <h2>Master Journey Map</h2>
              <span className="uj-badge">Diagram</span>
            </div>
            <p className="uj-goal">Main branches: Group game, Solo game, Shortcut/Explore, and Appointment.</p>

            <div className="uj-map-wrap">
              <JourneyMapSvg idPrefix="mobile" />
            </div>
          </section>

          <div className="uj-list">
            {FLOWS.map((flow) => (
              <section key={flow.id} className="uj-card">
                <div className="uj-card__head">
                  <h2>{flow.title}</h2>
                  <span className="uj-badge">Flow</span>
                </div>
                <p className="uj-goal">{flow.goal}</p>
                {flow.notes && <p className="uj-notes">{flow.notes}</p>}

                <div className="uj-track" aria-label={`${flow.title} journey`}>
                  {flow.steps.map((step, idx) => (
                    <div key={`${flow.id}-${step}`} className="uj-node-wrap">
                      <div className="uj-node">{step}</div>
                      {idx < flow.steps.length - 1 && <span className="uj-arrow">-&gt;</span>}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <RequirementCoverage />
          {SHOW_TRACEABILITY && <TraceabilityTable />}

          <div className="uj-foot">
            <Link href="/home-screen-v2" className="uj-back">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
