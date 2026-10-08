# B-NEURA — Master Product, UX & Technical Plan

**Project name:** B-NEURA
**Tagline:** Beyond the Physical Body
**Project type:** Interactive research and concept prototype
**Primary domain:** Neurotechnology / Brain-Computer Interfaces / Virtual Reality / AI / Assistive Technology
**Plan status:** Documentation updated with approved architecture decisions. Application not yet initialized.

This file is the source of truth for product vision, UX, scientific positioning, architecture, and roadmap. `CLAUDE.md` defines how the engineering agent works; if the two ever conflict, stop and ask.

---

## Table of contents

1. Project vision
2. Core research question
3. Audiences
4. What B-NEURA is / is not
5. Scientific positioning
6. Closed-loop concept
7. System architecture (conceptual)
8. Labeling system (maturity vs. context labels)
9. Demo honesty rules
10. Website objective and story
11. Website structure (sections 01–12)
12. Design direction
13. Typography
14. Animation system
15. Interaction principles
16. Technical decisions
17. Folder structure
18. Content architecture and shared models
19. Scientific claims workflow
20. Component principles
21. Responsiveness
22. Accessibility
23. Performance budget
24. Scientific language rules
25. Canonical disclaimer
26. Development roadmap
27. Definition of done
28. Git workflow
29. Per-phase workflow
30. North star
31. Final message
32. Glossary of canonical terms

---

## 1. Project vision

B-NEURA is a conceptual Neuro-VR system exploring how Brain-Computer Interfaces (BCI), Artificial Intelligence (AI), Virtual Reality (VR), and sensory feedback could create new pathways between a person's intention and their experience.

The project focuses on people with severe paralysis who may retain cognitive intention despite having limited or no voluntary physical movement.

The central idea:

> What if a person who cannot physically move could still control and experience a virtual body through neural signals?

B-NEURA does not claim that consciousness can currently be transferred into VR. It explores a future interaction model in which the brain could communicate with a virtual environment and potentially receive feedback from it.

The website must make this concept understandable to a non-technical academic audience while maintaining scientific credibility.

---

## 2. Core research question

**Primary:**

> Can a brain-computer interface combined with virtual reality create a sense of agency and virtual embodiment for people with severe paralysis?

**Secondary:**

> Could future sensory-feedback systems make interaction with a virtual body feel more natural?

> Could a virtual body eventually provide a meaningful alternative pathway for physical interaction?

> How might BCI, AI, and VR work together as a closed-loop system?

These questions are exploratory. The project must NOT claim that the prototype proves or answers them.

---

## 3. Audiences

Two different audiences exist. They must not be confused.

**Website audience (who the site is written for):**

- professor / instructor
- classmates
- general academic audience

The site is primarily an academic presentation. Technical concepts are explained in accessible, plain language. All interface and presentation content is in English. Technical terms are allowed but must be explained in plain language.

**Conceptual user (who the imagined technology is for):**

A person with severe paralysis who retains cognitive function and wants to interact with digital environments despite significant physical limitations.

People with paralysis must be represented respectfully. Never describe paralysis as making someone "less human." The purpose of the technology is to explore agency, communication, interaction, accessibility, and embodiment.

---

## 4. What B-NEURA is / is not

**B-NEURA is:**

- an educational prototype
- a research visualization
- an interactive concept
- a speculative Neuro-VR interface
- a demonstration of how multiple technologies could interact
- a visualization of a potential future assistive technology

**B-NEURA is NOT:**

- a medical device
- an approved medical treatment
- a cure for paralysis
- a working consciousness-uploading system
- a system that currently transfers consciousness
- a system that currently reproduces every human sense
- a proven full-sensory neural VR system
- a replacement for the human body

The website must never imply otherwise.

---

## 5. Scientific positioning

B-NEURA combines concepts from: Brain-Computer Interfaces, Neuroscience, Neuroprosthetics, Artificial Intelligence, Virtual Reality, Human-Computer Interaction, Sensory Feedback, Motor Intention Decoding, Virtual Embodiment, Body Ownership, Assistive Technology, and Rehabilitation Technology.

The website explains how these fields could potentially connect.

---

## 6. Closed-loop concept

Traditional VR generally follows:

```
VR → Visual / Auditory Input → Brain
```

B-NEURA explores:

```
Brain
  ↓
Neural Signals
  ↓
BCI
  ↓
AI Interpretation
  ↓
Virtual Environment
  ↓
Virtual Interaction
  ↓
Sensory Feedback
  ↓
Brain
```

The website should visually demonstrate this loop. The loop is one of the main visual identities of the project.

