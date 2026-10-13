# Accessibility

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

**Standard:** WCAG 2.2 Level AA (NFR-A11Y-01). This document turns that standard into concrete rules for this site and sets out how they are tested. Where a rule here conflicts with a visual preference, this document wins ([design principles](design-principles.md#resolving-conflicts)).

## Structure and semantics

- `<html lang="en">`. Any passage in another language gets its own `lang`.
- Landmarks: one `header`, one `nav` with `aria-label="Primary"`, one `main`, and one `footer`. The case-study table of contents is a second `nav` with `aria-label="On this page"`, and the breadcrumb is `nav aria-label="Breadcrumb"`.
- Exactly one `h1` per page. Heading levels never skip.
- Lists are marked up as lists: nav links, project cards (`ul` > `li` > `article`), stack items, and results.
- The case-study summary block is a `dl`. Dates use `<time datetime>`.
- Native elements come before ARIA. A button is a `<button>` and a link is an `<a href>`.

## Keyboard

- Everything works with a keyboard alone. There are no keyboard traps, and focus order follows visual order (NFR-A11Y-03).
- "Skip to content" is the first focusable element (FR-GLB-03).
- Focus indicator: `--focus-ring`, which is a 2px outline at 9.64:1 against the background. It is never removed with `outline: none` unless an equally visible replacement is in place.
- Focus is never hidden: `scroll-padding-top: var(--header-height)` stops the sticky header from covering the focused element (SC 2.4.11).
- Mobile menu: Escape closes it and returns focus to the button. There's no focus trap, because the panel isn't modal and tabbing past the last link continues into the page.
- Filter chips: each is a `<button aria-pressed>` and is reached with Tab. No roving tabindex is needed for six or fewer chips.

## Color and contrast

- Ratios and their verification are in the [visual design system](visual-design-system.md#verified-contrast).
- Information is never carried by color alone. Prose links are underlined, the active nav item is semibold and underlined, and the active filter chip shows a ✓ and is semibold.
- The site is checked in grayscale as part of the manual pass.

## Motion

- Under `prefers-reduced-motion: reduce`, durations are set to near zero globally (FR-GLB-08).
- Nothing flashes, nothing plays automatically, and there's no parallax or scroll-jacking.

## Images and diagrams

| Kind | Rule |
|---|---|
| Informative image or screenshot | The `alt` text says what the image shows that matters here, for example "Dashboard listing 14 tracked vehicles with entry timestamps", not "screenshot". At most about 150 characters. |
| Decorative image | `alt=""`. Prefer CSS for decoration. |
| Architecture diagram | A short `alt` naming the diagram, plus a full **text description** in a `<details>` element labelled "Text description" right below it. The description lists every component and every data flow in reading order (FR-CS-07). |
| Charts of results | The same pattern as diagrams. The numbers must also appear as text or in a table. |
| Icons | Decorative icons have `aria-hidden="true"`. An icon-only control has an accessible name, for example `aria-label="Open menu"`. |

## Links

- Link text describes where the link goes, even out of context. Never "here" or "read more". Card links are named by the project title only.
- External links carry an icon and visually hidden " (external)" text (FR-GLB-07). Links open in the same tab.
- File links state their type and size: "Résumé (PDF, 120 KB)" (FR-RES-02).

## Dynamic updates

| Event | Announcement |
|---|---|
| Filter change | Polite live region: "4 projects" (FR-PRJ-06) |
| Email copied | Polite live region: "Email address copied" (FR-CON-02) |
| Menu open/close | `aria-expanded` on the button. No live announcement. |

The live regions are in the DOM from the initial render (empty) so screen readers register them.

## Forms

There are no forms in v1 (FR-CON-04). If a form is ever added through an ADR, it must have:

- visible labels,
- programmatically associated errors,
- an error summary that receives focus on submit,
- no CAPTCHA that requires a cognitive test (SC 3.3.8).

## Scrollable regions

Code blocks, wide diagrams, and tables that overflow have `tabindex="0"`, `role="region"`, and an `aria-label` such as "Code: config.yaml" or "Diagram: system architecture". They also have a visible focus ring.

## Content authoring rules

- Write `alt` text and diagram descriptions at the same time as the content. A pull request without them doesn't meet the [definition of done](../05-delivery/definition-of-done.md).
- Don't use emoji as bullet points or to carry meaning.
- Spell out each abbreviation the first time it appears on a page: "Retrieval-Augmented Generation (RAG)".
- Tables in MDX have a header row. Complex tables are avoided.

## Testing

### Automated (every pull request)

- axe-core (`@axe-core/playwright`) runs on every route at 360 px and 1280 px, with the menu both open and closed, and fails on any violation (NFR-A11Y-02).
- ESLint with the Astro accessibility rules (`jsx-a11y` via `eslint-plugin-astro`).
- E2E tests for keyboard behavior: skip link, menu, filter, and copy button (FR-GLB-03, FR-GLB-04, FR-PRJ-04, FR-CON-02).

Automated tools find only a minority of WCAG failures. The manual pass below is required for every release.

### Manual test procedure

Run this before every release ([release checklist](../05-delivery/release-checklist.md)) and after any change to layout or components.

1. **Keyboard only** (Safari and Chrome, desktop): Tab through every route. Check focus visibility, order, the skip link, the menu, the filter, the copy button, and scrollable regions.
2. **VoiceOver on macOS with Safari:** flows F1 and F2. Check landmarks with the rotor, the heading outline, link names, the filter announcement, and diagram descriptions.
3. **VoiceOver on iOS with Safari:** flow F1 using swipe navigation and the menu.
4. **Zoom:** 200% text zoom and a 320 px viewport. No lost content and no sideways scrolling of the page (NFR-A11Y-05).
5. **Reduced motion and grayscale:** turn both on in the OS. No motion, and state is still understandable.
6. Record the results in the release checklist, with the date and the browser and assistive-technology versions.
