"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavStatus = "updated" | "no_update" | "waiting";

type NavItem = {
  href: string;
  label: string;
  status: NavStatus;
  note?: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Scroll", status: "no_update" },
  { href: "/home-screen-v2", label: "Toast Home", status: "updated" },
  { href: "/create-wallet-pages", label: "Wallet V1 (SVG)", status: "updated", note: "Need mascot" },
  { href: "/magnifying-glass-motion", label: "Magnifying Glass", status: "updated" },
  { href: "/congratulations-food-found", label: "Food Found", status: "updated", note: "Optional super-likes" },
  { href: "/swipe", label: "Swipe V1", status: "updated", note: "Split from Toast Home" },
  { href: "/swipe-v2", label: "Swipe V2", status: "no_update", note: "Split from Toast Home" },
  { href: "/result", label: "Result V1", status: "no_update", note: "Split from Toast Home" },
  { href: "/result-v2", label: "Result V2", status: "updated", note: "New result" },
  { href: "/wallet-reveal", label: "Wallet Reveal", status: "waiting" },
  { href: "/explore", label: "Explore Tab", status: "no_update", note: "Split from Toast Home" },
  { href: "/map", label: "Map Tab", status: "no_update", note: "Split from Toast Home" },
  { href: "/preferences-setup", label: "Profile Tab", status: "no_update", note: "Split from Toast Home" },
  { href: "/user-journey-diagram", label: "User Journey Diagram", status: "no_update" },
  { href: "/fast-onboarding", label: "Fast Onboarding", status: "updated" },
  { href: "/comments", label: "Comments", status: "no_update" },
];

const NAV_GROUPS: Array<{
  title: string;
  status: NavStatus;
  badgeClass: string;
}> = [
    { title: "Updated", status: "updated", badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    { title: "No Update", status: "no_update", badgeClass: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
    { title: "Waiting", status: "waiting", badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  ];

function getItemsByStatus(status: NavStatus) {
  return NAV_ITEMS.filter((item) => item.status === status);
}

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
                {NAV_GROUPS.map((group) => {
                  const items = getItemsByStatus(group.status);
                  if (items.length === 0) return null;

                  return (
                    <div key={group.status} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1 pt-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {group.title}
                        </p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${group.badgeClass}`}>
                          {items.length}
                        </span>
                      </div>

                      {items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-lg px-4 py-2.5 transition-colors ${pathname === item.href
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            }`}
                        >
                          <span className="block text-sm font-medium">{item.label}</span>
                          {item.note && (
                            <span className={`mt-0.5 block text-[10px] ${pathname === item.href ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"}`}>
                              {item.note}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  );
                })}
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
          {NAV_GROUPS.map((group) => {
            const items = getItemsByStatus(group.status);
            if (items.length === 0) return null;

            return (
              <div key={group.status} className="mb-2 space-y-1">
                <div className="flex items-center justify-between px-2 py-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {group.title}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${group.badgeClass}`}>
                    {items.length}
                  </span>
                </div>

                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-1.5 transition-colors ${pathname === item.href
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                  >
                    <span className="block text-xs font-medium">{item.label}</span>
                    {item.note && (
                      <span className={`mt-0.5 block text-[10px] ${pathname === item.href ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"}`}>
                        {item.note}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
