# Tech Stack Curated Display + View All Modal + Globe Simplification Plan

## Goal
Update the Tech Stack section to:
1. Show only a curated preview in the main view.
2. Add a "View All" button that opens a modal with the complete stack.
3. Remove the distracting background/frame around the globe in its current panel.
4. Make the globe smaller and visually balanced with the left-side content.

---

## Scope Of Requested Curated Preview
Main Tech Stack display should only show:

### Frontend
- JavaScript
- TypeScript
- React
- Next.js
- Tailwind CSS

### Backend
- Node.js
- Python
- PostgreSQL
- MongoDB
- NestJS
- Express.js

### AI & Machine Learning
- TensorFlow
- PyTorch
- LangChain
- LlamaIndex
- OpenAI
- Anthropic

Everything else should move to the "View All" modal.

---

## Feasibility
Yes, this is fully feasible in your current codebase.
You already have:
- Tech Stack section structure in [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx)
- Existing globe component in [components/3d/skills-globe/skills-globe-canvas.tsx](components/3d/skills-globe/skills-globe-canvas.tsx)
- Modal primitives via [components/ui/dialog.tsx](components/ui/dialog.tsx)

No mandatory new dependency is required.

---

## Strategic Design Approach

## 1) Data Layer Split
Create a clean split between:
1. `featuredStackGroups` (only the curated list above)
2. `allStackGroups` (full inventory for modal)

### Why
- Keeps the default UI focused and easy to scan.
- Prevents main section from becoming too dense.
- Makes modal behavior predictable and maintainable.

### Recommended data shape
Use a shared `StackGroup`/`StackItem` type and two constants.

---

## 2) Main Section UX Structure
Left side (primary content):
1. Keep three compact groups only:
- Frontend
- Backend
- AI & Machine Learning
2. Add a `View All` button below the curated groups.

Right side (visual support):
1. Keep the globe.
2. Remove enclosing decorative background/chrome (grid overlay + heavy panel frame).
3. Reduce globe footprint so it does not compete with text hierarchy.

---

## 3) Modal Strategy (View All)
When user clicks `View All`:
1. Open modal using existing dialog primitives.
2. Modal displays complete stack grouped by categories.
3. Allow vertical scrolling if content exceeds viewport.

### Modal content structure
- Header: "Complete Tech Stack"
- Optional subtext: short explanation
- Body: grouped categories with chips
- Footer: close action

### Accessibility requirements
- Keyboard open/close support (already provided by dialog primitives)
- Focus trap inside modal
- Escape key closes modal
- Button has accessible label

---

## 4) Globe Simplification Strategy
Current globe container includes extra visual framing that is distracting.

### Changes
1. Remove or soften outer frame around globe in [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx).
2. Remove decorative overlays behind globe (grid and dark gradient overlays in panel wrapper).
3. Keep globe itself intact and interactive.
4. Reduce globe visual scale.

### Size strategy
Add configurable sizing to globe component:
- `size` prop (or `className`)
- Example target: around `360-420px` desktop, `300-340px` mobile

### Recommended implementation detail
In [components/3d/skills-globe/skills-globe-canvas.tsx](components/3d/skills-globe/skills-globe-canvas.tsx):
- Introduce a prop-driven size (instead of fixed default only).
- Keep reasonable min/max constraints.

---

## 5) Visual Guidelines (Simple + Clean)
1. Minimize borders and effects around globe area.
2. Keep left chips compact with consistent spacing.
3. Reserve accent color for headings and key interactions only.
4. Maintain rhythm:
- Group title spacing
- Chip wrapping spacing
- Clear separation before `View All` button

---

## Implementation Phases

## Phase 1: Data Refactor
1. Define shared stack types.
2. Create curated `featuredStackGroups`.
3. Create complete `allStackGroups`.

Deliverable: single source of truth for preview and modal data.

## Phase 2: Main View Update
1. Replace current left-side groups with curated three-category preview.
2. Add `View All` trigger button under curated content.
3. Keep right-side globe in place.

Deliverable: cleaner, focused main display.

## Phase 3: Modal Build
1. Implement dialog in Tech Stack section using existing UI primitives.
2. Render `allStackGroups` inside modal body.
3. Ensure scroll and responsive layout work.

Deliverable: complete stack is accessible on demand.

## Phase 4: Globe Panel Cleanup + Resize
1. Remove current background/chrome around globe container.
2. Add size prop support in globe canvas component.
3. Pass reduced size from Tech Stack section.

Deliverable: less distracting globe presentation with improved balance.

## Phase 5: QA and Polish
1. Check desktop/tablet/mobile behavior.
2. Validate interaction states (hover, modal open/close, keyboard navigation).
3. Confirm no overflow/regression in existing section spacing.

Deliverable: production-ready section behavior and appearance.

---

## File-Level Change Plan
Primary updates:
- [components/sections/tech-stack.tsx](components/sections/tech-stack.tsx)
  - curated groups
  - View All modal trigger
  - modal content rendering
  - simplified globe wrapper

- [components/3d/skills-globe/skills-globe-canvas.tsx](components/3d/skills-globe/skills-globe-canvas.tsx)
  - size configurability
  - optional class customization hooks

Potential optional support file:
- `data/tech-stack-groups.ts`
  - stores `featuredStackGroups` + `allStackGroups`

No new package installation required for this feature set.

---

## Acceptance Criteria
1. Main Tech Stack shows only:
- Frontend (5 items)
- Backend (6 items)
- AI & Machine Learning (6 items)

2. `View All` button opens a modal with complete stack categories.
3. Modal is keyboard accessible and closes via Escape/close button.
4. Globe remains interactive but appears smaller.
5. Background/chrome enclosing the globe is removed or significantly simplified.
6. Section remains clean, organized, and visually balanced.

---

## Risks And Mitigations
1. Risk: Modal becomes too long and cluttered.
- Mitigation: grouped sections with clear headings and internal spacing.

2. Risk: Globe looks disconnected after wrapper removal.
- Mitigation: keep subtle spacing and optional soft divider instead of heavy panel.

3. Risk: Too many data edits in component file reduce maintainability.
- Mitigation: move stack data to dedicated data file.

---

## Suggested Execution Order (Practical)
1. Implement curated preview data and render only requested items.
2. Add View All modal with full list.
3. Simplify globe container and reduce size.
4. Run final responsiveness + accessibility checks.