---

## 7. System architecture (conceptual)

### 7.1 Brain

The user generates neural activity associated with intention, for example: "I want to move my right hand." The prototype does not collect real neural data. The website simulates the process.

### 7.2 BCI

The layer responsible for detecting and interpreting brain activity. Real-world approaches include EEG and other BCI approaches. The website must explain that different BCI technologies differ in signal quality, invasiveness, accuracy, and practical limitations, and must not imply that a non-invasive headset alone delivers the rich control shown in the simulation.

### 7.3 AI Decoder

Interprets patterns in neural signals. Conceptual pipeline:

```
NEURAL SIGNAL → SIGNAL PROCESSING → FEATURE EXTRACTION → AI / ML DECODER → INTENTION
```

Example output: "Move right hand". The website simulates this process.

### 7.4 Virtual Body

The user's intention is represented by a virtual body (hands, arms, head, body, movement, object interaction). B-NEURA is not only about controlling a cursor; it explores virtual embodiment.

### 7.5 VR Environment

A visually simple space (for performance) containing interactive objects. Candidates: futuristic rehabilitation room, minimalist laboratory, calm natural environment, abstract neural environment. One environment will be chosen in Phase 6.

### 7.6 Sensory Feedback

A future layer in which information about virtual interaction could potentially be returned to the user's nervous system. Research areas: touch, pressure, position / proprioception. Temperature is pending source verification (see section 8).

The website must clearly distinguish conceptual neural feedback from currently available VR haptics. It may visually simulate feedback but must NOT claim it can generate real neural sensations.

---

## 8. Labeling system

Two separate label systems exist. They must never be merged or substituted for each other.

### 8.1 Technology maturity (ONE taxonomy)

Every technology discussed by the website is classified with exactly one of:

| Label | Meaning |
|---|---|
| **AVAILABLE TODAY** | Exists and is in real use or readily accessible |
| **EXPERIMENTAL** | Demonstrated in research settings; not a mature or widely available capability |
| **FUTURE CONCEPT** | Speculative; not demonstrated in the form described |

No competing maturity scales may be created.

**Pending classification.** An item whose classification has not been confirmed by sources carries the marker **REQUIRES SOURCE VERIFICATION** instead of a maturity label. This marker is a temporary placeholder, not a fourth maturity level. It must be resolved before the site is considered complete. **Temperature feedback** starts in this state and must not be shown at the same maturity as touch, pressure, or position until the research phase confirms its classification.

### 8.2 Context labels (separate from maturity)

Context labels describe what the user is looking at, not how mature a technology is:

- **SIMULATION** — scripted demonstration of a process
- **CONCEPT** / **CONCEPT PROTOTYPE** — design concept (for example, the NeuroHelmet)
- **VIRTUAL CONTROL** — the user controlling the virtual body in the demo
- **FUTURE INTERFACE** — a depicted capability that does not exist today

### 8.3 Item-level example

NeuroHelmet "EEG / BCI sensor array": context label CONCEPT PROTOTYPE; maturity is set per specific implementation and must be backed by a verified claim. The complete helmet is never presented as existing.

---

## 9. Demo honesty rules

The website must never imply that it is reading the presenter's brain, the viewer's brain, or anyone's brain. All neural processing shown is simulated.

- No language implying real neural measurements.
- Every interactive demo carries a visible SIMULATION label.
- Pointer / keyboard input is presented as **virtual control**, never as decoded intention.
- Intention, signal, and decoder stages are presented as scripted illustrations of a concept.
- The string "AGENCY DETECTED" is retired. Its replacement is **VIRTUAL CONTROL ACTIVE**.
- "Agency" remains a legitimate concept to explain in the Embodiment section; the interface must not claim to detect it.

---

## 10. Website objective and story

The website is the primary prototype. It explains the concept through interaction rather than long blocks of text, and should feel like an interactive research presentation.

```
PROBLEM → INTENTION → BRAIN → BCI → AI → VIRTUAL BODY → VR → FEEDBACK → EMBODIMENT → FUTURE
```

The experience should leave the audience with one idea (see section 30).

---

## 11. Website structure

Sections are numbered 01–12 and map to components and roadmap phases.

### Section 01 — Hero

- Title: **B-NEURA**
- Subtitle: **BEYOND THE PHYSICAL BODY**
- Supporting text: "A Neuro-VR concept exploring how brain-computer interfaces, artificial intelligence, virtual reality, and sensory feedback could create new pathways between intention and experience."
- Primary button: EXPLORE THE SYSTEM. Secondary button: HOW IT WORKS.
- Visual: a futuristic NeuroHelmet connected to subtle neural signals. Communicates BRAIN + AI + VR + HUMAN.

