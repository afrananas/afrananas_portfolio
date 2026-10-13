# Product requirements

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This document links the user problems to the capabilities that solve them, the goals those capabilities serve, and the detailed requirements that implement them. Use it to answer "why does this requirement exist?" and "what breaks if we cut it?".

## Problems and capabilities

| # | User problem | Who | Capability | Goals | Requirements |
|---|---|---|---|---|---|
| P1 | "I can't tell in a few seconds what this person does or whether they fit my role." | Recruiters | A clear identity and positioning on every entry page | G1 | FR-HOME-01, FR-HOME-04, FR-HOME-06, FR-GLB-01 |
| P2 | "Portfolios list technologies but don't show whether the person can build anything real." | Hiring managers | Case studies built on evidence, in a consistent structure | G2, G3 | FR-CS-01 to FR-CS-12 |
| P3 | "I can't tell what the candidate did compared with what the team did." | Hiring managers | A mandatory role and contribution scope on every project | G2 | FR-CS-02, FR-CS-03, FR-PRJ-03 |
| P4 | "Numbers like '95% accuracy' mean nothing without context." | Hiring managers, researchers | Results shown with baseline, conditions, and evidence | G2 | FR-CS-04, FR-CS-06 |
| P5 | "I only care about the backend (or the CV) work." | Hiring managers | Filtering projects by focus area, with shareable filtered views | G3 | FR-PRJ-04 to FR-PRJ-07 |
| P6 | "I need the résumé for the hiring system, now." | Recruiters | A text-based PDF résumé one click from every page | G4 | FR-GLB-01, FR-RES-01 to FR-RES-04 |
| P7 | "How do I contact this person, and will they reply?" | All | Direct contact methods with stated expectations | G4 | FR-CON-01 to FR-CON-04, FR-CS-11 |
| P8 | "I want to see how this person thinks, not just what they built." | Hiring managers, peers | An engineering page with principles, write-ups, and experiments | G2, G5 | FR-ENG-01 to FR-ENG-03 |
| P9 | "Is this experience real, and is it the same as the résumé?" | Recruiters | Verifiable experience entries kept consistent with the résumé | G2, G6 | FR-EXP-01 to FR-EXP-05 |
| P10 | "The site is slow, broken on my phone, or unusable with my assistive technology." | All | A fast, accessible, responsive site that works without JavaScript | G5 | FR-GLB-02 to FR-GLB-08, [NFRs](non-functional-requirements.md) |
| P11 | "I followed an old link and hit a dead end." | All | A helpful 404 page and permanent redirects | G3 | FR-404-01, FR-404-02 |
| P12 | "Shared links look broken and the site doesn't show up in searches for the name." | All | Metadata, previews, sitemap, and structured data | G3 | FR-META-01 to FR-META-07 |
| P13 | "What does this site do with my data?" | All | A plain-language privacy notice and minimal data collection | — (trust) | FR-PRV-01 to FR-PRV-03 |
| P14 | "Updating the site is so tedious that it goes stale." | Owner | Adding content needs no code changes, and content is validated at build | G6 | NFR-MAINT-03, [content model](../03-architecture/content-and-data-model.md) |

## Priorities

1. **Launch blockers:** P1, P2, P3, P4, P6, P7, P10. Without them the site fails its main purpose.
2. **Launch expected:** P5, P8, P9, P11, P12, P13.
3. **Continuous:** P14. It shapes how everything above is built.

## Out of scope

The problems this product deliberately does not solve, and why, are listed in [scope and boundaries](../00-foundation/scope-and-boundaries.md).
