# Assumptions and constraints

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Constraints are fixed. Assumptions are defaults adopted so work can continue. If an assumption turns out to be false, update this document and every ADR it affects.

## Constraints

| ID | Constraint | Consequence |
|---|---|---|
| C1 | One person builds, writes, and operates the site, part-time. | Any operational work has to be close to zero. Nothing should need a human to watch it. |
| C2 | Running cost is limited to the domain name. | Hosting, CI, analytics, and monitoring must fit within free tiers ([ADR-005](../03-architecture/adr/ADR-005-hosting-and-deployment.md), [ADR-007](../03-architecture/adr/ADR-007-analytics.md)). |
| C3 | The source repository is public: [github.com/afrananas/afrananas_portfolio](https://github.com/afrananas/afrananas_portfolio). | Nothing secret can ever be committed. The repository itself is evidence that visitors will judge. GitHub's free protections for public repositories (branch rulesets, secret scanning) are available. |
| C4 | Every claim must be verifiable ([product vision](product-vision.md)). | Only content that has evidence behind it ships, even if that means fewer projects at launch. |
| C5 | WCAG 2.2 AA is the minimum standard. | This rules out some visual ideas and adds manual testing to every release. |
| C6 | No backend unless a requirement needs one ([scope](scope-and-boundaries.md#boundary-rules)). | The site is fully static. Any runtime feature needs an ADR first. |
| C7 | The local toolchain is Node.js 24 LTS and npm 11. | CI uses the same versions ([technology stack](../03-architecture/technology-stack.md)). |

## Assumptions

| ID | Assumption | If false |
|---|---|---|
| A1 | The domain's DNS will be managed by Cloudflare, either registered through Cloudflare Registrar or with its nameservers pointed at Cloudflare. | Workers custom domains need Cloudflare-managed DNS. Without it, reopen [ADR-005](../03-architecture/adr/ADR-005-hosting-and-deployment.md) and switch to Cloudflare Pages, which accepts external DNS through a CNAME. |
| A2 | Freelance or client work is not being actively sought at launch (Q5). The contact page still accepts general inquiries. | Make potential clients a primary audience, add a section describing services and how engagements work, and review [ADR-006](../03-architecture/adr/ADR-006-contact-method.md). |
| A3 | The site is in English only. | Reopen the deferred internationalization item in [scope](scope-and-boundaries.md#deferred). |
| A4 | Visitors use evergreen browsers: the latest two versions of Chrome, Edge, Firefox, and Safari on desktop and iOS. | Adjust the browser-support requirement NFR-COMPAT-01 and the CI browser matrix. |
| A5 | Traffic will stay low (hundreds to low thousands of visits a month). | Free tiers and CI-only performance budgets are enough. Revisit only if traffic grows by an order of magnitude. |
| A6 | Visitors may be in the EU or UK, so privacy rules are applied as if GDPR covers every visitor. | No change needed. This is the safe default. |
| A7 | The owner keeps the editable source of the résumé (for example LaTeX or DOCX) outside the site build, and only the exported PDF is committed. | If the source moves into the repository, add it to [backup and recovery](../06-operations/backup-and-recovery.md). |

## Third-party services

Each service below has a documented fallback. The site must never depend on a service it can't replace within a day.

| Service | Used for | Free-tier limit that matters | Fallback |
|---|---|---|---|
| GitHub | Source hosting, CI (Actions), Dependabot, secret scanning | Actions minutes are unlimited for public repositories | Any Git host. The CI workflow is plain YAML that can be ported. |
| Cloudflare Workers (static assets) | Hosting, preview URLs, headers, redirects | Requests for static assets are free | Cloudflare Pages or Netlify. Both support the same `_headers` and `_redirects` formats. |
| Cloudflare DNS and Registrar | Domain and DNS | None | Any registrar or DNS provider (this triggers A1). |
| Cloudflare Web Analytics | Privacy-respecting traffic data and Core Web Vitals from real users | None | Remove the beacon. The site works without it. |
| Uptime monitor (free tier) | Availability alerts | Checks every 5 minutes on a free plan | Any equivalent service ([monitoring](../06-operations/monitoring-and-analytics.md)). |

## Privacy expectations

- The site sets no cookies and stores nothing on the visitor's device. It does no fingerprinting and no cross-site tracking.
- The only third-party request is the analytics beacon, and it loads only in production.
- The `/privacy` page states exactly what is collected ([functional requirements](../01-product/functional-requirements.md#prv-privacy)).
