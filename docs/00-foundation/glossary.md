# Glossary

> Status: Living document · Owner: Afran Anas · Last updated: 2026-10-13

Shared definitions for terms used across this documentation. Add a term the first time two documents could read it differently.

| Term | Definition |
|---|---|
| **ADR** | Architecture Decision Record. A short document recording one significant technical decision, the options considered, and its consequences. Stored in [`03-architecture/adr/`](../03-architecture/adr/README.md). |
| **Acceptance criteria** | Testable pass/fail conditions for one requirement. See [acceptance criteria](../01-product/acceptance-criteria.md). |
| **Canonical URL** | The single preferred URL for a page, declared with `<link rel="canonical">`, so search engines treat duplicate URLs (filtered views, preview hosts) as one page. |
| **Case study** | A page at `/projects/[slug]` that documents one project: problem, role, architecture, decisions, testing, results, and limitations. Every listed project has one. |
| **CLS** | Cumulative Layout Shift. A Core Web Vital measuring unexpected visual movement. Good is ≤ 0.1. |
| **Content collection** | Astro's typed, schema-validated set of content entries (projects, engineering items, experience). Invalid content fails the build. |
| **Contribution scope** | What Afran personally did on a project, as distinct from what the team did. Required on every case study. |
| **Conversion** | A visit that ends in a contact action: an email link, a résumé open, or a profile link click. |
| **Core Web Vitals (CWV)** | Google's user-experience metrics: LCP, INP, and CLS, assessed at the 75th percentile of real page loads. |
| **Draft** | A content entry with `status: draft`. It is never included in production output. |
| **Evidence** | A verifiable artifact that supports a claim: a repository, demo, paper, test report, benchmark log, or screenshot of real output. It is recorded in the [evidence ledger](../07-project-case-studies/evidence-and-metrics.md). |
| **Featured project** | A project with `featured: true`, shown on the homepage in owner-defined order. |
| **Field data** | Performance measured from real visitors' browsers (Real User Monitoring), as opposed to lab data. |
| **Focus area** | One of the fixed project categories used for filtering: `backend`, `ai-ml`, `computer-vision`, `genai-rag`, `full-stack`. |
| **INP** | Interaction to Next Paint. A Core Web Vital measuring how quickly the page responds to input. Good is ≤ 200 ms. It can only be measured in the field. |
| **Lab data** | Performance measured in a controlled, simulated environment, such as Lighthouse. It is useful for catching regressions but is not real-user performance. |
| **LCP** | Largest Contentful Paint. A Core Web Vital measuring when the main content becomes visible. Good is ≤ 2.5 s. |
| **Preview deployment** | A deployment of a pull request to its own non-production URL. It is never indexed by search engines. |
| **Progressive enhancement** | Building the page so all content and links work as plain HTML, then adding JavaScript only to improve interaction. If the script fails, the page still works. |
| **Quality gate** | An automated or manual check that must pass before a change merges or releases. See [quality gates](../04-engineering/quality-gates.md). |
| **Server rendering (SSR)** | Generating HTML on a server for each request. Not used here ([ADR-001](../03-architecture/adr/ADR-001-rendering-strategy.md)). |
| **Slug** | The URL-safe, lowercase, hyphenated identifier of a project (`video-analytics-pipeline`). It never changes after publication. |
| **Static site generation (SSG)** | Generating all HTML once, at build time, and serving it as files. The rendering strategy for this site. |
| **Structured data** | Machine-readable metadata (schema.org JSON-LD) that describes page content to search engines, such as `Person`. |
| **TBT** | Total Blocking Time. A lab metric used as a stand-in for INP during development. |
| **Walking skeleton** | The thinnest end-to-end slice of the system (one page built, tested in CI, and deployed) that proves the pipeline before features are built on it. |
