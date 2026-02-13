# TOAST - Project Overview

## What is TOAST?

TOAST is a **group decision-making app for choosing where to eat**. Instead of endless "Where should we go?" debates, users swipe through food menus and restaurants (like Tinder) to reach a group consensus. It runs inside LINE (via LIFF) so users can authenticate instantly and share sessions with friends.

**Core flow**: Pick a food type together → Pick a restaurant together → Go eat.

---

## How It Works (User Journey)

```
1. Open app in LINE
2. Choose SOLO or GROUP mode
3. (GROUP) Share invite code with friends
4. (GROUP) Wait for friends to join, owner clicks Start
5. Everyone swipes through MENU cards (LEFT = no, RIGHT = yes, UP = super like)
6. System finds the winning menu (e.g. "Pad Thai")
7. Everyone swipes through RESTAURANT cards that serve the winning menu
8. System finds the winning restaurant
9. Result page: restaurant name, address, rating, "Open in Maps" button
```

---

## Architecture

```
                    LINE App
                       |
                   LIFF SDK
                       |
            ┌──────────┴──────────┐
            |                     |
     Next.js Frontend      Socket.IO Client
     (port 3000)                  |
            |                     |
            ├─── REST API ────────┤
            |                     |
     Fastify Backend       Socket.IO Server
     (port 3001)                  |
            |                     |
     ┌──────┴──────┐              |
     |             |              |
  PostgreSQL    Redis ────────────┘
  (data)        (real-time state)
```

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | Next.js 16 + React 19 | UI framework |
| State | Zustand | Client-side state |
| Real-time | Socket.IO | Live swipe updates |
| Animations | Framer Motion | Swipe card physics |
| Styling | Tailwind CSS 4 | UI design |
| Backend | Fastify 5 | REST API |
| ORM | Prisma | Database queries |
| Database | PostgreSQL | Persistent data |
| Cache | Redis | Room state, decks, swipe progress |
| Auth | LINE LIFF SDK + JWT | Authentication |

---

## The Two Phases

TOAST has **two swipe phases** that happen sequentially:

### Phase 1: Menu Swipe
- Users swipe through 20 food menu cards (e.g. Pad Thai, Sushi, Pizza)
- Each card shows: name, image, cuisine type, price range
- When everyone finishes, the **Decision Engine** picks the winning menu

### Phase 2: Restaurant Swipe
- System fetches restaurants that serve the winning menu
- Users swipe through restaurant cards (up to 15)
- Each card shows: name, image, address, rating, price level
- When everyone finishes, the **Decision Engine** picks the winning restaurant
- A final **Decision** record is saved

---

## Phase State Machine

```
┌──────────────┐
│ MENU_SWIPE   │  All users swipe menus (LEFT/RIGHT/UP)
└──────┬───────┘
       │ All members completed all cards
       ▼
  [Decision Engine calculates match]
       │
       ▼
┌──────────────┐
│ MENU_RESULT  │  Shows winning menu + "Find Restaurants" button
└──────┬───────┘
       │ User clicks "Find Restaurants"
       ▼
┌────────────────────┐
│ RESTAURANT_SWIPE   │  All users swipe restaurants
└──────┬─────────────┘
       │ All members completed all cards
       ▼
  [Decision Engine calculates match]
       │
       ▼
┌──────────────┐
│ FINAL_RESULT │  Shows restaurant + menu + "Open in Maps"
└──────────────┘
```

**Session statuses**: `WAITING` → `ACTIVE` → `COMPLETED`

- `WAITING`: GROUP mode only, waiting for owner to start
- `ACTIVE`: Swiping in progress (covers all phases above)
- `COMPLETED`: Final result decided

---

## Decision Engine - Core Logic

The decision engine is the brain of the app. It takes everyone's swipes and determines a winner.

### Input
```
swipeData = [
  { itemId: "pad-thai", visitorVotes: { userA: "RIGHT", userB: "UP", userC: "LEFT" } },
  { itemId: "sushi",    visitorVotes: { userA: "LEFT",  userB: "RIGHT", userC: "RIGHT" } },
  ...
]
```

### Scoring Rules
| Swipe Direction | Votes | Weighted Score |
|-----------------|-------|----------------|
| LEFT (no) | 0 | 0 |
| RIGHT (yes) | +1 | +1 |
| UP (super like) | +1 | +2 |

Super like counts as **2x weight** in scoring. Each user gets only **1 super like** per session.

### Decision Algorithm (in order of priority)

#### 1. Super Like Winner (highest priority)
If **every single member** super-liked the same item → instant win.
- Match type: `SUPER`
- Confidence: `1.0`
- This is the fastest path to a decision.

