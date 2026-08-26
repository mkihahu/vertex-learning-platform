# Vertex Content Model + Server Data Layer — Implementation Prompt

## Goal
Implement the Sanity content model and Studio for Vertex plus the server-side read client and data layer. This covers AGENTS.md sections 5, 8, 12: two standalone workspaces (Studio schema) + web data access that reads a private dataset via a server-only token.

Scope is **content model + data layer only** — no catalog/course/lesson pages, no search, no Clerk gating, no PostHog wiring, no video ingestion. Just the schema authors can use and the server code pages will import.

## Skills Read
- `sanity-best-practices` (`~/.agents/skills/sanity-best-practices/SKILL.md`) — quick-ref + when to load `references/schema.md`, `references/nextjs.md`, `references/groq.md`, `references/image.md`, `references/portable-text.md`, `references/typegen.md`.
- `sanity-migration` (reference, not executing a migration) — confirms NDJSON shape in `seed.ndjson` and that object vs document modeling is correct.
- `node_modules/next/dist/docs` — App Router server/client boundaries; data fetching must stay server-only.
- AGENTS.md §5 (app structure), §6 (tech stack), §7 (decisions), §8 (data shape), §12 (trips), §13 (checks).

## Code Inspected
- `sanity.config.ts:1-28` — Studio at `/studio`, uses `sanity/env` + `sanity/schemaTypes` + `sanity/structure`, visionTool enabled. Client basePath is `/studio` (embedded mount via `app/studio/[[...tool]]`). Per AGENTS.md §5 the project wants two standalone workspaces, but current repo is the Next.js template with embedded Studio. Decision below keeps `sanity/` at repo root and leaves mount as-is for now, but documents migration to separate studios.
- `sanity.cli.ts:1-10` — `defineCliConfig` reads `NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET`; will need to support `SANITY_API_READ_TOKEN` env for server client but CLI itself not changed.
- `sanity/env.ts:1-20` — exports `apiVersion`, `dataset`, `projectId` from `NEXT_PUBLIC_` vars with `assertValue`. Missing token, missing `SANITY_API_READ_TOKEN` handling.
- `sanity/schemaTypes/index.ts:1-5` — empty `types: []`. No schema yet.
- `sanity/structure.ts:1-7` — default `S.documentTypeListItems()` list. Needs grouping for course/lesson etc.
- `sanity/lib/client.ts:1-10` — `createClient({ projectId, dataset, apiVersion, useCdn:true })`. Uses CDN, no token, not server-only, not `perspective: published`, no `stega` handling. Will be split into read client (server) vs live draft handling.
- `sanity/lib/image.ts:1-10` — `createImageUrlBuilder({projectId, dataset})` + `urlFor`. Needs to stay but import from server env, and be reusable with new client.
- `sanity/lib/live.ts:1-9` — `defineLive({client})` — currently uses the same CDN client; after split should use server client with token or keep draft perspective via separate config.
- `app/studio/[[...tool]]/page.tsx` — `NextStudio` with `force-static`. OK.
- `package.json:1-32` — `next 16.3.3`, `sanity 6.11.0`, `next-sanity 13.3.3`, `@sanity/image-url 2.1.1`, `@sanity/vision 6.11.0`, `styled-components 6.5.3`. No `server-only` package, no `zod` yet (not needed for this phase), no `@portabletext/react` yet (required per AGENTS.md §6 for notes rendering; add as dep).
- `tsconfig.json:1-34` — `@/*` alias, bundler resolution.
- `next.config.ts:1-7` — empty.
- `.env.local:1-10` — has `NEXT_PUBLIC_SANITY_PROJECT_ID=3h1k0yhp`, `NEXT_PUBLIC_SANITY_DATASET=production`, Clerk keys, no `SANITY_API_READ_TOKEN`, no `SANITY_API_VERSION`.
- `seed.ndjson:1-141` — real content: 5 categories, 5 instructors, 12+ lessons, 1 course `nextjs-app-router-in-depth`, etc. Shape confirms: `course.modules[]` is object array with `_type: module`, each module has `title`, `summary`, `lessons: reference[]`; `lesson` has `title`, `slug`, `videoUrl`, `thumbnail` (image), `duration`, `freePreview`, `studentCount`, `notes` (Portable Text), `keyPoints?`, `proTip?`, `resources?`; `instructor` has `name`, `slug`, `photo`, `expertise[]`, `bio` (PT); `category` has `title`, `slug`, `description`.
- `videos.json:1-842` — offline video metadata (YouTube ids); not imported yet but informs `video` document shape.
- `videos.json` vs AGENTS.md §8/9 — `video` doc should have `url`, `chapters: {startSeconds,label}[]`, `chunks: {startSeconds,text}[]`.

