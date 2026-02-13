import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div className={`min-h-screen bg-[#f6f3ee] ${spaceGrotesk.className}`}>
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Animation Lab
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Cash Series UI Animation Pages
        </h1>
        <p className="max-w-lg text-sm text-slate-600">
          Select a sequence to preview. Each page contains a self-running mobile
          UI animation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            href="/cash001"
          >
            Open cash001
          </Link>
          <Link
            className="rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            href="/cash-back-wallet-001"
          >
            Open cash-back-wallet-001
          </Link>
          <Link
            className="rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            href="/magnifying-glass-search"
          >
            Open magnifying-glass-search
          </Link>
          <Link
            className="rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            href="/restaurant-search"
          >
            Open restaurant-search
          </Link>
        </div>
      </main>
    </div>
  );
}
