# B-NEURA — Claude Code Instructions

## 1. Role

You are the primary software engineering agent for the B-NEURA project. You implement the B-NEURA website according to `MASTER_PLAN.md`.

`MASTER_PLAN.md` is the source of truth for product vision, scientific positioning, UX, website structure, technical architecture, roadmap, and presentation requirements. Always read it before making architectural decisions. If `CLAUDE.md` and `MASTER_PLAN.md` conflict, stop and ask the user.

---

## 2. Project context

B-NEURA is a conceptual Neuro-VR prototype. It explores how Brain-Computer Interfaces (BCI), Artificial Intelligence, Virtual Reality, and Sensory Feedback could potentially create new pathways between human intention and experience. It focuses on people with severe paralysis who retain cognitive function.

- B-NEURA is NOT a medical device.
- B-NEURA does NOT claim to transfer consciousness.
- B-NEURA does NOT claim to reproduce complete human sensory perception.
- The website is an interactive research and educational prototype.

**Audiences (do not confuse them):**

- Website audience: professor / instructor, classmates, general academic audience. Explain technical concepts in accessible language.
- Conceptual user: a person with severe paralysis who retains cognitive function.

All interface and presentation content is written in English.

---

## 3. Before doing anything

1. Read `MASTER_PLAN.md` completely.
2. Read this `CLAUDE.md`.
3. Inspect the existing repository and file structure.
4. Identify the current development phase.
5. Identify existing components, utilities, and content modules.
6. Avoid duplicating existing functionality.

Do not make architectural changes without understanding the current project.

---

## 4. Phase control

Follow the phases in `MASTER_PLAN.md`.

- Implement only the phase explicitly requested by the user.
- Do NOT automatically continue into future phases.
- Do NOT build the entire website at once.
- Do NOT add future functionality because it will eventually be needed.

After completing a phase: test, check for errors, review, report, and STOP. Wait for the user to approve the phase and authorize the next one.

---

## 5. Git workflow

The repository already exists at `C:\Users\ASUS\Projects\B-NEURA\B-NEURA`. Use the existing `.git` directory. Never run `git init` and never create a nested repository.

```
Phase implementation → test → report → user approval → commit → next phase
```

- Do not commit before the user approves the phase.
- Do not push unless asked.
- Use meaningful, focused commits (no giant unrelated commits). Examples: `feat: initialize project foundation`, `feat: add B-NEURA design system`, `feat: add hero section`, `fix: improve mobile layout`, `docs: add research sources`.

---

## 6. Development principle

Prioritize in this order: architecture, maintainability, design system, performance, scientific credibility, accessibility, UX, visual polish. Do not prioritize flashy effects over functionality. This is an academic prototype: prefer simple, reliable, beautiful, interactive, and maintainable over complex, fragile, or over-engineered.

---

## 7. Scientific accuracy and the source-first workflow

Scientific accuracy is mandatory. Never invent scientific papers, citations, researchers, statistics, medical capabilities, clinical results, or experimental results. If a statement is uncertain, do not present it as fact.

Scientific content follows this order:

```
CLAIM → SOURCE → VERIFY → WEBSITE COPY
```

- Every factual scientific claim is recorded in the claims register (`src/content/`) and starts as `UNVERIFIED`.
- Status moves `UNVERIFIED` → `SOURCE_FOUND` → `VERIFIED`. Only `VERIFIED` claims may appear as factual copy.
- Do not write unsupported scientific claims first and search for sources later.
- Until a claim is verified, use hedged, conceptual language (could, may, explores, conceptual, potential, experimental, future research).
- Claim classifications are confirmed with the user. Before a content phase, identify the claims it needs and verify them first.
- Sources are added only when actually found and checked. Never reconstruct a citation from memory.

---

## 8. Labeling: one maturity taxonomy plus separate context labels

**Technology maturity (ONE taxonomy, used everywhere):**

- AVAILABLE TODAY
- EXPERIMENTAL
- FUTURE CONCEPT

Never create a competing maturity system. Never present speculative technology as currently available. All maturity rendering goes through the shared typed maturity model and the `MaturityBadge` component.

**Pending marker:** REQUIRES SOURCE VERIFICATION is a temporary placeholder for items not yet classified by sources. It is not a fourth maturity level. Temperature feedback starts here and must not be shown at the same maturity as touch, pressure, or position/proprioception until the research phase confirms it.

