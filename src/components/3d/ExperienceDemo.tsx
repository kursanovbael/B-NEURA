"use client";

import { useState } from "react";
import { toExperience } from "./experience";
import { NeuroHelmetViewer } from "./NeuroHelmetViewer";

/**
 * Phase 1 verification harness: a keyboard-accessible slider drives the same
 * ExperienceProgress that scroll will drive later. Not a final section.
 */
export function ExperienceDemo() {
  const [progress, setProgress] = useState(0);
  const experience = toExperience(progress);

  return (
    <div className="flex flex-col gap-6">
      <NeuroHelmetViewer experience={experience} />
      <div className="flex flex-col gap-2">
        <label htmlFor="progress" className="type-label text-muted">
          Separation progress (layer separation and shell transparency)
        </label>
        <input
          id="progress"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={(event) => setProgress(Number(event.target.value))}
          className="accent-accent w-full"
          aria-valuetext={`${Math.round(experience.progress * 100)} percent, phase ${experience.phase}`}
        />
        <p className="type-technical text-muted" aria-live="polite">
          progress {experience.progress.toFixed(2)} · phase {experience.phase}
        </p>
      </div>
    </div>
  );
}
