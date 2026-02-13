"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// SVG FOOD ICON COMPONENTS
// ============================================================

// ---- USA FOOD ----

function BurgerIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      {/* Top bun */}
      <path d="M8 18 Q8 8 20 8 Q32 8 32 18Z" fill="#D97706" />
      <ellipse cx="14" cy="13" rx="1.5" ry="1" fill="#FDE68A" />
      <ellipse cx="22" cy="11" rx="1.5" ry="1" fill="#FDE68A" />
      <ellipse cx="27" cy="14" rx="1.5" ry="1" fill="#FDE68A" />
      {/* Lettuce */}
      <path d="M6 18 Q10 22 14 18 Q18 22 22 18 Q26 22 30 18 Q34 22 34 19 L6 19Z" fill="#22C55E" />
      {/* Cheese */}
      <path d="M7 20 L33 20 L35 23 L5 23Z" fill="#FCD34D" />
      {/* Patty */}
      <rect x="8" y="23" width="24" height="5" fill="#92400E" rx="2" />
      {/* Bottom bun */}
      <path d="M8 28 L32 28 Q32 34 20 34 Q8 34 8 28Z" fill="#D97706" />
    </svg>
  );
}

function PizzaIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {/* Crust edge */}
      <path d="M16 2 L30 28 Q16 32 2 28Z" fill="#D97706" />
      {/* Cheese */}
      <path d="M16 5 L28 27 Q16 30 4 27Z" fill="#FCD34D" />
      {/* Pepperoni */}
      <circle cx="14" cy="18" r="2.5" fill="#DC2626" />
      <circle cx="20" cy="22" r="2.5" fill="#DC2626" />
      <circle cx="17" cy="12" r="2" fill="#DC2626" />
      {/* Basil */}
      <ellipse cx="10" cy="23" rx="2" ry="1.2" fill="#16A34A" transform="rotate(-20 10 23)" />
    </svg>
  );
}

function FriesIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 36">
      {/* Fries sticking out */}
      <rect x="8" y="2" width="3" height="18" rx="1" fill="#FCD34D" transform="rotate(-8 9 10)" />
      <rect x="13" y="1" width="3" height="19" rx="1" fill="#FBBF24" />
      <rect x="18" y="2" width="3" height="18" rx="1" fill="#FCD34D" transform="rotate(5 19 10)" />
      <rect x="22" y="4" width="3" height="16" rx="1" fill="#F59E0B" transform="rotate(10 23 12)" />
      {/* Red container */}
      <path d="M4 16 L28 16 L26 34 Q16 36 6 34Z" fill="#DC2626" />
      <path d="M4 16 L28 16 L27 20 L5 20Z" fill="#EF4444" />
    </svg>
  );
}

function HotDogIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 20">
      {/* Bottom bun */}
      <path d="M3 12 Q3 18 18 18 Q33 18 33 12Z" fill="#D97706" />
      {/* Sausage */}
      <ellipse cx="18" cy="11" rx="15" ry="5" fill="#B45309" />
      <ellipse cx="18" cy="10" rx="14" ry="4" fill="#D97706" />
      {/* Mustard zigzag */}
      <path d="M6 10 L9 8 L12 10 L15 8 L18 10 L21 8 L24 10 L27 8 L30 10" stroke="#FCD34D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Top bun */}
      <path d="M3 12 Q3 6 18 6 Q33 6 33 12" fill="#D97706" />
      <path d="M5 11 Q5 7 18 7 Q31 7 31 11" fill="#E8A317" />
    </svg>
  );
}

function DonutIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {/* Donut body */}
      <circle cx="16" cy="16" r="14" fill="#D97706" />
      {/* Icing */}
      <path d="M4 14 Q4 3 16 3 Q28 3 28 14 Q26 18 16 17 Q6 18 4 14Z" fill="#EC4899" />
      {/* Hole */}
      <circle cx="16" cy="14" r="5" fill="#FEF3C7" />
      {/* Sprinkles */}
      <rect x="8" y="8" width="3" height="1.5" rx="0.5" fill="#3B82F6" transform="rotate(30 9 8)" />
      <rect x="20" y="7" width="3" height="1.5" rx="0.5" fill="#22C55E" transform="rotate(-20 21 7)" />
      <rect x="12" y="5" width="3" height="1.5" rx="0.5" fill="#F59E0B" transform="rotate(45 13 5)" />
      <rect x="22" y="12" width="3" height="1.5" rx="0.5" fill="#EF4444" transform="rotate(-40 23 12)" />
      <rect x="7" y="13" width="3" height="1.5" rx="0.5" fill="#A855F7" transform="rotate(15 8 13)" />
    </svg>
  );
}

