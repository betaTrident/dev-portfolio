# Section-Per-Folder Strategy Plan

## Objective
Adopt a maintainable, clean, and reusable architecture where each homepage section is owned by a dedicated folder and exposed through a `page.tsx` entry file.

## Current State
- The homepage is currently composed centrally in `app/page.tsx`.
- Section UI already exists in `components/sections/*`.
- Section folders already exist under `pages/` but are empty.

## Recommended Direction
Use a feature-first structure where each section has:
- A local `page.tsx` (entry and composition point for that section).
- Optional co-located files for types, constants, hooks, and tests only when complexity justifies them.
- Shared primitives in `components/ui` and shared utilities in `lib`.

## Target Structure
```txt
pages/
  Hero/
    page.tsx
  About/
    page.tsx
  TechStack/
    page.tsx
  Projects/
    page.tsx
  Testimonials/
    page.tsx
  Certificates/
    page.tsx
  Contact/
    page.tsx
```

Optional per section when needed:
```txt
config.ts   // only if static content becomes large or reused
types.ts    // only if local prop/data contracts are non-trivial
hooks.ts    // only if section-specific behavior grows
```

## Section Contract (Standard)
Each `page.tsx` should follow a small contract:
- Export a single default React component for the section.
- Accept typed props where needed (or read from local `config.ts`).
- Keep section-specific logic local.
- Use shared components for buttons/cards/forms.
- No cross-section imports except from shared modules.

## Composition Strategy
Keep `app/page.tsx` as an orchestrator only:
- Import each section from its folder-level `page.tsx`.
- Render sections in the desired order.
- Avoid embedding section logic directly in `app/page.tsx`.

Example composition intent:
```tsx
import HeroPage from "@/pages/Hero/page";
import AboutPage from "@/pages/About/page";
// ...

export default function Page() {
  return (
    <main>
      <HeroPage />
      <AboutPage />
      {/* ... */}
    </main>
  );
}
```

## Reusability Rules
1. UI building blocks live in `components/ui`.
2. Cross-section composite blocks move to `components/sections-common` if reused in 2+ sections.
3. Data schemas and DTO types move to `types/` only if shared by 2+ sections.
4. Animation helpers belong in `lib/animations.ts` to avoid duplicated GSAP logic.
5. Keep section constants co-located first; promote to shared only when reuse is proven.

## Migration Plan
1. Create `page.tsx` in each folder under `pages/`.
2. For each section, migrate implementation from `components/sections/*` into corresponding `pages/*/page.tsx`, or keep thin wrappers that re-export existing section components.
3. Update `app/page.tsx` imports to use `pages/*/page` modules.
4. Move section-specific content (text arrays, card configs, metadata) into local `config.ts` only when files become large or configs are reused.
5. Remove dead code after each successful migration step.
6. Run `npm run lint` and `npm run build` after all moves.

## Suggested Incremental Rollout
1. Start with low-risk sections: `About`, `Certificates`, `Testimonials`.
2. Migrate medium complexity: `TechStack`, `Projects`.
3. Migrate high complexity last: `Hero`, `Contact` (animations/forms).

## Quality Gates
- `app/page.tsx` remains under ~80 lines and only composes sections.
- Each section folder owns its own `page.tsx`; `config.ts`/`types.ts` exist only where they provide clear value.
- No duplicated helper logic across section folders.
- Lint/build pass with no regressions.
- Visual parity verified section-by-section.

## Naming and Conventions
- Keep folder names consistent with your existing style: `Hero`, `About`, `TechStack`, etc.
- Keep file names predictable: always `page.tsx`; add `config.ts` and `types.ts` only when needed.
- Use explicit exports for shared helpers; default export only for section `page.tsx`.

## Risks and Mitigations
- Risk: Confusion between Next.js `app` router and custom `pages/` feature folders.
  - Mitigation: Treat `pages/` as feature modules, while `app/page.tsx` stays the actual route entry.
- Risk: Import path churn during migration.
  - Mitigation: Migrate one section at a time and verify after each change.
- Risk: Logic duplication when copying files.
  - Mitigation: Extract shared logic immediately into `components/ui` or `lib`.

## Definition of Done
- Every section has a dedicated `pages/<Section>/page.tsx`.
- Homepage renders exclusively via those section page modules.
- Shared utilities are centralized.
- All checks pass and UI matches the current portfolio behavior.