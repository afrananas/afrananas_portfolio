# Non-functional requirements

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

These are the quality attributes, with measurable thresholds. **This document is the single source for every numeric threshold.** Other documents refer to these IDs and do not repeat the numbers.

Priority meanings and ID rules are the same as in [functional requirements](functional-requirements.md#conventions).

## PERF: Performance

Lab measurements use Lighthouse with its default mobile profile (simulated throttling) on these representative pages: `/`, `/projects`, and the longest published case study. Each page is run 3 times and the median is taken.

- **NFR-PERF-01** (Must): LCP ≤ 2.5 s in the lab. In the field, LCP ≤ 2.5 s at the 75th percentile once there is enough data.
- **NFR-PERF-02** (Must): CLS ≤ 0.1 in the lab and in the field.
- **NFR-PERF-03** (Must): Total Blocking Time ≤ 200 ms in the lab. In the field, INP ≤ 200 ms at the 75th percentile.
- **NFR-PERF-04** (Must): Lighthouse Performance score ≥ 90 on the mobile profile.
- **NFR-PERF-05** (Must): Page-weight budgets, measured as compressed transfer size:

  | Resource | Budget |
  |---|---|
  | First-party JavaScript per page | ≤ 15 KB |
  | Third-party JavaScript per page (analytics beacon only) | ≤ 10 KB |
  | CSS per page | ≤ 30 KB |
  | Web fonts | At most 4 files and ≤ 120 KB in total |
  | Total transfer for the home page | ≤ 300 KB |
  | Any single content image | ≤ 200 KB at its largest rendered size |
- **NFR-PERF-06** (Should): Hashed static assets are cached for 1 year as `immutable`. HTML is revalidated on every request ([security model](../03-architecture/security-model.md#http-headers)).

## A11Y: Accessibility

- **NFR-A11Y-01** (Must): Conform to WCAG 2.2 Level AA.
- **NFR-A11Y-02** (Must): Zero axe-core violations, using the tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and `wcag22aa`, on every route, on both desktop and mobile viewports, and with the mobile menu both open and closed.
- **NFR-A11Y-03** (Must): Every function works with a keyboard alone. Focus order follows visual order. Focus is always visible and never fully hidden behind sticky elements (SC 2.4.11).
- **NFR-A11Y-04** (Must): A manual screen-reader pass of the recruiter flow ([user flows](../02-design/user-flows.md), F1 and F2) succeeds with VoiceOver on macOS Safari and VoiceOver on iOS Safari.
- **NFR-A11Y-05** (Must): Content reflows without loss at 320 CSS px wide and at 200% text zoom, with no two-directional scrolling except inside code blocks and diagrams (SC 1.4.10).
- **NFR-A11Y-06** (Must): Contrast is at least 4.5:1 for text, and at least 3:1 for large text, UI component boundaries, and focus indicators. The verified ratios are recorded in the [visual design system](../02-design/visual-design-system.md#color).

## SEC: Security

- **NFR-SEC-01** (Must): No secrets in the repository, the build output, or client bundles. GitHub secret scanning with push protection is enabled.
- **NFR-SEC-02** (Must): Every production HTML response carries the headers listed in [security model](../03-architecture/security-model.md#http-headers): CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options`.
- **NFR-SEC-03** (Must): HTTPS only. HTTP redirects to HTTPS, and HSTS is set with `max-age` of at least 1 year.
- **NFR-SEC-04** (Must): At release, there are no known high- or critical-severity vulnerabilities in the dependency tree that are reachable through the build or the shipped output.
- **NFR-SEC-05** (Must): The GitHub, Cloudflare, domain registrar, and email accounts that control the site all use multi-factor authentication, with passkeys or hardware keys where offered.
- **NFR-SEC-06** (Must): CI uses least privilege: `GITHUB_TOKEN` has read-only permissions by default, third-party actions are pinned to a commit SHA, and the Cloudflare API token is limited to deploying this one Worker.

## PRIV: Privacy

- **NFR-PRIV-01** (Must): No cookies, no device storage, no fingerprinting, and no cross-site tracking (FR-PRV-03).
- **NFR-PRIV-02** (Must): In production, the only third-party origins contacted are the Cloudflare Web Analytics endpoints. In every other environment, no third-party origins are contacted.
- **NFR-PRIV-03** (Must): The privacy notice matches what is actually collected. It is reviewed whenever analytics, hosting, or contact handling changes.

## REL: Reliability

- **NFR-REL-01** (Must): Builds are reproducible from the lockfile with `npm ci` on the pinned Node version.
- **NFR-REL-02** (Must): Every route returns its expected status code: 200 for pages, 404 for unknown paths, 301 for redirects.
- **NFR-REL-03** (Must): Zero broken internal links or missing assets in any build. External links are checked every week.
- **NFR-REL-04** (Must): A bad production deployment can be rolled back in 5 minutes or less ([deployment runbook](../06-operations/deployment-runbook.md#rollback)).
- **NFR-REL-05** (Should): An outage longer than 10 minutes triggers an alert to the owner ([monitoring](../06-operations/monitoring-and-analytics.md)). No availability SLA is offered beyond what the hosting provider gives.

## SEO: Discoverability

- **NFR-SEO-01** (Must): Every indexable page is reachable through plain `<a href>` links from the home page, and listed in `sitemap-index.xml`.
- **NFR-SEO-02** (Must): All page content is in the initial HTML. Nothing needs JavaScript to appear.
- **NFR-SEO-03** (Must): Lighthouse SEO score = 100 on every indexable route.

## MAINT: Maintainability

- **NFR-MAINT-01** (Must): TypeScript strict mode, with zero type errors (`astro check`).
- **NFR-MAINT-02** (Must): Zero lint errors. Formatting is enforced by Prettier. Any lint suppression comment must include a reason.
- **NFR-MAINT-03** (Must): Adding or editing a project, engineering item, or experience entry requires content files only. Invalid content fails the build with an error naming the file and field.
- **NFR-MAINT-04** (Must): The full CI pipeline finishes in 10 minutes or less.
- **NFR-MAINT-05** (Must): Production dependencies are kept to the minimum. Every new dependency is justified in its pull request ([coding standards](../04-engineering/coding-standards.md#dependencies)).
- **NFR-MAINT-06** (Must): Documentation that describes behavior is updated in the same pull request as the behavior ([definition of done](../05-delivery/definition-of-done.md)).

## COMPAT: Compatibility

- **NFR-COMPAT-01** (Must): The site is fully functional in the latest two versions of Chrome, Edge, Firefox, and Safari (macOS and iOS). E2E tests run on Chromium and WebKit.
- **NFR-COMPAT-02** (Must): The layout works at viewport widths from 320 px to 2560 px.
- **NFR-COMPAT-03** (Must): The site is fully usable with JavaScript disabled (FR-GLB-06).

## CONT: Content integrity

- **NFR-CONT-01** (Must): Every claim, metric, contribution statement, and external link is accurate and verifiable when published, and is re-verified every quarter ([content strategy](content-strategy.md#claims-policy)).