// ---- CHINESE FOOD ----

function DumplingIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28">
      {/* Body */}
      <ellipse cx="16" cy="18" rx="14" ry="9" fill="#FEF3C7" />
      <ellipse cx="16" cy="18" rx="14" ry="9" fill="none" stroke="#D97706" strokeWidth="1" />
      {/* Pleats on top */}
      <path d="M5 14 Q8 8 11 12 Q14 6 16 12 Q18 6 21 12 Q24 8 27 14" stroke="#D97706" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Cute face */}
      <circle cx="12" cy="19" r="1.2" fill="#92400E" />
      <circle cx="20" cy="19" r="1.2" fill="#92400E" />
      <path d="M14 22 Q16 24 18 22" stroke="#92400E" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="9" cy="21" r="1.5" fill="#FECACA" opacity="0.6" />
      <circle cx="23" cy="21" r="1.5" fill="#FECACA" opacity="0.6" />
    </svg>
  );
}

function NoodleBowlIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 36">
      {/* Chopsticks */}
      <rect x="26" y="1" width="1.5" height="20" rx="0.5" fill="#D97706" transform="rotate(15 27 10)" />
      <rect x="29" y="1" width="1.5" height="20" rx="0.5" fill="#B45309" transform="rotate(25 30 10)" />
      {/* Noodles peeking out */}
      <path d="M10 14 Q12 10 14 14 Q16 10 18 14" stroke="#FCD34D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 13 Q20 9 22 13 Q24 9 26 13" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Bowl */}
      <path d="M2 16 L38 16 L34 32 Q20 36 6 32Z" fill="#EF4444" />
      <path d="M2 16 L38 16 L37 20 L3 20Z" fill="#DC2626" />
      {/* Bowl pattern */}
      <path d="M10 24 L14 22 L18 24 L22 22 L26 24 L30 22" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

function FortuneCookieIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28">
      {/* Cookie body */}
      <path d="M4 16 Q4 4 16 8 Q28 4 28 16 Q28 24 16 20 Q4 24 4 16Z" fill="#F59E0B" />
      <path d="M4 16 Q4 4 16 8 Q28 4 28 16" fill="#FBBF24" />
      {/* Crack line */}
      <path d="M14 10 Q16 16 18 10" stroke="#D97706" strokeWidth="1" fill="none" />
      {/* Fortune paper */}
      <rect x="10" y="13" width="14" height="3" rx="0.5" fill="white" transform="rotate(-5 16 14)" />
    </svg>
  );
}

function BaoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {/* Bao body */}
      <ellipse cx="16" cy="20" rx="13" ry="10" fill="#FEF3C7" />
      <ellipse cx="16" cy="20" rx="13" ry="10" fill="none" stroke="#E5E7EB" strokeWidth="0.8" />
      {/* Top swirl */}
      <path d="M13 12 Q16 8 19 12" stroke="#D1D5DB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="10" r="1.5" fill="#FEF3C7" stroke="#D1D5DB" strokeWidth="0.8" />
      {/* Cute face */}
      <circle cx="12" cy="21" r="1" fill="#78716C" />
      <circle cx="20" cy="21" r="1" fill="#78716C" />
      <path d="M14 24 Q16 26 18 24" stroke="#78716C" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ---- THAI FOOD ----

function TomYumIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 34">
      {/* Steam */}
      <path d="M12 6 Q14 2 12 0" stroke="#D1D5DB" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M18 4 Q20 0 18 -2" stroke="#D1D5DB" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M24 6 Q26 2 24 0" stroke="#D1D5DB" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Bowl */}
      <path d="M2 12 L34 12 L30 30 Q18 34 6 30Z" fill="#F97316" />
      <path d="M2 12 L34 12 L33 16 L3 16Z" fill="#FB923C" />
      {/* Soup */}
      <ellipse cx="18" cy="14" rx="15" ry="3" fill="#FDE68A" />
      {/* Shrimp */}
      <path d="M12 18 Q14 14 18 16 Q16 20 12 18Z" fill="#FB923C" />
      {/* Chili & herbs */}
      <ellipse cx="22" cy="17" rx="2" ry="0.8" fill="#DC2626" transform="rotate(-30 22 17)" />
      <circle cx="26" cy="19" r="1.5" fill="#16A34A" opacity="0.7" />
      <circle cx="10" cy="20" r="1" fill="#16A34A" opacity="0.7" />
    </svg>
  );
}

function PadThaiIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      {/* Plate */}
      <ellipse cx="16" cy="22" rx="15" ry="8" fill="#E5E7EB" />
      <ellipse cx="16" cy="21" rx="13" ry="6.5" fill="#F3F4F6" />
      {/* Noodles */}
      <path d="M8 18 Q12 14 16 18 Q20 14 24 18" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M10 20 Q14 16 18 20 Q22 16 24 19" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Shrimp on top */}
      <path d="M14 16 Q16 13 18 15" stroke="#FB923C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Lime wedge */}
      <path d="M22 16 L26 14 L24 18Z" fill="#22C55E" />
      {/* Peanuts */}
      <circle cx="10" cy="17" r="1" fill="#D97706" />
      <circle cx="12" cy="16" r="0.8" fill="#B45309" />
    </svg>
  );
}

function MangoRiceIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28">
      {/* Mango */}
      <path d="M4 10 Q2 4 8 2 Q16 0 18 6 Q20 14 14 16 Q6 16 4 10Z" fill="#FBBF24" />
      <path d="M4 10 Q2 4 8 2 Q16 0 18 6" fill="#FCD34D" />
      {/* Sticky rice */}
      <ellipse cx="24" cy="18" rx="7" ry="5" fill="#FEF3C7" />
      <ellipse cx="24" cy="17" rx="6" ry="4" fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
      {/* Coconut drizzle */}
      <path d="M20 16 Q22 14 24 16 Q26 14 28 16" stroke="white" strokeWidth="1" fill="none" opacity="0.8" />
    </svg>
  );
}

function ChiliIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 28">
      {/* Stem */}
      <path d="M8 6 Q6 4 8 2 Q10 0 9 2 Q12 4 8 6Z" fill="#16A34A" />
      {/* Chili body */}
      <path d="M5 6 Q3 14 4 20 Q5 26 8 26 Q11 26 12 20 Q13 14 11 6Z" fill="#DC2626" />
      <path d="M6 7 Q5 14 6 18 Q7 22 8 22" stroke="#EF4444" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function SatayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 36">
      {/* Stick */}
      <rect x="6" y="16" width="2" height="18" rx="0.5" fill="#D97706" />
      {/* Meat pieces */}
      <rect x="3" y="2" width="8" height="5" rx="2" fill="#B45309" />
      <rect x="3" y="8" width="8" height="5" rx="2" fill="#D97706" />
      <rect x="3" y="14" width="8" height="5" rx="2" fill="#B45309" />
      {/* Grill marks */}
      <line x1="4" y1="4" x2="10" y2="4" stroke="#92400E" strokeWidth="0.5" />
      <line x1="4" y1="10" x2="10" y2="10" stroke="#92400E" strokeWidth="0.5" />
    </svg>
  );
}

// ---- FALLING FOOD ITEM ----

function FallingFoodIcon({ size = 30, variant = 0 }: { size?: number; variant?: number }) {
  const foods = [
    // Dumpling (simple)
    <svg key="d" width={size} height={size} viewBox="0 0 30 24">
      <ellipse cx="15" cy="15" rx="13" ry="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
      <path d="M5 12 Q8 7 11 11 Q14 7 15 11 Q18 7 21 11 Q24 7 27 12" stroke="#D97706" strokeWidth="1" fill="none" />
    </svg>,
    // Burger (simple)
    <svg key="b" width={size} height={size} viewBox="0 0 30 26">
      <path d="M5 12 Q5 4 15 4 Q25 4 25 12Z" fill="#D97706" />
      <rect x="4" y="12" width="22" height="3" fill="#22C55E" rx="1" />
      <rect x="5" y="15" width="20" height="4" fill="#92400E" rx="1.5" />
      <path d="M5 19 L25 19 Q25 24 15 24 Q5 24 5 19Z" fill="#D97706" />
    </svg>,
    // Sushi roll
    <svg key="s" width={size} height={size} viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#1F2937" />
      <circle cx="14" cy="14" r="10" fill="white" />
      <circle cx="14" cy="14" r="7" fill="#FB923C" />
      <circle cx="14" cy="14" r="4" fill="#EF4444" />
    </svg>,
  ];
  return foods[variant % foods.length];
}