### Section 02 — The Problem

- Headline: "When the body stops responding, the brain doesn't stop intending."
- Explains the difference between intention and physical movement.
- Visual: BRAIN → INTENTION → X → PHYSICAL MOVEMENT.
- Avoids overly dramatic medical imagery. Establishes the technological challenge.
- Transition: "What if the brain could communicate with another body?" Then introduces B-NEURA.
- No statistics unless sourced through the claims register.

### Section 03 — The Idea

- Headline: "A new pathway between intention and experience."
- Four interactive cards (hover/click reveals more; keyboard accessible):
  - BRAIN INTERFACE — reads or represents neural activity
  - AI DECODER — interprets neural patterns and estimates user intention
  - VIRTUAL BODY — provides a controllable digital body
  - SENSORY FEEDBACK — represents a future pathway for returning information about virtual interactions

### Section 04 — The NeuroHelmet

The primary visual object, labeled **CONCEPT PROTOTYPE**.

Layers: VR display; neural sensing layer; signal processing layer; communication layer; conceptual feedback layer; battery / processing hardware.

Interaction: scroll-position-driven exploded view, built with SVG/CSS/Framer Motion. Normal page scrolling is never hijacked. A non-scroll alternative (buttons / keyboard) exists. Each layer shows NAME, FUNCTION, and TECHNOLOGY STATUS using the shared maturity model. The complete helmet is never implied to exist.

### Section 05 — How It Works

One of the most important sections. An animated system architecture (SVG/CSS first):

```
BRAIN → BCI → AI DECODER → INTENTION → VIRTUAL BODY → VR WORLD → SENSORY FEEDBACK → BRAIN
```

A glowing signal travels through the system. Subtle, technically styled. Interactive button: **START SIGNAL**. Simulated sequence:

1. NEURAL SIGNAL (simulated)
2. SIGNAL PROCESSED
3. INTENTION IDENTIFIED (simulated)
4. MOVEMENT PREDICTED
5. VIRTUAL BODY UPDATED
6. FEEDBACK SIMULATION

Labeled **SIMULATION**. Step names must not imply real measurement. A text version of the sequence is always available.

### Section 06 — Interactive VR Demo

A browser-based 3D/interactive simulation of a virtual environment with a virtual body or hands and interactive objects.

- **Not WebXR.** Not required to work in a physical headset. WebXR is out of scope unless later requested.
- Input: mouse/pointer and keyboard.
- Controls: MOVE HAND, LOOK AROUND, TOUCH OBJECT, MOVE OBJECT, RESET.
- Deterministic and reliable for a classroom presentation: scripted behavior, no randomness that could break a live demo.
- Visually communicates the pipeline: USER INTENTION ("Move right hand", simulated) → BCI SIGNAL → AI DECODER → VIRTUAL HAND → OBJECT INTERACTION.
- Pointer/keyboard input is presented as VIRTUAL CONTROL, labeled SIMULATION.
- Rendering technology (SVG/CSS/Canvas versus Three.js) is decided in Phase 6 and must justify itself (see section 16).

### Section 07 — Sensory Feedback

- Headline: "Seeing is not feeling."
- Compares TRADITIONAL VR (VR → Eyes / Ears → Brain) with the B-NEURA CONCEPT (VR → AI → BCI / Neural Interface → Sensory System → Brain). The meaning of each node, especially the AI role and "Sensory System," must be defined in plain language and verified.
- Explains that future neural interfaces may potentially provide sensory information, but current systems have significant limitations.
- Topics: TOUCH, PRESSURE, POSITION / PROPRIOCEPTION may be discussed as research areas. TEMPERATURE is shown as REQUIRES SOURCE VERIFICATION until classified.
- Each item shows the shared MaturityBadge.
- Does not claim complete natural perception. Clearly distinguishes conceptual neural feedback from currently available VR haptics.

### Section 08 — Virtual Embodiment

- Headline: "Can a virtual body become your body?"
- Introduces: agency, body ownership, embodiment, visual feedback, motor intention, sensory feedback.
- Conceptual relationship: MOTOR INTENTION + VISUAL FEEDBACK + POTENTIAL SENSORY FEEDBACK → VIRTUAL EMBODIMENT.
- Interactive virtual hand moved by pointer or keyboard. Displays **VIRTUAL CONTROL ACTIVE**. Labeled SIMULATION.
- Uses the shared `VirtualHand` component (no duplicate hand implementation).
- Must not claim the demo produces or detects embodiment.

