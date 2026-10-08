"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  CalloutElements,
  FlowLabelElements,
} from "@/components/3d/ExperienceDriver";
import {
  createFlowDriverState,
  setFlowMode,
  setFlowTarget,
  type FlowDriverState,
} from "@/components/3d/flowVisuals";
import { FeedbackCompare } from "@/components/flow/FeedbackCompare";
import { FeedbackKinds } from "@/components/flow/FeedbackKinds";
import { FlowControls } from "@/components/flow/FlowControls";
import { FlowLabels } from "@/components/flow/FlowLabels";
import { FlowReadout } from "@/components/flow/FlowReadout";
import { FlowStateList } from "@/components/flow/FlowStateList";
import {
  createInteraction,
  resetTurn,
  selectComponent,
  turnBy,
  type Interaction,
} from "@/components/3d/interaction";
import type { JourneySource } from "@/components/3d/types";
import { Container } from "@/components/ui/Container";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { CHAPTERS, STOPS, chapterIndexOf } from "@/content/chapters";
import type { CompareModeId, FeedbackKindId } from "@/content/feedbackKinds";
import type { HelmetComponentId } from "@/content/helmetComponents";
import { useFlowSequence } from "@/lib/useFlowSequence";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useWebGLSupport } from "@/lib/useWebGLSupport";
import { ExperienceCanvas } from "./ExperienceCanvas";
import { ExperienceNav } from "./ExperienceNav";
import { HelmetCallouts } from "./HelmetCallouts";
import { StopBlock } from "./StopBlock";
import { TurnControls } from "./TurnControls";

const EXPLODED_INDEX = STOPS.findIndex((stop) => stop.id === "exploded");
const FLOW_INDEX = STOPS.findIndex((stop) => stop.id === "flow");
const COMPARE_INDEX = STOPS.findIndex((stop) => stop.id === "compare");
const KINDS_INDEX = STOPS.findIndex((stop) => stop.id === "kinds");
const TURN_STEP = 0.45;

/**
 * The page: one persistent canvas with the NeuroHelmet behind a story of
 * stops. Scroll moves the helmet from stop to stop (never intercepted), the
 * text is always real and in the page, and the visitor can turn the helmet
 * and, in the exploded view, select each component.
 */
