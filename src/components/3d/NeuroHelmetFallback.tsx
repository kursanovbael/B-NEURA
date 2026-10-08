type NeuroHelmetFallbackProps = {
  status: "loading" | "unavailable";
};

/** Static stand-in shown while loading or when WebGL is unavailable. */
export function NeuroHelmetFallback({ status }: NeuroHelmetFallbackProps) {
  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <svg
        viewBox="0 0 120 100"
        className="text-border-strong h-28 w-auto"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M14 66 A46 46 0 0 1 106 66" />
        <path d="M24 66 A36 36 0 0 1 96 66" className="text-accent-dim" />
        <path d="M34 66 A26 26 0 0 1 86 66" className="text-violet-dim" />
        <path d="M14 66 H106" />
      </svg>
      <p className="type-meta max-w-sm">
        {status === "loading"
          ? "Loading the 3D concept view…"
          : "The 3D view is unavailable on this device. The concept is described in the text below."}
      </p>
    </div>
  );
}