## Decisions & Assumptions
- **Schema modeling:**
  - `instructor` document: `name` (string, required), `slug` (slug from name, required, unique), `photo` (image with hotspot + alt), `expertise` (array string tags), `bio` (array block Portable Text).
  - `category` document: `title` (string, required), `slug` (slug from title), `description` (text).
  - `lesson` document: `title` (string, required), `slug` (slug from title, unique), `videoUrl` (url, required, validation https + provider hint), `thumbnail` / `poster` (image), `duration` (number minutes/seconds as in seed: seconds integer), `freePreview` (boolean, default false), `studentCount` (number), `notes` (Portable Text: `defineArrayMember({type:block})` plus optional custom blocks later), `keyPoints` (array string or block? Per AGENTS.md: short list for "in this lesson you will" — model as `array` of `string` with validation maxLength 120, or `array` of object with `point` string — choose `array` of `string` for simplicity matching seed which uses `keyPoints`? Inspect seed: lessons have notes bullets but no `keyPoints` top-level yet; support both by modeling `keyPoints` as `array` of `string` and render accordingly), `proTip` (text or portable text? Model as `text`), `resources` (array object `{type, title, description, url}` where `type` is string enum e.g. `article|video|doc|github`).
  - `course` document: `title` (string, required), `slug` (slug), `summary` (text, required), `coverImage` (image), `level` (string enum `beginner|intermediate|advanced`), `price` (number, min 0), `popular` (boolean), `studentCount` (number), `instructor` (reference instructor), `category` (reference category), `learningOutcomes` (array object `{icon, title, description}` icon is string enum `layers|workflow|gauge|rocket|...` limited to design system icons), `modules` (array object `module` **not** document — per AGENTS.md it is embedded object). Module object: `title` (string), `summary` (text), `lessons` (array reference lesson, with validation unique). Course validation: at least one module if published.
  - `video` document: `title` optional, `url` (url, required, unique), `chapters` (array object `{startSeconds:number, label:string}`), `chunks` (array object `{startSeconds:number, text:text}`), `duration`? Derive. Keep `video` hidden from default listing or grouped under "Internal". Its `id` stripping logic belongs to ingestion, not schema — but validation ensures `url` is unique.
  - Optional but per AGENTS.md §8: `progress` is app state, **not** a Sanity document. Do not create a Sanity schema for it — it will live in DB/KV later via server route. Document this as intentional omission.
  - Agent context document: per §10, do not model via schema now — creation is via `dial-your-context` skill / import. Note in prompt that context doc is out of scope for this phase unless dataset missing.
- **Object vs document:** Follow guardrails: `module`, `learningOutcome`, `resource`, `chapter`, `chunk` are `defineType` with `type:object` (or inline `defineField` objects). `course/lesson/instructor/category/video` are documents.
- **Slug/ID:** Let Sanity generate `_id` for normal docs. For seed determinism, keep ability to `createOrReplace` with explicit IDs on import (seed uses `course.nextjs-app-router-in-depth` etc.). Schema does not hardcode IDs.
- **Validation & previews:** Add `validation: Rule => Rule.required()` where fixed by AGENTS.md, add `preview` with `title` + `subtitle` + `media`. Add `orderings` for course `popular`, `studentCount`.
- **Studio structure:** Group into `Courses`, `Lessons`, `Instructors`, `Categories`, `Videos (internal)` via `structureTool`. Singletons not needed.
- **Data layer — server-only client:**
  - Create `sanity/lib/serverClient.ts` (or extend `sanity/lib/client.ts`) that is `import 'server-only'` and uses `SANITY_API_READ_TOKEN` (private, no `NEXT_PUBLIC_` prefix) with `useCdn: false`, `perspective: 'published'`, `stega: false`. Current `sanity/lib/client.ts` is CDN public client — keep it for image builder / draft preview but export a second `serverClient`.
  - Alternatively refactor `sanity/lib/client.ts` to export both `client` (public, CDN) and `serverClient` (private). Decision: keep `client` for image/live, add `serverClient` that asserts `process.env.SANITY_API_READ_TOKEN` and throws descriptive error if missing in production (but allow build to pass with mock if not set? Prefer fail loudly only at runtime, not at build import time — use lazy assert inside fetch helper).
  - Create `sanity/lib/fetch.ts` with `sanityFetch` helper wrapping `serverClient.fetch` with `defineQuery` typing pattern, default `perspective: published`, `useCdn:false`, `next: { revalidate: 60 }` or `tags` for ISR. Export `sanityFetch` that is server-only.
  - Create `sanity/queries.ts` (or `sanity/lib/queries.ts`) with GROQ via `defineQuery` for: `courses` list, `courseBySlug`, `lessonsByCourse` reverse reference (`*[_type=="course" && references(^._id)]` or `*[_type=="lesson" && _id in ^.modules[].lessons[]._ref]`), `lessonBySlug` with parent course derivation (`*[_type=="course" && ^._id in modules[].lessons[]._ref]{title,slug,...} | order(...) [0]`), `instructorBySlug`, `categoryList`. Also projection for `plainText` notes: `pt::text(notes)` for search (future).