// ============================================================
// ELEMENT DEFINITIONS
// ============================================================

interface DecorativeItem {
  id: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  floatX: number;
  floatY: number;
  duration: number;
  entryFrom: { x: number; y: number };
  exitTo: { x: number; y: number };
}

const DECORATIVE_ITEMS: DecorativeItem[] = [
  // USA food
  { id: "burger", icon: <BurgerIcon size={42} />, x: 30, y: 6, floatX: 10, floatY: 12, duration: 5.0, entryFrom: { x: 30, y: -25 }, exitTo: { x: 30, y: -30 } },
  { id: "pizza", icon: <PizzaIcon size={28} />, x: 75, y: 18, floatX: 10, floatY: 14, duration: 4.2, entryFrom: { x: 120, y: -10 }, exitTo: { x: 125, y: -15 } },
  { id: "fries", icon: <FriesIcon size={26} />, x: 5, y: 42, floatX: 12, floatY: 14, duration: 3.3, entryFrom: { x: -20, y: 42 }, exitTo: { x: -25, y: 50 } },
  { id: "hotdog", icon: <HotDogIcon size={28} />, x: 58, y: 55, floatX: 10, floatY: 10, duration: 4.5, entryFrom: { x: 120, y: 55 }, exitTo: { x: 125, y: 60 } },
  { id: "donut", icon: <DonutIcon size={26} />, x: 82, y: 5, floatX: 14, floatY: 10, duration: 4.0, entryFrom: { x: 120, y: 5 }, exitTo: { x: 125, y: -10 } },
  // Chinese food
  { id: "dumpling", icon: <DumplingIcon size={32} />, x: 10, y: 8, floatX: 12, floatY: 16, duration: 3.5, entryFrom: { x: -20, y: -15 }, exitTo: { x: -25, y: -20 } },
  { id: "noodle", icon: <NoodleBowlIcon size={42} />, x: 62, y: 2, floatX: 8, floatY: 12, duration: 3.7, entryFrom: { x: 62, y: -20 }, exitTo: { x: 120, y: -15 } },
  { id: "fortune", icon: <FortuneCookieIcon size={24} />, x: 48, y: 3, floatX: 8, floatY: 12, duration: 3.8, entryFrom: { x: 48, y: -20 }, exitTo: { x: 48, y: -25 } },
  { id: "bao", icon: <BaoIcon size={28} />, x: 80, y: 38, floatX: 10, floatY: 14, duration: 3.6, entryFrom: { x: 120, y: 38 }, exitTo: { x: 125, y: 42 } },
  // Thai food
  { id: "tomyum", icon: <TomYumIcon size={36} />, x: 3, y: 22, floatX: 10, floatY: 12, duration: 4.3, entryFrom: { x: -20, y: 22 }, exitTo: { x: -25, y: 18 } },
  { id: "padthai", icon: <PadThaiIcon size={28} />, x: 28, y: 32, floatX: 12, floatY: 10, duration: 4.1, entryFrom: { x: -20, y: 32 }, exitTo: { x: -25, y: 28 } },
  { id: "mango", icon: <MangoRiceIcon size={28} />, x: 72, y: 12, floatX: 10, floatY: 14, duration: 4.0, entryFrom: { x: 120, y: 12 }, exitTo: { x: 125, y: 8 } },
  { id: "chili", icon: <ChiliIcon size={22} />, x: 20, y: 4, floatX: 8, floatY: 12, duration: 3.5, entryFrom: { x: -20, y: 4 }, exitTo: { x: -25, y: -10 } },
  { id: "satay", icon: <SatayIcon size={26} />, x: 50, y: 38, floatX: 12, floatY: 10, duration: 3.9, entryFrom: { x: 120, y: 38 }, exitTo: { x: 50, y: -20 } },
  { id: "chili2", icon: <ChiliIcon size={18} />, x: 15, y: 55, floatX: 8, floatY: 10, duration: 4.4, entryFrom: { x: -20, y: 55 }, exitTo: { x: -25, y: 60 } },
  { id: "mango2", icon: <MangoRiceIcon size={22} />, x: 42, y: 48, floatX: 10, floatY: 12, duration: 3.8, entryFrom: { x: 42, y: -20 }, exitTo: { x: -25, y: 48 } },
  { id: "bao2", icon: <BaoIcon size={24} />, x: 25, y: 60, floatX: 8, floatY: 10, duration: 4.6, entryFrom: { x: -20, y: 60 }, exitTo: { x: -25, y: 65 } },
  { id: "donut2", icon: <DonutIcon size={20} />, x: 85, y: 52, floatX: 10, floatY: 8, duration: 4.1, entryFrom: { x: 120, y: 52 }, exitTo: { x: 125, y: 55 } },
  { id: "fortune2", icon: <FortuneCookieIcon size={20} />, x: 68, y: 58, floatX: 8, floatY: 12, duration: 3.7, entryFrom: { x: 120, y: 58 }, exitTo: { x: 125, y: 62 } },
];

