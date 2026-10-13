# Case-study template

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Copy the block below to `src/content/projects/<slug>/index.mdx`. Field rules are in the [project content schema](../01-product/project-content-schema.md), and voice and claims rules are in the [content strategy](../01-product/content-strategy.md). Delete every `{/* guidance */}` comment before publishing.

## Before you write

Answer these first. If any answer is weak, the project may not belong on the site ([selection criteria](../01-product/content-strategy.md#project-selection)).

1. What problem did this solve, and for whom? Why did it matter?
2. What exactly did **I** do, compared with the team?
3. What evidence exists that I can link to or show?
4. What was the hardest decision, and what did I give up?
5. How do I know it works? What was measured, against what baseline?
6. What's wrong with it, or still unfinished?

## Template

````mdx
---
slug: project-slug
title: Project title
summary: One sentence, 70–160 characters, leading with the system or outcome.
status: draft
featured: false
updated: YYYY-MM-DD
context: team            # solo | team | academic | professional | open-source
role: Your role
contribution: 1–3 sentences on exactly what you did.
teamSize: 1
start: YYYY-MM
end: YYYY-MM             # or: ongoing
areas: [backend]         # 1–3 of: backend, ai-ml, computer-vision, genai-rag, full-stack
stack: [Python, FastAPI, PostgreSQL]
problem: 1–2 sentences, ≤ 300 characters.
outcome: 1 sentence, ≤ 200 characters, consistent with results.
links:
  repo: https://github.com/afrananas/…
  # demo: https://…
  # paper: https://doi.org/…
# sourceNote: "Source private — employer-owned"   # required if no repo
results: []
#  - metric: p95 latency
#    value: 140 ms
#    baseline: 820 ms (single-row inserts)
#    conditions: 500 req/s synthetic load, 4 vCPU, PostgreSQL 16
#    evidence: "#testing-and-validation"
#    ledgerId: E-001
# cover: ./cover.png
# coverAlt: What the image shows
# ogImage: ./og.png
---

import Diagram from '../../../components/Diagram.astro';
import ResultList from '../../../components/ResultList.astro';
import Callout from '../../../components/Callout.astro';

## Problem

{/* Context, who was affected, why it mattered. Specific, not generic. 1–3 paragraphs. */}

## Role and scope

{/* Required. What you owned vs. the team. Team size and your position. Use "I" only for your own work. */}

## Requirements and constraints

{/* Functional needs, non-functional targets (latency, accuracy, cost), hard constraints (hardware, data, deadline). */}

## Architecture

<Diagram
  src={import('./architecture.svg')}
  alt="System architecture of …"
  caption="Figure 1 — …"
  description="Components in reading order: … Data flows: … → … → …"
/>

{/* Explain the diagram: components, data flow, why this shape.
    Backend projects: add ### API design, ### Data integrity, ### Error handling, ### Observability
    here or under Key decisions (FR-CS-05). */}

## Key decisions and trade-offs

{/* 2–4 decisions. For each: options considered, what you chose, what it cost. This is the section hiring managers read most closely. */}

## Implementation challenges

{/* The hardest problems and how you solved them. Short code excerpts (≤ 30 lines) only if they illustrate a decision. */}

## Testing and validation

{/* How correctness and performance were verified: test levels, load tests, evaluation harness.
    AI/ML/CV/GenAI projects MUST include (FR-CS-04):
    ### Dataset       — source, license, size, split strategy, leakage prevention
    ### Evaluation    — metrics and why, baseline(s), test-set-only results, variance across runs
    ### Reproducibility — seeds, versions, hardware, how to re-run */}

## Results and evidence

<ResultList results={frontmatter.results} />

{/* Required. Interpret the numbers. Qualitative outcomes must be labelled as qualitative. Never claim what wasn't measured. */}

## Security and limitations

<Callout type="limitation">
{/* Required. Known weaknesses, failure modes, what wasn't tested, security considerations (auth, input validation, data handling, model misuse). */}
</Callout>

## Future improvements

{/* What you'd do next and why — shows judgment, not a wish list. */}
````

## After writing

1. Add a [ledger](evidence-and-metrics.md) entry for every result and every claim that can be checked.
2. Commit the diagram's editable source next to the SVG.
3. Run `npm run dev`. Fix any schema errors and read the page through.
4. Check it against the [definition of done for content](../05-delivery/definition-of-done.md#content-changes).
5. Open a pull request on a `content/<slug>` branch and review it on the preview deployment. Set `status: published` before merging.

The import paths and component props above reflect the planned [component inventory](../04-engineering/component-guidelines.md#inventory). Check them against the real components once M4 is complete, and update this template if they differ.
