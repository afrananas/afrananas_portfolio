# ADR-004: Native CSS with design tokens and component-scoped styles

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

The [visual design system](../../02-design/visual-design-system.md) is deliberately small: a handful of colors, one type scale, and one spacing scale. There are about 20 components. The CSS budget is 30 KB per page (NFR-PERF-05). The design is restrained and the token set is closed, so the main risk is drift: raw values creeping in that bypass the tokens.

## Decision drivers

- Fidelity to the token set
- Bundle size
- Minimal dependencies (NFR-MAINT-05)
- Readability for reviewers of a public repository

## Options considered

1. **Native CSS:** custom properties for tokens, Astro's built-in scoped `<style>` per component, and a small global stylesheet.
2. **Tailwind CSS:** utility classes, configured with the tokens.
3. **CSS Modules:** scoped class names through the bundler.
4. **CSS-in-JS:** a runtime or zero-runtime library.

## Decision

**Option 1.**

| File | Purpose |
|---|---|
| `src/styles/tokens.css` | Every token. **The only file where raw color, size, and font values are allowed.** |
| `src/styles/global.css` | Reset, base element styles, prose styles, utilities: `.visually-hidden` and `.container`. |
| Component `<style>` blocks | Layout and state for that component only, using tokens. |

Modern CSS covers what this site needs without a framework: nesting, `clamp()`, container-friendly grids, `:focus-visible`, `text-wrap: balance`, and `@media (prefers-reduced-motion)`.

- Tailwind adds a dependency and a build step. It moves styling into markup, which hurts readability in long MDX-driven templates. It also mainly speeds up work on large UIs, and this one is small.
- Astro already scopes styles, so CSS Modules would be redundant.
- CSS-in-JS doesn't fit a site with no runtime.

## Consequences

### Positive

- No styling dependencies. The CSS is readable by anyone.
- Tokens are the single source, which makes a future light theme a token-level change.

### Negative

- There is no automatic utility vocabulary, so consistency depends on review and lint rules.

### Risks and mitigations

- *Risk:* raw values creep in. *Mitigation:* Stylelint is deliberately not added. Instead, a CI script (`scripts/check-css-tokens`) fails if a hex color, `rgb()`/`hsl()` value, or `px` font size appears outside `tokens.css` ([quality gates](../../04-engineering/quality-gates.md)).

## Revisit conditions

- The component count grows past about 50, or a second contributor joins and consistency suffers.