- **TypeGen:** Enable `sanity.cli.ts` / `sanity.config.ts` typegen? For now document that `npx sanity schema extract` + `npx sanity typegen generate` will be run after schema deploy. Add `sanity/types.ts` placeholder generation step — not hand-written.
- **Env:** Add `.env.example` entry for `SANITY_API_READ_TOKEN` and `NEXT_PUBLIC_SANITY_API_VERSION`. Keep `.env.local` requires `SANITY_API_READ_TOKEN` for server client. Instruct that browser never sees it — enforce via `server-only`.
- **Dependencies:** Add `server-only`, `@portabletext/react`, `@portabletext/types`. Verify `next-sanity` already provides `defineQuery`.
- **Not building:** Two standalone workspaces split (AGENTS.md §5 says separate Studio workspace). Current repo uses embedded Studio; do not split workspaces in this phase (would be breaking). Document as follow-up. Do not embed Studio inside Next.js beyond existing mount — keep as-is.
- **Seed alignment:** Schema field names must match `seed.ndjson` exactly (`title`, `slug`, `summary`, `coverImage`, `instructor`, `category`, `level`, `price`, `popular`, `studentCount`, `learningOutcomes` with `icon/title/description`, `modules` with `title/summary/lessons`, `videoUrl`, `thumbnail`, `duration`, `freePreview`, `notes`, etc.) otherwise import fails. Align level values: seed uses `"intermediate"` lowercase — enum must include lowercase.

