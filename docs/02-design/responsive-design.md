# Responsive design

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Styles are written mobile-first: the base styles target the smallest screen, and `min-width` media queries add layout from there. Mobile users get the same content and functions as desktop users ([target audience](../01-product/target-audience.md#design-implications)).

## Breakpoints

CSS custom properties can't be used inside media queries, so these values are constants. Use them as written.

| Name | Query | What changes |
|---|---|---|
| base | — | One column. Menu-button navigation. Gutter `--space-4`. |
| `sm` | `(min-width: 40rem)` (640 px) | Gutter `--space-5`. Card grid can show 2 columns. |
| `md` | `(min-width: 60rem)` (960 px) | **Full inline navigation, no menu button.** Gutter `--space-6`. |
| `lg` | `(min-width: 75rem)` (1200 px) | Sticky table-of-contents column on case studies. Card grid can show 3 columns. |

Card grids reflow on their own because of `auto-fill`/`minmax`. These breakpoints only control layout and navigation.

## Navigation

| Width | Behavior |
|---|---|
| < 960 px, JavaScript on | The name and a menu button sit in the header. The menu opens below the header as a full-width panel on `surface-raised` (FR-GLB-04). Résumé is the last item in the panel. |
| < 960 px, JavaScript off | No menu button. The nav links are always visible and wrap onto a second header row (FR-GLB-06). |
| ≥ 960 px | All links inline, with Résumé as a secondary button on the right. |

The header is sticky at every width, with a height of `--header-height`. `scroll-padding-top` keeps anchored and focused elements visible below it.

## Content that can be wider than the screen

| Content | Behavior |
|---|---|
| Code blocks | Scroll sideways inside the block. The block is keyboard-focusable (`tabindex="0"`), has a label, and shows a visible focus ring. Code never wraps, because wrapping hides indentation. |
| Architecture diagrams | They fit the container by default (`max-width: 100%`). If a diagram can't be read at 360 px (labels smaller than about 12 px when rendered), it gets the same focusable horizontal-scroll wrapper as code, with an "Open full size" link to the SVG. The text description is always available. |
| Tables | Wrapped in a focusable, labelled scroll container. Tables are kept narrow (at most 4 columns) in content. |
| Long words and URLs | `overflow-wrap: anywhere` in prose. |

The page itself never scrolls sideways at any width of 320 px or more (NFR-COMPAT-02, NFR-A11Y-05).

## Typography and spacing

- Display and `h1` sizes are fluid (`clamp()`). Prose grows from 17 px to 18 px ([type scale](visual-design-system.md#type-scale)).
- Section spacing grows from `--space-8` to `--space-9` at `md`.
- Prose is never wider than `--measure` at any width.

## Images

- Every image is rendered by Astro's `<Image>` or `<Picture>`, which provide `width`/`height` (to prevent layout shift), responsive `srcset`/`sizes`, AVIF and WebP formats, and `loading="lazy"`. The one exception is an above-the-fold image, which gets `loading="eager"` and `fetchpriority="high"`.
- The home hero has no image. The largest element on screen when the page loads is text, which keeps LCP fast (NFR-PERF-01).

## Touch and input

- Primary targets (menu button, nav links in the panel, filter chips, CTAs) are at least 44×44 px. Every target is at least 24×24 px (SC 2.5.8).
- Hover effects are only added under `@media (hover: hover)`, so nothing depends on hover.

## Test viewports

| Device class | Viewport | Used in |
|---|---|---|
| Small phone | 320×568 | Manual reflow check |
| Phone | 360×640 | E2E (FR-HOME-01), axe |
| Phone (iOS) | 390×844 (WebKit) | E2E |
| Tablet | 768×1024 | Manual |
| Laptop | 1280×800 | E2E, axe |
| Desktop | 1920×1080 | Manual |
| 200% zoom on 1280 | — | Manual (NFR-A11Y-05) |
