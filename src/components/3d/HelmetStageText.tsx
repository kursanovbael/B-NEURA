import { HELMET_STAGES } from "@/content/helmetStages";
import { HELMET_LAYERS } from "./helmetLayers";

type HelmetStageTextProps = {
  id: string;
};

/**
 * Text equivalent of the 3D experience: the stages in order and the
 * conceptual layers. Always visible, so the concept never depends on
 * scrolling animation or on WebGL.
 */
export function HelmetStageText({ id }: HelmetStageTextProps) {
  return (
    <div id={id} className="type-meta flex max-w-4xl flex-col gap-8">
      <p className="type-body text-muted max-w-prose">
        A conceptual NeuroHelmet shown as a procedural 3D model. It illustrates
        a possible future concept and does not depict existing hardware. The
        placement and proportions of every part are illustrative only.
      </p>

      <div className="flex flex-col gap-3">
        <h3 className="type-label text-muted">Stages of the view</h3>
        <ol className="flex flex-col gap-3">
          {HELMET_STAGES.map((stage) => (
            <li key={stage.id}>
              <span className="text-foreground block">{stage.name}</span>
              {stage.description}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="type-label text-muted">Conceptual layers</h3>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {HELMET_LAYERS.map((layer) => (
            <li key={layer.id}>
              <span className="text-foreground block">{layer.name}</span>
              {layer.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