### Section 09 — Current Science

Three columns using the shared maturity model:

- **AVAILABLE TODAY** — e.g., VR, EEG / BCI, AI signal decoding, brain-controlled assistive technologies, VR rehabilitation
- **EXPERIMENTAL** — e.g., artificial touch, neural sensory stimulation, advanced prosthetic feedback, advanced neural decoding, embodiment research
- **FUTURE CONCEPT** — e.g., highly immersive neural VR, rich multisensory feedback, seamless virtual embodiment, full-body sensory integration

The examples above are starting points. Each item must be backed by a verified claim and qualified (setting, scale, users) so laboratory or clinical capabilities are not read as consumer products.

### Section 10 — The Future

- Visual timeline: TODAY (VR) → BCI → brain-controlled interaction → sensory feedback → virtual embodiment → future Neuro-VR.
- Headline: "Beyond the Screen."
- Main message: "We are not trying to move consciousness into a computer. We are exploring how technology could create new pathways between intention and experience."
- Timeline items use the shared maturity model. The timeline must not imply inevitability or dates.

### Section 11 — Sources

A clean research section. Topics: Brain-Computer Interfaces, Neuroprosthetics, Sensory Feedback, Virtual Embodiment, Body Ownership, VR Rehabilitation, Neural Signal Decoding, Neural Stimulation.

Every factual scientific statement on the site is supported by a verified source from the claims register. Preferred sources: peer-reviewed papers, Nature, Science, IEEE, NIH, PubMed, major universities, recognized research institutions. Do not invent citations.

(Previously called "Research." The canonical name is **Sources**, and the component is `Sources`.)

### Section 12 — Presentation Mode

Button: **ENTER PRESENTATION MODE**. Designed for a 16:9 screen with its own controlled, step-based navigation (it never relies on global scroll).

Controls:

- mouse
- keyboard
- arrow keys
- Page Up / Page Down
- presentation clicker (clickers send keyboard events)

Must work with no internet connection. Simplifies the UI. Sequence:

1. THE PROBLEM
2. B-NEURA
3. NEUROHELMET
4. BRAIN SIGNAL
5. AI DECODER
6. VIRTUAL BODY
7. SENSORY FEEDBACK
8. EMBODIMENT
9. CURRENT SCIENCE
10. FUTURE

The presenter moves through the story without unnecessary navigation. The step list is derived from the shared section registry. Must be reliable enough for a live classroom presentation.

---

## 12. Design direction

Visual style: **DARK FUTURISTIC NEUROTECHNOLOGY** — a believable future neurotechnology research laboratory.

Characteristics: dark, premium, scientific, futuristic, minimal, cinematic, human-centered.

Feels like: a research laboratory, advanced medical technology, premium hardware, future interface, scientific visualization.

Avoid: generic AI landing pages, excessive cyberpunk, gaming aesthetics, excessive neon, fake medical dashboards, visual clutter.

Visual language: dark surfaces, thin borders, subtle glow, neural pathways, technical labels, grids, controlled particles, precise typography. Glass-style surfaces are allowed sparingly (see performance budget on blur/backdrop effects).

### Color system

| Role | Value |
|---|---|
| Background | `#05070A` |
| Surface | `#0B1017` |
| Primary text | `#FFFFFF` |
| Secondary text | `#94A3B8` |
| Primary accent | Electric cyan |
| Secondary accent | Violet |
| Feedback accent | Green |
| Warning / experimental | Amber |

Exact accent values are defined as tokens in Phase 1 and checked for contrast. Use accents strategically; do not turn every element into neon. Color is never the only carrier of meaning (labels always have text).

---

## 13. Typography

Modern sans-serif for primary content. Large headings are bold and spacious. A monospaced font may be used for technical labels, for example:

`B-NEURA` · `NEURAL INTERFACE / SYSTEM 01` · `SIGNAL DETECTED` · `INTENTION CLASSIFIED` · `FEEDBACK SIMULATION`

Note: label text inside simulations must follow the demo honesty rules (section 9). Phrases such as "SIGNAL DETECTED" are acceptable only inside clearly labeled SIMULATION contexts.

**Fonts must be self-hosted.** No runtime fetching from external font services. Use framework-supported local fonts (for example `next/font/local`) with font files stored in the repository and license-compatible. Until Phase 1 selects fonts, Phase 0 uses a system font stack. The presentation must work offline.

---

## 14. Animation system

Animations communicate meaning. Preferred: signal flow, scroll reveals, subtle parallax, smooth section transitions, helmet layer separation, virtual hand movement, data visualization, glowing neural pathways.

