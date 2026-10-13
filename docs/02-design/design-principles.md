# Design principles

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

The visual direction is **dark-first, restrained, editorial, technical, and evidence-led**. These principles constrain the [visual design system](visual-design-system.md) and the [page specifications](page-specifications.md). Neither may contradict them.

## 1. Evidence over assertion

Design gives the most prominence to the content that proves something.

- **In practice:**
  - Architecture diagrams, results with their context, and links to repositories and demos get visual weight.
  - Technologies always appear next to what they were used for.
  - Every image has a purpose: a diagram explains, a screenshot shows real output.
- **Avoid:** skill bars, proficiency percentages, walls of logos, stock photography, decorative illustration, and unqualified superlatives.

## 2. Restraint

The work is the subject, not the design.

- **In practice:**
  - A small palette with a single accent color, used only for links, focus states, and key data.
  - Contrast and spacing create hierarchy. Color does very little of it.
  - Few font sizes and few surface levels.
- **Avoid:** gradients used as decoration, glow effects, glassmorphism, particle or animated backgrounds, and more than one accent color.

## 3. Dark-first, done properly

- **In practice:**
  - The background is near-black and the text is off-white. Pure `#000` behind pure `#fff` causes halation, which is especially hard on readers with astigmatism.
  - Raised elements are shown with lighter surfaces and thin borders. Shadows are hard to see on a dark background.
  - Accent and status colors are made less saturated so they don't vibrate against the dark background.
  - Tokens are named by role, such as `--color-text-primary`, not by value, such as `--white`. A light theme is deferred, but this keeps it cheap to add.

## 4. Editorial readability

Case studies are long reading. Type is set for reading rather than display.

- **In practice:**
  - Body text is at least 16 px with a line height of 1.5–1.7.
  - Lines of prose are 60–75 characters long.
  - Headings are clearly different from body text and correctly nested (no skipped levels).
  - Single-column layout for reading, with a grid only on listing pages.
  - Thin rules and whitespace separate sections.
- **Monospace is for technical data only:** technologies, metrics, dates, file paths, and code. Prose is never set in monospace.

## 5. Technical, not themed

The site should look technical because of what it contains, not because it imitates developer tools.

- **In practice:** real diagrams, real code excerpts, and precise metadata (role, timeframe, technologies, team size).
- **Avoid:** fake terminal windows, typewriter animation in the hero, "hacker" green-on-black, and code-themed decoration that carries no information.

## 6. Accessible by default

WCAG 2.2 AA is the minimum standard, not an extra.

- **In practice:**
  - Text contrast is at least 4.5:1, and at least 3:1 for large text, UI components, and focus indicators.
  - Every interactive element has a visible focus indicator that sticky headers never cover.
  - Pointer targets are at least 24×24 CSS px.
  - Information is never carried by color alone.
  - Semantic HTML is used first, with ARIA only where HTML can't express the meaning.

  [Accessibility](accessibility.md) turns this into rules and a test procedure.

## 7. Motion only where it helps

- **In practice:**
  - Motion is used only to give feedback on a state change, such as a menu opening or a filter being applied. It lasts about 200 ms or less.
  - Under `prefers-reduced-motion: reduce`, all non-essential motion is turned off.
- **Avoid:** scroll-jacking, parallax, entrance animations on content, and video that plays automatically without controls.

## 8. Fast by default

Users notice performance, and hiring managers judge the site on it.

- **In practice:**
  - Content is visible without client-side JavaScript.
  - Every image has explicit dimensions so the layout doesn't shift as it loads.
  - Fonts are kept to a small number of files.
  - Nothing third-party loads on the critical rendering path.

## Resolving conflicts

When principles conflict, apply this order:

1. **Accessibility**
2. **Content integrity**
3. **Readability**
4. **Performance**
5. **Visual distinctiveness**

A design that looks distinctive but fails contrast is rejected. A diagram that is accurate but unreadable on mobile is redesigned, not left out.

## Review questions for any design change

1. Does this make evidence easier to find or understand?
2. Would the page still work in grayscale, with only a keyboard, and at 360 px wide?
3. Does it add a color, font size, or surface level that the design system lacks? If so, is that justified?
4. Would a hiring manager read this element as information or as decoration?
