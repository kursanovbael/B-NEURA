"use client";

import { useRef, type PointerEvent } from "react";
import { clamp01 } from "@/components/3d/experience";
import { contactOf, type HandPose } from "@/components/3d/flowVisuals";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { CONTEXT_LABELS } from "@/content/contextLabels";
import { CONTACT_LINE, VIRTUAL_CONTROL_NOTE } from "@/content/embodiment";

type VirtualControlProps = {
  pose: HandPose;
  /** True once the visitor has moved the hand in this stop. */
  engaged: boolean;
  /** The 3D view is unavailable: the readout carries the hand's state. */
  unavailable: boolean;
  onChange: (pose: HandPose) => void;
};

const percent = (value: number) => Math.round(value * 100);

type SliderProps = {
  id: string;
  label: string;
  value: number;
  valueText: string;
  onChange: (value: number) => void;
};

/** A native range input: arrow keys, Page Up / Down, Home and End work. */
function Slider({ id, label, value, valueText, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="type-label text-muted">
          {label}
        </label>
        <span aria-hidden="true" className="type-label text-foreground">
          {percent(value)}%
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={percent(value)}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value) / 100)}
        className="accent-accent h-6 w-full cursor-pointer"
      />
    </div>
  );
}

/**
 * Virtual control of the shared virtual hand. A pointer pad (vertical raises
 * the arm, horizontal curls the fingers) and two native sliders that do the
 * same from the keyboard. The pad repeats the sliders, so it is hidden from
 * assistive technology. Nothing here reads or decodes any signal.
 */
export function VirtualControl({
  pose,
  engaged,
  unavailable,
  onChange,
}: VirtualControlProps) {
  const dragging = useRef(false);
  const contact = contactOf(pose.raise) > 0.5;

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onChange({
      raise: clamp01(1 - (event.clientY - rect.top) / rect.height),
      curl: clamp01((event.clientX - rect.left) / rect.width),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Badge tone="violet">{CONTEXT_LABELS.simulation}</Badge>
        <Badge tone={engaged ? "accent" : "neutral"}>
          {engaged
            ? CONTEXT_LABELS.virtualControlActive
            : CONTEXT_LABELS.virtualControl}
        </Badge>
      </div>
      <p className="text-foreground text-sm">{VIRTUAL_CONTROL_NOTE}</p>

      <div
        aria-hidden="true"
        className="border-border-strong bg-surface relative h-28 cursor-crosshair touch-none rounded-md border select-none"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragging.current = true;
          fromPointer(event);
        }}
        onPointerMove={(event) => {
          if (dragging.current) fromPointer(event);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <span className="type-label text-muted absolute top-2 left-2">
          ↑ RAISE ARM
        </span>
        <span className="type-label text-muted absolute right-2 bottom-2">
          CURL FINGERS →
        </span>
        <span
          className="border-accent bg-background absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{
            left: `${percent(pose.curl)}%`,
            top: `${100 - percent(pose.raise)}%`,
          }}
        />
      </div>
      <p className="type-meta">
        Drag in the pad, or use the sliders with the keyboard.
      </p>

      <Slider
        id="virtual-arm-raise"
        label="ARM: LOWERED TO RAISED"
        value={pose.raise}
        valueText={`Arm ${percent(pose.raise)}% raised`}
        onChange={(raise) => onChange({ ...pose, raise })}
      />
      <Slider
        id="virtual-finger-curl"
        label="FINGERS: OPEN TO CURLED"
        value={pose.curl}
        valueText={`Fingers ${percent(pose.curl)}% curled`}
        onChange={(curl) => onChange({ ...pose, curl })}
      />

      <p className="text-muted text-sm">
        <span className="type-label block">VIRTUAL HAND</span>
        Arm {percent(pose.raise)}% raised, fingers {percent(pose.curl)}% curled.{" "}
        {contact ? CONTACT_LINE : "No contact with the virtual object."}
      </p>
      <p className="sr-only" aria-live="polite">
        {contact ? CONTACT_LINE : ""}
      </p>
      {unavailable ? (
        <p className="type-meta">
          The 3D view is unavailable on this device. The line above describes
          the virtual hand instead.
        </p>
      ) : null}

      <Disclaimer />
    </div>
  );
}