## Files to Touch
- `sanity/schemaTypes/instructor.ts` (new) — defineType document
- `sanity/schemaTypes/category.ts` (new)
- `sanity/schemaTypes/lesson.ts` (new) — with resource object `sanity/schemaTypes/objects/resource.ts` OR inline
- `sanity/schemaTypes/course.ts` (new) — with module + learningOutcome objects (`sanity/schemaTypes/objects/module.ts`, `learningOutcome.ts`)
- `sanity/schemaTypes/video.ts` (new) — chapters/chunks objects
- `sanity/schemaTypes/index.ts` — export `schema.types = [instructor, category, lesson, course, video, ...objects]` (Note: objects not listed as types if inline, but if standalone object types with `type:object` they must be included)
- `sanity/structure.ts` — group list: Courses, Lessons, Instructors, Categories, Videos (internal)
- `sanity/env.ts` — add `readToken` export? Or keep token only in serverClient; keep `apiVersion` default `2025-01-01`/`2026-08-25` logic.
- `sanity/lib/client.ts` — keep public client, add `serverClient` export or create `sanity/lib/serverClient.ts`
- `sanity/lib/fetch.ts` (new) — server-only sanityFetch wrapper
- `sanity/lib/image.ts` — ensure uses server env correctly; no token needed.
- `sanity/queries.ts` (new) — GROQ queries with `defineQuery`
- `sanity/types.ts` (generated, not hand-written; add to .gitignore if needed and document gen command)
- `.env.example` (new) — canonical list: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN` (server), plus Clerk/PostHog placeholders.
- `package.json` — add `server-only`, `@portabletext/react`
- `tsconfig.json` — no change (ensure `server-only` types work)
- `sanity.config.ts` — no change needed unless adding plugins; keep.

## Requirements (from AGENTS.md §8 + seed + §12)
- Course has title/slug, summary, coverImage, level, price, popular, studentCount, learningOutcomes[{icon,title,description}], instructor ref, category ref, modules[{title,summary,lessons: ref[]}] ordered; numbers derived from order.
- Module is embedded object, not document.
- Lesson has title/slug, videoUrl, thumbnail/poster, duration, freePreview, studentCount, notes (Portable Text), keyPoints, proTip, resources[{type,title,description,url}]; lesson does NOT store parent course (derive via reverse ref in queries).
- Instructor has name/slug, photo, expertise[], bio (PT) + page.
- Category has title/slug/description.
- Video has id/url, chapters[{startSeconds,label}], chunks[{startSeconds,text}]; never return whole chunks in page queries (projection limited).
- Progress is app state, not Sanity — do not model.
- Env: projectId/dataset from NEXT_PUBLIC_, readToken server-only, no public dataset, no client token.
- Server client: `useCdn:false`, `perspective:published`, token private, `server-only` guard, no browser import.
- Queries use `defineQuery`, `pt::text()` for Portable Text projection, `*[_type=="course" && slug.current==$slug][0]` etc.
- Image fields use hotspot, alt text.

## Security Considerations
- Dataset is private: keep `SANITY_API_READ_TOKEN` server-only (`import 'server-only'`), never prefix with `NEXT_PUBLIC_`, never expose to client, fetch all content server-side. Guard `sanity/lib/fetch.ts` with `server-only`.
- Clerk secret stays server-only (already `CLERK_SECRET_KEY`); PostHog public key is client-safe — not in scope but note not to reuse token.
- No client-side `sanity` writes; progress writes (future) go via server route with write token — not this phase.
- Validate URLs (videoUrl) to https only.
- Escape backticks in any inline system prompt (not this phase).

## Acceptance Criteria
- `sanity/schemaTypes` exports 5 document types matching AGENTS.md §8 names/types exactly as seed expects; `npx sanity schema extract` succeeds without validation errors.
- Studio at `/studio` shows groups: Courses, Lessons, Instructors, Categories, Videos; creating a course with modules→lessons refs validates; lesson notes renders Portable Text; image fields show hotspot.
- `seed.ndjson` imports cleanly via `npx sanity dataset import seed.ndjson production --replace` (or `createOrReplace`) with no missing-field errors; count checks: categories 6, instructors 5, lessons ≥12, courses ≥1.
- Server client: importing `sanity/lib/fetch` or `sanity/lib/serverClient` from a client component throws at build/runtime due to `server-only`; importing from a server component succeeds and fetches published docs with token (or gracefully errors if token missing with clear message).
- Queries: `courseBySlug`, `lessonBySlug` (with derived parent course), `courses` list, `instructorBySlug` return typed results via `defineQuery` + TypeGen (or at least raw GROQ works in Vision).
- `npm run lint` passes; `npx tsc --noEmit` passes; `npm run build` passes (requires `SANITY_API_READ_TOKEN` dummy if not set — doc how to set).
- No new public dataset, no embedded Studio split, no client token leakage (`grep -r SANITY_API_READ_TOKEN` shows only `sanity/lib/serverClient` and `.env.example`).

## Checks to Run (from §13)
- In web: `npx tsc --noEmit`, `npm run lint`, `npm run build` (when server code changed), `npm run dev` + open `/studio` (Vision query test).
- In Studio: `npx sanity schema extract` (or `npx sanity typegen generate`), `npx sanity deploy` dry-check (or at least `npx sanity schema validate`), and `npx sanity dataset import seed.ndjson production --replace` (if dataset available; otherwise `npx sanity dataset import seed.ndjson production --dry-run` or show import command).

## Manual Test Steps
1. Add `SANITY_API_READ_TOKEN` to `.env.local` (create via sanity.io/manage → project 3h1k0yhp → API → Tokens → Viewer). Copy `.env.example` to `.env.local` for missing keys.
2. `npm run dev` → open `http://localhost:3000/studio` → verify left nav groups: Courses, Lessons, Instructors, Categories, Videos (internal). Create a test lesson, add Portable Text note, add resource, publish — no validation errors.
3. Vision Tool: run `*[_type=="course"][0]{title, slug, modules[]{title, lessons[]->{title, slug}}}` → returns Next.js App Router course with 3 modules and lesson refs.
4. Vision: `*[_type=="lesson" && slug.current=="nextjs-app-router-in-depth-file-system-routing"][0]{title, videoUrl, duration}` → matches seed.
5. `*[_type=="instructor"][0]{name, expertise}` → returns instructor.
6. Test server client: create `app/test-sanity/page.tsx` (temporary, server component) that does `import { sanityFetch } from '@/sanity/lib/fetch'` + `import { coursesQuery } from '@/sanity/queries'` and renders `JSON.stringify(await sanityFetch(coursesQuery))`; `npm run dev` → `/test-sanity` shows courses JSON; then try importing `sanityFetch` from a `'use client'` component — build should error due to `server-only`.
7. `npx tsc --noEmit` — 0 errors.
8. `npm run build` — succeeds; inspect build output for `/studio` route.
9. `npx sanity schema validate` (or `npx sanity typegen generate` if configured) — passes.
10. `npx sanity dataset import seed.ndjson production --replace` — counts match `wc -l seed.ndjson` (141 docs).
11. Remove temp test page; commit.

## Out of Scope
- Catalog/course/lesson/instructor pages, search API/MCP, Clerk gating, PostHog, progress tracking, video ingestion pipeline, @sanity/context plugin, search config document.

