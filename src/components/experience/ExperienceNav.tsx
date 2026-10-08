import { Badge } from "@/components/ui/Badge";
import { CHAPTERS } from "@/content/chapters";
import { CONTEXT_LABELS } from "@/content/contextLabels";
import { cn } from "@/lib/cn";

type ExperienceNavProps = {
  /** Index of the chapter the visitor is in. */
  activeChapter: number;
  onGoToChapter: (index: number) => void;
};

/**
 * Wordmark, chapter navigation and the persistent concept label. The
 * wordmark and chapters are native buttons; the chapter being read carries
 * aria-current.
 */
export function ExperienceNav({
  activeChapter,
  onGoToChapter,
}: ExperienceNavProps) {
  return (
    <header className="bg-background/80 pointer-events-none fixed inset-x-0 top-0 z-30">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onGoToChapter(0)}
          className="type-label pointer-events-auto text-foreground !text-sm tracking-[0.2em]"
        >
          B-NEURA
        </button>

        <nav
          aria-label="Chapters"
          className="pointer-events-auto hidden md:block"
        >
          <ol className="flex items-center gap-6">
            {CHAPTERS.map((chapter, i) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => onGoToChapter(i)}
                  aria-current={i === activeChapter ? "step" : undefined}
                  className={cn(
                    "transition-ui border-b py-2 text-sm",
                    i === activeChapter
                      ? "border-accent text-foreground"
                      : "text-muted hover:text-foreground border-transparent",
                  )}
                >
                  {chapter.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <p className="text-muted pointer-events-none text-xs md:hidden">
            {CHAPTERS[activeChapter].name}
          </p>
          <Badge tone="violet" className="hidden sm:inline-flex">
            {CONTEXT_LABELS.conceptPrototype}
          </Badge>
        </div>
      </div>
    </header>
  );
}