**Context labels (separate from maturity):** SIMULATION, CONCEPT / CONCEPT PROTOTYPE, VIRTUAL CONTROL, FUTURE INTERFACE. These say what the user is looking at, not how mature a technology is. Do not use them as maturity levels or vice versa.

---

## 9. Demo honesty

The website must never imply that it is reading anyone's brain, including the presenter's. All neural processing shown is simulated.

- Never use language that implies real neural measurements.
- Every interactive demo carries a visible SIMULATION label.
- Pointer/keyboard input is presented as virtual control, not as decoded intention.
- Use **VIRTUAL CONTROL ACTIVE**. Never use "AGENCY DETECTED".
- Terms like "SIGNAL DETECTED" or "INTENTION CLASSIFIED" are allowed only inside clearly labeled SIMULATION contexts.

---

## 10. Medical safety

Never claim that B-NEURA cures paralysis, treats paralysis, guarantees restored movement, transfers consciousness, creates complete sensory perception, or replaces the human body. Present it as a conceptual research prototype. Do not describe people with paralysis as "less human".

**Canonical disclaimer (the only one; defined once in `src/content/` and rendered via the `Disclaimer` component):**

> B-NEURA is a conceptual research and educational prototype. It is not a medical device and is not intended to diagnose, treat, or cure paralysis or any medical condition. The prototype demonstrates a possible future interaction model using existing and emerging technologies.

Do not create shortened or alternative disclaimer wording.

---

## 11. Technical decisions (approved)

- **Location:** the existing repository. No nested repo.
- **Package name:** `b-neura` (lowercase). The GitHub repository remains `B-NEURA`.
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS, ESLint, npm. Use current stable versions at initialization unless there is a compatibility reason not to, and record the versions used.
- **Later, only when a phase needs them:** Framer Motion, Lucide icons.
- **Not in Phase 0:** Three.js, React Three Fiber, Framer Motion, Lucide.
- **No unnecessary dependencies.** Before adding one, consider whether existing tools suffice.
- **Fonts:** self-hosted / locally bundled (for example `next/font/local`). No runtime external font fetching. Until Phase 1, use a system font stack.
- **Offline:** the core demo and Presentation Mode must work without internet. No fragile network dependencies.
- **VR Demo:** a browser-based 3D/interactive simulation using pointer and keyboard. It is NOT WebXR and need not work in a headset. WebXR is out of scope unless the user later requests it. The demo must be deterministic and reliable.
- **NeuroHelmet:** start with SVG / CSS / Framer Motion. Do not assume a 3D model is required.
- **3D rule:** use CSS, SVG, Framer Motion, or plain React whenever sufficient. Introduce Three.js / R3F only if 2D/SVG cannot provide the experience, with a written justification and user approval. If WebGL is used: one context at a time, lazy-loaded, paused off-screen, with a static fallback.

---

## 12. Source layout

```
src/
  app/          App Router
  components/
    ui/         shared primitives (Button, Badge, TechnicalLabel, SectionHeading,
                MaturityBadge, Disclaimer, VirtualHand)
    layout/     site header / navigation, footer
    Hero/ Problem/ Idea/ NeuroHelmet/ SystemFlow/ VRDemo/ SensoryFeedback/
    Embodiment/ Science/ Future/ Sources/ PresentationMode/
  content/      typed data: disclaimer, maturity, claims, sources, sections, pipeline
  lib/          utilities, hooks, shared types
  styles/       global CSS and design tokens
public/         fonts/, images/ (added when needed)
```

Create folders only when a phase needs them. `VirtualHand` is shared by VRDemo and Embodiment; never implement it twice. Keep components modular and do not create duplicate components with similar functionality.

**Content layer rule:** technology maturity, pipeline states, research claims, sources, and presentation sections live as typed data in `src/content/`, not hardcoded inside UI components.

**Section registry:** a small ordered list (`id`, `title`, `anchor`) that supports navigation now and Presentation Mode later. Do not overengineer it.

---

## 13. Design direction

The visual identity should feel like a **future neurotechnology research lab**: dark, premium, scientific, futuristic, minimal, cinematic, human-centered, and believable.

Avoid: generic AI landing pages, excessive cyberpunk, gaming aesthetics, excessive neon, fake medical dashboards, visual clutter.