#### 2. Strong Match (majority)
Sort items by weighted score. If top item has `positiveVotes / memberCount > 0.5`:
- Match type: `STRONG`
- Confidence: `positiveVotes / memberCount`
- Example: 3 out of 4 people liked it → 75% confidence

#### 3. Tie
If top two items have the **same weighted score**:
- Match type: `TIE`
- Resolved using: `hash(sessionId) % tiedItems.length`
- This is deterministic - every client gets the same result without extra communication

#### 4. Weak Match (plurality)
The item with most votes wins, but doesn't have majority:
- Match type: `WEAK`
- Confidence: lower (e.g. 0.4)

#### 5. No Match (restaurant phase fallback)
If nobody liked anything in restaurant phase:
- Uses first deck item as fallback
- Match type: `WEAK`, confidence: `0`
- Ensures we always reach a final result

### Tie Resolution
Ties are resolved **deterministically** using the session ID as a seed:
```
seed = hash(sessionId) % numberOfTiedItems
winner = tiedItems[seed]
```
This means every client computes the same winner without needing another round of voting.

### Example Scenarios

**Scenario A: Clear winner**
```
3 users, item "Pad Thai":
  User A: RIGHT (+1)
  User B: RIGHT (+1)
  User C: UP    (+2)

positiveVotes = 3, weightedScore = 4
ratio = 3/3 = 1.0 → STRONG match
```

**Scenario B: Tie**
```
2 users, 2 items:
  "Pad Thai":    User A: RIGHT, User B: LEFT  → score 1
  "Green Curry": User A: LEFT,  User B: RIGHT → score 1

Scores equal → TIE
Winner = tiedItems[hash(sessionId) % 2]
```

**Scenario C: Everyone dislikes everything**
```
Restaurant phase, all items swiped LEFT
No positive votes → fallback to first deck item
Match type: WEAK, confidence: 0
```

---

## Real-Time Communication (Socket.IO Events)

### Client → Server
| Event | Data | When |
|-------|------|------|
| `room:join` | `{ sessionId }` | Enter waiting room or swipe page |
| `room:leave` | `{ sessionId }` | Leave session |
| `room:start` | `{ sessionId }` | Owner starts session |
| `swipe:submit` | `{ sessionId, itemId, direction, durationMs }` | User swipes a card |
| `phase:continue` | `{ sessionId }` | User clicks "Find Restaurants" |
| `presence:ping` | `{}` | Heartbeat every 30s |

### Server → Client
| Event | Data | When |
|-------|------|------|
| `room:state` | Full session data + members | User joins room (catch-up) |
| `room:started` | `{ deck }` | Owner started session |
| `member:joined` | `{ member }` | Someone joined the room |
| `member:left` | `{ userId }` | Someone left |
| `swipe:ack` | `{ itemId }` | Confirm swipe received |
| `swipe:progress` | `{ memberProgress, totalCards }` | Someone swiped (progress update) |
| `match:found` | `{ winnerId, matchType, confidence }` | Match decided |
| `match:none` | `{ topItems }` | No match (all LEFT) |
| `phase:menu_result` | `{ menu, restaurantDeck, matchType }` | Menu decided, here's restaurants |
| `phase:final_result` | `{ menu, restaurant, decision }` | Final result |

---

## Database Models

### Core Models
```
User
  ├── id, lineUserId (unique), displayName, pictureUrl
  ├── preferences (JSON), onboardingDone
  └── Relations: sessions, memberships, swipes

Session
  ├── id, code (6-char unique), mode (SOLO/GROUP)
  ├── status (WAITING/ACTIVE/COMPLETED/CANCELLED)
  ├── phase (MENU_SWIPE/MENU_RESULT/RESTAURANT_SWIPE/FINAL_RESULT)
  ├── filters (JSON: cuisines, priceRange)
  ├── expiresAt (24h from creation)
  └── Relations: members, swipes, matches, decisions

SessionMember
  ├── sessionId + userId (unique pair)
  ├── status (ACTIVE/IDLE/REMOVED/LEFT)
  ├── menuSwipeIndex (how many menus swiped)
  ├── restSwipeIndex (how many restaurants swiped)
  └── superLikeUsed (boolean)

Menu
  ├── name, nameLocal, imageUrl, cuisineType
  ├── priceRangeLow, priceRangeHigh
  ├── popularity (0-1), tags[], isActive
  └── Relations: restaurants (many-to-many)

Restaurant
  ├── name, nameLocal, imageUrl, address
  ├── latitude, longitude, priceLevel (1-4)
  ├── rating, reviewCount, phone, website
  └── Relations: menus (many-to-many)

Swipe
  ├── sessionId, userId, menuId OR restaurantId
  ├── direction (LEFT/RIGHT/UP), phase
  └── swipeDurationMs

Match (per phase)
  ├── sessionId, menuId, phase
  ├── matchType (STRONG/WEAK/TIE/SUPER)
  ├── confidence (0-1), voteCount
  └── hasSuperLike

Decision (final)
  ├── sessionId, menuId, restaurantId
  ├── method (MAJORITY/SUPER_LIKE/TIEBREAKER/TIMEOUT)
  ├── confidence, voteBreakdown (JSON)
  └── timeToDecisionMs
```

