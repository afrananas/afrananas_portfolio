# AFRAN ANAS — Portfolio

Portfolio website of **Afran Anas**, Software Engineer — Backend · AI · Full-Stack.

The site is built as a production software product. Requirements, design, architecture, testing, deployment, and maintenance are documented before and alongside the code. The documentation is part of the portfolio: it shows how the work is planned and verified, not only what the result looks like.

## Status

**Documentation complete. Walking skeleton (M3) built; first deploy pending.**

| Phase | State |
|---|---|
| 1: Product definition | Documentation complete. Waiting on owner inputs (Q1–Q3, Q5). |
| 2: Content and design | Specifications complete. Content (pilot case study) not started. |
| 3: Architecture and setup | Decisions and standards complete. **Walking skeleton built and passing local gates; deploy and WS checks next.** |
| 4–7: Build, release, maintain | Not started. Plans, gates, and runbooks are ready. |

Details: [implementation roadmap](docs/05-delivery/implementation-roadmap.md) · [milestone plan](docs/05-delivery/milestone-plan.md).

## Technology

A statically generated [Astro](https://astro.build) site in TypeScript (strict), styled with native CSS and design tokens. Content is stored as schema-validated MDX and YAML in the repository. It is tested with Vitest, Playwright, axe, and Lighthouse CI, and deployed by GitHub Actions to Cloudflare Workers static assets. There is no backend, there are no cookies, and the only analytics is Cloudflare Web Analytics, which is privacy-friendly.

The reasoning is in the [technology stack](docs/03-architecture/technology-stack.md) and the [Architecture Decision Records](docs/03-architecture/adr/README.md).

## Getting started

```sh
nvm use && npm ci
npx playwright install chromium webkit
npm run dev       # http://localhost:4321
npm run verify    # every local quality gate (mirrors CI)
```

On macOS 12, use the [fallback](docs/06-operations/local-development.md#older-macos-fallback) for E2E tests.

See [local development](docs/06-operations/local-development.md).

## Documentation

Start with the [project overview](docs/00-foundation/project-overview.md).

| Area | Documents |
|---|---|
| Foundation | [Overview](docs/00-foundation/project-overview.md) · [Vision](docs/00-foundation/product-vision.md) · [Goals and success criteria](docs/00-foundation/goals-and-success-criteria.md) · [Scope](docs/00-foundation/scope-and-boundaries.md) · [Assumptions and constraints](docs/00-foundation/assumptions-and-constraints.md) · [Glossary](docs/00-foundation/glossary.md) |
| Product | [Target audience](docs/01-product/target-audience.md) · [Product requirements](docs/01-product/product-requirements.md) · [Functional](docs/01-product/functional-requirements.md) and [non-functional](docs/01-product/non-functional-requirements.md) requirements · [Acceptance criteria](docs/01-product/acceptance-criteria.md) · [Sitemap](docs/01-product/sitemap-and-navigation.md) · [Content strategy](docs/01-product/content-strategy.md) · [Project content schema](docs/01-product/project-content-schema.md) |
| Design | [Principles](docs/02-design/design-principles.md) · [Visual design system](docs/02-design/visual-design-system.md) · [Page specifications](docs/02-design/page-specifications.md) · [User flows](docs/02-design/user-flows.md) · [Responsive design](docs/02-design/responsive-design.md) · [Accessibility](docs/02-design/accessibility.md) |
| Architecture | [System context](docs/03-architecture/system-context.md) · [Application architecture](docs/03-architecture/application-architecture.md) · [Technology stack](docs/03-architecture/technology-stack.md) · [Routing](docs/03-architecture/routing-and-page-model.md) · [Content model](docs/03-architecture/content-and-data-model.md) · [SEO and metadata](docs/03-architecture/seo-and-metadata-architecture.md) · [Security model](docs/03-architecture/security-model.md) · [ADRs](docs/03-architecture/adr/README.md) |
| Engineering | [Repository structure](docs/04-engineering/repository-structure.md) · [Coding standards](docs/04-engineering/coding-standards.md) · [Component guidelines](docs/04-engineering/component-guidelines.md) · [Testing strategy](docs/04-engineering/testing-strategy.md) · [Quality gates](docs/04-engineering/quality-gates.md) · [Git workflow](docs/04-engineering/git-workflow.md) · [CI/CD](docs/04-engineering/ci-cd.md) |
| Delivery | [Roadmap](docs/05-delivery/implementation-roadmap.md) · [Milestones](docs/05-delivery/milestone-plan.md) · [Definition of done](docs/05-delivery/definition-of-done.md) · [Release checklist](docs/05-delivery/release-checklist.md) |
| Operations | [Local development](docs/06-operations/local-development.md) · [Environment configuration](docs/06-operations/environment-configuration.md) · [Deployment runbook](docs/06-operations/deployment-runbook.md) · [Monitoring and analytics](docs/06-operations/monitoring-and-analytics.md) · [Backup and recovery](docs/06-operations/backup-and-recovery.md) · [Maintenance](docs/06-operations/maintenance.md) |
| Case studies | [Case-study template](docs/07-project-case-studies/case-study-template.md) · [Evidence and metrics](docs/07-project-case-studies/evidence-and-metrics.md) |

## Repository layout

```
docs/                    Specifications and decisions (00-foundation … 07-project-case-studies)
src/                     Astro pages, layout, styles, lib (pure helpers), data/profile.ts
public/                  _headers, _redirects, favicon
tests/                   unit/, build/ (checks dist/), e2e/ (Playwright + axe)
scripts/                 check-css-tokens.mjs, smoke.mjs
.github/                 CI, link-check and Dependabot workflows, PR template
CLAUDE.md                Rules for AI coding agents
SECURITY.md              Vulnerability reporting
.editorconfig .gitignore .nvmrc .env.example
```

The target layout after the scaffold is in [repository structure](docs/04-engineering/repository-structure.md).

## Conventions

- `TODO(owner)` marks a fact only the owner can supply. List them with `grep -rn "TODO(owner)" README.md docs`.
- Requirement IDs (`FR-PRJ-04`, `NFR-PERF-01`) never change. Use them in tests, commits, and pull requests.
- A change to behavior updates its documentation in the same pull request. An accepted ADR is never edited. A new ADR supersedes it.

## Security

Report vulnerabilities privately. See [SECURITY.md](SECURITY.md).

## License

TODO(owner): choose a license (Q8). Recommendation: MIT for code, with written content, images, and the résumé kept "all rights reserved". Until a LICENSE file is added, all rights are reserved by default.
