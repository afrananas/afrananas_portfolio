# ADR-002: Astro with TypeScript (strict)

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

Given [ADR-001](ADR-001-rendering-strategy.md), the framework has to generate a content-heavy static site with:

- typed, validated content (NFR-MAINT-03),
- MDX case studies with a few components,
- build-time syntax highlighting,
- optimized images,
- almost no client JavaScript (NFR-PERF-05 sets 15 KB per page).

There are only three interactive behaviors: the menu, the filter, and copying the email address. The site is also a work sample, so the framework should be modern and well understood.

## Decision drivers

- Zero JavaScript by default, adding scripts only where needed
- Built-in content validation with types
- Static output quality: images, fonts, sitemap, syntax highlighting
- Size of the dependency surface
- Ecosystem maturity and documentation

## Options considered

1. **Astro.** Content-first. Ships zero client JavaScript by default. Provides content collections with Zod schemas, plus built-in image optimization, a Fonts API, Shiki highlighting, and Content Security Policy hash generation.
2. **Next.js (static export).** Familiar React ecosystem. Ships the React runtime and hydrates every page. Static export loses some features, and the content layer must be added separately.
3. **Eleventy.** Minimal and fast, but has no typed content schema and less built-in asset optimization, so validation would have to be assembled by hand.
4. **SvelteKit (prerendered).** Strong, but application-oriented, with a weaker content story than Astro.

## Decision

**Astro (version 7.x at the time of decision, pinned in the lockfile) with TypeScript in strict mode.**

- Interactivity uses plain `<script>` modules inside Astro components. **No UI framework (React, Svelte, and so on) is added.** Adding one would need a new ADR.
- Content uses content collections ([ADR-003](ADR-003-content-source.md)).
- Next.js would meet the requirements but would ship a hydration runtime that this site doesn't need.
- Eleventy would mean rebuilding schema validation and image handling that Astro already includes.

## Consequences

### Positive

- The JavaScript budget is easy to meet. Pages ship only the scripts they use.
- Invalid content fails the build with typed errors.
- Images, fonts, sitemap, and syntax highlighting need no extra dependencies, or only official integrations.

### Negative

- Astro releases major versions about once a year. Upgrades take planned effort ([maintenance](../../06-operations/maintenance.md#framework-upgrades)).
- Fewer recruiters recognize Astro than React. The case study for this site explains the choice.

### Risks and mitigations

- *Risk:* an API changes between major versions. *Mitigation:* pin the version in the lockfile, handle upgrades in a dedicated pull request with the full gate suite, and check every API used against the official documentation at implementation time.

## Revisit conditions

- A requirement needs rich client-side state across many components.
- Astro's maintenance or licensing changes materially.
