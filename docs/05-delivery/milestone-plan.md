# Milestone plan

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Each milestone closes one [roadmap](implementation-roadmap.md) phase. Effort is estimated in **focused days**, where one day is about 6 hours of uninterrupted work. Calendar dates depend on how much time the owner has. TODO(owner): set a start date and the hours available per week, then fill in the **Target** column.

| Milestone | Phase | Effort (focused days) | Target | Status |
|---|---|---|---|---|
| M1: Product defined | 1 | 1 (owner inputs) | TODO(owner) | Documentation done. Waiting on Q1–Q3, Q5. |
| M2: Content and design ready | 2 | 4–8 (mostly writing content) | TODO(owner) | Specifications done. Content not started. |
| M3: Walking skeleton | 3 | 2–3 | TODO(owner) | Decisions and standards done. Code not started. |
| M4: Core recruiter path | 4 | 5–7 | TODO(owner) | Not started |
| M5: Feature-complete | 5 | 4–6 | TODO(owner) | Not started |
| M6: v1.0.0 launched | 6 | 1–2 | TODO(owner) | Not started |
| M7: First quarterly review | 7 | 0.5 per quarter | Launch + 90 days | Not started |

## M1: Product defined

**Deliverables**
- Answers to Q1, Q2, Q3, and Q5, recorded in [project overview](../00-foundation/project-overview.md#open-questions).
- Owner approval of positioning, scope, sitemap, and the Must requirements.

**Done when**
- Every Phase 1 `TODO(owner)` is resolved, and documents changed by the answers are updated (for example A2 if freelance work is wanted).

## M2: Content and design ready

**Deliverables**
- A project shortlist (3–6) with an **evidence inventory**: for each project, what can be shown, linked, and measured, entered in the [evidence ledger](../07-project-case-studies/evidence-and-metrics.md).
- **A pilot case study**: one complete case study written from the [template](../07-project-case-studies/case-study-template.md), with every schema field filled. It may be written as a plain MDX file before the code exists.
- Home copy: the one-sentence summary and the availability line. A first draft of the About bio.
- Experience entries drafted in the `experience.yaml` shape.
- Résumé PDF reconciled with the experience entries.
- The social preview image (`og-default.png`) and a favicon.

**Done when**
- The pilot passes every content rule in the [project content schema](../01-product/project-content-schema.md) when checked by hand.
- Every claim in the pilot has a ledger entry.
- The wireframes in [page specifications](../02-design/page-specifications.md) still fit the real content. If not, update them.

## M3: Walking skeleton

**Deliverables**
- The scaffold: `package.json`, `astro.config.mjs`, `tsconfig.json`, linting and formatting configuration, Vitest, Playwright, Lighthouse CI, `wrangler.jsonc`, `.github/workflows/ci.yml`, `links.yml`, `dependabot.yml`, and the LICENSE file (Q8).
- `BaseLayout` with tokens, fonts, a stub header and footer, a home page that shows only the name, the 404 page, `_headers`, `_redirects` (one test rule), and `robots.txt`.
- One unit test, one content test, one E2E test with axe, and the smoke script.
- The repository settings and Cloudflare setup from the [runbook](../06-operations/deployment-runbook.md#one-time-setup).

**Verification checklist.** Each item confirms an assumption in the architecture documents. If any of them fails, the linked document is updated before Phase 4 starts.

| # | Verify | If it fails, update |
|---|---|---|
| WS-1 | A pull request gets a preview URL comment, and merging deploys to production | [CI/CD](../04-engineering/ci-cd.md), [ADR-005](../03-architecture/adr/ADR-005-hosting-and-deployment.md) |
| WS-2 | Production responses include every `_headers` header | [Security model](../03-architecture/security-model.md#http-headers) |
| WS-3 | `/no-such-page` returns **404** with `404.html` | [Routing](../03-architecture/routing-and-page-model.md#404-handling) |
| WS-4 | `/about` returns 200, while `/about/` and `/about.html` return 301 to `/about` | [Routing](../03-architecture/routing-and-page-model.md#url-policy) |
| WS-5 | A `_redirects` rule returns 301 | Routing |
| WS-6 | A rollback through the Cloudflare dashboard works in under 5 minutes | [Runbook](../06-operations/deployment-runbook.md#rollback), NFR-REL-04 |
| WS-7 | The built HTML has **no inline executable `<script>`**, and no CSP violations appear in the console | [Security model](../03-architecture/security-model.md#content-security-policy) |
| WS-8 | A Shiki transformer can add `role`/`aria-label` to `<pre>` with the configured Markdown processor | [Component guidelines](../04-engineering/component-guidelines.md#inventory) |
| WS-9 | The Fonts API self-hosts 4 files, with only Plex Sans 400 preloaded | [Visual design system](../02-design/visual-design-system.md#typography) |
| WS-10 | `wrangler dev` serves `dist/` with headers, redirects, and 404s for E2E and Lighthouse CI | [Testing strategy](../04-engineering/testing-strategy.md) |
| WS-11 | The production `workers.dev` route can be turned off while preview URLs keep working | [Routing](../03-architecture/routing-and-page-model.md#non-canonical-hosts) |
| WS-12 | The whole CI pipeline takes ≤ 10 minutes | NFR-MAINT-04 |

**Done when**
- WS-1 to WS-12 are verified, and each result is recorded in the pull request description.
- The README has working setup instructions.

## M4: Core recruiter path

**Deliverables**
- The shared layout, `NavMenu`, `SiteFooter`, Home, About, Projects (with the filter), `CaseStudyLayout` and its components, `ResumeLink`, and the 404 page.
- The pilot case study published.

**Done when**
- The Must requirements in GLB, HOME, ABT, PRJ, CS, RES, and 404 pass their [acceptance criteria](../01-product/acceptance-criteria.md).
- **G6 demonstrated:** a second project was added with only content changes, and the pull request diff proves it.

## M5: Feature-complete

**Deliverables**
- Engineering, Experience, Contact, and Privacy pages.
- Every metadata requirement (META).
- Responsive refinement at every [test viewport](../02-design/responsive-design.md#test-viewports).
- At least 3 published case studies (G2).
- The full E2E and axe suite, with Lighthouse budgets passing.

**Done when**
- Every Must requirement passes. The G5 launch criteria pass on the preview deployment.
- Should requirements are either done or listed as deferred in [functional requirements](../01-product/functional-requirements.md).

## M6: v1.0.0 launched

**Deliverables**
- Domain and HTTPS. The production `SITE_ENV` and analytics token. Google Search Console verified and the sitemap submitted. The uptime monitor configured.

**Done when**
- The [release checklist](release-checklist.md) is complete.
- The `v1.0.0` tag is pushed.
- The launch is recorded in the [maintenance log](../06-operations/maintenance.md#log).

## M7: First quarterly review

**Done when**
- The [maintenance](../06-operations/maintenance.md) quarterly checklist is complete.
- Outcome-metric targets are set after the 60-day baseline ([goals](../00-foundation/goals-and-success-criteria.md#outcome-metrics)).
