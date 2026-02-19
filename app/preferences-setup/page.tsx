import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">Toast MVP</p>
        <h1 className="mt-2 text-3xl font-black text-zinc-900">Preferences Setup</h1>
        <p className="mt-3 text-zinc-600">Prototype page for cuisine and dietary preferences.</p>
        <div className="mt-6 flex gap-2">
          <Link href="/home-screen" className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            Back to Home Screen
          </Link>
          <Link href="/restaurant-search" className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800">
            Open Map Search
          </Link>
        </div>
      </div>
    </div>
  );
}
