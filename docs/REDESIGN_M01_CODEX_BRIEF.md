# Extreme Studios — Developer Portfolio 2.0
## Codex M01 execution brief — 2026-11-02

**Target agent:** Codex GPT-6.1 Sol, Medium thinking
**Repository:** https://github.com/Extreme-Studios/extremestudios
**Work branch:** `feat/developer-portfolio-redesign-2026-11-02`
**Protected baseline:** `backup/pre-redesign-2026-11-02` at `e415795c2c96987cfbe7821b9e489ee2ac67d314`
**Default/production branch:** `main` — DO NOT MODIFY.

## 0. Non-negotiable safety rules
1. Work ONLY on the existing `feat/developer-portfolio-redesign-2026-11-02` branch. If local repo state differs, inspect and report before editing; do not discard user changes or force-reset.
2. Never push, merge, rebase, cherry-pick, or deploy to `main`. No production domain, DNS, Vercel production configuration, database, storage, secrets, or live APIs may be mutated. No `vercel --prod`; no auto-merge.
3. Check the backup and baseline SHA before work. Do not modify or delete the backup branch. Git backup contains code/history only; deployment env vars and any external state require separate rollback safeguards.
4. Preserve existing working routes, public assets/image URLs, project slugs, content exclusions, metadata, sitemap/robots, DIANA chat API behavior, Telegram routing, and MUA demo. Never print or commit credentials.
5. Before installing third-party skills or UI components, inspect their provenance/source and licenses. Do not execute external install scripts blindly. No need to run Claude Code: this project uses Codex.
6. Produce a local preview/build and report; any actual production release needs an explicit later approval.

## 1. Context from audited repository
- Next.js App Router 14.2.0, React 18, Tailwind CSS 3; Vercel-oriented.
- Current home: `app/page.js` composes GlobalParticleField, Navbar, Hero, CinematicJourney, Contact, Footer, DianaChat.
- `components/Hero.js` is already a cinematic portal/stage.
- `components/CinematicJourney.js` has manually coded scroll progression and a long narrative.
- `components/GlobalParticleField.js` is a custom WebGL shader/particle field, using thousands of particles and pointer/scroll transforms. Avoid stacking additional heavy effects blindly.
- `app/globals.css` is already large (approx. 110 KB). Audit and isolate new styles rather than dumping duplicated overrides.
- `data/apps.js` stores existing project entries. Representative projects: DIANA, Guitar FX, PARFI Jatim, Movie HUB, Auto Cut Video, Extreme Studios HUB; do not invent outcomes, clients, or numbers.
- DIANA and MUA routes are functional features that must remain intact.
- Existing `/projects` copy states Bunda Sehati should not be displayed; maintain content exclusion requirements rather than inadvertently revealing everything in the catalog.

## 2. Creative direction and target positioning
Transform the site from a generic technology studio sales landing page into an **authoritative developer-first portfolio**, while retaining Extreme Studios as the brand. The viewer should immediately understand: independent developer/system builder with real expertise in AI engineering, full-stack web, automation, Android, interactive/Unity workflows, and shipping complete systems.

Mood: **premium technical, futuristic but professional**, not a cyberpunk gaming UI, dashboard template, or excessive neon. High information hierarchy, credible case studies, intentional micro-interactions, excellent mobile experience.

Suggested palette: near-black/navy `#070A12`, neutral surfaces `#111827`, electric cyan `#48DDF3`, restrained violet `#906BFF`, off-white `#EEF5FF`. Typography: expressive modern grotesk for headlines + monospace for technical labels, installed through Next.js font optimization or reliable system stacks. Maintain AA contrast.

Tone: Indonesian primary with short English technical microcopy where natural. Make the copy sound like a builder, not a big agency. Never invent credentials, client testimonials, quantified KPIs, years or availability status.

## 3. Reference video — method, not copy
The uploaded tutorial (INS_20261102_170013_001.mp4) demonstrates a four-part approach:
- AI coding agent (shown: Claude Code; here use **Codex 6.1 Sol Medium**).
- `framer-motion` animation library.
- UI/UX Pro Max skill as design-process reference.
- 21st.dev community components as inspiration for high-quality animated UI.

Use **Framer Motion** only after checking compatibility with installed React/Next versions. 21st.dev and UI/UX skills are OPTIONAL inspiration, not automatic dependencies. Prefer custom, maintainable accessible components; review and adapt any adopted third-party code/licenses. Do not reproduce the tutorial site's branding or layouts 1:1.

