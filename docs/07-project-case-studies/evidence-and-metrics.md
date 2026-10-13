# Evidence and metrics

> Status: Living document · Owner: Afran Anas · Last updated: 2026-10-13

This is the record behind every claim on the site. A claim without an entry here isn't published ([claims policy](../01-product/content-strategy.md#claims-policy)). The content test checks that every `ledgerId` in project frontmatter exists in the ledger table below (FR-CS-06).

## Rules

1. **One row per claim.** IDs run `E-001`, `E-002`, and so on. They are never reused. `E-000` is reserved for the format example below, and the content test rejects it as a `ledgerId`.
2. **Evidence must be durable.** Prefer a commit-pinned repository link (`/blob/<sha>/…`), a DOI, a CI run artifact, or a file committed to the repository. Avoid links that can change or expire.
3. **The method must be reproducible.** Someone else should be able to repeat the measurement from what's written here, together with the linked evidence.
4. **Label lab and field data.** Performance figures say which they are.
5. **For AI/ML, report test-set results only,** with the dataset version and split. State whether a run was selected from several, and if so, how.
6. **Confidential work:** if the evidence can't be public, write "private — available on request" and describe the method. The claim must still be true and checkable by someone with access.
7. Re-verify every entry each quarter, and record the check date in the `Verified` column.

## Ledger

| ID | Project (slug) | Claim, as published | Metric and value | Baseline | Method and conditions | Evidence | Verified |
|---|---|---|---|---|---|---|---|
| — | — | *No entries yet. The first entries come from the pilot case study (M2).* | — | — | — | — | — |

### Example entry (format only, not a real claim)

| ID | Project (slug) | Claim, as published | Metric and value | Baseline | Method and conditions | Evidence | Verified |
|---|---|---|---|---|---|---|---|
| E-000 | `example-service` | "Cut p95 write latency from 820 ms to 140 ms by batching inserts" | p95 latency: 140 ms | 820 ms, single-row inserts | k6, 500 req/s for 10 min, 4 vCPU and 8 GB RAM, PostgreSQL 16, 3 runs, median reported | `github.com/afrananas/example/blob/<sha>/bench/RESULTS.md` | YYYY-MM-DD |

## AI/ML evaluation record

For each AI/ML/CV/GenAI project, fill in one block. The case study's *Testing and validation* section summarizes it (FR-CS-04).

```
Project:            <slug>
Task:               e.g. multi-object tracking, retrieval QA
Dataset(s):         name, version, source URL, license
Split:              train / val / test sizes; how split (random, temporal, by-camera, by-document); leakage controls
Baselines:          what was compared (prior model, simple heuristic, off-the-shelf), with their scores on the same test set
Metrics:            which and why (e.g. MOTA/IDF1, mAP@0.5, recall@k, faithfulness)
Results:            test-set scores; variance across ≥3 seeds where feasible
Selection:          single run / best of N (state N and criterion)
Hardware & runtime: GPU/CPU, training time, inference latency conditions
Reproduce:          commands, config file, commit SHA, seed
Limitations:        known failure modes, distribution shift, bias considerations
```

## Site performance records

These are lab measurements of this site (G5). The CI Lighthouse runs act as gates. The entries below record production measurements taken at release and at each quarterly review.

| Date | Page | Profile | Performance | LCP | TBT | CLS | Data type | Notes |
|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | *First entry at launch (release checklist §3)* |

## First-impression test (G1)

| Date | Participants (n, how many hire engineers) | Could state the role | Could state ≥ 2 focus areas | Pass (≥ 4/5) | Notes |
|---|---|---|---|---|---|
| — | — | — | — | — | *Run before launch* |

**Protocol:**
1. Show the homepage at 1280×800 for 10 seconds, then hide it.
2. Ask: "What does this person do? What areas do they work in?"
3. Record the answers as they were given. Don't prompt.
