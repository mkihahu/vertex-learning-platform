# Vertex Homepage Implementation Prompt — from design/vertex-home.png

## Goal
Implement the Vertex Homepage exactly as shown in `design/vertex-home.png` (desktop reference) as the root route `/`. This is the marketing + entry page: hero search pitch, prominent search bar, and All Courses preview grid. Must reuse existing design system tokens and UI primitives and remain responsive (stack on mobile) without deviating from desktop pixel fidelity.

## Skills Read
- `AGENTS.md` sections 3,5,6 (UI work, app structure, tech stack) — server/client boundaries to preserve.
- Prior `prompts/vertex-design-system.md` — tokens already implemented; this phase reuses them.
- `ui-styling` / `impeccable` patterns — Tailwind v4 theming, responsive idioms (implicit, no new skill file needed beyond reuse).
- `node_modules/next/dist/docs` — App Router: `app/page.tsx` is a Server Component by default; client interactivity only where needed (`'use client'` for search input if ⌘K handler etc.).

## Code Inspected
- `app/page.tsx:1-339` — currently a Design System showcase (placeholder). Will be replaced with homepage implementation.
- `app/layout.tsx:1-33` — Inter + Playfair_Display via next/font, antialiased, bg white. Keep as-is.
- `app/globals.css:1-108` — @theme inline tokens: primary 500 #F97316 etc., neutral scale, radius/shadows, type utilities. No changes needed except possible homepage-specific background #FFFBF7 / #FFF9F5 handling.
- `components/ui/navigation.tsx:1-119` — Header/Logo/Breadcrumbs/Pagination. Logo renders orange V. Header currently minimal; homepage header has bell icon + avatar placeholder. Will extend or compose locally.
- `components/ui/button.tsx:1-111` — variants primary/secondary/tertiary/text. Homepage CTA uses primary orange 44-48px height with trailing arrow.
- `components/ui/card.tsx:1-238` — `CourseCard` generic. Homepage cards have larger 48px icon square top-left, serif title, description, footer meta row with 3 items (level, duration, modules) separated by thin divider. Current CourseCard is close but icon is 32px, layout slightly different. Reuse and adapt or create `HomeCourseCard` locally to match spacing exactly.
- `components/ui/input.tsx:1-84` — SearchInput with magnifier left and ⌘K badge. Homepage search is larger, centered, with subtle shadow, rounded-xl, border #E2E8F0-ish. Can reuse styling hook.
- `components/ui/badge.tsx` — not needed on homepage (no badges in view), but tokens reused.
- `lib/utils.ts:1-3` — `cn` helper.
- `package.json` — Next 16.3.3, Tailwind 4 only. No extra deps needed.
- `design/vertex-home.png` — full reference (header, hero pill #FFEEE5 border, heading Playfair Bold ~48px, subtext Inter 14-16 gray, CTA primary orange, search bar white with placeholder, courses grid 3 cols with cards, footer divider with star, bottom blurred gradient bars).
- Other designs in `design/` (vertex-course.png etc.) — confirms card patterns but not in scope.

## Decisions & Assumptions
- **Scope**: Only `/` (homepage). Do NOT implement catalog, course, lesson, search results, auth, Sanity fetches in this prompt. Homepage courses are static placeholders matching the image (3 cards: Next.js for Production, Docker Essentials, TypeScript Deep Dive). Future phase will replace with SANITY GROQ fetch via server client.
- **Header**: Reuse `Logo` from navigation.tsx. Right side: bell icon (inline SVG outline) + avatar image placeholder (rounded-full 32px). Avatar uses `https://i.pravatar.cc/100?img=5` or plain neutral circle if image not desired — use plain div with photo as in reference (shows woman). Use `<img>` with `alt=""` and `object-cover` to avoid extra deps. Nav links: "Courses" (active? In image both are neutral, but Courses appears slightly bolder) and "My Learning" — both href="#" for now.
- **Backgrounds**: Outer page bg #FFFBF7 / #FFF8F5 approximated as `bg-[#FFFBF7]` or `bg-neutral-50` if token close. Hero section has very light peach. Keep outer bg `bg-[#FFFBF7]` (#FFF9F3 close) to match image stripes? Image shows subtle diagonal stripe border on extreme edges — interpret as decorative outer border (`bg-[#FFEEE5]/30` stripes via CSS linear gradient). Simpler: use `bg-[#FFFBF7]` for main and add faint striped side borders via `before` pseudo or wrapper `bg-[linear-gradient(...)]` if easy; if complex, fallback to solid #FFFBF7. Bottom gradient bars — replicate with Tailwind gradient blocks + blur: several vertical bars of orange `bg-primary-300/40` etc with `blur-[1px]`? Match visually but not pixel-perfect required for blur decor.
- **Hero Pill**: `INTELLIGENT LEARNING` uppercase, text 11px tracking-widest, text-primary-500, bg-primary-100/60, border border-primary-100, rounded-full px-4 py-1.5.
- **Heading**: `Search your learning` / `in plain English.` as two lines, centered, `font-playfair` bold 48-52px leading 52px, text-neutral-900.
- **Subtext**: Inter 16px gray-500, centered max-w-md.
- **CTA**: `<Button variant="primary" size="default">Explore Courses <ArrowRightIcon /></Button>` with rounded-md 10-12px, shadow-sm. Link to `/courses` or `#`.
- **Search Bar**: Centered max-w-2xl, `SearchInput`-like but directly with magnifier SVG left `pl-12`, placeholder `Ask anything about your learning...` text-neutral-400, right `⌘ K` badge inside input (`border border-neutral-200 rounded-md bg-white px-2 py-1 text-xs`). Input wrapper: `rounded-xl border border-neutral-100 shadow-sm bg-white h-14`.
- **Courses Section**: Container `mx-auto max-w-6xl px-6`. Header row: left `All Courses` Playfair 24px bold, right `View all courses →` text-primary-500 font-medium 13px.
- **Cards**: 3-column grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Each card: `rounded-xl border border-[#F1E8E1] bg-white p-6 shadow-sm` (border slightly warm vs neutral-200 to match image). Icon: 44-48px rounded-lg — N is black #111 with white N, Docker is white with blue ship SVG (use emoji/simple SVG fallback matching image: blue hull #3B82F6), TS is blue #3178C6 with white TS. Title: font-playfair or Inter semibold 16px, description: text-sm text-neutral-500 leading 20px. Footer: `border-t border-neutral-100 pt-4 mt-auto flex items-center gap-4 text-[11px] text-neutral-500` with icons (bars, clock, layers). Icons small outline 12px.
- **Divider**: Horizontal lines with centered `New courses and lessons added every week.` + orange star outline left. Use `flex items-center gap-4` with `h-px bg-neutral-200 flex-1`.
- **Responsive**: Header nav hidden on mobile (`hidden md:flex`). Hero heading scales down to 36px on small. Cards stack single col. Search bar full width with reduced padding.
- **No client state needed initially**: Keep `app/page.tsx` as Server Component. If ⌘K shortcut added, make SearchBar a `'use client'` child's component `HomeSearchBar`.
- **Reuse vs new**: Prefer reuse of `Card`, `Button`, `cn`, `Logo`. For icons that are course-specific (N, Docker ship, TS), implement as small local components `CourseIcon` prop.

## Files to Touch
- `app/page.tsx` — **replace** design-system showcase with homepage sections (Header, Hero, Search, Courses, FooterDivider, DecorativeBottom). Export default Home.
- `components/ui/navigation.tsx` — optionally add bell/avatar variant or keep header inline in page; if modifying, keep backward compat.
- `components/ui/card.tsx` — if current CourseCard too generic, add props or create local `HomeCourseCard` in page to avoid breaking design-system demo (which currently imports it). Prefer not to break demo; if demo is to be replaced entirely by homepage, card can be updated directly. Decision: update `CourseCard` props to support larger icon variant OR create local component in `app/page.tsx` to avoid coupling. Plan: update `CourseCard` to accept `icon` as ReactNode and adjust sizing to 48px with rounded-lg when used on homepage while keeping default behavior.
- `app/globals.css` — no required change; optionally add homepage background token if needed.
- No new dependencies; no env changes.

## Requirements (from image)
- Header: white bg, bottom border 1px neutral-100, h-14, Logo left, Courses/My Learning nav 14px medium, bell + avatar right (avatar 32px rounded-full).
- Hero: centered, pill uppercase peach/orange, heading serif 48px bold two lines, subtext gray centered 16px, CTA orange button 44px with arrow.
- Search: centered, white input rounded-lg border shadow-sm, magnifier left 18px gray, placeholder gray-400, ⌘K badge right inside input with border.
- All Courses: title serif 20-22px, View all courses link orange right, 3 cards grid equal height.
- Card 1: N black, Next.js for Production, Intermed/18h24m/12 modules.
- Card 2: Docker ship blue, Docker Essentials, Beginner/10h12m/8 modules.
- Card 3: TS blue, TypeScript Deep Dive, Intermed/14h36m/10 modules.
- Footer divider: star outline orange, text 13px gray-600, lines neutral-200.
- Bottom decor: 2 groups of vertical gradient bars peach/orange blurred.

## Security Considerations
- No auth, no tokens, no Sanity fetch, no user input persistence. Homepage is static public.
- Search input does not submit to server yet; if wired, ensure no token exposure, sanitize later at search API (future).
- Avatar image uses external or local; no sensitive data.
- No XSS: all text static, no dangerouslySetInnerHTML.

## Acceptance Criteria
- Visual match to `design/vertex-home.png` on desktop (1440px wide): spacing, typography (Playfair heading, Inter body), colors (primary #F97316, peach #FFEEE5), radii, shadows indistinguishable at a glance.
- `npm run build` succeeds; no type errors.
- `npm run lint` passes (no new warnings).
- Homepage responsive: no horizontal scroll at 375px, cards stack, header collapses nav, hero text wraps correctly.
- Reuses existing `Logo`, `Button`, `Card`/`cn` patterns; no duplicated token values hardcoded outside globals.css (use Tailwind theme colors).
- Search bar and CTA are visually correct and keyboard accessible.

## Checks to Run
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run dev` + manual visual comparison at http://localhost:3000 vs vertex-home.png (Chrome devtools, 1280px and 375px)

## Manual Test Steps
1. `npm run dev`, open http://localhost:3000
2. Header: verify Vertex orange V logo, Courses/My Learning links, bell icon, avatar circle on right, white background with bottom border.
3. Hero: verify peach pill "INTELLIGENT LEARNING", heading "Search your learning / in plain English." in Playfair bold centered, subtext gray centered, orange "Explore Courses →" button.
4. Search bar: verify magnifier left, placeholder "Ask anything about your learning...", ⌘K badge right, white rounded-xl with light border/shadow, centered max-width.
5. All Courses: verify title left serif, orange "View all courses →" right, 3 cards with correct icons (black N, blue Docker, blue TS), titles/descriptions, footer meta with 3 icons.
6. Divider: verify star orange outline + text "New courses and lessons added every week." with lines on sides.
7. Bottom decor: verify blurred peach gradient bars at very bottom.
8. Resize to 375px: verify nav hides, cards stack, hero heading wraps, no overflow.
9. Run `npm run build` and confirm no errors.
