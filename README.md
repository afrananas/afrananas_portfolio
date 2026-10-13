# AFRAN ANAS — Portfolio

Portfolio website of **Afran Anas**, Software Engineer — Backend · AI · Full-Stack.

The site is built as a production software product. Requirements, design, architecture, testing, deployment, and maintenance are documented before and alongside the code. The documentation is part of the portfolio: it shows how the work is planned and verified, not only what the result looks like.

## Status

| Phase | State |
|---|---|
| 1 — Product definition | **In progress** |
| 2 — Content and design | Not started |
| 3 — Architecture and engineering setup | Not started |
| 4 — Core implementation | Not started |
| 5 — Engineering depth | Not started |
| 6 — Production release | Not started |
| 7 — Maintenance | Not started |

There is no application code yet. The technology stack is chosen in Phase 3 and recorded in Architecture Decision Records (ADRs). Setup instructions will be added here when there is something to set up. Details are in the [implementation roadmap](docs/05-delivery/implementation-roadmap.md).

## Documentation

Start with the [project overview](docs/00-foundation/project-overview.md).

| Area | Documents |
|---|---|
| Foundation | [Project overview](docs/00-foundation/project-overview.md) · [Product vision](docs/00-foundation/product-vision.md) · [Scope and boundaries](docs/00-foundation/scope-and-boundaries.md) · [Goals and success criteria](docs/00-foundation/goals-and-success-criteria.md) |
| Product | [Target audience](docs/01-product/target-audience.md) · [Sitemap and navigation](docs/01-product/sitemap-and-navigation.md) · [Functional requirements](docs/01-product/functional-requirements.md) |
| Design | [Design principles](docs/02-design/design-principles.md) |
| Delivery | [Implementation roadmap](docs/05-delivery/implementation-roadmap.md) |

The other documents (design system, architecture, engineering standards, operations, case-study template) are written in the phase that needs them, not in advance. The [documentation plan](docs/05-delivery/implementation-roadmap.md#documentation-plan) lists each one and the phase it belongs to.

## Repository layout

```
docs/        Product, design, architecture, engineering, delivery, and operations documentation
README.md    This file
```

Application source, static assets, tests, and CI workflows are added in Phase 3.

## Conventions

- `TODO(owner)` marks a fact that only the owner can supply. List them with `grep -rn "TODO(owner)" README.md docs`.
- Requirement IDs such as `FR-PRJ-04` never change. Use them in issues, commits, and tests.
- A change to behavior updates its documentation in the same commit.

## License

TODO(owner): choose a license. Code and written content may need different terms, for example MIT for code and all rights reserved for the biography, case studies, and images.
# afrananas_portfolio