---

## Redis Usage

Redis stores temporary real-time data:

| Key Pattern | Data | TTL |
|-------------|------|-----|
| `inviteCode:{code}` | sessionId | 24h |
| `roomDeck:{sessionId}:menu_swipe` | Menu card array (JSON) | 24h |
| `roomDeck:{sessionId}:restaurant_swipe` | Restaurant card array (JSON) | 24h |
| `roomSwipes:{sessionId}:{phase}` | Sorted set of swipe data | 24h |
| `userCurrentRoom:{userId}` | Current sessionId | Session |
| `userPresence:{userId}` | Online status | Session |

---

## Authentication Flow

```
LINE App → LIFF SDK → Get ID Token
    ↓
POST /api/v1/auth/line { idToken }
    ↓
Backend verifies token with LINE API
    ↓
Find or create User in PostgreSQL
    ↓
Generate JWT (7-day expiry)
    ↓
Return { accessToken, user }
    ↓
Frontend stores token in Zustand + sends with all API calls
Socket.IO sends token in handshake.auth.token
```

---

## Admin Panel

Located at `/admin` with separate authentication (username/password, not LINE).

### Features
- **Dashboard**: Session stats overview
- **Menus**: CRUD for food menus with image upload
- **Restaurants**: CRUD for restaurants with image upload
- **Sessions**: View/manage active sessions
- **Analytics**: Usage tracking

### Roles
- `SUPER_ADMIN`: Full access, can create other admins
- `ADMIN`: CRUD menus/restaurants, view sessions
- `MODERATOR`: View only

---

## Key Files

```
backend/
├── src/
│   ├── index.ts                          # Server entry, plugins, routes
│   ├── engine/decision-engine.ts         # Voting/matching algorithm
│   ├── routes/
│   │   ├── auth.ts                       # LINE auth + JWT
│   │   ├── sessions.ts                   # Session lifecycle API
│   │   ├── menus.ts                      # Public menu queries
│   │   ├── restaurants.ts                # Public restaurant queries
│   │   └── admin/                        # Admin CRUD endpoints
│   ├── socket/
│   │   ├── index.ts                      # Socket.IO setup + room handlers
│   │   └── handlers/swipe.ts             # Swipe recording + match check
│   ├── middleware/
│   │   ├── auth.ts                       # User JWT middleware
│   │   └── adminAuth.ts                  # Admin JWT middleware
│   └── lib/
│       ├── prisma.ts                     # Database client
│       └── redis.ts                      # Redis client
└── prisma/schema.prisma                  # Database schema

frontend/
├── app/
│   ├── (main)/page.tsx                   # Home - SOLO/GROUP selection
│   ├── session/[id]/
│   │   ├── waiting/page.tsx              # GROUP waiting room
│   │   ├── swipe/page.tsx                # Card swiping UI
│   │   ├── menu-result/page.tsx          # Menu result + continue
│   │   └── result/page.tsx               # Final result + actions
│   ├── admin/                            # Admin panel pages
│   └── onboarding/page.tsx               # First-time user flow
├── stores/
│   ├── authStore.ts                      # Auth state (JWT, user)
│   └── sessionStore.ts                   # Session state (deck, progress)
├── lib/
│   ├── api.ts                            # REST API client
│   ├── admin-api.ts                      # Admin API client
│   ├── socket.ts                         # Socket.IO client wrapper
│   └── liff.ts                           # LINE LIFF SDK wrapper
└── components/
    ├── swipe/SwipeCard.tsx               # Gesture-based swipe card
    ├── swipe/SwipeDeck.tsx               # Card stack manager
    ├── session/MemberList.tsx            # Member avatars in waiting room
    └── admin/ImageUpload.tsx             # Image upload with preview
```

---

## Running Locally

```bash
# 1. Start databases
docker compose up -d          # PostgreSQL + Redis

# 2. Backend
cd backend
cp .env.example .env          # Configure environment
npm install
npx prisma migrate dev        # Create tables
npx prisma db seed            # Seed menus/restaurants
npm run dev                   # http://localhost:3001

# 3. Frontend
cd frontend
cp .env.example .env.local    # Configure environment
npm install
npm run dev                   # http://localhost:3000
```

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret for signing JWT tokens
- `LIFF_ID`: LINE LIFF app ID
- `LIFF_CHANNEL_SECRET`: LINE channel secret
- `FRONTEND_URL`: Frontend URL for CORS