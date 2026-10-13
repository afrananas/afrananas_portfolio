# Architecture Decision Records

An ADR records one consequential technical decision: the context, the options considered, what was chosen, and what it costs. ADRs explain *why* the system is the way it is, so future changes start from the original reasoning instead of guessing at it.

## When to write one

Write an ADR when a decision:

- is expensive to reverse (framework, hosting, content storage, data collection), or
- changes what the system does at runtime or which third parties it depends on (any backend, form, or tracking), or
- is required by a boundary rule in [scope](../../00-foundation/scope-and-boundaries.md#boundary-rules).

Don't write one for minor libraries, CSS details, or anything that a single pull request can easily reverse.

## Process

1. Copy [`template.md`](template.md) to `ADR-NNN-short-title.md` using the next number.
2. Set the status to **Proposed** and open a pull request with the ADR on its own.
3. When the pull request merges, set the status to **Accepted** with the date.
4. Accepted ADRs are never rewritten. To change a decision, write a new ADR that sets the old one's status to **Superseded by ADR-NNN**. Correcting typos and links is fine.

Possible statuses: Proposed, Accepted, Deprecated, Superseded.

## Index

| ADR | Decision | Status | Date |
|---|---|---|---|
| [ADR-001](ADR-001-rendering-strategy.md) | Static site generation; no runtime server | Accepted | 2026-10-13 |
| [ADR-002](ADR-002-framework.md) | Astro with TypeScript (strict) | Accepted | 2026-10-13 |
| [ADR-003](ADR-003-content-source.md) | Content as schema-validated MDX and YAML in the repository | Accepted | 2026-10-13 |
| [ADR-004](ADR-004-styling.md) | Native CSS with design tokens and component-scoped styles | Accepted | 2026-10-13 |
| [ADR-005](ADR-005-hosting-and-deployment.md) | Cloudflare Workers static assets, deployed from GitHub Actions | Accepted | 2026-10-13 |
| [ADR-006](ADR-006-contact-method.md) | Direct contact links; no contact form | Accepted | 2026-10-13 |
| [ADR-007](ADR-007-analytics.md) | Cloudflare Web Analytics (no cookies), production only | Accepted | 2026-10-13 |

ADR-001 to ADR-007 were accepted together as the baseline before implementation. Each one can be superseded through the normal process.
