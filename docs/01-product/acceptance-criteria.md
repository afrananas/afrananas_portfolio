# Acceptance criteria

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This document gives pass/fail conditions for every [functional requirement](functional-requirements.md). A requirement is done when every condition in its row passes using the listed verification method.

**Verification methods:**

| Code | Meaning |
|---|---|
| **E2E** | Playwright test on Chromium and WebKit |
| **E2E-noJS** | Playwright test with JavaScript disabled |
| **A11y** | axe scan inside an E2E test |
| **Unit** | Vitest test |
| **Content** | Content test over `src/content/` |
| **Build** | Schema validation fails the build |
| **Smoke** | Post-deploy check against the deployed URL |
| **Manual** | Checklist item in the [release checklist](../05-delivery/release-checklist.md) |

Test locations are defined in the [testing strategy](../04-engineering/testing-strategy.md). Test titles start with the requirement ID, for example `FR-PRJ-04: …`, so a failing test points straight to its requirement.

E2E tests check structure and invariants, not specific copy. This keeps them stable as content changes.

## GLB: Global layout and navigation

| ID | Pass when | Verified by |
|---|---|---|
| FR-GLB-01 | Every route has a `header` landmark containing a link to `/` with the owner's name, nav links in the specified order, and a résumé link. | E2E (every route) |
| FR-GLB-02 | On each section route and on one case study, exactly one nav link has `aria-current`, and it is the correct one. Its computed style differs from the other links in a property other than color (underline or border). | E2E |
| FR-GLB-03 | The first Tab press focuses "Skip to content". Pressing Enter moves focus to `main`, and the next Tab press reaches the first focusable element inside `main`. | E2E |
| FR-GLB-04 | At 375 px wide, the menu button has an accessible name and `aria-expanded="false"`. Activating it sets `true` and shows the links. Escape closes it and returns focus to the button. Following a link closes the menu. Passes axe with the menu open and closed. | E2E, A11y |
| FR-GLB-05 | Every route has a `footer` containing email, GitHub, LinkedIn, résumé, repository, and privacy links. | E2E |
| FR-GLB-06 | With JavaScript disabled, every route renders its main content and every nav link works. No filter, menu toggle, or copy button is rendered that does nothing. | E2E-noJS |
| FR-GLB-07 | No link has `target="_blank"`. Every link to another origin carries the external indicator and visually hidden "(external)" text. | E2E (every route) |
| FR-GLB-08 | With reduced motion emulated, every element has a computed `transition-duration` and `animation-duration` of 0 s or ≤ 0.01 s. | E2E |

## HOME: Home

| ID | Pass when | Verified by |
|---|---|---|
| FR-HOME-01 | At 360×640 and 1280×800, the `h1` (name), the positioning line, and the summary are fully inside the viewport before any scrolling. | E2E |
| FR-HOME-02 | The hero's primary CTA resolves to `/projects` or `#selected-work`, and the secondary CTA resolves to `/contact`. | E2E |
| FR-HOME-03 | The number of cards equals the number of published featured projects, in `featuredOrder`. Each card has a title, summary, role, areas, ≤ 5 stack items, and a link to `/projects/<slug>` that returns 200. | E2E, Content |
| FR-HOME-04 | No element on any route uses `role="progressbar"` or `<meter>`/`<progress>`, and no text matches `\d+%` next to a technology name. | E2E, Manual |
| FR-HOME-05 | The approach section contains links to `/engineering` and `/about`. | E2E |
| FR-HOME-06 | When `availability.visible` is `true` the statement renders, and when it is `false` it doesn't. | Unit, E2E |

## PRJ: Projects

