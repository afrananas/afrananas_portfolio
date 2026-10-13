# Visual design system

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

These are the design tokens and component states. They are implemented as CSS custom properties in `src/styles/tokens.css`, and **the code must not use any raw color, size, or font value outside that file** ([coding standards](../04-engineering/coding-standards.md#css)). The [design principles](design-principles.md) explain why the tokens look this way.

Token names describe a role, not a value, so a light theme can be added later by redefining the same tokens. A light theme is deferred.

## Color

Contrast ratios were calculated with the WCAG 2.x relative-luminance formula. Any change to a color must recalculate and update this table before it merges (NFR-A11Y-06).

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0f1115` | Page background. Near-black, not `#000`. |
| `--color-surface` | `#161a20` | Cards, code blocks, summary block. |
| `--color-surface-raised` | `#1e232b` | Hover state of surfaces, open mobile menu. |
| `--color-text` | `#e8eaed` | Body text and headings. Off-white, not `#fff`. |
| `--color-text-muted` | `#a3acb7` | Metadata, captions, secondary text. |
| `--color-accent` | `#7cc7b8` | Links, focus ring, primary button, active filter. **Nothing else.** |
| `--color-on-accent` | `#0f1115` | Text on an accent background. |
| `--color-border` | `#2b313a` | Decorative dividers only. Too low in contrast to mark a component boundary. |
| `--color-border-strong` | `#68727e` | Boundaries of interactive components (buttons, filter chips, the code-scroll region). |
| `--color-focus` | `var(--color-accent)` | Focus indicator. |

### Verified contrast

| Foreground | on `bg` | on `surface` | on `surface-raised` | Requirement |
|---|---|---|---|---|
| `text` | 15.68 | 14.49 | 13.10 | ≥ 4.5 ✅ |
| `text-muted` | 8.23 | 7.60 | 6.87 | ≥ 4.5 ✅ |
| `accent` (link text, focus ring) | 9.64 | 8.91 | 8.06 | ≥ 4.5 text, ≥ 3 non-text ✅ |
| `border-strong` | 3.87 | 3.57 | 3.23 | ≥ 3 for UI component boundaries ✅ |
| `border` | 1.44 | 1.33 | 1.20 | Decorative only, never relied on |
| `on-accent` on `accent` | 9.64 | | | ≥ 4.5 ✅ |

**Links in body text vs surrounding text:** `accent` against `text` is only 1.63:1, which is below the 3:1 needed to identify a link by color alone (SC 1.4.1). **So links in prose are always underlined.** Nav links and card titles are identified by their position and context, and they get an underline on hover and focus.

### Syntax highlighting

Code uses the Shiki theme `github-dark-default`, with its background overridden to `--color-surface`. Token contrast against `#161a20`:

| Token | Color | Ratio |
|---|---|---|
| Plain text | `#e6edf3` | 14.78 |
| Comment (lowest) | `#8b949e` | 5.68 |
| Keyword | `#ff7b72` | 6.92 |
| Function | `#d2a8ff` | 8.97 |
| Constant | `#79c0ff` | 8.98 |
| Variable | `#ffa657` | 9.02 |
| String, tag | `#a5d6ff`, `#7ee787` | 11.36 |

All pass the 4.5:1 minimum. If the theme is changed, recalculate this table.

## Typography

The fonts are self-hosted through Astro's Fonts API, using the Fontsource provider and the Latin subset. They are never loaded from a third-party CDN ([privacy](../00-foundation/assumptions-and-constraints.md#privacy-expectations)).

| Token | Value | Use |
|---|---|---|
| `--font-sans` | IBM Plex Sans, then system-ui and sans-serif | Everything except technical data |
| `--font-mono` | IBM Plex Mono, then ui-monospace and monospace | Code, technologies, metrics, dates, file paths. **Never prose.** |

**Font files (4, NFR-PERF-05):** Plex Sans 400, Plex Sans 400 italic, Plex Sans 600, and Plex Mono 400. Only Plex Sans 400 is preloaded. A fallback with adjusted metrics prevents layout shift while the fonts load.

### Type scale

The scale has a ratio of 1.25. The display sizes are fluid, sized between 360 px and 1200 px viewports.

| Token | Size | Line height | Use |
|---|---|---|---|
| `--text-xs` | 0.8125rem (13 px) | 1.5 | Mono metadata labels only |
| `--text-sm` | 0.875rem (14 px) | 1.5 | Captions, footer |
| `--text-base` | 1rem (16 px) | 1.6 | UI text, cards |
| `--text-prose` | 1.0625rem → 1.125rem (17 → 18 px) | 1.7 | Case-study and article body |
| `--text-lg` | 1.25rem | 1.4 | `h3`, lead paragraph |
| `--text-xl` | 1.5625rem | 1.3 | `h2` |
| `--text-2xl` | clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem) | 1.2 | Page `h1` |
| `--text-display` | clamp(2.25rem, 1.6rem + 3vw, 3.5rem) | 1.1 | Home hero name only |

| Token | Value |
|---|---|
| `--weight-regular` | 400 |
| `--weight-semibold` | 600 (headings, active nav, active filter) |

Prose lines are limited to `--measure: 68ch`. Headings use `text-wrap: balance`.

## Spacing

The scale is based on 4 px. Use only these values.

| Token | Value | Token | Value |
|---|---|---|---|
| `--space-1` | 0.25rem (4 px) | `--space-6` | 2rem (32 px) |
| `--space-2` | 0.5rem (8 px) | `--space-7` | 3rem (48 px) |
| `--space-3` | 0.75rem (12 px) | `--space-8` | 4rem (64 px) |
| `--space-4` | 1rem (16 px) | `--space-9` | 6rem (96 px) |
| `--space-5` | 1.5rem (24 px) | | |

Vertical rhythm:

- Between page sections: `--space-8` on mobile, `--space-9` on desktop.
- Between a heading and its content: `--space-3`.
- Between paragraphs: `--space-4`.

## Layout and grid

| Token | Value | Use |
|---|---|---|
| `--width-content` | 72rem (1152 px) | Maximum width of the page container |
| `--measure` | 68ch | Maximum width of prose |
| `--gutter` | `--space-4` below 640 px, `--space-5` from 640 px, `--space-6` from 960 px | Container padding |
| `--header-height` | 4rem | Used for `scroll-padding-top` so focused and anchored elements aren't hidden under the sticky header (SC 2.4.11) |

**Grid:**

- Project cards use `repeat(auto-fill, minmax(min(100%, 22rem), 1fr))`, which gives 1, 2, or 3 columns without breakpoint code.
- Case studies use a single column, plus a table-of-contents column of `16rem` from 1200 px.

Breakpoints are in [responsive design](responsive-design.md#breakpoints).

## Shape, borders, and elevation

| Token | Value |
|---|---|
| `--radius-sm` | 4px (buttons, chips, code) |
| `--radius-md` | 8px (cards, figures) |
| `--border-width` | 1px |
| `--focus-ring` | `2px solid var(--color-focus)` with `outline-offset: 2px` |

There are no shadows. Elevation is shown by moving from `bg` to `surface` to `surface-raised`, plus a `border` ([principle 3](design-principles.md#3-dark-first-done-properly)).

## Motion

| Token | Value |
|---|---|
| `--duration-fast` | 150ms |
| `--ease-standard` | cubic-bezier(0.2, 0, 0, 1) |

Under `prefers-reduced-motion: reduce`, every duration is set to `0.01ms` globally (FR-GLB-08). Motion is used only for opening the menu, hover color changes, and filter state changes.

## Iconography

- Icons are inline SVG at 16 or 20 px, using `stroke="currentColor"`. Decorative icons have `aria-hidden="true"`. An icon that is the only content of a control gets an accessible name from the control.
- Sources: [Lucide](https://lucide.dev) (ISC license) for interface icons and [Simple Icons](https://simpleicons.org) (CC0) for brand marks. The SVGs are copied into `src/components/icons/` with their license noted. There is no icon-library dependency.
- The full set: `menu`, `x`, `arrow-left`, `arrow-right`, `external-link`, `copy`, `check`, `file-text` (PDF), `mail`, `github`, `linkedin`.

## Component states

| Component | Default | Hover | Focus-visible | Active/current | Disabled |
|---|---|---|---|---|---|
| Prose link | `accent`, underline 1px, offset 0.2em | Underline 2px | Focus ring | — | n/a |
| Nav link | `text` | `accent` and underline | Focus ring | `semibold` and a 2px underline in `accent` (FR-GLB-02) | n/a |
| Primary button (CTA) | `accent` background, `on-accent` text | Background lightened 8% | Focus ring, offset from the button | — | Not used |
| Secondary button | Transparent, 1px `border-strong`, `text` | `surface-raised` background | Focus ring | — | Not used |
| Filter chip | 1px `border-strong`, `text-muted` | `text` | Focus ring | `aria-pressed="true"`: `accent` border, `text` color, `semibold`, and a ✓ icon. This is not color alone. | n/a |
| Project card | `surface`, 1px `border` | `surface-raised`, `border-strong` | Focus ring on the title link. The whole card is clickable through a stretched link. | — | n/a |
| Code block | `surface`, 1px `border` | — | Focus ring on the scroll region | — | n/a |

Every interactive target is at least 24×24 CSS px (SC 2.5.8). Primary touch targets in the header and the filter are 44×44 px.

## Imagery

- **Diagrams:** SVG, drawn for the dark background using only token colors. The editable source (`.excalidraw` or `.d2`) is committed next to the export ([content model](../03-architecture/content-and-data-model.md#diagrams)).
- **Screenshots:** real output only, with a 1px `border` and `--radius-md`, and a 16:9 or native aspect ratio. They are never cropped in a way that misrepresents what they show.
- **Photography:** an optional portrait on About only. No stock imagery anywhere.
- **Social preview image:** 1200×630, `bg` background, with the name, the positioning line, and an accent rule. It is designed once and stored at `public/og-default.png`.
