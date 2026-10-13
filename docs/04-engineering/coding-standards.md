# Coding standards

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

The automated tools enforce what they can. This document covers the rest. When a tool and this document disagree, change one of them so they match. Don't silence the tool.

## Naming

| Thing | Convention | Example |
|---|---|---|
| Components and layouts | PascalCase `.astro` | `ProjectCard.astro`, `BaseLayout.astro` |
| Library modules | camelCase or single-word `.ts` | `projects.ts`, `seo.ts` |
| Functions and variables | camelCase, starting with a verb for functions | `getNeighbors`, `isProduction` |
| Types and interfaces | PascalCase, no `I` prefix | `PageMeta`, `Profile` |
| Constants that never change | camelCase `as const` objects. SCREAMING_CASE only for environment variable names. | `areas`, `SITE_ENV` |
| Content files, routes, slugs | kebab-case | `video-analytics-pipeline/index.mdx` |
| CSS custom properties | `--{category}-{name}` | `--color-text-muted`, `--space-4` |
| CSS classes (inside scoped styles) | Short and semantic, no BEM needed because styles are scoped | `.meta`, `.stack` |
| `data-*` hooks for scripts | `data-{component}` / `data-{component}-{part}` | `data-filter`, `data-filter-chip` |
| Test titles | Start with the requirement ID | `FR-PRJ-04: applies ?area= on load` |

## TypeScript

- `strict: true`, extending Astro's `strictest` tsconfig preset. Zero errors from `astro check` (NFR-MAINT-01).
- No `any`. Use `unknown` and narrow it. Every `// @ts-expect-error` needs a reason and a link to an issue.
- Prefer `as const` and `satisfies` to type annotations for configuration objects such as `profile` and `areas`.
- Content types come from the collections (`CollectionEntry<'projects'>`). Never redefine them by hand.
- Functions in `src/lib` are pure: same input, same output, no I/O. The exceptions are `files.ts` (reads file sizes at build time) and `env.ts`, both of which are isolated.

## Formatting and linting

- Prettier with defaults plus `printWidth: 100`, and `prettier-plugin-astro`. Formatting is never argued about in review.
- ESLint flat config using the recommended configs: `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, and the Astro `jsx-a11y` rules.
- Every `eslint-disable` comment states the rule and the reason: `// eslint-disable-next-line rule -- reason`. A suppression without a reason fails review (NFR-MAINT-02).

## HTML

- Use semantic elements first ([accessibility](../02-design/accessibility.md#structure-and-semantics)).
- Every `<img>` goes through `astro:assets` and has `alt`. Width and height are always known.
- Link text describes the destination. No `target="_blank"` (FR-GLB-07).
- No inline event handlers (`onclick=`). No inline `<script>`, which is a CSP requirement ([security model](../03-architecture/security-model.md#content-security-policy)).

## CSS

- **Tokens only.** Raw colors, font families, and font sizes appear only in `src/styles/tokens.css`, and spacing should come from the scale. `scripts/check-css-tokens.mjs` enforces this in CI ([ADR-004](../03-architecture/adr/ADR-004-styling.md)).
- Styles are written mobile-first with `min-width` queries at the [defined breakpoints](../02-design/responsive-design.md#breakpoints).
- Use logical properties (`margin-inline`, `padding-block`) and `rem` units for type and spacing.
- No `!important` except in the reduced-motion override.
- Use `:focus-visible` for focus styles. Never remove an outline without a replacement.
- Hover styles go inside `@media (hover: hover)`.
- Component styles stay in the component's scoped `<style>`. Global styles are limited to `global.css`.

## Client scripts

- Use the progressive-enhancement pattern only ([application architecture](../03-architecture/application-architecture.md#client-side-behavior)). The HTML must be complete without the script.
- Find elements through `data-*` hooks. Don't select by CSS class.
- Wrap entry points in `try/catch`, and on error leave the no-JavaScript state in place and log with `console.error`.
- Don't use `localStorage`, `sessionStorage`, cookies, or IndexedDB (FR-PRV-03).
- Shared logic such as `parseAreaParam` is imported from `src/lib`, never duplicated.

## Error handling

- **At build time, fail fast and loudly.** Throw an `Error` whose message names the file, field, and rule. Never quietly skip invalid content.
- **At runtime, degrade without breaking.** Enhancements fail back to plain HTML ([application architecture](../03-architecture/application-architecture.md#error-handling)).
- Don't swallow errors. Every `catch` either handles the error meaningfully or logs it and rethrows.

## Comments

- Explain *why*, not *what*. Link the requirement or ADR when a choice isn't obvious: `// FR-PRJ-07: hidden until JS runs`.
- A deliberate simplification is marked `// ponytail: <limit>, <upgrade path>`.
- No commented-out code. Git keeps the history.

## Dependencies

Before adding any dependency, check these in order:

1. Does the platform already do it (HTML, CSS, a Web API)?
2. Does Astro already do it?
3. Can it be done in a few lines in `src/lib`?
4. Only if not: a dependency whose pull request description states what it replaces, why the options above fall short, its install size, its license, and how actively it's maintained (NFR-MAINT-05).

Runtime JavaScript dependencies in the browser bundle need an ADR ([ADR-002](../03-architecture/adr/ADR-002-framework.md)).

## Code review

The owner works alone, so reviewing means **self-review of the pull request diff and the preview** against the [definition of done](../05-delivery/definition-of-done.md) before merging. Review in this order:

1. Correctness
2. Accessibility
3. Matching requirements and docs
4. Simplicity: could this be smaller?
5. Naming and readability

AI-assisted changes get the same review. [`CLAUDE.md`](../../CLAUDE.md) gives agents the rules in this document.
