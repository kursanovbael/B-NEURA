/**
 * Context labels say what the user is looking at. They are separate from the
 * technology maturity taxonomy (see maturity.ts) and must never be used as
 * maturity levels. Single source for every section and demo.
 */
export const CONTEXT_LABELS = {
  simulation: "SIMULATION",
  concept: "CONCEPT",
  conceptPrototype: "CONCEPT PROTOTYPE",
  virtualControl: "VIRTUAL CONTROL",
  virtualControlActive: "VIRTUAL CONTROL ACTIVE",
  futureInterface: "FUTURE INTERFACE",
} as const;

export type ContextLabel = (typeof CONTEXT_LABELS)[keyof typeof CONTEXT_LABELS];
