# Project content schema

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This document defines every field of a project entry: what it means, where it is shown, and how it is validated. The schema is implemented in `src/content.config.ts`, and the implementation must match this document ([content and data model](../03-architecture/content-and-data-model.md)). A build fails if any entry breaks a rule below (NFR-MAINT-03).

Each project lives in `src/content/projects/<slug>/index.mdx`. Its images sit next to it in the same folder. Start from the [case-study template](../07-project-case-studies/case-study-template.md).

## Focus areas

This list is fixed. Adding a value requires changing this document, the schema, and the filter labels in the same pull request.

| Value | Label | Includes |
|---|---|---|
| `backend` | Backend | APIs, services, data pipelines, databases, distributed systems |
| `ai-ml` | AI/ML | Model training and evaluation, classical ML, MLOps |
| `computer-vision` | Computer vision | Detection, tracking, segmentation, **video analytics** |
| `genai-rag` | GenAI/RAG | LLM applications, retrieval, evaluation of generative systems |
| `full-stack` | Full-stack | End-to-end products with a meaningful frontend |

## Fields

"Shown" refers to: **C** for the project card (home and `/projects`), **S** for the case-study summary block, **M** for metadata (title, description, Open Graph).

### Identity and publication

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `slug` | string | Yes | Kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`). Must equal the folder name. Unique. **Never changes after first publication** (FR-404-02). | URL |
| `title` | string | Yes | 3–60 characters. | C S M |
| `summary` | string | Yes | 70–160 characters, one sentence ([writing guidelines](content-strategy.md#writing-guidelines)). | C M |
| `status` | `draft` \| `published` | Yes | Drafts are excluded from every production output (FR-PRJ-01). | — |
| `featured` | boolean | Yes | | Home |
| `featuredOrder` | integer ≥ 1 | Only if `featured` | Unique among featured projects. | Home order |
| `updated` | date (`YYYY-MM-DD`) | Yes | Not in the future. | Case study (FR-CS-12) |

### Context and role

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `context` | `solo` \| `team` \| `academic` \| `professional` \| `open-source` | Yes | | C S |
| `role` | string | Yes | ≤ 60 characters, for example "Backend lead" or "Sole developer". | C S |
| `contribution` | string | Yes | 1–3 sentences describing exactly what Afran did. | S |
| `teamSize` | integer ≥ 1 | Yes | Must be `1` when `context` is `solo`, and `≥ 2` when it is `team`. | S |
| `organization` | string | No | Leave it out if confidential. | S |
| `start` | `YYYY-MM` | Yes | | C S |
| `end` | `YYYY-MM` \| `ongoing` | Yes | Must not be earlier than `start`. | C S |

### Classification

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `areas` | focus-area values | Yes | 1–3 values, no duplicates. The first one is the primary area. | C S, filter |
| `stack` | string[] | Yes | 1–12 items, in order of importance. Cards show the first 5 (FR-HOME-03). Use the official spelling, for example "PostgreSQL" or "PyTorch". | C S |

### Summary block

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `problem` | string | Yes | 1–2 sentences, ≤ 300 characters. | S |
| `outcome` | string | Yes | 1 sentence, ≤ 200 characters. Must agree with `results`. | S |

### Links

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `links.repo` | URL (https) | One of `links.*` or `sourceNote` | | S |
| `links.demo` | URL (https) | | | S |
| `links.paper` | URL (https) | | A DOI URL is preferred. | S |
| `links.other` | `{ label, url }[]` | | Label ≤ 40 characters. | S |
| `sourceNote` | string | Required if `links.repo` is absent | For example "Source private: employer-owned". | S |

### Results

Each item in `results` is one quantitative result (FR-CS-06):

| Field | Type | Required | Rules |
|---|---|---|---|
| `metric` | string | Yes | For example "p95 latency" or "mAP@0.5". |
| `value` | string | Yes | The measured value with its unit, for example "140 ms" or "0.71". |
| `baseline` | string | Yes | What it was compared against, with its value, for example "820 ms (single-row inserts)". If there is truly no baseline, write `"none — absolute measurement"`. |
| `conditions` | string | Yes | Dataset and split, hardware, load, or sample size. |
| `evidence` | string | Yes | An https URL, or an in-page anchor (`#testing-and-validation`) that points to the methodology. |
| `ledgerId` | string | Yes | The matching ID in the [evidence ledger](../07-project-case-studies/evidence-and-metrics.md), for example `E-007`. |

`results` may be empty. In that case the case study describes its outcomes qualitatively and labels them as qualitative.

### Media

| Field | Type | Required | Rules | Shown |
|---|---|---|---|---|
| `cover` | image (co-located file) | No | At least 1600 px wide. A real screenshot or diagram, never stock imagery. | Case study |
| `coverAlt` | string | Required if `cover` is set | Describes what the image shows ([accessibility](../02-design/accessibility.md#images-and-diagrams)). | — |
| `ogImage` | image (co-located file) | No | Exactly 1200×630 PNG or JPEG. The default site image is used if absent (FR-META-07). | M |

## Body (MDX)

The body uses these `##` headings, in the order set by FR-CS-03, with these exact names, because they become anchor IDs:

`Problem` · `Role and scope` · `Requirements and constraints` · `Architecture` · `Key decisions and trade-offs` · `Implementation challenges` · `Testing and validation` · `Results and evidence` · `Security and limitations` · `Future improvements`

A content test checks that:

- `Role and scope`, `Results and evidence`, and `Security and limitations` are always present.
- The headings appear in the order above.
- Projects whose `areas` include `ai-ml`, `computer-vision`, or `genai-rag` contain `###` subsections named **Dataset**, **Evaluation**, and **Reproducibility** under *Testing and validation* (FR-CS-04).
- Projects whose `areas` include `backend` contain `###` subsections named **API design**, **Data integrity**, **Error handling**, and **Observability** under *Architecture* or *Key decisions and trade-offs* (FR-CS-05).

The MDX body can use these components: `Figure`, `Diagram`, and `Callout` ([component guidelines](../04-engineering/component-guidelines.md)). Raw HTML and `<script>` tags are not allowed in content.

## Example frontmatter

```yaml
---
slug: video-analytics-pipeline
title: Real-time video analytics pipeline
summary: Multi-camera object tracking service that turns RTSP streams into queryable events with sub-second latency.
status: draft
featured: true
featuredOrder: 1
updated: 2026-10-13
context: team
role: Backend and CV lead
contribution: Designed the ingestion and tracking services, wrote the event store, and set up the evaluation harness.
teamSize: 3
start: 2025-02
end: 2025-08
areas: [computer-vision, backend]
stack: [Python, PyTorch, FastAPI, PostgreSQL, Redis, Docker]
problem: Placeholder. Replace with the real problem statement.
outcome: Placeholder. Replace with the real outcome.
links:
  repo: https://github.com/afrananas/example
results: []
---
```

This is an illustrative example. It describes no real project and must never be published as it stands.
