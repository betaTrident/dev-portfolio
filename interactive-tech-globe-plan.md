# Interactive 3D Tech Globe Plan

## What this component is called
This pattern is commonly called:
- **3D Skills Globe**
- **Interactive Tech Stack Globe**
- **Skill Orb / Skill Sphere**
- **Tech Constellation Globe**

A clear portfolio-friendly name you can use:
**Interactive Tech Stack Globe**

---

## Is this possible in your project?
Yes. Your current project already has the core 3D stack:
- `three`
- `@react-three/fiber`
- `@react-three/drei`

So you can build this without adding heavy new runtime dependencies.

---

## Target behavior (matching your reference)
1. A central 3D globe (wireframe or shaded sphere) that slowly auto-rotates.
2. Tech logos/icons positioned around the globe in 3D space.
3. Orbit interaction (drag to rotate) with smooth inertia.
4. Hover interaction on each tech item:
- highlight ring
- glow boost
- label and optional skill level
5. Optional click interaction:
- open project filter
- open modal with details
6. Ambient background details:
- soft grid
- particles/noise
- theme-matched glow
7. Responsive and performant on desktop + mobile.

---

## Recommended architecture

### Component structure
- `components/3d/skills-globe/skills-globe-canvas.tsx`
- `components/3d/skills-globe/skills-globe-scene.tsx`
- `components/3d/skills-globe/globe-core.tsx`
- `components/3d/skills-globe/tech-node.tsx`
- `components/3d/skills-globe/skills-globe-overlay.tsx`
- `data/tech-globe-items.ts`
- `types/tech-globe.ts`

### Data model
Use a typed list of items:
- id
- name
- icon path
- category (frontend/backend/devops/etc.)
- level (optional)
- color
- link (optional)

---

## Dependencies

### Already installed (use these first)
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `gsap` (optional for timelines/entrance)

### Optional additions (only if needed)
1. `maath`
- Great for smooth interpolation/damping and motion polish.
- Install: `npm install maath`

2. `leva`
- Useful for development-time tuning controls (spin speed, glow, radius).
- Install: `npm install leva`

3. `zustand`
- Useful only if global interaction state gets complex.
- Install: `npm install zustand`

No extra dependency is strictly required for version 1.

---

## Implementation phases

## Phase 1: Foundation and scene shell
1. Create a dedicated canvas scene component loaded via dynamic import (`ssr: false`).
2. Add camera, ambient + point lights, and fog/post-processing baseline.
3. Add orbit controls with constraints:
- zoom disabled or tightly limited
- damping enabled
- vertical rotation clamped for UX

Deliverable: rotating empty globe scene with stable camera and controls.

## Phase 2: Globe core
1. Build sphere mesh using one of these styles:
- wireframe sphere (reference-like)
- low-opacity shaded sphere + line overlay
2. Add subtle emissive glow and animated shader/opacity pulse.
3. Add slow auto-rotation and pause-on-user-interaction behavior.

Deliverable: polished central globe object.

## Phase 3: Tech nodes and labels
1. Position icons around sphere using spherical coordinates.
2. Render icons as sprite planes or billboards facing camera.
3. Add hover states:
- scale up
- emissive/glow pulse
- show label near node
4. Optional lines from globe surface to node for constellation look.

Deliverable: interactive orbiting tech stack labels/icons.

## Phase 4: Interaction UX
1. Pointer raycasting for hover/click detection.
2. Tooltip/card overlay with skill metadata.
3. Click behavior options:
- highlight selected skill
- filter projects section
- open external documentation link

Deliverable: meaningful interaction beyond visual spin.

## Phase 5: Performance and responsiveness
1. Texture optimization:
- use compressed assets where possible
- preload icons used above-the-fold
2. Device adaptation:
- reduce node count on mobile
- disable expensive effects under threshold
3. Render tuning:
- cap DPR (`dpr={[1, 1.5]}`)
- use frameloop optimization where possible

Deliverable: smooth performance across devices.

## Phase 6: Integration and animation
1. Integrate as your tech stack section hero visual.
2. Animate section entrance with GSAP + scroll trigger.
3. Sync glow/accent with your orange-red theme tokens.

Deliverable: production-ready section component.

---

## Acceptance criteria
- Globe renders without hydration issues in Next.js.
- Drag interaction is smooth and intuitive.
- Hover states are visible and readable.
- 60fps-ish on modern desktop, acceptable mobile fallback.
- Works with keyboard focus fallback for accessible labels.
- No blocking layout shift on load.

---

## Risks and mitigations
1. Too many icon textures can hurt performance.
- Mitigation: atlas/sprite reuse, lazy-load rarely used nodes.

2. Interaction conflicts with page scroll.
- Mitigation: only capture pointer while inside canvas and dragging.

3. Visual clutter with many technologies.
- Mitigation: category filters and progressive reveal.

---

## Suggested first milestone (what to build first)
Start with a **minimal v1** in one pass:
1. Rotating globe
2. 12-16 tech nodes
3. Hover label
4. Drag to rotate

Then iterate with filters, click actions, and advanced glow effects.
