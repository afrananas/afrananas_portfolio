# Quality gates

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

A gate is a check that **blocks** a merge or release when it fails. Thresholds come from the [NFRs](../01-product/non-functional-requirements.md). Lowering a threshold requires changing the NFR in its own pull request, with a reason. A gate is never weakened quietly in a pull request about something else.

## Gate 1: Local (before pushing)

`npm run verify` runs, in order: format check, lint, type check, CSS token check, unit and content tests, build, build-output tests, and E2E tests. This is the same sequence as CI, apart from Lighthouse and the link checker. It isn't enforced by a hook, so it's a habit. CI is the enforcement.

## Gate 2: Pull request (required status checks on `main`)

| # | Check | Command or tool | Pass condition | Requirement |
|---|---|---|---|---|
| 1 | Format | `prettier --check .` | No diff | NFR-MAINT-02 |
| 2 | Lint | `eslint .` | 0 errors, 0 warnings | NFR-MAINT-02 |
| 3 | Types | `astro check` | 0 errors | NFR-MAINT-01 |
| 4 | CSS tokens | `node scripts/check-css-tokens.mjs` | No raw values outside `tokens.css` | ADR-004 |
| 5 | Unit and content tests | `vitest run` | All pass | Acceptance criteria |
| 6 | Dependency audit | `npm audit --audit-level=high` | No high or critical findings, unless a dated exception is recorded | NFR-SEC-04 |
| 7 | Build | `astro build` (production mode) | Exit 0. Content schema valid. | NFR-MAINT-03, NFR-REL-01 |
| 8 | Build output | `vitest run tests/build` | No inline executable scripts, sitemap set correct, no draft slugs | FR-META-04, FR-PRJ-01, security model |
| 9 | E2E and accessibility | `playwright test` | All pass on Chromium and WebKit. Zero axe violations. No CSP violations or console errors. | Acceptance criteria, NFR-A11Y-02 |
| 10 | Performance | `lhci autorun` | Assertions for NFR-PERF-01 to 05 and SEO = 100 | NFR-PERF, NFR-SEO-03 |
| 11 | Internal links | lychee `--offline --root-dir dist --fallback-extensions html` | 0 broken | NFR-REL-03 |
| 12 | CI duration | — | Whole pipeline ≤ 10 minutes. A breach is a defect to fix, not a blocker. | NFR-MAINT-04 |

The **preview deployment** happens only after checks 1–11 pass, and only for pull requests from branches in this repository.

**Human gate:** the pull request template checklist, self-reviewed against the [definition of done](../05-delivery/definition-of-done.md).

## Gate 3: Production (merge to `main`)

1. All of Gate 2 runs again on the merge commit.
2. `wrangler deploy` of the exact `dist/` that passed.
3. **Smoke test** against the production URL with `scripts/smoke.mjs`:
   - every static route and every published case study returns 200,
   - `/no-such-page` returns 404,
   - `/afran-anas-resume.pdf` returns 200 with type `application/pdf`,
   - every header in NFR-SEC-02 is present,
   - production `robots.txt` contains `Allow: /` and a `Sitemap:` line,
   - no `noindex` on indexable routes,
   - `/about/` returns a 301 to `/about`.
4. If the smoke test fails, the workflow fails and the owner is notified. Roll back using the [runbook](../06-operations/deployment-runbook.md#rollback). Automatic rollback is not used, because a human should look at the first failure.

## Gate 4: Release (v1.0.0, then each tagged release)

The [release checklist](../05-delivery/release-checklist.md) is complete. It covers the manual accessibility pass, content claims verification, résumé consistency, and production performance.

## Scheduled checks (non-blocking, they raise issues)

| Check | Schedule | On failure |
|---|---|---|
| External link check (lychee, online) | Weekly | Opens or updates a GitHub issue labelled `broken-links` |
| Dependabot | Monthly | Opens grouped pull requests, which go through Gate 2 |

## Lighthouse CI assertions (`lighthouserc.json`)

| Assertion | Level | Value |
|---|---|---|
| `categories:performance` | error | ≥ 0.90 |
| `categories:accessibility` | error | = 1 |
| `categories:seo` | error | = 1 |
| `categories:best-practices` | error | ≥ 0.95 |
| `largest-contentful-paint` | error | ≤ 2500 ms |
| `cumulative-layout-shift` | error | ≤ 0.1 |
| `total-blocking-time` | error | ≤ 200 ms |
| `resource-summary:script:size` | error | ≤ 15 KB (first party, no beacon in CI) |
| `resource-summary:stylesheet:size` | error | ≤ 30 KB |
| `resource-summary:font:count` | error | ≤ 4 |
| `resource-summary:total:size` (home) | error | ≤ 300 KB |

`numberOfRuns: 3`, and the median is asserted. URLs: `/`, `/projects`, and the longest published case study (chosen by a script that compares body lengths).