Use: dark surfaces, thin borders, subtle glow, neural pathways, technical labels, grids, controlled particles, precise typography. Use the color system in `MASTER_PLAN.md` (dark background, electric cyan, violet, white, muted gray; green for feedback, amber for experimental) intentionally. Typography: modern sans-serif for primary text, monospaced for technical labels.

---

## 14. Animation and scroll

- Animations must have purpose and communicate system behavior. Do not animate everything.
- Avoid bouncing, flashing, distracting particles, unnecessary motion, and slow transitions.
- Support `prefers-reduced-motion` with a defined reduced version of each animation.
- Pause off-screen animation.
- **Never hijack global page scrolling.** Helmet animation may respond to scroll position, but normal page navigation always works. Presentation Mode uses its own controlled step-based navigation.

---

## 15. Presentation environment

The website is used in a live academic presentation.

- Primary target: 16:9 desktop / laptop / projector.
- Controls: mouse, keyboard (arrow keys, Page Up / Page Down), and presentation clicker via keyboard events.
- Important interactions must be reliable and deterministic; avoid external APIs and complicated setup.
- Animations must not block navigation.
- Presentation Mode provides a controlled 16:9 sequence and works offline.

---

## 16. Code quality

Write clean TypeScript, modular reusable React components, semantic HTML, accessible interactions, clear names, and maintainable CSS. Avoid giant components, duplicated logic, unnecessary state, magic numbers, unnecessary abstractions, and dead code.

---

## 17. Responsiveness

Support desktop, laptop, tablet, and mobile. Desktop (16:9) is the primary presentation environment; mobile must remain usable. Do not simply shrink desktop layouts. Use intentional responsive layouts and simpler fallbacks where heavy interactions cannot work well on small screens.

---

## 18. Accessibility (incremental)

Accessibility is built with each section, not postponed to the final phase. Every interactive section must have:

- a keyboard alternative to pointer interaction
- defined reduced-motion behavior
- a text alternative where appropriate

Also: semantic HTML, accessible buttons, visible focus states, readable contrast, alt text. Do not communicate critical information only through animation or color. Phase 13 audits; it is not where accessibility starts.

---

## 19. Performance

Follow the performance budget in `MASTER_PLAN.md` (section 23). Priorities: fast initial load; lazy loading for heavy assets; pause off-screen animation; avoid multiple WebGL contexts; avoid unnecessary blur/backdrop effects; optimize for classroom / projector hardware. Optimize images, fonts, animations, and JavaScript, and avoid unnecessarily large assets. The presentation demo must run smoothly on a normal laptop.

---

## 20. No unauthorized scope

Do NOT add authentication, databases, payments, user accounts, real medical data, real neural data collection, production medical infrastructure, or unnecessary backend services, unless explicitly requested. Do not add features outside `MASTER_PLAN.md`.

---

## 21. Error handling and validation

After implementation, run the appropriate checks where available: TypeScript check, ESLint, and a production build. Fix errors before reporting completion. Never hide errors. If an error cannot be fixed safely, explain it clearly.

---

## 22. File modification rule

Before modifying an existing file: read it, understand its purpose, identify dependencies, and make the smallest reasonable change. Do not rewrite working code unnecessarily and do not delete functionality without explaining why.

---

## 23. When requirements are ambiguous

If ambiguity affects architecture, scientific meaning, UX, safety, or data handling, ask the user before proceeding. For minor visual choices, choose the option consistent with `MASTER_PLAN.md`.

---

## 24. Development report

After each completed phase, report using this structure, then STOP:

- **Completed** — what was implemented.
- **Files Changed** — files created or modified.
- **Validation** — tests and checks performed (typecheck, lint, build, manual checks).
- **Issues** — remaining issues or limitations.
- **Next Phase** — the next phase defined by `MASTER_PLAN.md`.

---

## 25. North star

B-NEURA should feel like a believable prototype from a future neurotechnology research laboratory: Scientific. Human. Immersive. Interactive. Credible. Ambitious.

The audience should leave understanding:

> The future of VR may not only be about seeing a virtual world.

> It may be about creating a new pathway between the brain's intention and the experience of having a body.

---

## 26. Final rule

Read the plan. Understand the phase. Implement only the requested phase. Test it. Report it. Stop. Never silently jump ahead.