interface FallingItem {
  id: string;
  x: number;
  delay: number;
  fallDuration: number;
  size: number;
  variant: number; // 0=dumpling, 1=burger, 2=sushi
}

const FALLING_FOODS: FallingItem[] = [
  // Wave 1 — phase 4
  { id: "ff1", x: 30, delay: 0, fallDuration: 2.2, size: 30, variant: 0 },
  { id: "ff2", x: 62, delay: 0.4, fallDuration: 2.0, size: 26, variant: 1 },
  { id: "ff3", x: 48, delay: 0.8, fallDuration: 2.5, size: 22, variant: 2 },
  // Wave 2 — phase 5
  { id: "ff4", x: 18, delay: 2.0, fallDuration: 1.8, size: 28, variant: 1 },
  { id: "ff5", x: 75, delay: 2.3, fallDuration: 2.0, size: 24, variant: 0 },
  { id: "ff6", x: 42, delay: 2.6, fallDuration: 2.3, size: 30, variant: 2 },
  { id: "ff7", x: 55, delay: 3.0, fallDuration: 1.9, size: 20, variant: 0 },
  // Wave 3 — phase 6
  { id: "ff8", x: 12, delay: 4.0, fallDuration: 1.6, size: 26, variant: 2 },
  { id: "ff9", x: 35, delay: 4.2, fallDuration: 1.8, size: 32, variant: 1 },
  { id: "ff10", x: 68, delay: 4.4, fallDuration: 1.5, size: 22, variant: 0 },
  { id: "ff11", x: 85, delay: 4.6, fallDuration: 2.0, size: 28, variant: 2 },
  { id: "ff12", x: 25, delay: 4.8, fallDuration: 1.4, size: 24, variant: 1 },
  { id: "ff13", x: 52, delay: 5.0, fallDuration: 1.7, size: 20, variant: 0 },
];

// ============================================================
// PHASE TIMING
// ============================================================

const PHASE_DURATIONS: Record<number, number> = {
  1: 2500,
  2: 2500,
  3: 2500,
  4: 2000,
  5: 2000,
  6: 2000,
  7: 2000,
};

const CENTER_X = 45;
const CENTER_Y = 32;

// ============================================================
// SUB-COMPONENTS
// ============================================================