| ID | Pass when | Verified by |
|---|---|---|
| FR-PRJ-01 | The number of cards on `/projects` equals the number of published projects. A draft's slug appears in no page, no metadata, and not in `sitemap-index.xml`. Its URL returns 404 in production builds. | E2E, Build output check |
| FR-PRJ-02 | The sort function returns featured projects by `featuredOrder`, then the others by `end` descending (`ongoing` first). The DOM order on `/projects` matches that function. | Unit, E2E |
| FR-PRJ-03 | Every card shows all the listed fields, and every card's link returns 200. | E2E |
| FR-PRJ-04 | Choosing an area updates the URL to `?area=<value>` and shows only matching cards. Loading `/projects?area=backend` directly applies the filter. `?area=nonsense` shows every card with no error. Going back restores the previous filter state. "All" removes the parameter. | E2E, Unit (parsing) |
| FR-PRJ-05 | The filter options are exactly the set of areas used by published projects, plus "All". | Unit, E2E |
| FR-PRJ-06 | A polite live region's text changes to "N projects" (or "1 project") after each filter change. | E2E |
| FR-PRJ-07 | With JavaScript disabled, every card is visible and no filter controls are in the DOM, or they are `hidden`. | E2E-noJS |

## CS: Case study

| ID | Pass when | Verified by |
|---|---|---|
| FR-CS-01 | Every published slug returns 200. `/projects/does-not-exist` returns 404 and shows the not-found page. | E2E, Smoke |
| FR-CS-02 | The summary block contains the problem, role, contribution, context and team size, timeframe, stack, and outcome. Every rendered link has a non-empty `href`. If there's no repository link, `sourceNote` is shown. | E2E, Build |
| FR-CS-03 | The `h2` headings are a subsequence of the specified order, and all three required headings are present. | Content, E2E |
| FR-CS-04 | Projects in an AI area contain the Dataset, Evaluation, and Reproducibility subsections. | Content |
| FR-CS-05 | Projects in the backend area contain the API design, Data integrity, Error handling, and Observability subsections. | Content |
| FR-CS-06 | Every `results` item has `baseline`, `conditions`, `evidence`, and `ledgerId`. The rendered result shows its baseline and conditions and links to its evidence. Every `ledgerId` exists in the evidence ledger. | Build, Content, E2E |
| FR-CS-07 | Every `Diagram` has a non-empty text description reachable by keyboard and screen reader. At 360 px the page has no horizontal scroll (`scrollWidth ≤ clientWidth`). | E2E, A11y |
| FR-CS-08 | Code blocks have highlighted tokens. Each overflowing block has `tabindex="0"`, an accessible name, and scrolls on its own. At 360 px the page has no horizontal scroll. | E2E, A11y |
| FR-CS-09 | A case study with ≥ 6 `h2` sections has a table-of-contents `nav` with one link per section, and each link targets an existing ID. | E2E |
| FR-CS-10 | The previous and next links match the neighbors in the FR-PRJ-02 order. The first project has no "previous" link and the last has no "next". A link to `/projects` is always present. | Unit, E2E |
| FR-CS-11 | The last section before the footer contains a link to `/contact`. | E2E |
| FR-CS-12 | A `<time datetime>` element shows the `updated` date. | E2E |

## ENG: Engineering

| ID | Pass when | Verified by |
|---|---|---|
| FR-ENG-01 | The page has a principles section and at least 2 published items, each with a title, `<time>`, summary, and content or a link. If there are fewer than 2, the route and its nav link are absent from the build. | Build, E2E |
| FR-ENG-02 | Every `relatedProjects` reference resolves to a published project and renders a link that returns 200. | Build, E2E |
| FR-ENG-03 | Deferred. Not tested. | — |

## EXP: Experience

| ID | Pass when | Verified by |
|---|---|---|
| FR-EXP-01 | The sections render in the specified order, and empty sections are absent. | E2E |
| FR-EXP-02 | Every entry has an organization, title, dates, type, and 1–3 highlights. Evidence links are valid https URLs. | Build, E2E |
| FR-EXP-03 | Entries within each section are sorted by start date, newest first (`present` first). | Unit, E2E |
| FR-EXP-04 | Every `relatedProjects` reference resolves and renders a link. | Build, E2E |
| FR-EXP-05 | The titles, organizations, and dates in the résumé PDF match `/experience`. | Manual (each release and each quarterly review) |

