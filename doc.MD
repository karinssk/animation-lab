# Animation Lab â€” Project Documentation

A **Next.js 16** showcase project demonstrating scroll-triggered animations and interactive wallet-creation animations built with **Framer Motion**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Pages & Routes](#pages--routes)
4. [Components](#components)
   - [Navbar](#navbar)
   - [ScrollReveal](#scrollreveal)
   - [StaggerContainer](#staggercontainer)
   - [WalletAnimation (V1 â€” SVG)](#walletanimation-v1--svg)
   - [WalletAnimationV2 (V2 â€” Emoji)](#walletanimationv2-v2--emoji)
   - [CashbackWalletAnimation (V3 â€” Paint Reveal)](#cashbackwalletanimation-v3--paint-reveal)
5. [Animation System](#animation-system)
   - [Scroll Animations](#scroll-animations)
   - [Wallet 7-Phase Loop](#wallet-7-phase-loop)
6. [Getting Started](#getting-started)
7. [Scripts](#scripts)

---

## Tech Stack

| Technology      | Version  | Purpose                          |
| --------------- | -------- | -------------------------------- |
| Next.js         | 16.1.6   | React framework (App Router)     |
| React           | 19.2.3   | UI library                       |
| Framer Motion   | 12.34.0  | Animation engine                 |
| Tailwind CSS    | 4        | Utility-first styling            |
| TypeScript      | 5        | Type safety                      |

---

## Project Structure

```
animation/
|-- app/
|   |-- layout.tsx                        # Root layout (Navbar + global wrapper)
|   |-- page.tsx                          # Home — Scroll Demo
|   |-- globals.css                       # Global styles (smooth scroll, CSS vars)
|   |-- components/
|   |   |-- Navbar.tsx                    # Fixed top navigation bar
|   |   |-- ScrollReveal.tsx              # Reusable scroll-triggered animation wrapper
|   |   |-- StaggerContainer.tsx          # Auto-stagger children animations
|   |   |-- WalletAnimation.tsx           # Wallet animation V1 (SVG food icons)
|   |   |-- WalletAnimationV2.tsx         # Wallet animation V2 (emoji food icons)
|   |   `-- CashbackWalletAnimation.tsx   # Wallet animation V3 (paint reveal)
|   |-- create-wallet-pages/
|   |   `-- page.tsx                      # Route: /create-wallet-pages
|   |-- create-wallet-pages-v2/
|   |   `-- page.tsx                      # Route: /create-wallet-pages-v2
|   `-- cashback-wallet/
|       `-- page.tsx                      # Route: /cashback-wallet
|-- public/                               # Static assets
|-- package.json
|-- tsconfig.json
|-- next.config.ts
|-- postcss.config.mjs
`-- doc.MD                                # This file
```

---

## Pages & Routes

| Route                      | Page File                              | Description                              |
| -------------------------- | -------------------------------------- | ---------------------------------------- |
| `/`                        | `app/page.tsx`                         | Scroll animation demo with 5+ sections   |
| `/create-wallet-pages`     | `app/create-wallet-pages/page.tsx`     | Wallet animation V1 using SVG food icons |
| `/create-wallet-pages-v2`  | `app/create-wallet-pages-v2/page.tsx`  | Wallet animation V2 using emoji icons    |
| `/cashback-wallet`         | `app/cashback-wallet/page.tsx`         | Cashback wallet 7-frame paint reveal     |

---

## Components

### Navbar

**File:** `app/components/Navbar.tsx`

Fixed top navigation bar with glass-morphism effect. Highlights the active page using `usePathname()` from Next.js.

- Backdrop blur + semi-transparent background
- Four navigation links (Scroll Demo, Wallet V1, Wallet V2, Cashback Wallet)
- Cashback wallet link (paint-reveal sequence)
- Active link gets contrasting pill style
- Dark mode support

---

### ScrollReveal

**File:** `app/components/ScrollReveal.tsx`

A reusable wrapper that animates its children when they scroll into the viewport.

| Prop        | Type                                    | Default | Description                       |
| ----------- | --------------------------------------- | ------- | --------------------------------- |
| `children`  | `ReactNode`                             | â€”       | Content to animate                |
| `delay`     | `number`                                | `0`     | Delay in seconds before animating |
| `duration`  | `number`                                | `0.6`   | Animation duration in seconds     |
| `distance`  | `number`                                | `50`    | Pixel offset before animation     |
| `direction` | `"up" \| "down" \| "left" \| "right"`  | `"up"`  | Direction the element enters from |
| `className` | `string`                                | `""`    | Additional CSS classes            |

**How it works:**
- Uses Framer Motion's `whileInView` to trigger on scroll
- Viewport threshold: 20% (`amount: 0.2`)
- Ease-out curve: `[0.25, 0.1, 0.25, 1]`
- `once: false` â€” animations reverse when scrolling back up

**Usage:**
```tsx
<ScrollReveal delay={0.2} direction="left">
  <p>This fades in from the left on scroll</p>
</ScrollReveal>
```

---

### StaggerContainer

**File:** `app/components/StaggerContainer.tsx`

Wraps multiple children and auto-staggers their entrance animations.

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `children`  | `ReactNode` | â€”       | Child elements to stagger          |
| `stagger`   | `number`    | `0.15`  | Seconds between each child's start |
| `className` | `string`    | `""`    | Additional CSS classes             |

**How it works:**
- Maps over `React.Children` and wraps each in a `motion.div`
- Uses Framer Motion's `staggerChildren` variant
- Each child: `opacity: 0, y: 50` â†’ `opacity: 1, y: 0`

**Usage:**
```tsx
<StaggerContainer stagger={0.2}>
  <Card title="First" />
  <Card title="Second" />
  <Card title="Third" />
</StaggerContainer>
```

---

### WalletAnimation (V1 â€” SVG)

**File:** `app/components/WalletAnimation.tsx`

A phone mockup with a looping 7-phase animation using **custom SVG food icons**.

#### Phone Mockup
- 300 Ã— 620 px container with rounded corners
- Dynamic Island notch at the top
- Status bar (time, signal, Wi-Fi, battery)
- 400 px animation area (~60% of phone screen)
- UI content overlay with gradient mask at bottom
- Home indicator bar

#### SVG Food Icons (14 custom icons)

| Category | Icons                                               |
| -------- | --------------------------------------------------- |
| USA      | BurgerIcon, PizzaIcon, FriesIcon, HotDogIcon, DonutIcon |
| Chinese  | DumplingIcon, NoodleBowlIcon, FortuneCookieIcon, BaoIcon |
| Thai     | TomYumIcon, PadThaiIcon, MangoRiceIcon, ChiliIcon, SatayIcon |

Each icon is a hand-drawn SVG with fills, gradients, and layered shapes.

#### Sub-components
- **FloatingElement** â€” Positions and animates a decorative food icon. Outer `motion.div` handles enter/exit + phase-based position. Inner `motion.div` handles continuous float oscillation.
- **FallingFood** â€” A food item that falls from top to bottom with rotation, horizontal drift, and repeating loop.
- **FallingFoodIcon** â€” Renders one of 3 simplified SVG variants (dumpling, burger, sushi roll).

---

### WalletAnimationV2 (V2 â€” Emoji)

**File:** `app/components/WalletAnimationV2.tsx`

Same phone mockup and 7-phase animation as V1, but uses **native Unicode emoji** instead of SVG icons.

#### Emoji Food Items

| Category | Emojis                       |
| -------- | ---------------------------- |
| USA      | ðŸ” ðŸ• ðŸŸ ðŸŒ­ ðŸ© ðŸŒ®          |
| Chinese  | ðŸ¥Ÿ ðŸœ ðŸ¥  ðŸ¥¡ ðŸ¥®              |
| Thai     | ðŸ› ðŸ¤ ðŸ¥­ ðŸŒ¶ï¸ ðŸ¢ ðŸš ðŸ£       |

#### Key Differences from V1
- Uses a `FoodEmoji` component that renders emoji text with `drop-shadow` filter
- Significantly less code (~60% smaller)
- Same animation logic, timing, and coordinates

---

### CashbackWalletAnimation (V3 Ã¢â‚¬â€ Paint Reveal)

**File:** `app/components/CashbackWalletAnimation.tsx`

A 7-frame cashback wallet animation that transitions from a single card, to a grid zoom, to a liquid-style paint reveal of the final UI.

**Frames**
1. Single centered wallet card.
2. Multi-card grid with a zoom-in focus on the top-left card.
3. Paint reveal begins at bottom-left, moving diagonally upward.
4. Reveal continues, covering more of the interface.
5. Paint fills the main content area.
6. Near-complete reveal with a slight slow-down for polish.
7. Fully revealed final UI state.

---

## Animation System

### Scroll Animations

Used on the home page (`/`). The demo showcases:

1. **Hero Section** â€” Immediate fade-in with staggered title, subtitle, and scroll indicator
2. **Fade-In Section** â€” Basic `ScrollReveal` with `direction="up"`
3. **Staggered Cards** â€” Three cards in a grid using `StaggerContainer`
4. **Multi-Direction** â€” Four boxes animating from left, right, up, and down
5. **Impact Section** â€” Large heading with `distance={80}` for dramatic entrance

**Core principles:**
- Trigger: `whileInView` with 20% viewport threshold
- Easing: custom cubic-bezier `[0.25, 0.1, 0.25, 1]` (ease-out)
- Reversible: animations play in reverse when scrolling back up

---

### Wallet 7-Phase Loop

Both V1 and V2 share the same phase-based animation system:

```
Phase 1 (2.5s)  â†’  Phase 2 (2.5s)  â†’  Phase 3 (2.5s)
   â†‘                                       â†“
Phase 7 (2.0s)  â†  Phase 6 (2.0s)  â†  Phase 5 (2.0s)  â†  Phase 4 (2.0s)
```

| Phase | Duration | What Happens                                                  |
| ----- | -------- | ------------------------------------------------------------- |
| 1     | 2.5s     | All decorative food icons float in from edges and oscillate   |
| 2     | 2.5s     | Icons converge 25% toward center (CENTER_X=45, CENTER_Y=32)  |
| 3     | 2.5s     | Icons converge 45% toward center (tighter clustering)         |
| 4     | 2.0s     | Decorative icons exit; falling food wave 1 begins (3 items)   |
| 5     | 2.0s     | Falling food wave 2 (4 items)                                 |
| 6     | 2.0s     | Falling food wave 3 (6 items)                                 |
| 7     | 2.0s     | All animations clear; seamless loop back to phase 1           |

**Decorative Items (19 total):** Spread across 0â€“60% of the animation area vertically. Each item has:
- `x, y` â€” base position (percentage)
- `floatX, floatY` â€” oscillation amplitude (pixels)
- `duration` â€” float cycle length (3.3â€“5.0s)
- `entryFrom` â€” coordinates where the item enters from
- `exitTo` â€” coordinates where the item exits to

**Falling Items (13 total):** Arranged in 3 waves with staggered delays:
- Wave 1 (Phase 4): 3 items, delay 0â€“0.8s
- Wave 2 (Phase 5): 4 items, delay 2.0â€“3.0s
- Wave 3 (Phase 6): 6 items, delay 4.0â€“5.0s

**Gradient Mask:** The bottom UI content section uses a `linear-gradient(to top, white 70%, rgba(255,255,255,0.95) 85%, rgba(255,255,255,0) 100%)` with `z-10` to cleanly clip animation elements above the "Your crypto. Your control." text.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
#    http://localhost:3000              â†’ Scroll Demo
#    http://localhost:3000/create-wallet-pages    â†’ Wallet V1 (SVG)
#    http://localhost:3000/create-wallet-pages-v2 â†’ Wallet V2 (Emoji)
```

---

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start dev server (hot reload) |
| `npm run build` | Production build              |
| `npm run start` | Serve production build        |
| `npm run lint`  | Run ESLint                    |

