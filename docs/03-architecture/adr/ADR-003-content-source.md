# ADR-003: Content as schema-validated MDX and YAML in the repository

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

There is one author, who is an engineer. The content is projects, engineering items, experience entries, and page prose. It changes a few times a month. The claims policy (NFR-CONT-01) needs a reviewable history of every change to a claim. Invalid or incomplete content must not ship (NFR-MAINT-03, FR-CS-06).

## Decision drivers

- Validation and type safety
- Reviewability: diffs, preview deployments, history
- Zero cost and zero runtime dependencies (C2, [ADR-001](ADR-001-rendering-strategy.md))
- Authoring experience for one technical author

## Options considered

1. **Local MDX and YAML in Git, loaded through Astro content collections with Zod schemas.**
2. **Headless CMS** (for example Sanity or Contentful), fetched at build time.
3. **Git-based CMS user interface** (for example Decap) on top of option 1.
4. **Plain Markdown with no schema.**

## Decision

**Option 1.**

| Content | Location | Format |
|---|---|---|
| Projects | `src/content/projects/<slug>/index.mdx` with co-located images | MDX |
| Engineering items | `src/content/engineering/<slug>.mdx` | MDX |
| Experience entries | `src/content/experience.yaml` | YAML |
| Page prose (About, principles, Contact intro, Privacy) | `src/content/pages/*.mdx` | MDX |
| Identity and contact facts | `src/data/profile.ts` | TypeScript constant |

- A headless CMS adds an account, an API dependency at build time, a second source of truth outside Git history, and an editing interface that one engineer doesn't need.
- A Git-based CMS interface is extra configuration that no one would use.
- Markdown without a schema can't enforce the claims policy.

## Consequences

### Positive

- Every change to a claim is reviewable in a pull request and visible in a preview deployment.
- The schema enforces required fields, length limits, cross-field rules such as `teamSize` against `context`, and references between collections.
- No external service is involved, and content works offline.

### Negative

- Editing requires Git and a text editor. That's fine for this author.
- MDX is executable. It can import components, so content must be treated as code ([security model](../security-model.md#content)).

### Risks and mitigations

- *Risk:* the schema and [project content schema](../../01-product/project-content-schema.md) drift apart. *Mitigation:* the documentation is the specification, and the definition of done requires updating both in the same pull request.

## Revisit conditions

- Someone other than the owner needs to edit content.
- Content volume makes builds slow (more than 5 minutes).