Avoid: unnecessary bouncing, excessive particles, flashing, distracting motion, anything that slows navigation.

Rules:

- Support `prefers-reduced-motion` with a defined reduced version of each animation, not just "off." Content must remain understandable without motion.
- Pause or stop animation when off-screen.
- No flashing content.
- Never hijack global scrolling.

---

## 15. Interaction principles

Every major interaction has a purpose; do not add interactions because they look cool.

| Interaction | Purpose |
|---|---|
| Helmet animation | Understand hardware architecture |
| System flow | Understand signal processing |
| VR demo | Understand virtual control and the pipeline |
| Sensory feedback | Understand future possibilities |
| Embodiment | Understand body ownership |
| Presentation mode | Understand the entire narrative |

---

## 16. Technical decisions

### 16.1 Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint**
- **npm** as package manager
- **Framer Motion** — added in the first phase that needs it, not in Phase 0
- **Lucide icons** — added when first needed
- **Three.js / React Three Fiber** — NOT installed in Phase 0. Evaluated later only if 2D/SVG cannot provide the desired experience (see 16.3).

Use the current stable versions available at initialization time unless there is a compatibility reason not to. Record the exact versions chosen in the Phase 0 report. Do not add unnecessary dependencies.

### 16.2 Project facts

- Location: `C:\Users\ASUS\Projects\B-NEURA\B-NEURA` (the existing repository). No nested repository is created.
- npm package name: `b-neura` (lowercase). The GitHub repository name remains `B-NEURA`.
- No backend, database, authentication, payments, user accounts, real medical data, or real neural data. No unnecessary external APIs.
- The core demo runs locally and offline.

### 16.3 3D and rendering policy

- Start with SVG / CSS / Framer Motion-style techniques. Do not assume a 3D model is required.
- NeuroHelmet (Phase 4): SVG/CSS/Framer Motion.
- VR Demo (Phase 6): choose the lightest technique that delivers the experience; introducing Three.js / R3F requires a short written justification and user approval.
- If WebGL is ever used: at most one WebGL context at a time, lazy-loaded, paused when off-screen, with a static fallback.
- WebXR is explicitly OUT OF SCOPE.

### 16.4 Presentation environment

- Primary target: 16:9 desktop / laptop / projector.
- Controls: mouse, keyboard, and clicker (via keyboard events).
- No internet required during the core presentation.
- Desktop is the primary environment; mobile must remain usable (see section 21).

---

## 17. Folder structure

Final approved structure (created incrementally; empty folders are not committed):

```
b-neura/
├── CLAUDE.md
├── MASTER_PLAN.md
├── package.json
├── public/
│   ├── fonts/            # self-hosted font files (Phase 1)
│   └── images/           # optimized static images (added when needed)
└── src/
    ├── app/              # App Router: layout, page, route files
    ├── components/
    │   ├── ui/           # shared primitives
    │   │   ├── Button
    │   │   ├── Badge
    │   │   ├── TechnicalLabel
    │   │   ├── SectionHeading
    │   │   ├── MaturityBadge
    │   │   ├── Disclaimer
    │   │   └── VirtualHand       # shared by VRDemo and Embodiment
    │   ├── layout/       # SiteHeader / navigation, SiteFooter
    │   ├── Hero/
    │   ├── Problem/
    │   ├── Idea/
    │   ├── NeuroHelmet/
    │   ├── SystemFlow/
    │   ├── VRDemo/
    │   ├── SensoryFeedback/
    │   ├── Embodiment/
    │   ├── Science/
    │   ├── Future/
    │   ├── Sources/
    │   └── PresentationMode/
    ├── content/          # typed data and copy (no UI)
    │   ├── disclaimer
    │   ├── maturity      # shared maturity model
    │   ├── claims        # scientific claims register
    │   ├── sources       # verified source records
    │   ├── sections      # section registry
    │   └── pipeline      # system pipeline states (Phase 5)
    ├── lib/              # utilities, hooks, shared types
    └── styles/           # global CSS and design tokens
```

Notes:

- `VirtualHand` lives in `components/ui` so VRDemo (Phase 6) and Embodiment (Phase 8) share one implementation.
- No `public/models` or `public/videos` folder is created unless an asset requires it.
- Global styles live in `src/styles/` and are imported from `src/app/layout`.
- Avoid deep nesting; add folders only when a phase needs them.

---

## 18. Content architecture and shared models

Scientific, maturity, and presentation information lives in `src/content/` as typed data, not hardcoded inside UI components. Components read content; they do not own it.

