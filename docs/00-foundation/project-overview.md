# Project overview

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

| | |
|---|---|
| Product | Personal portfolio website |
| Owner | Afran Anas |
| Positioning | Software Engineer — Backend · AI · Full-Stack |
| Current phase | Documentation complete. Phase 1 exit (owner inputs) and the Phase 3 walking skeleton are next. |

## Summary

This website presents Afran Anas as a Software Engineer — Backend · AI · Full-Stack. Its main evidence is case studies of real projects. Each one explains the problem, the architecture, the decisions and trade-offs, how the work was tested, and results that can be verified.

The site is also built and run as a production system. Its documentation, ADRs, tests, and CI pipeline count as evidence of how Afran works as an engineer.

## Intended audience

- **Primary:** recruiters, hiring managers, and engineering leads assessing candidates for backend and applied-AI roles.
- **Secondary:** engineering peers, potential clients, and research or open-source collaborators.

[Target audience](../01-product/target-audience.md) describes each group's needs and how much time they spend.

## Primary features

- A homepage that shows who Afran is and what Afran builds within one screen.
- A curated list of projects that visitors can filter by focus area.
- A case study for every listed project, covering problem, role, architecture, decisions, testing, results, and limitations.
- An engineering page with technical writing, architecture diagrams, engineering principles, and experiments.
- An experience page listing education, work experience, research, and open-source contributions, each verifiable.
- A résumé PDF that can be reached from every page.
- Direct contact methods.

Behavior is specified in [functional requirements](../01-product/functional-requirements.md). Routes are listed in [sitemap and navigation](../01-product/sitemap-and-navigation.md).

## Technical focus areas

Backend systems · AI/ML · Computer vision · Video analytics · GenAI/RAG

## Current status

**All pre-implementation documentation is complete.** Requirements, design specifications, architecture, ADRs, engineering standards, delivery plans, and operations runbooks have been written. The next step is the Phase 3 walking skeleton, which is the first code.

The only blockers left are owner inputs: the open questions below, plus the content they enable (project shortlist, pilot case study). The [implementation roadmap](../05-delivery/implementation-roadmap.md) tracks the exit criteria for each phase.

## Technology at a glance

A statically generated Astro site written in TypeScript and native CSS. Content is stored as schema-validated MDX in the repository. It is deployed to Cloudflare Workers static assets by GitHub Actions. Analytics use Cloudflare Web Analytics, which sets no cookies. See [technology stack](../03-architecture/technology-stack.md) and the [ADRs](../03-architecture/adr/README.md).

## Links

| Link | Value |
|---|---|
| Source repository | [github.com/afrananas/afrananas_portfolio](https://github.com/afrananas/afrananas_portfolio) (public) |
| Production URL | TODO(owner): domain not chosen yet (Q4) |
| GitHub profile | [github.com/afrananas](https://github.com/afrananas) |
| LinkedIn profile | TODO(owner) |
| Public contact email | TODO(owner) (Q3) |

## Open questions

These are facts only the owner can supply. Each must be answered before the phase shown.

| # | Question | Needed by |
|---|---|---|
| Q1 | Which 3–6 projects will be featured? For each one: was it solo, team, academic, or professional work, what did Afran personally contribute, and what evidence exists (repository, demo, paper, metrics with methodology)? | Phase 2 |
| Q2 | What is the current professional situation (current role or student/graduate status, years of experience), and what kind of role is sought (full-time, contract, or freelance; location or remote)? | Phase 2 |
| Q3 | Which email address and which profiles should be public? Is a dedicated address for the portfolio acceptable? | Phase 2 |
| Q4 | Which domain name? Is it registered already? | Phase 3, so the name can be secured early |
| Q5 | Is client or freelance work wanted? If yes, potential clients become an active audience and the contact approach must serve them. | Phase 2 |
| Q6 | ~~What is the budget for domain, hosting, and services?~~ **Assumed:** domain cost only, everything else on free tiers ([C2](assumptions-and-constraints.md#constraints)). | — |
| Q7 | ~~Will the source repository be public?~~ **Answered:** yes, [afrananas/afrananas_portfolio](https://github.com/afrananas/afrananas_portfolio). | — |
| Q8 | Which license? Recommendation: MIT for code, with written content, images, and the résumé kept "all rights reserved". Until a LICENSE file exists, all rights are reserved by default. | Phase 3 (walking skeleton) |
| Q9 | What should the contact page say about response time, timezone, and welcome inquiry types (FR-CON-03)? | Phase 5 |
