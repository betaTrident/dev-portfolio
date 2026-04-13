# Design System Document: The Digital Architect
 
## 1. Overview & Creative North Star
 
### The Creative North Star: The Digital Architect
This design system is built upon the philosophy of "The Digital Architect"—a synthesis of structural engineering precision and the fluid, editorial sensibilities of high-end design. Unlike standard frameworks that rely on rigid grids and heavy containment, this system breathes through **intentional asymmetry**, **tonal depth**, and **overlapping geometry**.
 
We move beyond the "template" look by treating the screen not as a flat canvas, but as a three-dimensional workspace. By utilizing high-contrast typography scales and sophisticated layering, we create an experience that feels custom-built, premium, and intellectually authoritative.
 
---
 
## 2. Colors & Tonal Depth
 
In this system, color is not merely decorative; it is a functional tool for defining architecture.
 
### The Surface Hierarchy
We utilize a monochromatic depth scale to define boundaries. Instead of using lines to separate content, use the **Surface Tiers** to create a "nested" physical presence.
- **Surface (Base):** `#131313` — The foundation of the experience.
- **Surface-Container-Lowest:** `#0e0e0e` — Used for "recessed" elements like input fields or sunken content areas.
- **Surface-Container-Highest:** `#353534` — Used for "elevated" elements that need to pop against the base.
 
### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section sitting directly on a `surface` background creates a sophisticated, soft edge that feels more integrated than a hard stroke.
 
### Glassmorphism & Signature Gradients
To inject "soul" into the engineering-heavy precision:
- **Glassmorphism:** For floating overlays (menus, modals), use the `surface` color at 70% opacity with a `20px` backdrop-blur. This allows underlying content to bleed through, creating a sense of environmental continuity.
- **Signature Gradients:** Primary actions must use a 135-degree linear gradient transitioning from `primary` (`#adc6ff`) to `primary-container` (`#4d8eff`). This creates a luminous, metallic finish that commands attention.
 
---
 
## 3. Typography: Editorial Authority
 
We use **Inter** as our sole typeface, relying on extreme scale and weight contrast to establish a clear information hierarchy.
 
| Level | Size | Tracking / Leading | Usage |
| :--- | :--- | :--- | :--- |
| **Display-LG** | 3.5rem | -0.02em / 1.1 | Hero moments and high-impact editorial statements. |
| **Headline-MD** | 1.75rem | -0.01em / 1.2 | Section headings that require authority. |
| **Title-SM** | 1rem | 0 | Bold sub-headers and card titles. |
| **Body-LG** | 1rem | 1.6 line-height | Primary reading experience; prioritized for legibility. |
| **Label-MD** | 0.75rem | 0.05em / All-Caps | Small metadata, chips, and utility navigation. |
 
**The Editorial Edge:** Use `Display-LG` with asymmetrical placement—often overlapping surface containers—to break the "boxed-in" feel of traditional web layouts.
 
---
 
## 4. Elevation & Depth
 
### The Layering Principle
Depth is achieved through **Tonal Layering**. Instead of a flat grid, treat the UI as stacked sheets of fine material. 
- **Recess:** Place a `surface-container-lowest` card on a `surface` background to suggest a technical "well."
- **Lift:** Place a `surface-container-high` element over a `surface` background to suggest a physical priority.
 
### Atmospheric Shadows
When an element must "float" (e.g., a primary modal), do not use dark, muddy drop shadows.
- **Spec:** 32px–64px Blur, 4%–8% Opacity.
- **Color:** Use a tinted version of `on-surface` (`#e5e2e1`) to create an "atmospheric glow" rather than a shadow, mimicking natural light diffraction.
 
### The "Ghost Border" Fallback
If a border is absolutely required for accessibility (e.g., High Contrast modes):
- **Spec:** Use `outline-variant` (`#424754`) at **15% opacity**. 100% opaque, high-contrast borders are strictly forbidden.
 
---
 
## 5. Components
 
### Buttons
- **Primary:** 135-degree Gradient (`primary` to `primary-container`), `8px` (md) radius, `label-md` (all-caps) text.
- **Secondary:** `surface-container-highest` background, no border, white text.
- **Tertiary:** Text-only, `primary` color, `0.05em` letter spacing.
 
### Inputs & Fields
- **Background:** `surface-container-lowest` (`#0e0e0e`).
- **Shape:** `0.5rem` (default) radius.
- **Interaction:** On focus, transition background to `surface-container-low` and add the "Ghost Border" at 20% opacity.
 
### Chips
- **Style:** `surface-container-highest` background, `full` (9999px) radius.
- **Typography:** `label-md` text. Used for filtering and categorization without cluttering the visual field.
 
### Cards & Lists
- **Rule:** Forbid the use of divider lines.
- **Separation:** Use vertical whitespace (referencing the Spacing Scale) or a subtle shift from `surface` to `surface-container-low` to distinguish between items.
 
### Data Visualization (The Architect's Tool)
- Use thin, high-contrast lines in `primary` or `tertiary` (`#ffb786`) to represent data. 
- Background grids in charts should use the `outline-variant` at 10% opacity—visible enough to assist the eye, but subtle enough to remain background "noise."
 
---
 
## 6. Do's and Don'ts
 
### Do
- **Do** use asymmetrical layouts where text overlaps container edges.
- **Do** use generous vertical whitespace to separate major content groups.
- **Do** leverage "Surface Nesting" to create hierarchy (e.g., a `lowest` container inside a `high` container).
- **Do** ensure all interactive elements have a clear `primary` focus state.
 
### Don't
- **Don't** use 1px solid lines or pure black (`#000000`).
- **Don't** use standard drop shadows; only atmospheric glows are permitted.
- **Don't** use centered layouts for editorial content; prefer left-aligned or intentionally offset compositions.
- **Don't** crowd elements. If the design feels busy, increase the background-to-surface contrast and add 24px of padding.