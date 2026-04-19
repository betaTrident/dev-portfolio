"use client";

/**
 * Public re-export for the SkillsGlobeCanvas wrapped with dynamic import
 * so Three.js never runs during Next.js SSR.
 */
import dynamic from "next/dynamic";

export const SkillsGlobeCanvas = dynamic(
  () =>
    import("./skills-globe-canvas").then((m) => ({ default: m.SkillsGlobeCanvas })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto flex items-center justify-center rounded-full border border-primary/10 bg-surface-container"
        style={{ width: 520, height: 520, maxWidth: "100%" }}
        aria-label="Loading skills globe..."
      >
        <div className="flex flex-col items-center gap-4">
          {/* Animated ring */}
          <div
            className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
            style={{ animationDuration: "1.2s" }}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            Initialising globe…
          </span>
        </div>
      </div>
    ),
  }
);
