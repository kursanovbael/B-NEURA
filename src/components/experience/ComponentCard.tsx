import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MaturityBadge } from "@/components/ui/MaturityBadge";
import { CONTEXT_LABELS } from "@/content/contextLabels";
import type { HelmetComponent } from "@/content/helmetComponents";

type ComponentCardProps = {
  component: HelmetComponent;
  /** Heading element for the component name; omit when the parent has one. */
  headingId?: string;
  /** Label of the button that moves along the signal path. */
  nextLabel?: string;
  onNext?: () => void;
};

/**
 * Teaches one component: what it represents, its role, how it connects to the
 * next stage and how mature it is. Conceptual only: it describes an imagined
 * concept prototype, and maturity stays pending until sources are verified.
 */
export function ComponentCard({
  component,
  headingId,
  nextLabel,
  onNext,
}: ComponentCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-3">
        <Badge tone="violet">{CONTEXT_LABELS.concept}</Badge>
        {headingId ? (
          <h3 id={headingId} className="text-2xl leading-tight font-semibold">
            {component.name}
          </h3>
        ) : null}
      </div>

      <dl className="flex flex-col gap-4">
        <div>
          <dt className="type-label text-muted">Represents</dt>
          <dd className="type-body mt-1">{component.represents}</dd>
        </div>
        <div>
          <dt className="type-label text-muted">Role</dt>
          <dd className="type-body mt-1">{component.role}</dd>
        </div>
        <div>
          <dt className="type-label text-muted">Connects to</dt>
          <dd className="type-body mt-1">{component.connects}</dd>
        </div>
        <div>
          <dt className="type-label text-muted">Maturity</dt>
          <dd className="mt-2 flex flex-col items-start gap-2">
            {component.maturity ? (
              <MaturityBadge classification={component.maturity} />
            ) : (
              <Badge dashed>NOT CLASSIFIED</Badge>
            )}
            <span className="type-meta">{component.maturityNote}</span>
          </dd>
        </div>
      </dl>

      {onNext && nextLabel ? (
        <Button variant="secondary" onClick={onNext} className="self-start">
          {nextLabel}
        </Button>
      ) : null}
    </div>
  );
}
