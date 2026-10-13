# ADR-001: Static site generation, no runtime server

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

The site's content changes only when the owner publishes something, which happens a few times a month at most. No requirement needs per-request data, authentication, or server-side secrets (see [scope](../../00-foundation/scope-and-boundaries.md) and FR-CON-04). The performance budgets (NFR-PERF-01 to 05), the zero-cost constraint (C2), and the zero-operations constraint (C1) all favor serving pre-built files.

## Decision drivers

- Performance: fast LCP, little JavaScript
- Operational cost and effort: nothing to patch, scale, or monitor at runtime
- Security: a minimal attack surface
- Content works without JavaScript (FR-GLB-06, NFR-SEO-02)

## Options considered

1. **Static site generation (SSG):** all HTML is generated at build time and served from a CDN.
2. **Server-side rendering (SSR):** HTML is rendered on each request by a server or edge function.
3. **Client-side single-page app (SPA):** a JavaScript bundle renders the content in the browser.
4. **Hybrid:** SSG with a few on-demand routes.

## Decision

**Option 1, SSG for every route.** The output is a folder of static files. There is no server code, no edge function, and no runtime dependency.

- SSR adds a runtime to secure and operate, and buys nothing, because no page varies per request.
- A SPA fails NFR-SEO-02 and FR-GLB-06 and makes performance worse.
- A hybrid setup has no route that justifies it today. It stays available through the revisit condition below.

## Consequences

### Positive

- The fastest possible delivery: CDN-cached HTML with no server time.
- Nothing runs at runtime that could be attacked, apart from the host serving files.
- Any static host can serve the output, so switching hosts is easy ([backup and recovery](../../06-operations/backup-and-recovery.md)).

### Negative

- Every content change needs a rebuild and deploy, which takes about 2–5 minutes through CI.
- Anything dynamic, such as a form or live data, needs an ADR and new infrastructure.

### Risks and mitigations

- *Risk:* a future feature, such as a contact form or AI demo, pushes toward a server. *Mitigation:* the scope boundary rule requires an ADR. A form would use a third-party endpoint or one isolated function, and the rest of the site would stay static.

## Revisit conditions

- A requirement needs per-request data or server-side secrets.
- Build times exceed 5 minutes because of content volume.
