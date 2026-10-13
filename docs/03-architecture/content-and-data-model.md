# Content and data model

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This document covers how content is stored, validated, related, and turned into page data ([ADR-003](adr/ADR-003-content-source.md)). The product-level field definitions for projects are in [project content schema](../01-product/project-content-schema.md). That document is the specification, and `src/content.config.ts` implements it.

## Sources of truth

Every fact lives in exactly one place:

| Fact | Single source | Consumers |
|---|---|---|
| Name, positioning line, summary, availability, email, profile URLs, timezone, response time | `src/data/profile.ts` | Header, footer, home, contact, metadata, JSON-LD |
| Project details | `src/content/projects/<slug>/index.mdx` | Home, `/projects`, case study, sitemap, Open Graph |
| Engineering items | `src/content/engineering/<slug>.mdx` | `/engineering`, home approach excerpt, case-study "related" links |
| Experience, education, research, open source | `src/content/experience.yaml` | `/experience` and **reconciled with** the résumé PDF (FR-EXP-05) |
| Page prose | `src/content/pages/{about,engineering-principles,contact,privacy}.mdx` | The matching pages |
| Résumé | `public/afran-anas-resume.pdf` (exported from the owner's source, A7) | Résumé links. Its size is computed at build time. |
| Evidence behind claims | [`docs/07-project-case-studies/evidence-and-metrics.md`](../07-project-case-studies/evidence-and-metrics.md) | Checked by the content test through `ledgerId` |
| Focus areas, with labels | `src/lib/areas.ts` (the constant enum) | Schema, filter, cards |

## Collections

These are defined in `src/content.config.ts` with `defineCollection`, the `glob()` and `file()` loaders from `astro/loaders`, and `z` from `astro/zod`. The shapes below are specifications, not final code.

### `projects`

- Loader: `glob({ base: './src/content/projects', pattern: '*/index.mdx' })`.
- Schema: every field in [project content schema](../01-product/project-content-schema.md#fields), including these cross-field rules, implemented with `superRefine`:
  - `featuredOrder` is required exactly when `featured` is true.
  - `teamSize` must be `1` when `context` is `solo`, and `≥ 2` when it is `team`.
  - `end` must be on or after `start`, or be `ongoing`.
  - `sourceNote` is required when `links.repo` is absent.
  - `coverAlt` is required when `cover` is present.
  - `areas` has no duplicates.
- Images use the schema `image()` helper, so a missing file fails the build.
- **Collection-wide rules** are enforced by the content test, because Zod validates one entry at a time:
  - slugs are unique, and each slug equals its folder name,
  - `featuredOrder` values are unique,
  - every `ledgerId` exists in the evidence ledger,
  - the required headings and AI/backend subsections are present (FR-CS-03 to 05).

### `engineering`

| Field | Type | Rules |
|---|---|---|
| `slug` | string | Kebab-case, unique |
| `title` | string | 3–80 characters |
| `kind` | `write-up` \| `diagram` \| `experiment` | |
| `date` | date | |
| `summary` | string | ≤ 160 characters |
| `status` | `draft` \| `published` | |
| `relatedProjects` | `reference('projects')[]` | Optional. The build fails on unknown slugs (FR-ENG-02). |
| `externalUrl` | URL | Optional. If set, the item links out instead of rendering its body. |

### `experience`

Loader: `file('./src/content/experience.yaml')`. Each item:

| Field | Type | Rules |
|---|---|---|
| `id` | string | Unique, kebab-case |
| `section` | `experience` \| `education` \| `research` \| `open-source` | |
| `organization` | string | |
| `title` | string | Role, degree, paper title, or contribution |
| `type` | `full-time` \| `part-time` \| `internship` \| `contract` \| `academic` \| `research` \| `volunteer` \| `open-source` | |
| `location` | string | Optional |
| `start` | `YYYY-MM` | |
| `end` | `YYYY-MM` \| `present` | Must be on or after `start` |
| `highlights` | string[] | 1–3 items, each ≤ 25 words |
| `evidence` | `{ label, url }[]` | Optional. Must be https URLs. |
| `relatedProjects` | `reference('projects')[]` | Optional |

### `pages`

Loader: `glob({ base: './src/content/pages', pattern: '*.mdx' })`. Schema: `title`, `description` (70–160 characters), and `updated` (a date).

## Profile data

```ts
// src/data/profile.ts (shape)
export const profile = {
  name: 'Afran Anas',
  positioning: 'Software Engineer — Backend · AI · Full-Stack',
  summary: '…',                         // ≤ 25 words (content strategy)
  availability: { visible: true, text: '…' },
  email: '…',                           // dedicated address (ADR-006)
  links: { github: 'https://github.com/afrananas', linkedin: '…', source: 'https://github.com/afrananas/afrananas_portfolio' },
  timezone: '…', responseTime: '…',
  resume: { path: '/afran-anas-resume.pdf', updated: 'YYYY-MM' },
} as const satisfies Profile;
```

A unit test checks that the URLs are https, the email address is valid, and the summary is 25 words or fewer.

## Derived data (`src/lib`)

All derivation is pure and unit-tested. Pages call these functions and never sort or filter inline.

| Function | Module | Returns | Requirement |
|---|---|---|---|
| `getPublishedProjects()` | `projects.ts` | Projects with `status: published`, plus drafts when `showDrafts` is set | FR-PRJ-01 |
| `sortProjects(list)` | `projects.ts` | Featured projects by `featuredOrder`, then the rest by `end` descending (`ongoing` first, ties broken by title) | FR-PRJ-02 |
| `getFeatured(list)` | `projects.ts` | Featured projects in order | FR-HOME-03 |
| `getNeighbors(list, slug)` | `projects.ts` | `{ prev?, next? }` | FR-CS-10 |
| `getAreaOptions(list)` | `areas.ts` | The areas used by the list, in enum order | FR-PRJ-05 |
| `parseAreaParam(search)` | `areas.ts` | A valid area or `null` (meaning All) | FR-PRJ-04 |
| `sortExperience(list)` | `experience.ts` | Grouped by section, `start` descending, `present` first | FR-EXP-03 |
| `shouldBuildEngineering(items)` | `engineering.ts` | `true` if there are ≥ 2 published items | FR-ENG-01 |
| `formatMonth`, `formatRange` | `dates.ts` | "Mar 2025", "Mar 2025 – Aug 2025" | Content strategy |
| `fileSizeLabel(path)` | `files.ts` | "PDF, 120 KB", computed at build time | FR-RES-02 |
| `buildTitle`, `buildCanonical`, `personJsonLd` | `seo.ts` | Metadata values | FR-META-01, 02, 06 |
| `isProduction`, `showDrafts` | `env.ts` | Flags from `SITE_ENV` | FR-META-05, FR-PRV-02 |

The client filter script imports `parseAreaParam` so the browser and the build use the same rule.

## Diagrams

- Diagrams are stored next to the content: `src/content/projects/<slug>/architecture.svg`, with the editable source beside it (`architecture.excalidraw` or `.d2`).
- They are rendered with `<Diagram src alt description>`. The `description` prop is required, so a missing one is a type error (FR-CS-07).
- Colors use only the palette tokens' hex values. Recheck contrast when a diagram is exported.

## Content as code

MDX can import components and run expressions at build time. Only the owner authors content, and content is reviewed like code. The `Figure`, `Diagram`, `Callout`, and `ResultList` components are available to MDX. Raw `<script>` in MDX is forbidden, and the content test fails if it finds one ([security model](security-model.md#content)).
