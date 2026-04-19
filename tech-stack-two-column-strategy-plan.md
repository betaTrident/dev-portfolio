# Tech Stack Section Redesign Strategy

## Objective
Redesign the Tech Stack section into a clean two-column composition:
1. Left side: categorized skill chips/cards in a simple, organized layout (like the provided reference).
2. Right side: interactive 3D globe as a dedicated visual anchor.

The current full-width globe block should be removed first, then reintroduced in the right column.

---

## Desired End State
- Visual style: minimal, clean, consistent spacing, high readability.
- Layout behavior:
  - Desktop: left content + right globe (split layout).
  - Tablet/mobile: stacked layout (left content first, globe second).
- Interaction:
  - Globe remains draggable/interactive.
  - Left categories are static, scan-friendly skill chips.

---

## Current State (Summary)
From current implementation:
- Globe appears in a full-width block near the top of [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx).
- Existing bento grid and competency blocks are still below.
- Globe component is already available and interactive via [components/3d/skills-globe/skills-globe-canvas.tsx](components/3d/skills-globe/skills-globe-canvas.tsx).
- Tech item data already exists in [data/tech-globe-items.ts](data/tech-globe-items.ts).

---

## Proposed Information Architecture
Use a dedicated section shell inside the existing Tech Stack section:

1. Section Header
- Keep: “Engineered with Precision”.
- Optional subheading: short context sentence.

2. Two-Column Core
- Left (content-focused): categorized technology groups.
- Right (visual-focused): 3D globe card with subtle helper text.

3. Existing Lower Content
- Keep bento and competencies for now, but place after the new two-column block.
- Optional future phase: simplify or trim if redundancy feels high.

---

## Left Column Content Model
Create grouped categories (inspired by your reference):
- Languages
- Frameworks
- Backend
- Databases
- Tools & Others

Each category contains small chips:
- Icon (Material symbol or logo)
- Label text
- Optional small hover highlight

### Data structure recommendation
Introduce a left-panel specific data constant (separate from globe orbital data):
- `category`
- `items[]`
- item fields: `name`, `icon`, optional `iconUrl`, optional `tone`

This avoids forcing globe data to match UI chip needs.

---

## Layout Strategy
### Desktop (>= lg)
- Container grid: `lg:grid-cols-12`
- Left panel: `lg:col-span-7`
- Right panel (globe): `lg:col-span-5`

### Mobile/Tablet
- Stack to one column:
  - category cards first
  - globe card second

### Spacing rhythm
- Outer section: keep current horizontal rhythm (`max-w-7xl`, `px-8`).
- Vertical spacing:
  - Header to core block: medium
  - Category groups: consistent block gap
  - Chip spacing: compact but breathable

---

## Visual Design Rules
1. Keep panels dark with subtle border (`border-outline-variant/20` style).
2. Use soft rounded corners and low-contrast separators.
3. Use one accent color family (current orange-red primary).
4. Avoid heavy glow on left panel; reserve stronger visual energy for globe side.
5. Keep category titles uppercase + tracking for hierarchy.

---

## Interaction Strategy
### Left side
- Lightweight hover only on chips.
- No heavy motion.

### Right side
- Keep current globe interaction:
  - drag rotate
  - hover/click node labels
- Keep helper caption under globe.

---

## Implementation Phases
## Phase 1: Structural Refactor
1. Remove current full-width globe block from [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx).
2. Add new two-column wrapper directly after section heading.
3. Place `SkillsGlobeCanvas` in the right column card.

Deliverable: stable two-column scaffold with right-side globe.

## Phase 2: Left Panel Construction
1. Add left-panel grouped data constant.
2. Build category cards/chip components inside Tech Stack section.
3. Align spacing and typography to reference style.

Deliverable: readable, clean grouped tech matrix.

## Phase 3: Visual Harmonization
1. Tune borders, chip backgrounds, and emphasis states.
2. Ensure right globe card and left cards feel balanced.
3. Remove redundant decorative elements that create clutter.

Deliverable: polished and cohesive section.

## Phase 4: Responsive QA
1. Validate breakpoints (`sm`, `md`, `lg`, `xl`).
2. Ensure chips wrap naturally without overlap.
3. Confirm globe preserves aspect and interaction on smaller screens.

Deliverable: production-ready responsive behavior.

---

## Files To Update
Primary:
- [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx)

Potential support:
- [data/tech-globe-items.ts](data/tech-globe-items.ts) (only if icon reuse is desired)
- Optional new file for left panel data: `data/tech-stack-groups.ts`

No new dependency is required for this redesign.

---

## Acceptance Criteria
1. Globe is no longer in the old full-width top block.
2. Section shows a clean left-right split on desktop.
3. Left side categories are readable and well-spaced (reference-aligned).
4. Globe remains interactive and visually balanced on the right.
5. Mobile stacks correctly with no overflow or clipping.
6. Overall section appears simpler, cleaner, and more organized than current layout.

---

## Risks and Mitigation
1. Risk: section feels crowded with bento content still below.
- Mitigation: reduce margins or schedule a follow-up simplification pass.

2. Risk: chip icons become inconsistent.
- Mitigation: define a single icon source policy (Material symbols or logo set).

3. Risk: right column dominates visually.
- Mitigation: cap globe card width and reduce glow intensity.

---

## Suggested Execution Order (Practical)
1. Move globe to right column and remove old globe block.
2. Build left category cards with placeholder icons.
3. Polish spacing/typography.
4. Final responsive QA and minor visual tuning.
