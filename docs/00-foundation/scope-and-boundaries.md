# Scope and boundaries

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This document defines what the first public release (v1) includes, what is deferred, and what is permanently out of scope. When a feature is proposed, check it against this document first.

## In scope for v1

**Pages**
- Home (`/`), About (`/about`), Projects (`/projects`), Project case study (`/projects/[slug]`), Engineering (`/engineering`), Experience (`/experience`), Contact (`/contact`).
- A not-found page that returns HTTP 404.
- A privacy notice (`/privacy`), linked from the footer and not indexed.

**Content**
- At least 3 complete case studies at launch (see [goals](goals-and-success-criteria.md), G2).
- A résumé PDF at a stable URL.
- Project and professional content maintained by the owner without a separate admin interface. Content is stored as schema-validated MDX and YAML files in the repository ([ADR-003](../03-architecture/adr/ADR-003-content-source.md)).

**Capabilities**
- Filtering projects by focus area.
- Direct contact through an email link and profile links.
- Search and sharing metadata: titles, descriptions, canonical URLs, Open Graph tags, `sitemap-index.xml`, and `robots.txt`.
- A responsive layout for mobile, tablet, and desktop.
- A dark theme that meets WCAG 2.2 AA.
- Cloudflare Web Analytics, which sets no cookies, loaded in production only ([ADR-007](../03-architecture/adr/ADR-007-analytics.md)).

**Engineering**
- Linting, type checking, and automated tests that run in CI on every change.
- Preview deployments for changes, plus a production deployment over HTTPS on a custom domain.

## Deferred

These items are excluded from v1. Each one has a stated condition under which it would be reconsidered. When the condition is met, write an ADR or a requirements change before building it.

| Item | Reconsider when |
|---|---|
| Contact form | There is evidence that direct email is losing contacts, and an abuse-prevention and delivery-monitoring plan has been accepted in an ADR. |
| Event-level analytics (tracking email and résumé clicks) | The outcome proxies in [goals](goals-and-success-criteria.md#outcome-metrics) prove too coarse after the 60-day baseline. See [ADR-007](../03-architecture/adr/ADR-007-analytics.md). |
| Light theme | Users ask for it, or the design tokens can support it at AA contrast without doubling design maintenance. Token names are semantic from the start so this stays cheap to add later. |
| Individual engineering articles (`/engineering/[slug]`) | The first long-form article is ready to publish. |
| Site search | There is enough content (roughly 20 or more projects and articles) that browsing becomes slow. |
| RSS/Atom feed | Writing is being published on a regular schedule. |
| Interactive AI demo, such as RAG over portfolio content | It is built as a separate project with its own case study, a security model covering prompt injection and cost abuse, and a running-cost budget. |
| Internationalization | Roles in a non-English-speaking market are being actively targeted. |

## Out of scope

- User accounts, authentication, and comments.
- A general-purpose CMS or a custom admin UI.
- A server-side database. If a future requirement needs persistent runtime storage, it goes through the ADR process and v1 is not designed in anticipation of it.
- Payments, e-commerce, and newsletters.
- Third-party embeds that track visitors, such as social widgets or embedded feeds.
- Skill bars, proficiency percentages, and self-assigned ratings.
- Testimonials or endorsements that can't be attributed and verified.

## Boundary rules

1. **No backend without a requirement.** A feature that needs a runtime server, persistent storage, or a server-side secret requires an accepted ADR before any implementation.
2. **No content without evidence.** A project, result, or claim that can't be backed by evidence is not published. See [product vision](product-vision.md).
3. **Scope changes are written down.** Adding a deferred item to v1 means updating this document and the [functional requirements](../01-product/functional-requirements.md) in the same change.
