# Vertex Design System Implementation Prompt

## Goal
Implement Vertex Design System (Version 1.0, May 2025) from `design/vertex-designsystem.png` as production Tailwind + React foundations. Provide tokens (colors, typography, spacing, radius, shadows) and reusable UI primitives (buttons, inputs, badges, status, progress, cards, navigation, icons) that later pages (catalog, course, lesson, etc.) can reuse exactly.

## Skills Read
- `ui-styling` / `impeccable` design patterns for tokens
- Next.js App Router docs (`node_modules/next/dist/docs`)
- Existing `app/globals.css`, `app/layout.tsx`

## Code Inspected
- `app/globals.css:1-26` – minimal @import tailwindcss, only --background/foreground, Geist fonts, wrong font family.
- `app/layout.tsx:1-29` – Geist Sans/Mono only, default metadata
- `app/page.tsx:1-69` – boilerplate Next.js starter, to be replaced with design system showcase or kept minimal
- `package.json` – Next 16.3.3, Tailwind 4, no shadcn, no extra deps
- `tsconfig.json` – path alias @/*
- `design/vertex-designsystem.png` – full spec (colors, typography, type scale, spacing, radius/shadows, icons, buttons, inputs, badges, status, progress, cards, navigation, principles)

## Decisions & Assumptions
- Tailwind v4: tokens via `@theme inline` in `globals.css`. No tailwind.config.js needed.
- Fonts: Playfair Display (display) + Inter (body) via `next/font/google`. Keep Geist removal? Remove Geist, add Playfair + Inter variables.
- Colors hex from image: Primary 500 #F97316, 400 #FB923C, 300 #FDBA74, 200 #FED7AA, 100 #FFEEE5; Neutral 900 #0F172A, 700 #334155, 500 #64748B, 300 #CBD5E1, 200 #E2E8F0, 100 #F1F5F9, 50 #FAFAFC, white #FFFFFF. Add as --color-primary-* and --color-neutral-*.
- Typography scale mapped to CSS variables + utility classes (display-1, display-2, heading-1..3, body-lg, body, small).
- Spacing base 4px preserved via Tailwind default; document custom spacing scale 4/8/12/16/24/32/40/48/64.
- Radius: xs 4px, sm 8px, md 12px, lg 16px, xl 24px, full.
- Shadows: sm/md/lg/xl as defined with rgba(15,23,42,…).
- Components: `components/ui/{button,input,badge,card,progress,status}.tsx` using `clsx`/`cva` pattern, variants aligned to spec. No extra dependencies initially; add `clsx` + `tailwind-merge` (or minimal `cn` helper) if needed. Avoid shadcn install overhead if not needed – implement lightweight.
- Icons: use lucide or inline SVGs per spec (Outline vs Filled). Prefer `lucide-react` for outline style + filled variants via class. Spec says 24x24 grid, 2px stroke.
- Page: keep `/` but optionally add `/design-system` showcase; minimal – update `app/page.tsx` to demo tokens/components for visual verification.
- No dark mode divergence – spec is light only; remove prefers-color-scheme dark override or keep neutral.

## Files to Touch
- `app/globals.css` – rewrite with full @theme tokens
- `app/layout.tsx` – swap Geist for Playfair Display + Inter, update metadata, set lang/html classes
- `app/page.tsx` – replace boilerplate with design system demo (optional but helps verification)
- `components/ui/button.tsx` (new)
- `components/ui/input.tsx` (new)
- `components/ui/badge.tsx` (new)
- `components/ui/card.tsx` (new)
- `components/ui/progress.tsx` (new)
- `components/ui/status.tsx` (new)
- `lib/utils.ts` (new, cn helper)
- `components/ui/navigation.tsx` (new, header/breadcrumbs/pagination primitives)
- `package.json` if adding deps

## Requirements (from spec sections)
- Colors: match hex exactly, expose as Tailwind colors `primary-*`, `neutral-*`.
- Typography: Playfair Display for Display 1/2, Inter for rest; sizes/line-heights/weights per Type Scale table.
- Spacing: base 4px, scale values shown.
- Radius & Shadows: 6 radii + 4 shadows.
- Icons: outline + filled styles, 24x24, 2px stroke, rounded caps.
- Buttons: 4 variants (Primary/Secondary/Tertiary/Text) × 3 states (Default/Hover/Disabled), specs 44px height, 16p(g)/12p(md) padding, 12px radius, Inter Medium 14-16px.
- Inputs: Search/Text Input (with ⌘K), Select (Most Relevant), specs height 44px, radius 12px, border 1px solid #E2E8F0, padding 16px, focus border #FB923C.
- Badges: Video (peach), Lesson (lavender), Popular (peach).
- Status: In Progress, Completed, Now Playing, Locked.
- Progress Bar: track + fill, 35% example.
- Cards: Course, Lesson (Video), Lesson (Lesson), Resource – per layout.
- Navigation: Header (Vertex logo, Courses, My Learning), Breadcrumbs, Pagination.
- Principles section preserved as content.

## Security
- No tokens/keys involved. No client token exposure. 
- Ensure fonts loaded via next/font (server optimized, no external CSS injection).
- No XSS – components use React props, no dangerouslySetInnerHTML.

## Acceptance Criteria
- `npm run build` passes, no type errors.
- `npm run lint` passes (or no new warnings).
- Visual match to design/vertex-designsystem.png within tolerance: colors hex identical, typography fonts correct, type scale enforced, buttons/inputs/badges/cards render per spec.
- Components importable from `@/components/ui/*` and reusable.
- `app/globals.css` contains @theme with all tokens, and no leftover Geist variables leaking.

## Checks to Run
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run dev` manual visual check at http://localhost:3000 and /design-system if created

## Manual Test Steps
1. `npm run dev`, open `/` – verify header shows Vertex logo (orange V), Playfair Display titles, Inter body.
2. Check color swatches match hex (use eyedropper or inspect --color-primary-500).
3. Verify button variants: Primary orange #F97316, Secondary outline, Tertiary outline+icon, Text orange link; hover darkens to deeper orange, disabled shows muted peach.
4. Verify inputs: search field rounded 12px, border #E2E8F0, focus orange #FB923C.
5. Verify badges: VIDEO peach bg, LESSON lavender, POPULAR peach.
6. Cards: 4 types render with correct padding, radius, shadows, metadata line (Intermediate • 18h 24m • 12 modules etc).
7. Progress bar 35% filled orange.
8. Navigation: breadcrumbs with › separators, pagination with active orange square.
9. Run `npm run build` – no errors.
