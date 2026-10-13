# Technology stack

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Versions are the current stable releases as of 2026-10-13. **The lockfile is the source of truth.** This table records the major version that was evaluated, and should be updated when a major upgrade lands.

## Runtime and build

| Concern | Choice | Version evaluated | Why | Decision |
|---|---|---|---|---|
| Rendering | Static site generation | — | No per-request data, fastest, nothing running at runtime | [ADR-001](adr/ADR-001-rendering-strategy.md) |
| Framework | Astro | 7.x | Zero JavaScript by default, content collections, built-in images, fonts, and Shiki | [ADR-002](adr/ADR-002-framework.md) |
| Language | TypeScript, strict | Whichever version Astro's tooling supports (pinned) | Type safety for content and logic (NFR-MAINT-01) | ADR-002 |
| Content | MDX and YAML in Git, using content collections and Zod (`astro/zod`) | `@astrojs/mdx` 8.x | Validated, reviewable, free | [ADR-003](adr/ADR-003-content-source.md) |
| Styling | Native CSS: custom properties and scoped `<style>` | — | No dependency, tokens as the single source | [ADR-004](adr/ADR-004-styling.md) |
| Fonts | IBM Plex Sans and Plex Mono, self-hosted with the Astro Fonts API (Fontsource provider) | — | Privacy, performance, fallback metrics prevent layout shift | [Visual design system](../02-design/visual-design-system.md#typography) |
| Syntax highlighting | Shiki (built into Astro), theme `github-dark-default` | — | Runs at build time with zero JavaScript. Contrast verified. | Visual design system |
| Images | `astro:assets` (`<Image>`, `<Picture>`) | — | AVIF and WebP, explicit dimensions, `srcset` | — |
| Sitemap | `@astrojs/sitemap` | 3.x | Official integration, one line of configuration | [SEO architecture](seo-and-metadata-architecture.md) |
| Client interactivity | Plain TypeScript `<script>` modules | — | Three small enhancements don't justify a UI framework | ADR-002 |
| Runtime | Node.js 24 LTS (`.nvmrc`) | 24.x | Active LTS. Astro requires ≥ 22.12. | — |
| Package manager | npm, committed `package-lock.json`, `npm ci` | 11.x | Ships with Node, so no extra tool (NFR-REL-01) | — |

## Quality tooling

| Concern | Choice | Version evaluated | Notes |
|---|---|---|---|
| Type checking | `astro check` (`@astrojs/check`) | 0.9.x | Covers `.astro`, `.ts`, and content types |
| Linting | ESLint flat config, `eslint-plugin-astro` (recommended and jsx-a11y configs) | ESLint 10.x | Uses the recommended configs only. No style rules, because Prettier owns formatting. |
| Formatting | Prettier and `prettier-plugin-astro` | 3.x | Default options, plus `printWidth: 100` |
| Unit and content tests | Vitest | 5.x | `src/lib` logic and content-rule tests |
| E2E tests | Playwright (Chromium and WebKit) | 1.x | Run against the production build served by `wrangler dev` |
| Accessibility tests | `@axe-core/playwright` | 4.x | WCAG 2.2 AA tags |
| Performance budgets | Lighthouse CI (`@lhci/cli`) | 0.15.x | Runs against the production build served by `wrangler dev`, because extensionless URLs need the host's HTML handling |
| Link checking | lychee (GitHub Action) | — | Internal links offline on every PR; external links weekly |
| CSS token check | `scripts/check-css-tokens.mjs` (repository script) | — | Fails on raw values outside `tokens.css` ([ADR-004](adr/ADR-004-styling.md)) |
| Dependency updates | Dependabot (npm and github-actions) | — | Monthly, grouped |

## Hosting and operations

| Concern | Choice | Decision |
|---|---|---|
| Hosting | Cloudflare Workers static assets (assets only) | [ADR-005](adr/ADR-005-hosting-and-deployment.md) |
| CI/CD | GitHub Actions running `wrangler` | ADR-005, [CI/CD](../04-engineering/ci-cd.md) |
| DNS, TLS, domain | Cloudflare DNS (Cloudflare Registrar preferred) | ADR-005, assumption A1 |
| Analytics | Cloudflare Web Analytics, production only | [ADR-007](adr/ADR-007-analytics.md) |
| Uptime | A free external uptime monitor | [Monitoring](../06-operations/monitoring-and-analytics.md) |
| Contact | `mailto:` and profile links | [ADR-006](adr/ADR-006-contact-method.md) |

## Deliberately not used

| Not used | Reason |
|---|---|
| React, Vue, Svelte, or another UI framework | No interaction justifies a runtime (ADR-002) |
| Tailwind CSS, CSS-in-JS | ADR-004 |
| A headless CMS | ADR-003 |
| A database, server, or serverless functions | ADR-001 |
| Google Fonts CDN | Privacy and performance. Fonts are self-hosted. |
| Stylelint | Replaced by a 20-line token check script (ADR-004) |
| Visual regression testing | The design is small and stable. Revisit if layout regressions slip through review. |
| Icon library | 11 icons are copied as inline SVG ([visual design system](../02-design/visual-design-system.md#iconography)) |

## Rule for new dependencies

Any addition to `dependencies` or `devDependencies` must state in its pull request:

- what it replaces,
- why the platform or an existing dependency can't do it,
- its size and how actively it is maintained.

See [coding standards](../04-engineering/coding-standards.md#dependencies).