### 18.1 Shared maturity model

One typed model defines the three maturity levels (AVAILABLE TODAY, EXPERIMENTAL, FUTURE CONCEPT), their display labels, and a pending marker (REQUIRES SOURCE VERIFICATION). `MaturityBadge` is the only way maturity is rendered. It is used by NeuroHelmet, SensoryFeedback, Science, and Future.

### 18.2 Claims register

A simple typed list of claims. Minimum fields:

| Field | Description |
|---|---|
| `id` | Stable claim id |
| `text` | The claim text |
| `maturity` | Maturity classification (shared model), or pending |
| `sourceStatus` | `UNVERIFIED` → `SOURCE_FOUND` → `VERIFIED` |
| `sourceRef` | Reference to a record in `sources` (empty until found) |
| `notes` | Caveats, scope, or reviewer notes |

Every factual scientific claim starts as `UNVERIFIED` and is only publishable after verification (see section 19).

### 18.3 Sources

Typed source records (title, authors, venue, year, URL/identifier, access date) added only when found and checked. Never fabricated or reconstructed from memory.

### 18.4 Section registry

A small ordered list of sections with `id`, `title`, and `anchor`. It supports navigation now and Presentation Mode later. Do not overengineer it (no plugin systems, no runtime configuration).

### 18.5 Pipeline states

Shared definitions of the simulated pipeline steps (signal, processed, intention, predicted, body updated, feedback). Created in Phase 5 and reused by VRDemo and Embodiment.

### 18.6 Disclaimer

The canonical disclaimer text is defined once (section 25) and rendered through the `Disclaimer` component.

---

## 19. Scientific claims workflow

Scientific content follows a strict order:

```
CLAIM → SOURCE → VERIFY → WEBSITE COPY
```

1. **Claim** — draft the claim in the register as `UNVERIFIED`.
2. **Source** — find a reliable source (preferred types in Section 11). Never invent papers, citations, researchers, statistics, clinical results, or experimental results.
3. **Verify** — read the source and confirm it supports the claim as worded and scoped. Update `sourceStatus` and `maturity`.
4. **Website copy** — only then does the claim appear as factual copy.

Rules:

