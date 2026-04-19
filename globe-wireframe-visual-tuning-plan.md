# Globe Wireframe Visual Tuning Plan (Low-Friction Execution)

## Goal
Match the reference look where:
1. Inner wireframe is clearly visible through the sphere.
2. Outline is subtle (not too orange/saturated).
3. Globe feels translucent, not dense/black.
4. Icons naturally fade when rotating to the back.

---

## Current Problem Summary
- Outer wireframe tint is still too strong/saturated.
- Core fill can still read as too dark depending on rotation.
- Interior wire visibility is inconsistent across angles.

---

## Visual Direction (Reference-Aligned)
- **Primary wire tone:** muted warm gray-orange, not bright orange.
- **Inner shell:** translucent navy/charcoal glass.
- **Interior wires:** softer and lower contrast than front wires, but always present.
- **No solid equator ring** and no bright dot markers.

---

## One-Pass Technical Plan

## Phase 1: Wireframe Color + Opacity Rebalance
File: `components/3d/skills-globe/skills-globe-canvas.tsx`

1. Replace current wire accent value with muted orange-gray tone:
- from bright orange `0xff8a47`
- to muted tone around `0xc47a55` or `0xb8744f`

2. Set front wire opacity target:
- `0.16` to `0.20` (start at `0.18`)

3. Set back-side wire opacity target:
- `0.08` to `0.14` (start at `0.11`)

Expected outcome:
- wireframe still readable, less "neon"/oversaturated edge.

---

## Phase 2: Inner Sphere Translucency (Glass Effect)
File: `components/3d/skills-globe/skills-globe-canvas.tsx`

1. Use a softer inner color:
- target around `0x1a2233` to `0x20283a`

2. Set inner sphere opacity:
- `0.18` to `0.26` (start at `0.22`)

3. Keep `transparent: true`.

Expected outcome:
- inner wires stay visible; center no longer appears pitch-black.

---

## Phase 3: Dynamic Wire Pulse Softening
File: `components/3d/skills-globe/skills-globe-canvas.tsx`

Current pulse can spike saturation perception.

1. Reduce pulse range:
- from something like `0.17 + sin * 0.055`
- to `0.16 + sin * 0.025`

Expected outcome:
- calmer, premium motion with fewer harsh brightness jumps.

---

## Phase 4: Back-Icon Fade Behavior (Keep)
Status: mostly implemented.

1. Keep smoothstep depth fade.
2. Ensure back-side icon opacity reaches near-zero before full back.
3. Keep pointer-events disabled for hidden/back nodes.

Expected outcome:
- internal wire remains the main visible element through sphere depth.

---

## Phase 5: Optional Contrast Safety (Only If Needed)
If globe still looks too dark in some monitors:

1. Add very subtle ambient scene light tint (neutral blue-gray, low intensity).
2. Do not add glow halo or heavy background overlays.

Expected outcome:
- maintain readability without returning to bright/orange wash.

---

## Acceptance Criteria
1. Wireframe visible both front and interior at all rotation angles.
2. No bright orange-heavy outline effect.
3. No pitch-black core look.
4. Icons fade cleanly to hidden when rotating behind.
5. Globe reads as translucent technical mesh, close to provided reference.

---

## Execution Checklist (Fast)
1. Tune color + opacities (Phase 1 and 2).
2. Adjust pulse intensity (Phase 3).
3. Run `npm run typecheck`.
4. Visual check in dev server.
5. If still too dark, apply optional Phase 5.

---

## Suggested Initial Values (Start Here)
- `ACCENT = 0xc47a55`
- Front wire opacity: `0.18`
- Back wire opacity: `0.11`
- Inner sphere color: `0x1b2436`
- Inner sphere opacity: `0.22`
- Pulse formula: `0.16 + Math.sin(pulse) * 0.025`

These values are intentionally conservative to avoid over-coloring.