## ABT: About

| ID | Pass when | Verified by |
|---|---|---|
| FR-ABT-01 | The page has a bio, approach, background, interests, and direction sections. | E2E, Manual |
| FR-ABT-02 | The page contains links to `/experience`, the résumé, and `/contact`. | E2E |
| FR-ABT-03 | If a portrait is present, its `alt` is not empty and isn't just a filename. | A11y, Manual |

## RES: Résumé

| ID | Pass when | Verified by |
|---|---|---|
| FR-RES-01 | `/afran-anas-resume.pdf` returns 200 with `Content-Type: application/pdf`. It is linked from the header, footer, `/experience`, and `/contact`. | E2E, Smoke |
| FR-RES-02 | Every résumé link's text includes "PDF" and a size that matches the file within ±10 KB. The size is computed at build time. | E2E |
| FR-RES-03 | The PDF is ≤ 1 MB, has a non-empty document title, and its extracted text is not empty. | Unit (file check), Manual |
| FR-RES-04 | The PDF shows its last-updated month. | Manual |

## CON: Contact

| ID | Pass when | Verified by |
|---|---|---|
| FR-CON-01 | The page has a `mailto:` link, the email shown as plain text, and LinkedIn and GitHub links. | E2E |
| FR-CON-02 | With JavaScript, clicking "Copy email" puts the address on the clipboard and a live region announces "Email address copied". Without JavaScript, the button is absent. | E2E, E2E-noJS |
| FR-CON-03 | Inquiry types, response time, and timezone are present. | E2E, Manual |
| FR-CON-04 | No `<form>` element exists on any route. | E2E |

## 404: Not found and redirects

| ID | Pass when | Verified by |
|---|---|---|
| FR-404-01 | `/no-such-page` returns status 404, with the header, footer, and links to `/`, `/projects`, and `/contact`. It has `noindex` set. | E2E, Smoke |
| FR-404-02 | Every rule in `public/_redirects` returns 301 to an existing route. Every route listed as a redirect source is absent from the build output. | Unit (rules file), Smoke |

## META: Metadata

| ID | Pass when | Verified by |
|---|---|---|
| FR-META-01 | Every route has a unique, non-empty `<title>` in the specified format, and a meta description of 70–160 characters. | E2E (every route) |
| FR-META-02 | Every indexable route has exactly one canonical link pointing to its production URL without a trailing slash. `/projects?area=x` points to `/projects`. | E2E |
| FR-META-03 | `og:title`, `og:description`, `og:image` (an absolute URL, 1200×630), `og:url`, and `twitter:card="summary_large_image"` are present on every route. | E2E |
| FR-META-04 | `sitemap-index.xml` URLs equal the set of indexable routes exactly. `robots.txt` contains a `Sitemap:` line. | Build output check, Smoke |
| FR-META-05 | Preview builds contain `<meta name="robots" content="noindex, nofollow">` on every page and a `robots.txt` that disallows everything. Production builds contain neither. | Unit (env logic), Smoke (preview and production) |
| FR-META-06 | Home and About contain one valid JSON-LD `Person` whose name, jobTitle, and links match `profile.ts`. | E2E |
| FR-META-07 | A case study with `ogImage` uses it, and one without uses the default image. | E2E |

## PRV: Privacy

| ID | Pass when | Verified by |
|---|---|---|
| FR-PRV-01 | `/privacy` renders all the required statements and a last-updated date, has `noindex` set, and is linked from the footer. | E2E, Manual |
| FR-PRV-02 | In a non-production build, a test that records network requests sees zero requests to other origins on any route. In a production build, the only requests to other origins go to Cloudflare Web Analytics hosts. | E2E (non-production), Smoke (production) |
| FR-PRV-03 | After visiting every route and using every control, `document.cookie` is empty and `localStorage`, `sessionStorage`, and IndexedDB are all empty. | E2E |
