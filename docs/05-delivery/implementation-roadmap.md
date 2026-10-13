# Implementation roadmap

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Current status

**All pre-implementation documentation is complete.** The decisions are made (ADR-001 to ADR-007) and the standards are written. What remains is owner input and the content it enables (Phases 1–2), then code, starting with the Phase 3 walking skeleton.

| Phase | Documentation | Remaining exit criteria | State |
|---|---|---|---|
| 1: Product definition | ✅ Complete | Answer Q1–Q3 and Q5. Owner approval. | **Waiting on owner** |
| 2: Content and design | ✅ Specifications complete | Project shortlist, evidence inventory, pilot case study, home and About copy, experience entries | Not started (owner content) |
| 3: Architecture and setup | ✅ Decisions and standards complete | Walking skeleton with WS-1 to WS-12 verified ([M3](milestone-plan.md#m3-walking-skeleton)) | **Next code step** |
| 4: Core implementation | ✅ | Build it | Not started |
| 5: Engineering depth | ✅ | Build it | Not started |
| 6: Production release | ✅ Runbook ready | Domain, launch, release checklist | Not started |
| 7: Maintenance | ✅ Procedures ready | Runs after launch | Not started |

Phase 3 (walking skeleton) can start **in parallel** with Phase 2 content writing. It doesn't depend on real content. Phase 4 needs the pilot case study.

Effort estimates, deliverables, and completion criteria for each milestone are in the [milestone plan](milestone-plan.md).

## Why this order

Content comes before design, and design comes before code. The biggest risk to a portfolio is not ready content, not technology. A design built around placeholder text fails when real case studies arrive, and a stack chosen before the requirements are known tends to be over-built. The requirements were written first, and the stack was chosen afterwards to fit them ([ADRs](../03-architecture/adr/README.md)).

## Phases

### Phase 1: Product definition

- **Objective:** settle what the site is for, who it serves, and what it includes.
- **Outputs:** [00-foundation](../00-foundation/) and [01-product](../01-product/) ✅
- **Exit criteria:** owner answers to Q1–Q3 and Q5, and approval of positioning, scope, sitemap, and the Must requirements.

### Phase 2: Content and design

- **Objective:** real content, and a design system that fits it.
- **Outputs:** the design specifications ✅. The content is the owner's work: the project shortlist with the evidence inventory, the **pilot case study**, home and About copy, experience entries, the reconciled résumé, and the social preview image.
- **Exit criteria:** see [M2](milestone-plan.md#m2-content-and-design-ready).

### Phase 3: Architecture and engineering setup

- **Objective:** a pipeline that ships a trivial page end to end and proves the architecture's assumptions about the host.
- **Outputs:** [03-architecture](../03-architecture/) and [04-engineering](../04-engineering/) ✅. The walking skeleton, the repository settings, and the Cloudflare setup.
- **Exit criteria:** see [M3](milestone-plan.md#m3-walking-skeleton). Any failed WS check updates its ADR or document before Phase 4.

### Phase 4: Core implementation

- **Objective:** the recruiter path, from home to projects to case study, works with real content.
- **Exit criteria:** see [M4](milestone-plan.md#m4-core-recruiter-path), including the G6 demonstration.

### Phase 5: Engineering depth

- **Objective:** every page built, and every Must requirement passing.
- **Exit criteria:** see [M5](milestone-plan.md#m5-feature-complete).

### Phase 6: Production release

- **Objective:** a verified production launch.
- **Exit criteria:** [release checklist](release-checklist.md) complete and `v1.0.0` tagged ([M6](milestone-plan.md#m6-v100-launched)).

### Phase 7: Maintenance

- **Objective:** the site stays accurate, secure, and fast.
- The schedule and procedures are in [maintenance](../06-operations/maintenance.md).

## Risks

| Risk | Mitigation |
|---|---|
| Case-study content isn't ready, so launch is blocked | Write the pilot case study in Phase 2. Launch with 3 case studies and add more afterwards. |
| Scope creep, such as an AI chatbot, a CMS, or a contact backend | Follow the [scope](../00-foundation/scope-and-boundaries.md) boundary rules. Every addition needs an ADR. |
| Over-engineering a static site | Don't build a backend unless a requirement needs one. Document only what actually runs. |
| Host behavior differs from the documentation (headers, trailing slashes, previews) | The walking skeleton checks WS-1 to WS-12 before any feature work. Cloudflare Pages is the documented fallback ([ADR-005](../03-architecture/adr/ADR-005-hosting-and-deployment.md)). |
| Perfectionism delays launch indefinitely | The milestone criteria define what counts as finished. Should and Could items can come after launch. |
| Claims that can't be verified damage credibility | FR-CS-06 is enforced by the schema, plus the evidence ledger and quarterly re-verification |

## Documentation plan

| Document | State |
|---|---|
| `README.md`, `CLAUDE.md`, `SECURITY.md`, `.github/pull_request_template.md` | ✅ |
| `00-foundation/`: overview, vision, scope, goals, assumptions and constraints, glossary | ✅ |
| `01-product/`: audience, product requirements, functional and non-functional requirements, sitemap, content strategy, project content schema, acceptance criteria | ✅ |
| `02-design/`: principles, visual design system, page specifications, user flows, responsive design, accessibility | ✅ |
| `03-architecture/`: system context, application architecture, technology stack, routing, content model, SEO, security, ADR-001 to ADR-007 | ✅ |
| `04-engineering/`: repository structure, coding standards, component guidelines, testing strategy, quality gates, git workflow, CI/CD | ✅ |
| `05-delivery/`: roadmap, milestone plan, definition of done, release checklist | ✅ |
| `06-operations/`: local development, environment configuration, deployment runbook, monitoring and analytics, backup and recovery, maintenance | ✅ (local development lists the planned scripts and gets verified at M3) |
| `07-project-case-studies/`: case-study template, evidence and metrics | ✅ (ledger has no entries yet) |
| `LICENSE` | Waiting on owner decision Q8 |

These documents are living specifications. Each pull request that changes behavior updates them ([definition of done](definition-of-done.md)). An ADR is never edited once accepted. A new ADR supersedes it instead.
