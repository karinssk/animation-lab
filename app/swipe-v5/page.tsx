"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./swipe-v5.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

type SwipeDirection = "left" | "right" | "up";

type FoodCard = {
  id: string;
  name: string;
  image: string;
  hearts: number;
  flames: number;
  subtitle: string;
  tags: string[];
};

type Spot = {
  id: string;
  name: string;
  hearts: number;
  flames: number;
  distance: string;
  image: string;
};

const TASTE_DOTS = ["#ff6b39", "#f9c736", "#f3d13c", "#f6dc5f", "#ff6b39"];

const SWIPE_CARDS: FoodCard[] = [
  {
    id: "pad-thai",
    name: "Pad Thai",
    hearts: 4,
    flames: 5,
    subtitle: "Street food",
    tags: ["Street food", "Spoonsood"],
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=80",
  },
  {
    id: "boat-noodles",
    name: "Boat Noodles",
    hearts: 5,
    flames: 4,
    subtitle: "Thai noodles",
    tags: ["Noodles", "Rich broth"],
    image: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=1200&q=80",
  },
  {
    id: "green-curry",
    name: "Green Curry",
    hearts: 4,
    flames: 5,
    subtitle: "Coconut curry",
    tags: ["Thai curry", "Spicy"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80",
  },
  {
    id: "som-tam",
    name: "Som Tam",
    hearts: 4,
    flames: 3,
    subtitle: "Papaya salad",
    tags: ["Fresh", "Crunchy"],
    image: "https://images.unsplash.com/photo-1648421331147-9fcfab29536e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "khao-soi",
    name: "Khao Soi",
    hearts: 5,
    flames: 5,
    subtitle: "Northern Thai",
    tags: ["Curry noodle", "Chiang Mai"],
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=1200&q=80",
  },
];

const SPOT_PREVIEW: Spot[] = [
  {
    id: "see-fah",
    name: "See Fah",
    hearts: 4,
    flames: 5,
    distance: "400 m",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&q=80",
  },
  {
    id: "thipsamai",
    name: "Thipsamai Pratoopee",
    hearts: 5,
    flames: 5,
    distance: "1.3 km",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=80",
  },
];

const SPOT_MENU: Spot[] = [
  ...SPOT_PREVIEW,
  {
    id: "baan-padthai",
    name: "Baan Padthai",
    hearts: 4,
    flames: 4,
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1617622141573-33b5d65dca8f?w=1200&q=80",
  },
  {
    id: "fai-ta-lu",
    name: "Padthai Fai Ta Lu",
    hearts: 5,
    flames: 4,
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1200&q=80",
  },
  {
    id: "savoey-street",
    name: "Savoey Street",
    hearts: 3,
    flames: 5,
    distance: "2.4 km",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=1200&q=80",
  },
];

const SWIPE_THRESHOLD = 118;
const SWIPE_VELOCITY = 920;
const PEEK_LOCK_TRIGGER = -56;
const PEEK_LOCK_OFFSET = -94;
const CLOSE_PEEK_TRIGGER = 52;

function rotateDeck(items: FoodCard[]) {
  if (items.length <= 1) return items;
  return [...items.slice(1), items[0]];
}

function IconHeartSolid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.4-8.1c-2-2.9-1.2-6.5 1.7-8.2 2.3-1.3 4.7-.7 6.3 1 1.6-1.7 4-2.3 6.3-1 2.9 1.7 3.7 5.3 1.7 8.2C18.7 16.7 12 21 12 21z" />
    </svg>
  );
}

