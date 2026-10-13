# Testing strategy

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Principles

1. **Test the requirements.** Every Must requirement has at least one automated check, or a manual check listed in [acceptance criteria](../01-product/acceptance-criteria.md). Test titles start with the requirement ID.
2. **Test invariants, not copy.** Tests derive what they expect from the content or check structural rules. Editing a sentence must never break a test.
3. **Test the real artifact.** E2E tests run against the production build served by `wrangler dev`, which applies `_headers`, `_redirects`, and 404 handling the way the host does. They never run against the development server.
4. **Keep the suite small.** Write the cheapest test that would fail if the behavior broke. Logic gets a unit test. Behavior that only exists in the browser gets an E2E test.

## Test levels

| Level | Tool | Scope | Location | Runs |
|---|---|---|---|---|
| Static | `astro check`, ESLint, Prettier, `check-css-tokens` | Types, lint, format, token discipline | — | Pre-push (`npm run verify`), CI |
| Content validation | Zod schemas inside `astro build` | Per-entry fields and cross-field rules | `src/content.config.ts` | Every build |
| Unit | Vitest | `src/lib/*` pure functions, `profile.ts` checks, `_redirects` parsing | `tests/unit/` | CI, locally |
| Content rules | Vitest (reads `src/content/**`) | Collection-wide rules: unique slugs, slug equals folder, required headings and subsections, `ledgerId` exists in the ledger, no `<script>`/`<iframe>` | `tests/unit/content.test.ts` | CI |
| Build output | Vitest (reads `dist/`) | No inline executable scripts. The sitemap set equals the expected routes. No draft slugs in production output. `_headers` present. | `tests/build/` | CI after the build |
| E2E | Playwright (Chromium desktop, Chromium 360×640, WebKit 390×844) | Flows, interactions, routes, status codes, metadata, no-JavaScript mode, CSP violations, privacy | `tests/e2e/` | CI |
| Accessibility | `@axe-core/playwright` | Every route, at 2 viewports, with the menu open and closed | `tests/e2e/a11y.spec.ts` | CI |
| Performance | Lighthouse CI | NFR-PERF budgets on 3 representative pages, mobile profile, median of 3 runs | `lighthouserc.json` | CI |
| Links | lychee | Internal links offline on every PR. External links weekly. | `.github/workflows/` | CI, scheduled |
| Smoke | `scripts/smoke.mjs` (Node `fetch`) | Status codes, headers, `robots.txt`, the résumé, and the 404 status on the deployed URL | — | After each preview and production deploy |
| Manual | Checklists | Screen reader, keyboard, zoom, résumé consistency, content claims | [Release checklist](../05-delivery/release-checklist.md) | Each release |

There is no visual regression testing and no unit testing of `.astro` markup. E2E tests on the built HTML cover rendering more cheaply ([technology stack](../03-architecture/technology-stack.md#deliberately-not-used)).

## Unit test targets

| Module | Cases |
|---|---|
| `projects.ts` | Sort order (featured, then `end` descending, `ongoing` first, ties by title). Neighbors at the first, middle, and last positions. Drafts excluded or included by flag. |
| `areas.ts` | `parseAreaParam`: valid, invalid, missing, repeated, and different-case values. Area options derived from the list. |
| `experience.ts` | Grouping, ordering, `present` first |
| `engineering.ts` | `shouldBuildEngineering` with 0, 1, and 2 published items, with drafts ignored |
| `dates.ts` | Month formatting and ranges, including `ongoing` and `present` |
| `seo.ts` | Title template for home and other pages. Canonical has no trailing slash. Home canonical. Person JSON-LD built from profile. |
| `env.ts` | Flags for each `SITE_ENV` value. An unknown value falls back to development. |
| `files.ts` | Size label formatting in KB and MB |
| `_redirects` | Format, unique sources, targets exist, no source matches a live route |

## E2E flows

| Spec | Covers |
|---|---|
| `navigation.spec.ts` | FR-GLB-01 to 05 and 07: the header and footer on every route, `aria-current`, skip link, mobile menu keyboard behavior |
| `home.spec.ts` | FR-HOME-01 to 06, flow F1 |
| `projects.spec.ts` | FR-PRJ-01 to 07: order, filter, URL sync, Back, live region, invalid parameter |
| `case-study.spec.ts` | FR-CS-01 to 12 for **every** published project, and flow F2 |
| `pages.spec.ts` | ENG, EXP, ABT, CON, PRV |
| `not-found.spec.ts` | FR-404-01: status and page content. Flow F4. |
| `metadata.spec.ts` | FR-META-01 to 07 on every route |
| `no-js.spec.ts` | FR-GLB-06, FR-PRJ-07, FR-CON-02 with JavaScript disabled |
| `privacy.spec.ts` | FR-PRV-02 (no third-party requests in non-production builds) and FR-PRV-03 (no storage) |
| `a11y.spec.ts` | NFR-A11Y-02 |
| A global fixture | Fails any test on a console error or a `securitypolicyviolation` event |

**Route list:** E2E tests build the list of routes from the content (published slugs) plus the static routes. When a project is added, it is tested automatically.

## Test data

- Tests run against the **real content**, because they check invariants.
- One permanent **fixture project** lives at `src/content/projects/fixture-draft/index.mdx` with `status: draft`. The build-output test confirms its slug is absent from the production build (FR-PRJ-01). The content-rules test confirms that any slug starting with `fixture-` stays a draft.
- E2E, build-output, and Lighthouse checks all run against the **production-mode build**, which is the same artifact that gets deployed ([CI/CD](ci-cd.md)). In CI, outbound requests to third-party origins are blocked and recorded. They never actually go out.
- During Phase 4, the [pilot case study](../05-delivery/milestone-plan.md) (real content, written in Phase 2) is the first published project the case-study tests run against. Before it exists, those tests have nothing to check and pass without asserting anything. That's acceptable for the walking skeleton only.

## Coverage

There is no line-coverage threshold. Coverage numbers would invite tests of trivial code. The coverage rule is about requirements: every Must requirement maps to a passing test or a recorded manual check. This is verified at release by going through the acceptance-criteria table.

## Flakiness policy

- No fixed sleeps. Use Playwright's auto-waiting and web-first assertions.
- A test that fails intermittently gets quarantined (`test.fixme` with a linked issue) within one day and fixed within one week. A flaky test can't hold up an unrelated pull request, and it can't be retried until it passes either.
- External links are checked only in the weekly scheduled job, so third-party outages never block a pull request.
