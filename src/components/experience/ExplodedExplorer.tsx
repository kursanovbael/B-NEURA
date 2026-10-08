import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  HELMET_COMPONENTS,
  getHelmetComponent,
  type HelmetComponentId,
} from "@/content/helmetComponents";
import { cn } from "@/lib/cn";
import { ComponentCard } from "./ComponentCard";

type ExplodedExplorerProps = {
  selected: HelmetComponentId | null;
  onSelect: (id: HelmetComponentId | null) => void;
};

/**
 * The keyboard and text way to the hotspots: every component as a button,
 * and the selected component's card. Always in the page, with or without 3D.
 */
export function ExplodedExplorer({
  selected,
  onSelect,
}: ExplodedExplorerProps) {
  const component = selected ? getHelmetComponent(selected) : null;
  const cardRef = useRef<HTMLDivElement>(null);

  // On narrow screens the panel scrolls; keep the selected card in view.
  useEffect(() => {
    if (selected) cardRef.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-wrap gap-2" aria-label="Components">
        {HELMET_COMPONENTS.map((item) => (
          <li key={item.id}>
            <Button
              variant="secondary"
              size="md"
              aria-pressed={selected === item.id}
              onClick={() => onSelect(selected === item.id ? null : item.id)}
              className={cn(
                "!normal-case",
                selected === item.id && "!border-accent !text-accent",
              )}
            >
              {item.shortName}
            </Button>
          </li>
        ))}
      </ul>

      {component ? (
        <div
          ref={cardRef}
          role="region"
          aria-live="polite"
          aria-label={component.name}
        >
          <ComponentCard
            component={component}
            headingId="exploded-selected-name"
            nextLabel={`Next: ${getHelmetComponent(component.nextId).shortName}`}
            onNext={() => onSelect(component.nextId)}
          />
        </div>
      ) : (
        <p className="type-meta" aria-live="polite">
          Nothing selected yet. Choose a part above or a point on the helmet.
        </p>
      )}
    </div>
  );
}
