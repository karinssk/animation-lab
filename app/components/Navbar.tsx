"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "/", label: "Scroll" },
  { href: "/home-screen-v2", label: "Toast Home" },
  { href: "/create-wallet-pages", label: "Wallet V1 (SVG)" },
  { href: "/create-wallet-pages-v2", label: "Wallet V2 (Emoji)" },

  { href: "/magnifying-glass-motion", label: "Magnifying Glass" },

  { href: "/congratulations-food-found", label: "Food Found" },
  { href: "/wallet-reveal", label: "Wallet Reveal" },
  { href: "/celebarytory", label: "Celebratory" },
  { href: "/celebratory-v2", label: "Celebratory V2" },
  { href: "/celebratory-v3", label: "Celebratory V3" },
  { href: "/celebratory-v4", label: "Celebratory V4" },
  { href: "/explore", label: "Explore Tab" },
  { href: "/map", label: "Map Tab" },
  { href: "/preferences-setup", label: "Profile Tab" },
  { href: "/design-load", label: "Design Load" },
  { href: "/user-journey-diagram", label: "User Journey Diagram" },
  { href: "/fast-onboarding", label: "Fast Onboarding" },
  { href: "/comments", label: "Comments" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar (Hamburger) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-zinc-200 bg-white/85 backdrop-blur-md md:hidden dark:border-zinc-800 dark:bg-zinc-950/85">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
            Animation Lab
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-md"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${pathname === item.href
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Navbar (Sidebar) */}
      <nav className="fixed left-0 top-0 bottom-0 z-[100] hidden w-64 border-r border-zinc-200 bg-white/90 p-4 backdrop-blur-md md:block dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mb-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <Link href="/" className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
            Animation Lab
          </Link>
        </div>
        <div className="flex h-[calc(100%-4.5rem)] flex-col gap-1 overflow-y-auto pr-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${pathname === item.href
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
