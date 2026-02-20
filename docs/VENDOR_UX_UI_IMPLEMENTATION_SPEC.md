# Toast Vendor UX/UI Implementation Spec

## 1. Purpose and Source

This document converts the vendor design references into an implementation-ready specification.

Source files:
- `additional-for-ux-ui-design/Toast Design Ref - Vendor-part1.pdf`
- `additional-for-ux-ui-design/Toast Design Ref - Vendor-part2.pdf`

Notes:
- Part 1 is mostly visual; text extraction was limited.
- Where details are unclear, this spec marks them as open questions.

## 2. Product Direction

### 2.1 Experience Goals
- Feel: happy, fun, game-like, energetic.
- Avoid calm/minimal emotional tone.
- Support both solo and group play.
- Make transition from discovery to decision fast.

### 2.2 Visual Direction
- Background should be primarily white.
- Primary color usage: up to about 15% of visible surface.
- Secondary colors combined: about 5% to 10%.
- Use playful motion and celebratory effects (example: food-shape confetti for super match).

## 3. Scope by Release

## 3.1 MVP (must ship)
- Home/Main entry screen.
- Search and explore entry points.
- Map screen with pin-to-detail navigation.
- Game setup (room name, mode, filters, include preferences option).
- Waiting room (members, countdown, nudge, host continue).
- Swipe gameplay (like/dislike, basic match feedback, timer mode).
- Restaurant detail screen.
- Result screen (top results, winner, share, tie-break voting).
- Appointment flow (setup, selection calendar, result suggestion).
- Preferences setup under profile.
- LINE group integration for invite/share/notifications (at least baseline flow).

## 3.2 V2 (defer if needed)
- Advanced animation polish and richer confetti variants.
- Craving Boost social signal.
- Save for Later session mode if time is tight.
- Full category constraint inheritance from every Explore shortcut variant.
- Deep review integrations and richer reservation flows.

## 4. Information Architecture

Top-level navigation and entry points:
- Home/Main
- Explore
- Map
- Current Game (resume)
- Appointment
- Profile/Preferences

Game flow routes:
- `Home -> Game Setup -> Waiting Room (group only) -> Swipe -> Result`
- `Home shortcut/explore -> Swipe (setup may be skipped) -> Result`
- `Single player -> Swipe directly or via setup -> Result`

Appointment flow routes:
- `Appointment Setup -> Appointment Selection -> Appointment Result`

## 5. Screen Specifications

## 5.1 Home / Main Screen

Required UI:
- Profile picture (tap opens profile/preferences setup).
- User greeting.
- Search field.
- Banner carousel.
- Create game room (floating button preferred).
- Entry tiles: Menu/Restaurant, Appointment, Explore.
- Trendy menu/restaurant blocks (time-relevant curation).
- Game room shortcut blocks (preconfigured themes).
- Current game status card shown only when a game is in progress.

Behavior:
- Trendy and shortcut entries route to game flow with preset filters.
- Some shortcut entries should skip setup and go directly to swipe.
- Current game card opens active room and shows room name, members, and status.

Acceptance criteria:
- If user has active game, current game card is visible; otherwise hidden.
- Tapping create game opens Game Setup.
- Tapping a shortcut opens Swipe with expected preset constraints.
- Tapping profile picture opens Profile/Preferences.

## 5.2 Map Screen

Required UI:
- Search field (area or restaurant name).
- Sorting/filter controls (restaurant type, preferences).
- Interactive map with zoom.
- My location marker.
- Area labels.
- Restaurant pins.

Behavior:
- Selecting pin opens Restaurant Detail.
- Map supports zoom in/out and panning.

Acceptance criteria:
- Searching by area updates map viewport and results.
- Searching by restaurant name highlights matching pins.
- Pin tap always opens details for selected restaurant.

## 5.3 Game Setup Screen

Required UI:
- Room name.
- Player mode: single player or play with friends.
- Group source behavior:
- If entered via LINE group, default group is fixed.
- If entered via LINE OA, user chooses from LINE groups.
- Group members join directly from LINE invite link (no room code input).
- Game mode selector: Select Restaurant / Select Menu.
- Filters (restaurant mode):
- Meal type
- Cuisine
- Preferences (halal, vegan, no beef, etc.)
- Location
- Other constraints (price range, parking, near transit)
- Include friends' preferences checkbox.
- Ready/continue button.
- Skip button (defaults to Select Menu mode).

Behavior:
- Single player skips waiting room.
- Group play proceeds to waiting room.

Acceptance criteria:
- Single-player continue routes directly to Swipe.
- Group continue routes to Waiting Room.
- Skip always starts a playable session with default-safe filters.

## 5.4 Waiting Room Screen

Required UI:
- Informative waiting text.
- Share link/URL action.
- Join guidance explicitly states "tap invite link from LINE" (no code entry).
- Member list with profile pictures.
- Nudge friend action for non-joined members.
- Countdown timer.
- Ready/continue button (host only).
- Play mode options:
- Time limit modes (3m, 5m, 15m)
- All Match mode (not available for single-player)

Behavior:
- Host controls session start.
- Nudge sends LINE or in-app notification.

Acceptance criteria:
- Non-host users do not see host-only start control.
- Nudge only targets not-yet-joined users.
- Mode selection is locked at game start and reflected for all members.

## 5.5 Swipe Screen

Required UI:
- Mode indicator: Restaurant / Menu / Saved.
- Include My Preferences checkbox.
- Optional filter/sort controls (especially from shortcut/explore entry).
- Swipe filter presets should include at least:
- Saved
- Saved with partner
- Trendy menu
- End-of-month budget mode (cheap-first)
- Invite Friends button for eligible solo entry states.
- End Game button (host only in group).
- Card stack with swipe gestures:
- Right = Like
- Left = Dislike
- Up = Related restaurants list (menu mode only)
- Save for Later action.
- Craving Boost action (if enabled).
- Match feedback UI (who matched).
- Super Match animation and auto-transition logic.
- Countdown for time-limit mode.
- Promotion area on card (restaurant mode only).

