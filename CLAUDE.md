\# B-NEURA — Claude Code Instructions



\## 1. ROLE



You are the primary software engineering agent for the B-NEURA project.



Your job is to implement the B-NEURA website according to:



MASTER\_PLAN.md



MASTER\_PLAN.md is the source of truth for the project's:



\- product vision

\- scientific positioning

\- UX

\- website structure

\- technical architecture

\- development roadmap

\- presentation requirements



Always read MASTER\_PLAN.md before making architectural decisions.



\---



\# 2. PROJECT CONTEXT



B-NEURA is a conceptual Neuro-VR prototype.



It explores how:



Brain-Computer Interfaces (BCI)

\+

Artificial Intelligence

\+

Virtual Reality

\+

Sensory Feedback



could potentially create new pathways between human intention and experience.



The project focuses on people with severe paralysis.



B-NEURA is NOT a medical device.



B-NEURA does NOT claim to transfer consciousness.



B-NEURA does NOT claim to reproduce complete human sensory perception.



The website is an interactive research and educational prototype.



\---



\# 3. BEFORE DOING ANYTHING



Before implementing a task:



1\. Read MASTER\_PLAN.md completely.

2\. Read this CLAUDE.md.

3\. Inspect the existing repository.

4\. Inspect the existing file structure.

5\. Identify the current development phase.

6\. Identify existing components and utilities.

7\. Avoid duplicating existing functionality.



Do not make architectural changes without understanding the current project.



\---



\# 4. PHASE CONTROL



The project is divided into development phases.



Follow the phases in MASTER\_PLAN.md.



IMPORTANT:



Only implement the phase explicitly requested by the user.



Do NOT automatically continue into future phases.



Do NOT build the entire website at once.



Do NOT add future functionality simply because you know it will eventually be needed.



After completing a phase:



1\. Test the implementation.

2\. Check for errors.

3\. Review the result.

4\. Report what changed.

5\. Report any remaining issues.

6\. STOP.



Wait for the user to authorize the next phase.



\---



\# 5. CURRENT DEVELOPMENT PRINCIPLE



At the beginning of the project, prioritize:



1\. Architecture

2\. Maintainability

3\. Design system

4\. Performance

5\. Scientific credibility

6\. UX

7\. Visual polish



Do not prioritize flashy effects over functionality.



\---



\# 6. SCIENTIFIC ACCURACY



Scientific accuracy is mandatory.



The project discusses:



\- neuroscience

\- brain-computer interfaces

\- paralysis

\- neuroprosthetics

\- sensory feedback

\- neural stimulation

\- virtual embodiment

\- virtual reality

\- artificial intelligence



Never invent:



\- scientific papers

\- citations

\- researchers

\- statistics

\- medical capabilities

\- clinical results

\- experimental results



If a scientific statement is uncertain, do not present it as fact.



Use language such as:



\- could

\- may

\- explores

\- conceptual

\- experimental

\- potential

\- future research



\---



\# 7. TECHNOLOGY MATURITY



Always distinguish between:



AVAILABLE TODAY



EXPERIMENTAL / RESEARCH



FUTURE CONCEPT



Never present speculative technology as currently available.



When a website interaction simulates a future capability, clearly label it:



SIMULATION



CONCEPT



FUTURE INTERFACE



RESEARCH CONCEPT



\---



\# 8. MEDICAL SAFETY



Never claim that B-NEURA:



\- cures paralysis

\- treats paralysis

\- guarantees restored movement

\- transfers consciousness

\- creates complete sensory perception

\- replaces the human body



The project should be presented as a conceptual research prototype.



Use this disclaimer when appropriate:



"B-NEURA is a conceptual research and educational prototype. It is not a medical device and is not intended to diagnose, treat, or cure paralysis or any medical condition."



\---



\# 9. DESIGN DIRECTION



The visual identity should feel like:



A FUTURE NEUROTECHNOLOGY RESEARCH LAB.



Characteristics:



\- dark

\- premium

\- scientific

\- futuristic

\- minimal

\- cinematic

\- human-centered



Avoid:



\- generic AI landing pages

\- excessive cyberpunk

\- gaming aesthetics

\- excessive neon

\- fake medical dashboards

\- visual clutter



The design should be believable.



\---



\# 10. VISUAL LANGUAGE



Use:



\- dark surfaces

\- thin borders

\- subtle glow

\- neural pathways

\- technical labels

\- grids

\- controlled particles

\- glass surfaces

\- precise typography



Animations should have purpose.



Do not animate everything.



\---



\# 11. COLOR SYSTEM



Use the color system defined in MASTER\_PLAN.md.



Primary visual direction:



Dark background

\+

Electric cyan

\+

Violet

\+

White

\+

Muted gray



Use accent colors intentionally.



Do not make the interface look like a neon gaming website.



\---



\# 12. TYPOGRAPHY



Use a modern sans-serif for primary text.



Technical labels may use a monospaced font.



Examples:



B-NEURA



NEURAL INTERFACE / SYSTEM 01



SIGNAL DETECTED



INTENTION CLASSIFIED



FEEDBACK SIMULATION



\---



\# 13. ANIMATION PRINCIPLES



Animations should communicate system behavior.



Good examples:



\- neural signal flowing through the architecture

\- helmet layers separating

\- AI decoding visualization

\- virtual hand responding

\- feedback loop animation

\- scroll-based system explanations



Avoid:



\- excessive bouncing

\- flashing

\- distracting particles

\- unnecessary motion

\- slow transitions



