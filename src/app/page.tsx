import { HelmetInspector } from "@/components/3d/HelmetInspector";
import { ScrollHelmetStage } from "@/components/3d/ScrollHelmetStage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { MaturityBadge } from "@/components/ui/MaturityBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import type { Classification } from "@/content/maturity";

const SWATCHES = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "surface-raised", className: "bg-surface-raised" },
  { name: "border", className: "bg-border" },
  { name: "muted", className: "bg-muted" },
  { name: "foreground", className: "bg-foreground" },
  { name: "accent (cyan)", className: "bg-accent" },
  { name: "violet", className: "bg-violet" },
  { name: "status-ok", className: "bg-status-ok" },
  { name: "status-warn", className: "bg-status-warn" },
];

const CLASSIFICATIONS: Classification[] = [
  "available-today",
  "experimental",
  "future-concept",
  "requires-source-verification",
];

/**
 * Review page: design system + scroll-driven NeuroHelmet.
 * Temporary technical page; contains no final site content.
 */
export default function Home() {
  return (
    <>
      <Container className="pt-16 pb-10">
        <SectionHeading
          level={1}
          eyebrow="Phase 2 · NeuroHelmet 3D prototype"
          title="B-NEURA"
          description="Technical verification page. Not the final website."
        />
      </Container>

      {/* Inspector controls are development-only; production shows the helmet alone. */}
      {process.env.NODE_ENV === "development" ? (
        <HelmetInspector />
      ) : (
        <ScrollHelmetStage />
      )}

      <Container className="flex flex-col gap-[var(--space-section)] py-16">
        <section aria-labelledby="color" className="flex flex-col gap-6">
          <SectionHeading level={2} id="color" eyebrow="Tokens" title="Color" />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {SWATCHES.map((swatch) => (
              <li key={swatch.name} className="flex flex-col gap-2">
                <span
                  className={`${swatch.className} border-border-strong h-14 rounded-md border`}
                  aria-hidden="true"
                />
                <TechnicalLabel>{swatch.name}</TechnicalLabel>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="type" className="flex flex-col gap-6">
          <SectionHeading
            level={2}
            id="type"
            eyebrow="Tokens"
            title="Typography"
            description="System font stack for now; final self-hosted fonts are pending."
          />
          <div className="flex flex-col gap-4">
            <p className="type-display">Display</p>
            <p className="type-hero">Hero heading</p>
            <p className="type-section">Section heading</p>
            <p className="type-body-lg">Body large, for lead paragraphs.</p>
            <p className="type-body">Body text for regular reading.</p>
            <p className="type-technical">Technical text, monospaced.</p>
            <p className="type-meta">Metadata and captions.</p>
            <p className="type-label">Label</p>
          </div>
        </section>

        <section aria-labelledby="ui" className="flex flex-col gap-6">
          <SectionHeading
            level={2}
            id="ui"
            eyebrow="Components"
            title="Primitives"
          />
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary" href="#main-content">
              Link button
            </Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge>Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="violet">Simulation</Badge>
          </div>
          <div className="flex flex-col gap-3">
            <TechnicalLabel>
              Maturity badge preview (labels only)
            </TechnicalLabel>
            <div className="flex flex-wrap gap-3">
              {CLASSIFICATIONS.map((classification) => (
                <MaturityBadge
                  key={classification}
                  classification={classification}
                />
              ))}
            </div>
          </div>
          <Disclaimer />
        </section>
      </Container>
    </>
  );
}