Behavior:
- Explore/shortcut origin can lock certain filter dimensions.
- Host may end game and force transition to results.
- Super Match ends game immediately and routes all participants to results.

Acceptance criteria:
- Swipe actions are deterministic and synced for session members.
- Time mode ends when timer reaches zero.
- Super Match triggers same result state for every participant.
- End Game by host routes all members to Result.

## 5.6 Restaurant Detail Screen

Required UI:
- Restaurant name.
- Categories (for example, Italian/Fast food/Buffet).
- Highlight menu section with image, name, price, description.
- Opening hours.
- Promotion list.
- Location(s), including multi-branch support.
- Other details (parking, pet-friendly, etc.).
- Review section (third-party integration allowed).
- Reservation button.
- Bookmark/Save button.
- Share button.

Acceptance criteria:
- Each restaurant detail must show at least one valid location.
- Save action reflects immediately in user saved state.
- Share action opens supported share target flow.

## 5.7 Result Screen

Required UI:
- Winner result (menu or restaurant depending mode).
- Top 1-3 ranked results.
- Voter breakdown per result.
- Share button (to LINE group).
- Select restaurant button (for Select Menu mode to list matching restaurants).
- End game button returning to Home.

Tie-break logic:
- If top score ties, force re-vote.
- One vote per person.
- Voting shown in popup.
- Notify members to vote.
- Time mode tie-break: 1 minute countdown.
- All Match mode: continue until all votes cast.
- Optional fallback: Let Toast Choose (weighted random based on preferences and location).

Acceptance criteria:
- Tie state cannot be finalized without tie-break resolution.
- One user cannot cast more than one tie-break vote.
- Ending game returns every participant to Home-safe state.

## 5.8 Appointment Setup Screen

Required UI:
- Appointment name.
- Group selection behavior consistent with game setup (LINE group or LINE OA selection).
- Date range selector (max 31 days).
- Start date and end date.
- Continue button.

Behavior:
- Members can later propose available times within selected range.

Acceptance criteria:
- Date range over 31 days is blocked.
- Continue is blocked until required fields are valid.

## 5.9 Appointment Selection Screen

Required UI:
- Monthly calendar view.
- Availability states: Available / Maybe / Unavailable.
- Multi-select date assignment.
- Submit action.
- Member list.
- Nudge button.

Acceptance criteria:
- User can assign one status to multiple dates in one action.
- Submit persists availability and locks user input unless reopened by host/admin rule.

## 5.10 Appointment Result Screen

Required behavior:
- Show best date(s) after submissions.
- Best date criteria:
- Dates where everyone is Available, or
- Dates where at least 70% are Available, or
- Available + Maybe fallback if no stronger match.
- If no date reaches 70% rule, show no-best-date message.
- Notify group via LINE.

Acceptance criteria:
- Multiple best dates can be returned.
- Result message is deterministic from submitted inputs.

## 5.11 Preferences Setup Screen

Required UI:
- Accessible under profile.
- User preferences for cuisine/diet/restrictions and related personalization fields.

Acceptance criteria:
- Updated preferences affect future game filtering when preference inclusion is enabled.

## 6. Cross-Cutting Functional Rules

### 6.1 Session and Roles
- Host-only actions: start game, force end game, certain setup controls.
- Participant actions: swipe, vote, submit appointment availability, nudge where allowed.

### 6.2 Sync and Consistency
- Group sessions require real-time state sync for:
- Members joined status
- Timer
- Swipe outcome aggregation
- Match/super-match transitions
- Result and tie-break state

### 6.3 Notifications and Sharing
- Must support LINE-driven sharing and notification touchpoints:
- Invite links
- Nudge reminders
- Result share
- Appointment updates

### 6.4 Constraint Inheritance from Entry Point
- Explore/shortcut entry may lock one or more filter dimensions.
- Locked dimensions remain visible but not editable, unless user explicitly starts a fresh room.

## 7. Data and Event Requirements (minimum)

Core entities:
- User
- PreferenceProfile
- GameRoom
- RoomMember
- SwipeAction
- MatchEvent
- ResultSummary
- TieBreakVote
- AppointmentRoom
- AppointmentAvailability
- Restaurant
- Menu

Minimum analytics events:
- home_viewed
- shortcut_opened
- game_setup_completed
- waiting_room_joined
- nudge_sent
- swipe_liked
- swipe_disliked
- super_match_triggered
- result_viewed
- result_shared_to_line
- appointment_setup_completed
- appointment_selection_submitted
- appointment_result_viewed
- preferences_updated

## 8. Non-Functional Requirements

- Mobile-first layout inside LINE webview.
- Fast interaction response on swipe (target under 100ms local gesture response).
- Resilient reconnection handling for group sessions.
- Safe fallback states when LINE share/notify fails.

## 9. Open Questions

- Exact behavior of "Saved Mode" in swipe (read-only list vs active playable queue).
- Final priority between timer expiration and super-match race condition.
- Reservation implementation depth (link out vs in-app booking integration).
- Review integration provider(s).
- Which tie-break options are in MVP versus post-MVP.

## 10. Implementation Priority Order

1. Home, setup, waiting room, swipe, result end-to-end with basic filters.
2. LINE invite/share/nudge reliability.
3. Map and restaurant detail integration.
4. Appointment setup/selection/result flow.
5. Preference-driven personalization and advanced polish.