- Do not write unsupported scientific claims first and search for sources later.
- Until a claim is verified, copy must be conceptual and hedged ("could," "may," "explores") and must not assert fact.
- Design intent and clearly labeled concepts are not factual claims and do not need sources, but they must be labeled CONCEPT / SIMULATION / FUTURE INTERFACE.
- Before each content phase begins, the claims it needs are identified, researched, and verified (with the user's approval of classifications). Phase 11 compiles and final-checks sources; it is not where research starts.

---

## 20. Component principles

Components are modular, reusable, readable, responsive, and testable in isolation. Avoid giant components, duplicated logic, magic numbers, and dead code. Use clear naming. Keep content separate from UI logic. Do not create duplicate components with similar functionality. Shared primitives (`ui/`) are preferred over per-section copies.

---

## 21. Responsiveness

Supported: desktop, laptop, tablet, mobile. Desktop (16:9) is the primary presentation environment. Mobile must remain usable. Do not simply shrink desktop layouts; use intentional responsive behavior. Where a heavy interaction cannot work well on small screens, it degrades to a simpler, still-informative version (for example a static diagram with text). Presentation Mode targets 16:9 and need not be fully featured on mobile.

---

## 22. Accessibility

Accessibility is implemented incrementally with each section, not postponed to Phase 13. Every interactive section must have:

- a **keyboard alternative** to pointer interaction
- defined **reduced-motion behavior**
- a **text alternative** where appropriate (for example a text description of each pipeline sequence, helmet layer, and demo state)

General requirements: semantic HTML, accessible buttons, visible focus states, readable contrast (including secondary text and small monospace labels), alt text, accessible interactive controls, no flashing, and no critical information conveyed only by animation or color. Presentation Mode must be fully keyboard-operable and manage focus on entry and exit. Phase 13 is for auditing, not first implementation.

---

## 23. Performance budget

Priorities: fast initial load; lazy loading for heavy assets; pause off-screen animation; avoid multiple WebGL contexts; avoid unnecessary blur/backdrop effects; optimize for classroom/projector hardware.

Initial targets (revisable with justification; measured in Phase 13 and spot-checked earlier, especially Phases 4 and 6):

| Area | Target |
|---|---|
| Initial load | Hero visible quickly on a typical laptop; below-the-fold sections loaded lazily |
| Initial JavaScript | Keep the first-load bundle small; heavy libraries (animation-heavy, 3D) are code-split and loaded on demand |
| Images | Optimized formats and sizes; no unoptimized full-resolution images |
| Fonts | Self-hosted, WOFF2, a minimal number of families and weights, `font-display` set |
| Animation | Smooth on integrated graphics; animate `transform` / `opacity`; loops pause when off-screen; no layout-thrashing animation |
| WebGL | At most one context at a time; lazy-loaded; static fallback |
| Blur / backdrop | Avoid `backdrop-filter` and large blurs/shadows over big areas; use sparingly and test on low-end hardware |
| Network | Core demo and Presentation Mode work fully offline |
| Hardware | Test on throttled CPU/GPU to approximate classroom/projector machines |

Exact numeric thresholds (for example bundle size in KB or frame-rate floor) are set when the first measurable build exists in Phase 0, and recorded here.

---

## 24. Scientific language rules

Prefer: could, may, explores, conceptual, future system, potential, research direction, experimental.

Avoid unsupported: will, proves, cures, guarantees, transfers consciousness, fully restores sensation, completely replaces the body.

Never use language implying real neural measurements by the website (see section 9).

---

## 25. Canonical disclaimer

There is exactly one disclaimer text. It is defined once in `src/content/` and rendered via the `Disclaimer` component. It appears at least in the footer and wherever a demo might be mistaken for a real system (VR demo, Embodiment, Presentation Mode).

> B-NEURA is a conceptual research and educational prototype. It is not a medical device and is not intended to diagnose, treat, or cure paralysis or any medical condition. The prototype demonstrates a possible future interaction model using existing and emerging technologies.

Shortened or alternative disclaimer wordings must not be created.

---

## 26. Development roadmap

Build in phases. Do not build everything at once. Each phase ends with testing, a report, and a STOP for user approval.

### Phase 0 — Foundation

Scope (final):

- Initialize Next.js in the existing repository (App Router, TypeScript, Tailwind CSS, ESLint, `src/` layout, npm), with package name `b-neura`. Handle the pre-existing files (`CLAUDE.md`, `MASTER_PLAN.md`, `.gitignore`, `.git`) without overwriting or reinitializing them.
- Create the `src/` folder structure from section 17 where needed for Phase 0 (`app`, `components`, `lib`, `content`, `styles`). Do not add empty section folders for future phases.
- Configure formatting (Prettier) and lint / typecheck / format scripts.
- Create a minimal reusable root layout: `lang="en"`, metadata, skip link, `main` landmark, global stylesheet imported from `src/styles/`, system font stack (no external font fetching).
- Create minimal typed scaffolds in `src/content/` and `src/lib/` only for: the shared maturity model type, the claims-register type (empty list), the source type, the section-registry type (empty or placeholder list), and the canonical disclaimer constant. No scientific copy and no claims.
- Verify the development server and the production build; run typecheck and lint.
- Record installed versions and baseline measurements (for the performance budget).

Out of scope for Phase 0: any visual section, design tokens beyond a minimal reset, fonts selection, Framer Motion, Lucide, Three.js / R3F, content copy, `VirtualHand`, pipeline states.

STOP after Phase 0.

### Phase 1 — Design system

Color tokens, typography (self-hosted fonts chosen and bundled), `Button`, `Badge`, `TechnicalLabel`, `SectionHeading`, `MaturityBadge`, `Disclaimer`, surfaces, spacing, animation utilities (with reduced-motion handling), global styles, navigation / footer shell. Populate the maturity model and section registry. STOP.

### Phase 2 — Hero

Build the Hero. STOP.

### Phase 3 — Problem + Idea

Problem section, Idea section, technology cards. STOP.

### Phase 4 — NeuroHelmet

SVG/CSS/Framer Motion helmet visualization, layers, labels, interactions, scroll-linked animation (no scroll hijacking), keyboard alternative, reduced-motion version. Uses `MaturityBadge`. STOP.

### Phase 5 — System Flow

BCI, AI decoder, virtual body, VR, feedback, animated signal, START SIGNAL. Creates pipeline states in `content/`. Text alternative for the sequence. STOP.

### Phase 6 — VR Demo

Browser-based simulated environment (not WebXR), pointer/keyboard control, deterministic behavior, creates the shared `VirtualHand`. Rendering technology decision documented. STOP.

### Phase 7 — Sensory Feedback

Explanation and simulation; maturity badges; temperature handled per section 8. Requires verified claims. STOP.

### Phase 8 — Embodiment

Embodiment explanation and interaction using the shared `VirtualHand`; VIRTUAL CONTROL ACTIVE. STOP.

### Phase 9 — Science

Available Today / Experimental / Future Concept columns from the claims register and maturity model. Resolves pending classifications. STOP.

### Phase 10 — Future

Timeline, future vision, final message. STOP.

### Phase 11 — Sources

Compile and final-check the Sources section from the verified register; confirm no unverified factual claim is published. STOP.

### Phase 12 — Presentation Mode

16:9, step-based, keyboard / clicker support, offline, driven by the section registry. STOP.

### Phase 13 — Final polish

Responsive testing, accessibility audit, performance checks against the budget, animation checks, scientific claim review, source review, navigation testing, mobile testing, offline test, production build, presentation rehearsal.

### Dependencies

- Phase 1 gates all visible phases (tokens, maturity badge, labels).
- Phase 5 defines the pipeline vocabulary reused by Phases 6 and 8.
- Phase 6 creates `VirtualHand`; Phase 8 reuses it.
- Phases 4, 7, 9, 10 share the maturity model and depend on verified claims.
- Phase 12 depends on the section registry maintained since Phase 1.

---

## 27. Definition of done

B-NEURA is complete when:

- The project tells a clear story.
- The problem is understandable.
- The NeuroHelmet is understandable.
- The BCI concept is understandable.
- The AI decoding concept is understandable.
- The virtual body is interactive.
- The VR environment is interactive.
- Sensory feedback is clearly explained.
- Embodiment is clearly explained.
- Available vs. experimental vs. future technology is clearly separated using one taxonomy.
- Every factual scientific claim is VERIFIED with a source.
- No item still carries REQUIRES SOURCE VERIFICATION.
- The website never implies it is reading real neural activity.
- The website is responsive.
- The website is accessible.
- Presentation Mode works, offline.
- The production build succeeds.
- No misleading medical claims remain.

---

## 28. Git workflow

The repository already exists. Use the existing `.git` directory. Never create another repository.

Workflow:

```
Phase implementation → test → report → user approval → commit → next phase
```

- Commit only after the user approves the phase.
- Do not automatically continue to the next phase.
- Meaningful, focused commits; no giant unrelated commits.

Commit style examples:

```
feat: initialize project foundation
feat: add B-NEURA design system
feat: add hero section
feat: add neurohelmet visualization
feat: add system flow animation
feat: add VR interaction prototype
feat: add sensory feedback section
fix: improve mobile layout
fix: optimize helmet animation
docs: update project plan
docs: add research sources
```

---

## 29. Per-phase workflow

Before every phase:

1. Read `MASTER_PLAN.md`.
2. Read `CLAUDE.md`.
3. Inspect the current code.
4. Identify what already exists.
5. Identify dependencies.
6. Identify the factual claims the phase needs and confirm they follow the claims workflow (section 19).
7. Implement only the requested phase.
8. Implement accessibility with the phase (keyboard, reduced motion, text alternative).
9. Test the phase; run typecheck, lint, and build.
10. Report the changes.
11. STOP and wait for approval before commit and before the next phase.

---

## 30. North star

B-NEURA should feel like a believable prototype from a future neurotechnology research laboratory: Scientific. Human. Immersive. Interactive. Credible. Ambitious.

The goal is not the most complicated website. The goal is for the audience to understand one idea:

> The future of VR may not only be about seeing a virtual world.

> It may be about creating a new pathway between the brain's intention and the experience of having a body.

---

## 31. Final message

**B-NEURA — BEYOND THE PHYSICAL BODY**

> We are not trying to move consciousness into a computer.

> We are exploring how technology could create new pathways between intention and experience.

---

## 32. Glossary of canonical terms

| Use | Do not use |
|---|---|
| AVAILABLE TODAY / EXPERIMENTAL / FUTURE CONCEPT | Any additional maturity scale |
| REQUIRES SOURCE VERIFICATION (pending marker) | Treating unverified items as classified |
| SIMULATION, CONCEPT / CONCEPT PROTOTYPE, VIRTUAL CONTROL, FUTURE INTERFACE (context labels) | Using context labels as maturity levels |
| VIRTUAL CONTROL ACTIVE | AGENCY DETECTED |
| Sources (section and component) | Research (as a section name) |
| Current Science (section 09 title); `Science` (component) | Mixed names for the same section |
| VR Demo (browser-based simulation, not WebXR) | Implying headset / WebXR support |
| Claims register (`UNVERIFIED` → `SOURCE_FOUND` → `VERIFIED`) | Ad hoc citations |
| Canonical disclaimer (section 25) | Alternative disclaimer wordings |