export function ExperienceShell() {
  const reducedMotion = useReducedMotion();
  const webgl = useWebGLSupport();
  const [contextLost, setContextLost] = useState(false);
  const unavailable = webgl === false || contextLost;

  const [activeStop, setActiveStop] = useState(0);
  const [selected, setSelected] = useState<HelmetComponentId | null>(null);
  const [tick, setTick] = useState(0);
  const [compareMode, setCompareMode] = useState<CompareModeId>("current");
  const [kind, setKind] = useState<FeedbackKindId | null>(null);

  const stopEls = useRef<(HTMLElement | null)[]>(STOPS.map(() => null));
  const interaction = useRef<Interaction>(createInteraction());
  const calloutEls = useRef<CalloutElements>({});
  const flowLabelEls = useRef<FlowLabelElements>({});
  const flowDriver = useRef<FlowDriverState>(createFlowDriverState());
  const storyRef = useRef<HTMLDivElement>(null);
  const observed = useRef(false);
  const inView = useInView(storyRef, "300px");

  // The stop in the middle of the screen is the active one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observed.current = true;
          const index = Number((entry.target as HTMLElement).dataset.stop);
          setActiveStop(index);
          if (index !== KINDS_INDEX) setKind(null);
          if (index !== EXPLODED_INDEX) {
            selectComponent(interaction.current, null);
            setSelected(null);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of stopEls.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The simulated loop belongs to its stop: it rests, and resets, elsewhere.
  // The two chapters after it keep the same scene, so the loop only resets
  // once the visitor has left all three.
  const onFlowStop = activeStop === FLOW_INDEX;
  const onCompare = activeStop === COMPARE_INDEX;
  const onKinds = activeStop === KINDS_INDEX;
  const sequence = useFlowSequence({ reducedMotion, paused: !onFlowStop });
  const { reset: resetSequence } = sequence;
  useEffect(() => {
    if (!onFlowStop && !onCompare && !onKinds) resetSequence();
  }, [onFlowStop, onCompare, onKinds, resetSequence]);

  // Which state of the loop the scene shows. "Seeing is not feeling" holds it
  // at contact (current VR interaction) or at the returning feedback (concept).
  const sceneState = onCompare
    ? compareMode === "concept"
      ? 6
      : 5
    : onKinds
      ? 6
      : sequence.snapshot.index;
  useEffect(() => {
    setFlowTarget(flowDriver.current, sceneState);
    setFlowMode(flowDriver.current, {
      cue: onCompare,
      kind: onKinds ? kind : null,
      focus: onCompare || onKinds,
    });
  }, [sceneState, onCompare, onKinds, kind]);

  const activeChapter = chapterIndexOf(STOPS[activeStop].chapter);

  // Keep the address in step with the chapter so any chapter can be linked.
  useEffect(() => {
    if (!observed.current) return;
    const hash =
      activeChapter === 0 ? "" : `#${CHAPTERS[activeChapter].anchor}`;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`,
    );
  }, [activeChapter]);

  const source = useMemo<JourneySource>(
    () =>
      reducedMotion
        ? { mode: "fixed", value: activeStop }
        : { mode: "scroll", stops: stopEls },
    [reducedMotion, activeStop],
  );

  const goToStop = useCallback(
    (index: number) => {
      stopEls.current[index]?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    },
    [reducedMotion],
  );

  const goToChapter = useCallback(
    (chapterIndex: number) => {
      const index = STOPS.findIndex(
        (stop) => stop.chapter === CHAPTERS[chapterIndex].id,
      );
      goToStop(index);
    },
    [goToStop],
  );

  const select = useCallback((id: HelmetComponentId | null) => {
    selectComponent(interaction.current, id);
    setSelected(id);
    setTick((t) => t + 1);
  }, []);

  const turn = useCallback((direction: -1 | 1) => {
    turnBy(interaction.current, direction * TURN_STEP);
    setTick((t) => t + 1);
  }, []);

  const resetView = useCallback(() => {
    resetTurn(interaction.current);
    setTick((t) => t + 1);
  }, []);

  const redrawKey = `${activeStop}:${selected ?? ""}:${tick}:${sceneState}:${compareMode}:${kind ?? ""}`;
  const freeToTurn = activeStop === 0 || activeStop === EXPLODED_INDEX;

  return (
    <>
      <ExperienceCanvas
        source={source}
        interaction={interaction}
        calloutEls={calloutEls}
        flow={flowDriver}
        flowLabelEls={flowLabelEls}
        redrawKey={redrawKey}
        webgl={webgl}
        unavailable={unavailable}
        active={inView}
        reducedMotion={reducedMotion}
        onContextLost={() => setContextLost(true)}
        onInput={() => setTick((t) => t + 1)}
      />
      {!unavailable ? (
        <HelmetCallouts
          calloutEls={calloutEls}
          selected={selected}
          onSelect={select}
        />
      ) : null}
      {!unavailable ? (
        <FlowLabels flowLabelEls={flowLabelEls} kind={kind} />
      ) : null}
      <ExperienceNav
        activeChapter={activeChapter}
        onGoToChapter={goToChapter}
      />
      {!unavailable ? (
        <TurnControls visible={freeToTurn} onTurn={turn} onReset={resetView} />
      ) : null}

      <div ref={storyRef}>
        {STOPS.map((stop, index) => (
          <StopBlock
            key={stop.id}
            stop={stop}
            index={index}
            selected={selected}
            onSelect={select}
            onGoToStop={goToStop}
            panel={
              stop.id === "compare" ? (
                <FeedbackCompare mode={compareMode} onChange={setCompareMode} />
              ) : stop.id === "kinds" ? (
                <FeedbackKinds selected={kind} onSelect={setKind} />
              ) : stop.id === "flow" ? (
                <div className="flex flex-col gap-4">
                  <FlowControls
                    snapshot={sequence.snapshot}
                    running={sequence.running}
                    reducedMotion={reducedMotion}
                    onStart={sequence.start}
                    onStep={sequence.step}
                    onReset={sequence.reset}
                  />
                  <FlowReadout snapshot={sequence.snapshot} />
                  <FlowStateList snapshot={sequence.snapshot} />
                  <p className="sr-only" aria-live="polite">
                    {sequence.snapshot.state.label}.{" "}
                    {sequence.snapshot.state.description}
                  </p>
                </div>
              ) : null
            }
            setRef={(el) => {
              stopEls.current[index] = el;
            }}
          />
        ))}
      </div>

      <footer className="relative z-10 py-16">
        <Container>
          <Disclaimer className="max-w-3xl" />
        </Container>
      </footer>
    </>
  );
}