function FloatingElement({ item, phase }: { item: DecorativeItem; phase: number }) {
  // Converge toward center in phases 2 & 3
  let targetX = item.x;
  let targetY = item.y;
  if (phase === 2) {
    targetX = item.x + (CENTER_X - item.x) * 0.25;
    targetY = item.y + (CENTER_Y - item.y) * 0.25;
  } else if (phase === 3) {
    targetX = item.x + (CENTER_X - item.x) * 0.45;
    targetY = item.y + (CENTER_Y - item.y) * 0.45;
  }

  return (
    <motion.div
      style={{ position: "absolute" }}
      initial={{
        left: `${item.entryFrom.x}%`,
        top: `${item.entryFrom.y}%`,
        opacity: 0,
        scale: 0.3,
      }}
      animate={{
        left: `${targetX}%`,
        top: `${targetY}%`,
        opacity: 1,
        scale: 1,
      }}
      exit={{
        left: `${item.exitTo.x}%`,
        top: `${item.exitTo.y}%`,
        opacity: 0,
        scale: 0.3,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Inner div handles continuous floating oscillation */}
      <motion.div
        animate={{
          x: [0, item.floatX, -item.floatX * 0.6, item.floatX * 0.8, 0],
          y: [0, -item.floatY, item.floatY * 0.6, -item.floatY * 0.4, 0],
          rotate: [0, 6, -4, 8, 0],
        }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {item.icon}
      </motion.div>
    </motion.div>
  );
}

function FallingFood({ item }: { item: FallingItem }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${item.x}%`,
      }}
      initial={{ top: "-10%", opacity: 0 }}
      animate={{ top: "110%", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        top: {
          duration: item.fallDuration,
          delay: item.delay,
          repeat: Infinity,
          ease: [0.45, 0, 0.85, 1], // accelerating fall
        },
        opacity: {
          duration: 0.3,
          delay: item.delay,
        },
      }}
    >
      <motion.div
        animate={{ rotate: [0, 15, -10, 20, 0], x: [-3, 5, -4, 3, -3] }}
        transition={{ duration: item.fallDuration * 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FallingFoodIcon size={item.size} variant={item.variant} />
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function WalletAnimation() {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let currentPhase = 1;
    let timeoutId: ReturnType<typeof setTimeout>;

    const advancePhase = () => {
      currentPhase = currentPhase >= 7 ? 1 : currentPhase + 1;
      setPhase(currentPhase);
      timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
    };

    timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[1]);
    return () => clearTimeout(timeoutId);
  }, []);

  const showDecorative = phase <= 2 || phase === 7;
  const showCoins = phase >= 3 && phase <= 6;
  const showText = phase !== 3;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone Mockup */}
      <div
        className="relative rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl"
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

        {/* Animation Area — covers ~60% of phone screen */}
        <div
          className="absolute left-0 right-0 top-[34px] overflow-hidden rounded-t-[2.5rem]"
          style={{ height: 400 }}
        >
          {/* Decorative floating elements */}
          <AnimatePresence mode="sync">
            {showDecorative &&
              DECORATIVE_ITEMS.map((item) => (
                <FloatingElement key={item.id} item={item} phase={phase} />
              ))}
          </AnimatePresence>

          {/* Falling food */}
          <AnimatePresence>
            {showCoins &&
              FALLING_FOODS.map((item) => (
                <FallingFood key={item.id} item={item} />
              ))}
          </AnimatePresence>
        </div>

        {/* UI Content — hides during frame 3, fades in from bottom at frame 4 */}
        <AnimatePresence>
          {showText && (
            <motion.div
              key="ui-content"
              className="absolute bottom-0 left-0 right-0 z-10 rounded-b-[2.5rem] px-6 pb-8 pt-10 text-center"
              style={{ background: "linear-gradient(to top, white 70%, rgba(255,255,255,0.95) 85%, rgba(255,255,255,0) 100%)" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-[22px] font-bold leading-tight text-zinc-900">
                Eat what you love.
                <br />
                Find it here.
              </h2>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                Discover new restaurants and cuisines.
                <br />
                one to get started easily.
              </p>
              <button className="mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md shadow-zinc-200 transition-colors hover:bg-zinc-800">
                Find a Restaurant
              </button>
              <p className="mt-3 text-[12px] font-medium text-zinc-700 underline underline-offset-2">
                Add an Existing Account
              </p>
              <p className="mt-4 text-[8px] text-zinc-400">
                Terms of Use &bull; Privacy Policy
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20" />
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((p) => (
          <div
            key={p}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${p === phase ? "bg-zinc-900 scale-125" : "bg-zinc-300"
              }`}
          />
        ))}
        <span className="ml-2 text-xs text-zinc-400">Frame {phase}</span>
      </div>
    </div>
  );
}
