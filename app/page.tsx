import ScrollReveal from "./components/ScrollReveal";
import StaggerContainer from "./components/StaggerContainer";
import CommentArea from "./components/CommentArea";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Hero Section - no scroll trigger, immediately visible */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <ScrollReveal delay={0} duration={0.8}>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Scroll Animation
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2} duration={0.8}>
          <p className="mt-6 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
            Smooth, scroll-triggered animations built with Framer Motion.
            Scroll down to see the magic.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.4} duration={0.8}>
          <div className="mt-8 text-sm text-zinc-400 animate-bounce">
            ↓ Scroll Down
          </div>
        </ScrollReveal>
      </section>

      {/* Section 1 - Fade up */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl">
          <ScrollReveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              01 — Reveal
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Fade In From Below
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
              Each element smoothly reveals as it enters the viewport. The
              animation uses an ease-out curve for a natural, polished feel.
              Scroll back up to see the reverse effect.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 - Staggered cards */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <ScrollReveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
            02 — Stagger
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Staggered Elements
          </h2>
        </ScrollReveal>

        <StaggerContainer
          stagger={0.15}
          className="mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
            <div className="text-3xl font-bold text-indigo-500">01</div>
            <h3 className="mt-4 text-lg font-semibold">Performance</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              GPU-accelerated transforms for buttery smooth 60fps animations.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
            <div className="text-3xl font-bold text-emerald-500">02</div>
            <h3 className="mt-4 text-lg font-semibold">Responsive</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Works beautifully across all screen sizes and devices.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
            <div className="text-3xl font-bold text-amber-500">03</div>
            <h3 className="mt-4 text-lg font-semibold">Reusable</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Wrap any element with ScrollReveal for instant scroll animations.
            </p>
          </div>
        </StaggerContainer>
      </section>

      {/* Section 3 - Multi-direction */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <ScrollReveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-500">
            03 — Direction
          </span>
          <h2 className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Multi-Direction Reveals
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <ScrollReveal direction="left" delay={0}>
            <div className="rounded-2xl bg-indigo-50 p-8 dark:bg-indigo-950/30">
              <h3 className="text-lg font-semibold">← From Left</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Slides in from the left side of the viewport.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <div className="rounded-2xl bg-emerald-50 p-8 dark:bg-emerald-950/30">
              <h3 className="text-lg font-semibold">From Right →</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Slides in from the right side of the viewport.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="rounded-2xl bg-amber-50 p-8 dark:bg-amber-950/30">
              <h3 className="text-lg font-semibold">↑ From Below</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                The default — slides up from below the viewport.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.3}>
            <div className="rounded-2xl bg-rose-50 p-8 dark:bg-rose-950/30">
              <h3 className="text-lg font-semibold">↓ From Above</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Slides down from above the viewport.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4 - Large text reveal */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <ScrollReveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-500">
              04 — Impact
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.15} distance={80} duration={0.8}>
            <h2 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Make Every Section
              <span className="text-violet-500"> Memorable</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-lg text-zinc-500 dark:text-zinc-400">
              Scroll-triggered animations add life to your pages. They guide
              the user&apos;s attention and create a sense of progression through
              the content.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center">
        <ScrollReveal>
          <p className="text-sm text-zinc-400">
            Built with Next.js + Framer Motion
          </p>
        </ScrollReveal>
      </footer>

      <CommentArea slug="home" />
    </div>
  );
}
