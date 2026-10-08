import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CHAPTERS, STOPS, chapterIndexOf, type Stop } from "@/content/chapters";
import {
  getHelmetComponent,
  type HelmetComponentId,
} from "@/content/helmetComponents";
import { cn } from "@/lib/cn";
import { ComponentCard } from "./ComponentCard";
import { ExplodedExplorer } from "./ExplodedExplorer";

type StopBlockProps = {
  stop: Stop;
  index: number;
  selected: HelmetComponentId | null;
  onSelect: (id: HelmetComponentId | null) => void;
  onGoToStop: (index: number) => void;
  setRef: (el: HTMLElement | null) => void;
  /** Simulated-flow controls and captions, for the flow stop only. */
  panel?: ReactNode;
};

/**
 * One block of the story. The helmet shows the matching state while the block
 * is in the middle of the screen. All text is real and always in the page.
 */
export function StopBlock({
  stop,
  index,
  selected,
  onSelect,
  onGoToStop,
  setRef,
  panel,
}: StopBlockProps) {
  const chapter = CHAPTERS[chapterIndexOf(stop.chapter)];
  const isChapterStart =
    STOPS.findIndex((s) => s.chapter === stop.chapter) === index;
  const headingId = `stop-${stop.id}`;
  const isHero = stop.id === "hero";
  const isExploded = stop.id === "exploded";
  const isFlow =
    stop.id === "flow" || stop.id === "compare" || stop.id === "kinds";
  const nextStop = STOPS[index + 1];

  return (
    <section
      ref={setRef}
      id={isChapterStart ? chapter.anchor : undefined}
      data-stop={index}
      aria-labelledby={headingId}
      className={cn(
        "pointer-events-none relative z-10 flex items-end pb-5 md:pb-0",
        isExploded || isFlow ? "md:items-start md:pt-28" : "md:items-center",
        isHero || isExploded || isFlow ? "min-h-dvh" : "min-h-[85dvh]",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "pointer-events-auto flex w-full flex-col gap-5",
            "bg-background/90 border-border max-h-[46dvh] overflow-y-auto rounded-md border p-5 md:max-h-none md:overflow-visible",
            "md:bg-transparent md:border-0 md:p-0",
            isHero ? "md:max-w-xl" : "md:max-w-md",
          )}
        >
          {stop.chapterHeadline && !isHero ? (
            <h2 className={cn("type-section", isFlow && "max-md:hidden")}>
              {stop.chapterHeadline}
            </h2>
          ) : null}

          {isHero ? (
            <>
              <h1 id={headingId} className="type-display">
                B-NEURA
              </h1>
              <p className="type-hero !text-[clamp(1.25rem,2.4vw,1.9rem)] text-accent">
                {stop.headline}
              </p>
            </>
          ) : stop.chapterHeadline ? (
            <h3 id={headingId} className="text-2xl leading-tight font-semibold">
              {stop.headline}
            </h3>
          ) : stop.chapter === "gap" ? (
            <h2 id={headingId} className="type-section">
              {stop.headline}
            </h2>
          ) : (
            <h3 id={headingId} className="text-2xl leading-tight font-semibold">
              {stop.headline}
            </h3>
          )}

          {(isExploded && selected ? [] : stop.body).map((paragraph) => (
            <p
              key={paragraph}
              className={cn(
                "type-body-lg text-muted max-w-[28rem]",
                isFlow && "max-md:hidden",
              )}
            >
              {paragraph}
            </p>
          ))}

          {isHero ? (
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={() =>
                  onGoToStop(STOPS.findIndex((s) => s.chapter === "inside"))
                }
              >
                Explore the helmet
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onGoToStop(1)}
              >
                Read the story
              </Button>
            </div>
          ) : null}

          {stop.component ? (
            <ComponentCard
              component={getHelmetComponent(stop.component)}
              nextLabel={`Next: ${nextStop.component ? getHelmetComponent(nextStop.component).shortName : nextStop.headline}`}
              onNext={() => onGoToStop(index + 1)}
            />
          ) : null}

          {panel}

          {isExploded ? (
            <ExplodedExplorer selected={selected} onSelect={onSelect} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