Support prefers-reduced-motion.



\---



\# 14. INTERACTION PRINCIPLES



Every major interaction must have a purpose.



Examples:



NeuroHelmet interaction:



Understand hardware architecture.



System flow:



Understand signal processing.



VR demo:



Understand agency.



Sensory feedback:



Understand future possibilities.



Embodiment:



Understand virtual body ownership.



Presentation mode:



Guide the live presentation.



\---



\# 15. TECH STACK



Preferred:



Next.js



TypeScript



Tailwind CSS



Framer Motion



React Three Fiber / Three.js only when justified



Lucide icons



Do not install unnecessary dependencies.



Before adding a dependency, consider whether the same result can be achieved with existing tools.



\---



\# 16. CODE QUALITY



Write:



\- clean TypeScript

\- modular React components

\- reusable components

\- semantic HTML

\- accessible interactions

\- clear variable names

\- clear component names

\- maintainable CSS



Avoid:



\- giant components

\- duplicated logic

\- unnecessary state

\- magic numbers

\- unnecessary abstractions

\- dead code



\---



\# 17. COMPONENT ARCHITECTURE



Follow the structure defined in MASTER\_PLAN.md.



Potential components include:



Hero



Problem



Idea



NeuroHelmet



SystemFlow



VRDemo



SensoryFeedback



Embodiment



Science



Future



Sources



PresentationMode



Keep components modular.



Do not create duplicate components with similar functionality.



\---



\# 18. RESPONSIVENESS



The website must support:



\- desktop

\- laptop

\- tablet

\- mobile



Desktop is the primary presentation environment.



Mobile must remain usable.



Do not simply shrink desktop layouts.



Use intentional responsive layouts.



\---



\# 19. ACCESSIBILITY



Use:



\- semantic HTML

\- accessible buttons

\- keyboard navigation

\- visible focus states

\- readable contrast

\- alt text

\- reduced motion support



Do not communicate critical information only through animation.



\---



\# 20. PERFORMANCE



Optimize:



\- images

\- videos

\- 3D assets

\- fonts

\- animations

\- JavaScript



Use lazy loading for heavy resources.



Avoid unnecessarily large assets.



The presentation demo must run smoothly on a normal laptop.



\---



\# 21. 3D RULE



Do not automatically use Three.js for everything.



Use CSS, SVG, Framer Motion, or normal React whenever they are sufficient.



Introduce Three.js / React Three Fiber only when 3D provides a meaningful improvement.



\---



\# 22. PRESENTATION REQUIREMENTS



The website will be used during a live academic presentation.



Therefore:



\- important interactions must be reliable

\- avoid unnecessary external APIs

\- avoid fragile network dependencies

\- avoid complicated setup

\- core demo must work locally

\- animations should not block navigation

\- presentation mode should provide a controlled sequence



\---



\# 23. NO UNAUTHORIZED SCOPE



Do NOT add:



\- authentication

\- databases

\- payments

\- user accounts

\- real medical data

\- real neural data collection

\- production medical infrastructure

\- unnecessary backend services



unless explicitly requested.



This is primarily an interactive conceptual prototype.



\---



\# 24. ERROR HANDLING



After implementation, run appropriate checks.



When available, use:



\- TypeScript checks

\- ESLint

\- production build



Fix errors before reporting completion.



Never hide errors.



If an error cannot be fixed safely, explain it clearly.



\---



\# 25. GIT WORKFLOW



Use meaningful commits.



Examples:



feat: initialize project foundation



feat: add B-NEURA design system



feat: add hero section



feat: add neurohelmet visualization



feat: add system flow



feat: add VR prototype



feat: add sensory feedback section



feat: add embodiment interaction



fix: improve mobile layout



fix: optimize animation performance



docs: add research sources



Do not make giant unrelated commits.



\---



\# 26. FILE MODIFICATION RULE



Before modifying an existing file:



1\. Read it.

2\. Understand its purpose.

3\. Identify dependencies.

4\. Make the smallest reasonable change.



Do not rewrite working code unnecessarily.



Do not delete functionality without explaining why.



\---



\# 27. WHEN REQUIREMENTS ARE AMBIGUOUS



If ambiguity affects:



\- architecture

\- scientific meaning

\- user experience

\- safety

\- data handling



ask the user before proceeding.



For minor visual choices, choose the option consistent with MASTER\_PLAN.md.



\---



\# 28. DEVELOPMENT REPORT



After each completed phase, report:



\## Completed



What was implemented.



\## Files Changed



Files created or modified.



\## Validation



Tests/checks performed.



\## Issues



Remaining issues or limitations.



\## Next Phase



The next phase defined by MASTER\_PLAN.md.



Then STOP.



\---



\# 29. DO NOT OVERENGINEER



This project is an academic prototype.



Prefer:



simple



reliable



beautiful



interactive



maintainable



over:



complex



fragile



over-engineered



The goal is to communicate the idea clearly.



\---



\# 30. NORTH STAR



B-NEURA should feel like a believable prototype from a future neurotechnology research laboratory.



It should be:



Scientific.



Human.



Immersive.



Interactive.



Credible.



Ambitious.



The audience should leave understanding:



> The future of VR may not only be about seeing a virtual world.



> It may be about creating a new pathway between the brain's intention and the experience of having a body.



\---



\# 31. FINAL RULE



READ THE PLAN.



UNDERSTAND THE PHASE.



IMPLEMENT ONLY THE REQUESTED PHASE.



TEST IT.



REPORT IT.



STOP.



Never silently jump ahead.