function IconFlame({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.3 2.4c.6 2.2-.1 3.7-1.6 5.4-1 1.2-1.8 2.2-1.8 3.8 0 1.8 1.4 3.1 3.1 3.1 2.4 0 4.2-2.1 4.2-4.5 0-1.1-.3-2.1-.8-3.2 2.2 1.2 3.8 3.7 3.8 6.5 0 4.1-3.2 7.3-7.2 7.3s-7.2-3.2-7.2-7.2c0-2.9 1.7-5.4 4.1-6.7-.4 1-.6 1.7-.6 2.6 0 1.4.8 2.5 2 2.5 1 0 2-.8 2-2.1 0-1.1-.8-2-1.4-2.8-1.1-1.2-1.8-2.2-1.6-4.7z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M15 4.5L7.5 12 15 19.5" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg viewBox="0 0 12 10" fill="currentColor" aria-hidden="true">
      <rect x="0" y="6" width="2" height="4" rx="0.5" />
      <rect x="3" y="4" width="2" height="6" rx="0.5" />
      <rect x="6" y="2" width="2" height="8" rx="0.5" />
      <rect x="9" y="0" width="2" height="10" rx="0.5" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg viewBox="0 0 16 12" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M1 4.6C4.8 1.2 11.2 1.2 15 4.6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.7 7.2c2.6-2.3 6-2.3 8.6 0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.7 9.7c.8-.7 1.8-.7 2.6 0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="0.7" y="1.2" width="16.2" height="7.5" rx="1.7" strokeWidth="1.4" />
      <rect x="2.3" y="2.7" width="10.8" height="4.5" rx="0.8" fill="currentColor" stroke="none" />
      <rect x="17.6" y="3.5" width="1.7" height="2.9" rx="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.8c-2.8 0-5 2.2-5 5 0 3.3 2.9 6.5 5 9.1 2.1-2.6 5-5.8 5-9.1 0-2.8-2.2-5-5-5z" fill="#f7c42f" />
      <circle cx="10" cy="7.8" r="2" fill="#fff5cb" />
    </svg>
  );
}

function IconStreetPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#5BD89C" />
      <path d="M6.3 11.2h1.7V7.1H6.8V5.8h4.6c1.8 0 3 .8 3 2.5 0 1.5-1 2.3-2.5 2.5v.1l1 3h-1.8l-.9-2.8H8v2.8H6.3v-2.7zM8 9.9h2.4c.8 0 1.3-.3 1.3-1.1s-.5-1-1.3-1H8v2.1z" fill="#ffffff" />
    </svg>
  );
}

