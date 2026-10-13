# Goals and success criteria

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

There are two kinds of criteria:

- **Launch criteria** are binary and can be checked before release. They block launch.
- **Outcome metrics** depend on real traffic. Their targets are set only after a baseline period, because inventing a conversion target before any visitor data exists would be guesswork.

## Goals

| ID | Goal | Primary audience |
|---|---|---|
| G1 | Communicate the positioning within seconds | Recruiters |
| G2 | Make the work easy to assess in depth | Hiring managers, engineering leads |
| G3 | Get visitors to the evidence | All |
| G4 | Turn interest into contact | Recruiters, hiring managers, clients |
| G5 | Show engineering quality through the site itself | Hiring managers, peers |
| G6 | Stay accurate and cheap to maintain | Owner |

## Launch criteria

| Goal | Criterion | How it is verified |
|---|---|---|
| G1 | At least 4 of 5 people shown the homepage for 10 seconds can state the role and at least two focus areas. At least one of the five should be someone who hires engineers. | A moderated first-impression test, with results recorded in `07-project-case-studies/evidence-and-metrics.md` |
| G2 | At least 3 case studies are published. Each one includes every required field from the project content schema, states Afran's role and contribution scope, and has at least one verifiable link (repository, demo, paper, or a documented reason why none exists). | A content review checklist |
| G2 | Every quantitative result links to its methodology, baseline, and conditions. | A content review checklist |
| G5 | Performance budgets NFR-PERF-01 to NFR-PERF-05 pass in lab tests on the home page, `/projects`, and one case study. | Lighthouse CI ([quality gates](../04-engineering/quality-gates.md)) |
| G5 | Accessibility requirements NFR-A11Y-01 to NFR-A11Y-05 pass: zero automated violations on every route, plus a manual keyboard pass and a manual screen-reader pass of the recruiter flow. | axe in E2E tests, plus the [accessibility checklist](../02-design/accessibility.md#manual-test-procedure) |
| G5 | Every quality gate passes on the release commit: format, lint, type check, unit tests, build, E2E tests, and link check. | CI |
| G5 | The security headers in NFR-SEC-02 are present on production responses. | Post-deploy smoke test |
| G6 | Adding a new project requires only a content entry and its images. No component or route code changes. | Shown in Phase 4 ([milestone M4](../05-delivery/milestone-plan.md)) |

The numeric thresholds are defined once, in [non-functional requirements](../01-product/non-functional-requirements.md). This document refers to them and does not repeat them.

### Real-user performance

Google's [Core Web Vitals](https://web.dev/articles/vitals) define "good" as LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1, measured at the 75th percentile of page loads. A personal site may never get enough traffic to appear in public field datasets such as CrUX.

Field data therefore comes from Cloudflare Web Analytics ([ADR-007](../03-architecture/adr/ADR-007-analytics.md)), which reports LCP, INP, and CLS from real visits. It only covers browsers that support the measurement APIs, which in practice means mostly Chromium-based browsers. Every published performance figure must say whether it is lab or field data.

## Outcome metrics

The baseline period covers the first 60 days after launch. Targets are set at the end of it and recorded here.

Cloudflare Web Analytics reports visits and page views by path. It does not support custom events or per-visitor funnels. The metrics below are designed around those limits, and proxy metrics are labeled as proxies.

| Goal | Metric | Source | Target |
|---|---|---|---|
| G3 | Case-study page views per visit (a proxy for "visitors reach the evidence") | Cloudflare Web Analytics, filtered to path `/projects/*` | Set after baseline |
| G3 | Share of visits that land directly on a case study | Cloudflare Web Analytics, entry paths | Set after baseline |
| G4 | `/contact` page views per visit (a proxy for intent to make contact; email and résumé clicks can't be tracked) | Cloudflare Web Analytics | Set after baseline |
| G4 | Inbound contacts that came through the site | A manual log kept by the owner (ask "How did you find me?"). This is the primary success measure. | Set after baseline |
| G5 | Field Core Web Vitals at p75 | Cloudflare Web Analytics | All "good" |
| G6 | Quarterly content review done, with every claim re-verified | [Maintenance log](../06-operations/maintenance.md#log) | 4 per year |

If these proxies turn out to be too coarse, the revisit condition in [ADR-007](../03-architecture/adr/ADR-007-analytics.md) applies: switch to a privacy-respecting tool that supports events. Do not add tracking to the existing setup.

## Not measured

- Total pageviews or unique visitors used as a success signal. Traffic only matters if it leads to the outcomes above.
- Time on the homepage. A short visit that ends in a click through to a case study counts as a success.
