# Repository structure

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This is the layout as of the Phase 3 walking skeleton. Folders listed for later milestones (`components/`, `content/`, `layouts/CaseStudyLayout`) are created when their first file is. Don't create empty folders ahead of time.

```
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  Gates, preview deploy (PR), production deploy + smoke (main)
│   │   └── links.yml               Weekly external link check
│   ├── dependabot.yml              Monthly grouped npm + actions updates
│   └── pull_request_template.md    PR checklist (exists)
├── docs/                           All product/engineering documentation (this folder)
├── public/                         Copied verbatim to dist/
│   ├── _headers                    Security + cache headers (security-model.md)
│   ├── _redirects                  Path redirects (routing-and-page-model.md)
│   ├── afran-anas-resume.pdf       Résumé (FR-RES-01)
│   ├── og-default.png              Default social image
│   ├── favicon.svg, favicon.ico
├── scripts/
│   ├── check-css-tokens.mjs        Fails on raw CSS values outside tokens.css (ADR-004)
│   └── smoke.mjs                   Post-deploy checks against a URL (ci-cd.md)
├── src/
│   ├── components/                 Presentational components (component-guidelines.md)
│   │   └── icons/                  Inline SVG icons + license note
│   ├── content/
│   │   ├── projects/<slug>/        index.mdx + co-located images/diagrams
│   │   ├── engineering/            <slug>.mdx
│   │   ├── pages/                  about, engineering-principles, contact, privacy (.mdx)
│   │   └── experience.yaml
│   ├── content.config.ts           Collection schemas (content-and-data-model.md)
│   ├── data/profile.ts             Identity + contact single source
│   ├── layouts/                    BaseLayout, CaseStudyLayout
│   ├── lib/                        Pure TS helpers — unit-tested
│   ├── pages/                      Routes (routing-and-page-model.md)
│   └── styles/
│       ├── tokens.css              The only home of raw design values
│       └── global.css              Reset, base, prose, utilities
├── tests/
│   ├── unit/                       Vitest: src/lib, content rules, _redirects, profile
│   ├── e2e/                        Playwright: flows, routes, a11y, no-JS
│   └── build/                      Vitest over dist/: inline scripts, sitemap set, drafts absent
├── .editorconfig  .gitignore  .nvmrc  .env.example     (exist)
├── astro.config.mjs  tsconfig.json  eslint.config.js  .prettierrc
├── playwright.config.ts  lighthouserc.json  wrangler.jsonc  .prettierignore
│                                   (no vitest.config.ts: defaults suffice; test dirs are passed by script)
├── package.json  package-lock.json
├── CLAUDE.md                       Guidance for AI coding agents (exists)
├── SECURITY.md                     Vulnerability reporting (exists)
├── LICENSE                         Pending owner decision (Q8)
└── README.md
```

## Responsibilities and rules

| Path | Owns | Must not |
|---|---|---|
| `src/pages/` | Routing, data fetching through `src/lib`, composition | Contain business rules such as sorting or filtering, or raw styles beyond layout |
| `src/layouts/` | The document shell, `<head>`, analytics inclusion | Fetch collections |
| `src/components/` | Presentation and progressive-enhancement scripts | Call `getCollection`, or read the environment |
| `src/lib/` | Pure logic, environment flags, metadata builders | Import `.astro` files, or touch the DOM. Exception: the DOM helpers used by client scripts live in `src/lib/dom/`. |
| `src/content/` | Content only | Contain `<script>`, `<iframe>`, or raw HTML |
| `src/styles/tokens.css` | Raw design values | — |
| `public/` | Files served exactly as they are | Contain anything that needs processing. Images used by pages go through `astro:assets`. |
| `tests/` | All automated tests, mirroring the source structure | Depend on specific copy text (see [testing strategy](testing-strategy.md)) |
| `docs/` | Specifications and decisions | Fall out of date with the code ([definition of done](../05-delivery/definition-of-done.md)) |

**Naming conventions:** see [coding standards](coding-standards.md#naming).