export default function SwipeV5Page() {
  const [cards, setCards] = useState<FoodCard[]>(SWIPE_CARDS);
  const [previewSwipe, setPreviewSwipe] = useState<SwipeDirection | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isPeekLocked, setIsPeekLocked] = useState(false);
  const [isSpotMenuOpen, setIsSpotMenuOpen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-240, 0, 240], [-14, 0, 14]);
  const passOpacity = useTransform(x, [-170, -70, -18], [1, 0.65, 0]);
  const yesOpacity = useTransform(x, [18, 70, 170], [0, 0.65, 1]);
  const hotOpacity = useTransform(y, [-170, -70, -18], [1, 0.65, 0]);

  const upReveal = useTransform(y, [-220, 0], [1, 0]);
  const behindOpacity = useTransform(upReveal, [0, 0.35, 1], [0, 0.5, 1]);
  const behindTranslate = useTransform(upReveal, [0, 1], [18, 0]);
  const behindScale = useTransform(upReveal, [0, 1], [0.985, 1]);

  const currentCard = cards[0];
  const nextCard = cards[1] ?? cards[0];
  const visibleSpots = isSpotMenuOpen ? SPOT_MENU : SPOT_PREVIEW;

  const resetCard = useCallback(() => {
    animate(x, 0, { type: "spring", stiffness: 380, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 380, damping: 30 });
    setPreviewSwipe(null);
    setIsPeekLocked(false);
    setIsSpotMenuOpen(false);
  }, [x, y]);

  const commitSwipe = useCallback(
    async (direction: SwipeDirection) => {
      if (isAnimatingOut) return;
      setIsAnimatingOut(true);
      setIsPeekLocked(false);
      setIsSpotMenuOpen(false);
      setPreviewSwipe(direction);

      let targetX = 0;
      let targetY = 0;
      if (direction === "left") {
        targetX = -440;
        targetY = 40;
      } else if (direction === "right") {
        targetX = 440;
        targetY = 40;
      } else {
        targetX = 0;
        targetY = -500;
      }

      const animX = animate(x, targetX, { duration: 0.28, ease: "easeOut" });
      const animY = animate(y, targetY, { duration: 0.28, ease: "easeOut" });
      await Promise.all([animX.finished, animY.finished]);

      setCards((prev) => rotateDeck(prev));
      x.set(0);
      y.set(0);
      setPreviewSwipe(null);
      setIsAnimatingOut(false);
    },
    [isAnimatingOut, x, y]
  );

  const onDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isAnimatingOut) return;
      const { x: dx, y: dy } = info.offset;
      if (dy < -72 && Math.abs(dy) > Math.abs(dx) * 0.95) {
        setPreviewSwipe("up");
        return;
      }
      if (dx <= -72) {
        setPreviewSwipe("left");
        return;
      }
      if (dx >= 72) {
        setPreviewSwipe("right");
        return;
      }
      setPreviewSwipe(null);
    },
    [isAnimatingOut]
  );

  const onDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isAnimatingOut) return;

      const totalX = x.get();
      const totalY = y.get();
      const verticalDominant = Math.abs(info.offset.y) > Math.abs(info.offset.x) * 1.05;
      const shouldUp =
        ((info.offset.y < -SWIPE_THRESHOLD && verticalDominant) || totalY < -SWIPE_THRESHOLD) ||
        info.velocity.y < -SWIPE_VELOCITY;
      if (shouldUp) {
        void commitSwipe("up");
        return;
      }

      const shouldLeft =
        info.offset.x < -SWIPE_THRESHOLD || totalX < -SWIPE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY;
      if (shouldLeft) {
        void commitSwipe("left");
        return;
      }

      const shouldRight =
        info.offset.x > SWIPE_THRESHOLD || totalX > SWIPE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY;
      if (shouldRight) {
        void commitSwipe("right");
        return;
      }

      const shouldPeekLock = verticalDominant && totalY <= PEEK_LOCK_TRIGGER;
      if (shouldPeekLock) {
        animate(x, 0, { type: "spring", stiffness: 380, damping: 30 });
        animate(y, PEEK_LOCK_OFFSET, { type: "spring", stiffness: 380, damping: 30 });
        setPreviewSwipe("up");
        setIsPeekLocked(true);
        return;
      }

      if (isPeekLocked) {
        const shouldClosePeek = verticalDominant && info.offset.y > CLOSE_PEEK_TRIGGER;
        if (shouldClosePeek) {
          resetCard();
          return;
        }

        animate(x, 0, { type: "spring", stiffness: 380, damping: 30 });
        animate(y, PEEK_LOCK_OFFSET, { type: "spring", stiffness: 380, damping: 30 });
        setPreviewSwipe("up");
        return;
      }

      resetCard();
    },
    [commitSwipe, isAnimatingOut, isPeekLocked, resetCard, x, y]
  );

  return (
    <div className={`${baloo.className} sv5-root`}>
      <div className="sv5-shell">
        <div className="sv5-phone">
          <div className="sv5-notch" aria-hidden="true" />

          <header className="sv5-status">
            <span className="sv5-time">9:41</span>
            <div className="sv5-status-right">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </div>
          </header>

          <section className="sv5-swipe-layer">
            <div className="sv5-top-tools">
              <button type="button" className="sv5-top-back" aria-label="Back">
                <IconBack />
              </button>
              <button type="button" className="sv5-top-filter" aria-label="Filter">
                <IconFilter />
                <strong>Filter</strong>
              </button>
            </div>

            <div className="sv5-card-shell">
              <div className="sv5-white-layer" aria-hidden="true" />

              <motion.div
                className={`sv5-behind-layer ${isPeekLocked ? "is-peek-active" : ""} ${isSpotMenuOpen ? "is-expanded" : ""}`}
                style={{ opacity: behindOpacity, y: behindTranslate, scale: behindScale }}
              >
                <div className="sv5-behind-head">
                  <p className="sv5-behind-title">Thai spots for {currentCard.name}</p>
                  <button
                    type="button"
                    className="sv5-behind-toggle"
                    onClick={() => setIsSpotMenuOpen((prev) => !prev)}
                  >
                    {isSpotMenuOpen ? "Less" : "More menu"}
                  </button>
                </div>
                <p className="sv5-behind-hint">Swipe up a bit to peek, tap a card to open full menu.</p>
                <div className={`sv5-behind-list ${isSpotMenuOpen ? "is-expanded" : ""}`}>
                  {visibleSpots.map((spot) => (
                    <button
                      type="button"
                      className="sv5-behind-card"
                      key={spot.id}
                      onClick={() => setIsSpotMenuOpen(true)}
                    >
                      <div className="sv5-behind-image">
                        <Image src={spot.image} alt={spot.name} fill sizes="(max-width: 768px) 68vw, 420px" />
                        <div className="sv5-behind-votes">
                          <span><IconHeartSolid /> +{spot.hearts}</span>
                          <span><IconFlame /> +{spot.flames}</span>
                        </div>
                      </div>
                      <div className="sv5-behind-body">
                        <p className="sv5-behind-name">{spot.name}</p>
                        <p className="sv5-behind-distance"><IconPin /> {spot.distance}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.article
                key={`under-${nextCard.id}`}
                className="sv5-under-card"
                aria-hidden="true"
                initial={{ opacity: 0.78, scale: 0.965 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="sv5-under-hero">
                  <Image src={nextCard.image} alt={nextCard.name} fill sizes="(max-width: 768px) 72vw, 440px" />
                </div>
                <div className="sv5-under-body">
                  <p className="sv5-under-name">{nextCard.name}</p>
                  <p className="sv5-under-meta">{nextCard.subtitle}</p>
                </div>
              </motion.article>

              <motion.article
                key={`top-${currentCard.id}`}
                className="sv5-card"
                drag={!isAnimatingOut}
                dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                dragElastic={0.18}
                dragMomentum={false}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                initial={{ scale: 0.96, opacity: 0.88 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.85 }}
                style={{ x, y, rotate }}
              >
                <motion.span className="sv5-swipe-badge sv5-swipe-badge--pass" style={{ opacity: passOpacity }}>
                  Pass
                </motion.span>
                <motion.span className="sv5-swipe-badge sv5-swipe-badge--hot" style={{ opacity: hotOpacity }}>
                  Hot
                </motion.span>
                <motion.span className="sv5-swipe-badge sv5-swipe-badge--yes" style={{ opacity: yesOpacity }}>
                  Yes
                </motion.span>

                <div className="sv5-chip-row">
                  <span className="sv5-chip sv5-chip--love">
                    <IconHeartSolid className="sv5-chip-heart" />
                    <strong>+{currentCard.hearts}</strong>
                  </span>
                  <span className="sv5-chip sv5-chip--hot">
                    <IconFlame className="sv5-chip-flame" />
                    <strong>+{currentCard.flames}</strong>
                  </span>
                </div>

                <div className="sv5-hero">
                  <Image src={currentCard.image} alt={currentCard.name} fill sizes="(max-width: 768px) 78vw, 440px" priority />
                </div>

                <div className="sv5-card-body">
                  <h1>{currentCard.name}</h1>
                  <div className="sv5-dots" aria-hidden="true">
                    {TASTE_DOTS.map((color, index) => (
                      <span key={`${color}-${index}`} style={{ background: color }} />
                    ))}
                  </div>
                  <p className="sv5-meta">
                    <IconStreetPin />
                    {currentCard.subtitle}
                  </p>
                  <div className="sv5-tags">
                    {currentCard.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </div>

            <footer className="sv5-actions">
              <div className="sv5-action-item">
                <button
                  type="button"
                  className={`sv5-action sv5-action--close ${previewSwipe === "left" ? "is-active" : ""}`}
                  aria-label="Pass"
                  onClick={() => void commitSwipe("left")}
                >
                  <IconClose />
                </button>
                <span className="sv5-action-label">Pass</span>
              </div>
              <div className="sv5-action-item">
                <button
                  type="button"
                  className={`sv5-action sv5-action--hot ${previewSwipe === "up" ? "is-active" : ""}`}
                  aria-label="Hot"
                  onClick={() => void commitSwipe("up")}
                >
                  <IconFlame />
                </button>
                <span className="sv5-action-label">Hot</span>
              </div>
              <div className="sv5-action-item">
                <button
                  type="button"
                  className={`sv5-action sv5-action--love ${previewSwipe === "right" ? "is-active" : ""}`}
                  aria-label="Yes"
                  onClick={() => void commitSwipe("right")}
                >
                  <IconHeartSolid />
                </button>
                <span className="sv5-action-label">Yes</span>
              </div>
            </footer>
          </section>

          <div className="sv5-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