## 4. M01 scope — working design foundation + hero, not unfinished mockups
**Deliver functioning code on the development branch:**
- Audit all routes, dependencies, existing effects, and expected production features. Record `docs/REDESIGN_M01_AUDIT.md` with before-state and risks.
- Establish a coherent global design system (color tokens, type scale, spacing, buttons, surfaces, focus states) without breaking existing routes. Use component-scoped styles where practical.
- Redesign Navbar with concise developer-oriented navigation, active section awareness, accessible mobile menu, visible focus states, and working links.
- Redesign Hero with an intentional tech/developer visual: interactive terminal/code-to-product schematic or modular system nodes, using real project categories and tasteful depth, pointer response, and reveal animations. Make it clear that Extreme Studios is a hands-on developer portfolio. Use purposeful CTAs: `View Projects`, `Explore Capabilities` or `Contact`.
- A compelling project preview (at least 3 existing actual projects) with interactive hover/reveal and detail links, reusing real data and working media. Avoid fabricated screenshot assets.
- Integrate motion thoughtfully: staggered entrance, scroll reveal, hover/tap feedback, restrained parallax, nav transitions. Do not create scroll-jacking, auto-playing loud sound, or inaccessible motion.
- Make desktop and mobile genuinely responsive at 360px, 768px, and 1440px; no horizontal overflow.
- Respect `prefers-reduced-motion`, keyboard navigation, semantics, and low-powered devices. Degrade gracefully without WebGL; pause hidden-tab animation; avoid multiple competing continuous render loops.
- Ensure all existing functional routes including `/profile`, `/projects`, dynamic project detail, `/mua`, `/demomua`, `/privacy`, `/terms`, `/disclaimer`, `/api/diana` are preserved. Do not rewrite their business/API logic during M01.
- Keep changes focused. A developer narrative needs actual projects and architecture, not a stock dashboard or template sections.

## 5. Visual interaction specification
Hero: compact status bar (e.g. `EXTREME STUDIOS / SYSTEM BUILDER`), headline with bold technical positioning, 1–2 lines of plain-language description, CTA, and an animated custom system scene. Interactive scene may depict `PROMPT → AI AGENT → API → WEB / ANDROID` or code/build/deploy states. It must work with clicks and keyboard, or be correctly marked decorative; never pretend a fake command executed on a real backend. Limit constant movement.

Portfolio: filters/tags only when functional, descriptive titles, stack/role/status only when verified, accessible cards with consistent hover/focus states. Prioritize DIANA, PARFI Jatim, and an Android or desktop product based on available real assets.

On scroll: use consistent reveal grammar and gentle scene progression. Optimize intersection/scroll listeners, rAF usage, animation layout stability, and GPU layers. Provide reduced-motion fallback and no forced cursor effects on touch devices.

## 6. Acceptance tests and deliverables
1. Install dependencies from lockfile with `npm ci`; run `npm run build`, `npm run lint` only if script works, and report failures honestly. If lint tooling is absent, report instead of falsely claiming pass.
2. Run local preview; capture before/after desktop and mobile screenshots if tooling available. Check console errors and mobile overflow.
3. Smoke test navigation, project links, contact flows, DIANA widget and API integration safely without live writes, project details and MUA routes.
4. Record accessibility/performance issues; do not claim PageSpeed or FPS scores unless measured.
5. Commit to **development branch only**, with clear summary of files changed and decisions.
6. Write `docs/REDESIGN_M01_REPORT.md`: branch + commit SHA, touched files, visual design direction, dependency rationale, executed tests and outcomes, known issues, screenshots/preview instructions, next milestone recommendation.
7. Stop after M01 and request owner review of preview before starting M02. No production deployment.

## 7. Suggested phased continuation
- M02: detailed interactive case studies, connected system/pipeline visualization, polished scroll storytelling, project filtering/experience.
- M03: responsive UX, accessibility, measured performance, SEO/regression and production readiness checklist.
- Only after explicit owner approval: a controlled production deployment, verification, and rollback test.

## 8. Rollback principles
- Backup branch: `backup/pre-redesign-2026-11-02`
- Baseline commit: `e415795c2c96987cfbe7821b9e489ee2ac67d314`
- Before any future production release, document the exact active deployment ID, `main` SHA, domain binding, environment variable configuration/availability, and whether Vercel rollback is usable. Backup branch is NOT a backup of Vercel settings/secrets or external data.
- Prefer restoring/redeploying the known-good deployment via hosting controls when the change is purely visual. If code rollback is needed, create a revert PR rather than forcibly rewriting shared branch history.
