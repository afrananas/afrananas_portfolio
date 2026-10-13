# Content strategy

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Content is the product. This document sets the voice, what gets published, and the rules every claim must pass.

## Voice and tone

| Do | Don't |
|---|---|
| Write in the first person and plainly: "I designed the ingestion service…" | Use the third person about yourself, or marketing voice: "Afran is a passionate innovator…" |
| Be specific: "cut p95 latency from 820 ms to 140 ms by batching writes" | Be vague: "significantly improved performance" |
| State trade-offs and limitations openly | Present every decision as obviously right |
| Use technical terms when they're precise, and explain them in case-study summaries | Pile up buzzwords ("leveraging cutting-edge AI synergies") |
| Keep it calm and confident | Use hype, exclamation marks, or false modesty |

**Words to avoid:** passionate, ninja, rockstar, guru, cutting-edge, revolutionary, world-class, expert (unless backed by evidence), "and more", "etc." at the end of lists of technologies.

## Identity copy

These are the canonical strings, defined in [product vision](../00-foundation/product-vision.md#professional-identity) and stored once in `src/data/profile.ts` ([content model](../03-architecture/content-and-data-model.md)).

| Element | Rule |
|---|---|
| Positioning line | "Software Engineer — Backend · AI · Full-Stack". Used word for word everywhere. |
| One-sentence summary (home) | At most 25 words. Says what Afran builds and for whom, not a list of adjectives. TODO(owner): draft it in Phase 2. |
| Short bio (About, first paragraph) | 50–80 words. Covers current focus, background, and what Afran is looking for. |
| Availability statement | One line, for example "Open to backend and applied-AI roles from {month}". It can be hidden. Remove it as soon as it stops being true. |

## Project selection

A project is listed only if **all** of these are true:

1. It shows a skill relevant to the positioning: backend, AI/ML, computer vision and video analytics, GenAI/RAG, or full-stack.
2. Afran's contribution was substantial and can be described specifically.
3. There is at least one piece of evidence: a repository, demo, paper, report, recorded output, or a credible description of private work.
4. It can be described without breaching a confidentiality agreement.

**Featured projects** (3–4 on the home page) are the strongest evidence for the target role. They should cover different focus areas, so there isn't, for example, three RAG chatbots. Order them by relevance to the target role, not by date.

**Confidential and professional work:** describe the problem, architecture, and your role in general terms. Leave out client names, data, and internal metrics unless you have written permission. Write "Source private: employer-owned" rather than omitting the links section.

**Academic projects** are labeled `academic`. Course assignments are listed only if they went clearly beyond the brief.

## Claims policy

This is the most important rule on the site (NFR-CONT-01).

1. **Every quantitative claim** includes the metric, the value, the baseline, the conditions (dataset, hardware, load), and a link to its evidence. A schema rule enforces this ([project content schema](project-content-schema.md#results)).
2. **Contribution claims** say what Afran did. In team projects, use "I" for personal work and "we" for team work, consistently.
3. **AI/ML results** report results on the test set only, name the dataset, version, and split, and name the baseline. Never report training accuracy as the result. Never report a cherry-picked best run without saying it was selected.
4. **No invented or estimated numbers.** If something wasn't measured, describe the result qualitatively and label it qualitative.
5. **Third-party names** (employers, clients, universities, logos) only appear where the relationship is factual and publishing it is allowed.
6. **Every claim gets an entry** in the [evidence ledger](../07-project-case-studies/evidence-and-metrics.md) before it is published.
7. **Quarterly re-verification:** claims whose evidence is no longer reachable are fixed or removed.

## Writing guidelines

| Content | Length | Notes |
|---|---|---|
| Project summary (card and meta description) | 70–160 characters | One sentence. Start with the outcome or the system, not "This project…". |
| Case-study summary block | About 120 words in total | Problem, role, outcome. A recruiter reads only this part. |
| Case-study body | 800–2,500 words | Readers skim by heading, so headings say what the section shows. |
| Engineering item summary | ≤ 160 characters | |
| Experience bullets | 1–3 per entry, ≤ 25 words each | Lead each with an outcome: "Reduced…", "Built…", "Shipped…". |

- **Headings** follow the fixed case-study structure (FR-CS-03). Don't invent new top-level sections.
- **Diagrams** come before the prose that explains them. Every diagram has a text description ([accessibility](../02-design/accessibility.md#images-and-diagrams)).
- **Code excerpts** are short (≤ 30 lines), illustrate a decision, and link to the full source when it is public.
- **Dates** are written as months: "Mar 2025 – Aug 2025".

## Résumé

- One source of truth: the experience content collection and `profile.ts`. The résumé is reconciled against them every time either one changes (FR-EXP-05).
- The PDF has selectable text, fits on one or two pages, and contains no photo, home address, or date of birth.
- The filename is fixed: `afran-anas-resume.pdf` (FR-RES-01). Never version it in the filename.
- Every update is noted in the [maintenance log](../06-operations/maintenance.md#log).

## Calls to action

| Location | Primary CTA | Secondary CTA |
|---|---|---|
| Home hero | View projects | Contact |
| End of a case study | Contact (the action wording depends on availability) | Next project |
| About | View experience | Contact |
| Experience | Download résumé | Contact |
| 404 | Projects | Home |

CTA labels are verbs that say what happens: "View projects", "Email me", or "Download résumé (PDF, 120 KB)". Never "Click here" or "Learn more".

## Content lifecycle

1. Draft the entry as `status: draft` on a `content/` branch ([git workflow](../04-engineering/git-workflow.md)).
2. Add each claim to the evidence ledger.
3. Review the preview deployment against the [definition of done](../05-delivery/definition-of-done.md#content-changes).
4. Set `status: published` and merge.
5. Review every quarter ([maintenance](../06-operations/maintenance.md)).
