# Functional requirements

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Conventions

- **IDs** use the form `FR-<AREA>-<NN>`. An ID is never reused or renumbered. A removed requirement is struck through, not deleted.
- **Priority:**
  - **Must:** blocks launch.
  - **Should:** planned for launch. If cut, it moves to the backlog and the cut is recorded here.
  - **Could:** after launch.
- Each requirement is written so that it can be tested. Pass/fail conditions and the verification method for each one are in [acceptance criteria](acceptance-criteria.md).
- Quality attributes (performance, accessibility, security, privacy, compatibility) are in [non-functional requirements](non-functional-requirements.md).
- The user problem behind each requirement group is in [product requirements](product-requirements.md).

## GLB: Global layout and navigation

- **FR-GLB-01** (Must): Every page shows the shared header described in [sitemap and navigation](sitemap-and-navigation.md#global-navigation): the owner's name linking to `/`, the primary links in the order Projects, Engineering, Experience, About, Contact, and a Résumé link.
- **FR-GLB-02** (Must): The nav link for the current section is exposed to assistive technology with `aria-current` and is visually distinct by more than color alone. On `/projects/[slug]`, the current section is Projects.
- **FR-GLB-03** (Must): The first focusable element on every page is a "Skip to content" link that moves focus to the main content.
- **FR-GLB-04** (Must): Below the navigation breakpoint, the primary links collapse into a menu button that:
  - has an accessible name,
  - exposes its open or closed state,
  - closes on Escape and returns focus to the button,
  - closes after a link is followed.
- **FR-GLB-05** (Must): Every page shows the footer: email, GitHub, LinkedIn, résumé, the source repository, and a link to `/privacy`.
- **FR-GLB-06** (Must): With JavaScript disabled, all pages, content, and links can still be reached. Interactive enhancements such as filtering, the menu toggle, and copy-to-clipboard fall back to a usable form that isn't interactive. No control is shown that does nothing.
- **FR-GLB-07** (Must): Links open in the same tab. External links are marked as external both visually and in text available to assistive technology.
- **FR-GLB-08** (Must): When the user's system requests reduced motion (`prefers-reduced-motion: reduce`), all non-essential animation and transitions are turned off.

## HOME: Home (`/`)

- **FR-HOME-01** (Must): The owner's name, the positioning line ("Software Engineer — Backend · AI · Full-Stack"), and a one-sentence summary are visible without scrolling at 360×640 and 1280×800 viewports.
- **FR-HOME-02** (Must): The primary call to action leads to the projects. A secondary call to action leads to `/contact`.
- **FR-HOME-03** (Must): A "Selected work" section shows the projects marked as featured, in the order the owner sets. Each project card shows:
  - title,
  - a one-line summary,
  - Afran's role,
  - focus areas,
  - up to 5 key technologies,
  - a link to the case study.
- **FR-HOME-04** (Must): Focus areas are shown as text. There are no skill bars, percentages, or ratings anywhere on the site.
- **FR-HOME-05** (Should): A short section on engineering approach links to `/engineering` and `/about`.
- **FR-HOME-06** (Should): An availability statement (for example, "Open to backend and applied-AI roles") is shown. Its text comes from one owner-controlled value, and the owner can hide it.

## PRJ: Projects (`/projects`)

- **FR-PRJ-01** (Must): The page lists every published project. Draft projects never appear in production output: not on pages, not in the sitemap, and not in metadata.
- **FR-PRJ-02** (Must): Featured projects come first, in the owner's order. The remaining projects follow, newest end date first.
- **FR-PRJ-03** (Must): Each entry shows:
  - title,
  - summary,
  - Afran's role,
  - context (solo, team, academic, professional, or open source),
  - the year or years worked on,
  - focus areas,
  - key technologies.
  Every listed project links to its case study. A project that doesn't justify a case study is not listed.
- **FR-PRJ-04** (Must): Visitors can filter by one focus area at a time, with "All" as the default.
  - The selected filter is reflected in the URL as `?area=<value>`.
  - Loading a URL that contains `?area=` applies that filter.
  - An unknown value shows all projects without an error.
  - The browser's back button restores the previous filter.
- **FR-PRJ-05** (Must): The filter options are generated from the published content, so only focus areas with at least one project appear.
- **FR-PRJ-06** (Must): When the filter changes, the number of matching projects is announced to screen readers.
- **FR-PRJ-07** (Must): Without JavaScript, all projects are shown and the filter controls are not rendered.

## CS: Case study (`/projects/[slug]`)

- **FR-CS-01** (Must): Each published project has a page at `/projects/[slug]`. An unknown slug returns the Not-found page with HTTP status 404.
- **FR-CS-02** (Must): The page starts with a summary block containing:
  - the problem, in 1–2 sentences,
  - Afran's role and the scope of the contribution,
  - context and team size,
  - timeframe,
  - key technologies,
  - outcome,
  - links to the repository, demo, or paper.

  Missing links are left out, never shown broken. If the source is private, the page says so and gives the reason.
- **FR-CS-03** (Must): The body uses these sections in this order:
  1. Problem
  2. Role and scope
  3. Requirements and constraints
  4. Architecture
  5. Key decisions and trade-offs
  6. Implementation challenges
  7. Testing and validation
  8. Results and evidence
  9. Security and limitations
  10. Future improvements

  An optional section with no content is left out. *Role and scope*, *Results and evidence*, and *Security and limitations* are always required.
- **FR-CS-04** (Must): AI/ML projects also cover dataset provenance and license, how train, validation, and test data were kept separate, evaluation metrics, baselines, how to reproduce the results, and known failure modes.
- **FR-CS-05** (Must): Backend projects also cover API design, data integrity, error handling, observability, and security.
- **FR-CS-06** (Must): Every quantitative result is shown with its baseline and conditions and links to its methodology and evidence. A result with no evidence is not published. Qualitative results are labeled as qualitative.
- **FR-CS-07** (Must): Every architecture diagram has a text description of its components and data flow. At 360 px width the diagram can be read without the whole page scrolling sideways.
- **FR-CS-08** (Must): Code blocks are syntax-highlighted and scroll sideways inside the block, not the page. Keyboard users can scroll them, and each scrollable block has an accessible name.
- **FR-CS-09** (Should): A case study with 6 or more sections gets a table of contents linking to each section.
- **FR-CS-10** (Must): Previous and next project links follow the order from FR-PRJ-02. A link back to `/projects` is always present.
- **FR-CS-11** (Must): The page ends with a contact call to action.
- **FR-CS-12** (Should): The page shows the date the case study was last updated.

## ENG: Engineering (`/engineering`)

- **FR-ENG-01** (Must): The page contains an engineering principles section and at least 2 substantive items, each a technical write-up, an architecture diagram with explanation, or an experiment. Each item has a title, a date, a summary, and either its full content inline or a link to it. If this standard can't be met at launch, the page and its nav link launch later. A thin version is not published.
- **FR-ENG-02** (Must): Any item that refers to a project links to that project's case study.
- **FR-ENG-03** (Could): Individual article pages at `/engineering/[slug]`. This is deferred in [scope](../00-foundation/scope-and-boundaries.md#deferred).

## EXP: Experience (`/experience`)

- **FR-EXP-01** (Must): The page has sections for Experience, Education, Research and publications, and Open source. A section with no entries is left out.
- **FR-EXP-02** (Must): Each entry shows:
  - organization,
  - title,
  - start and end month and year,
  - type (full-time, internship, academic, research, volunteer, or contract),
  - 1–3 bullet points describing outcomes,
  - an evidence link where one exists, such as a DOI, pull request, or certificate.
- **FR-EXP-03** (Must): Entries in each section are listed newest first.
- **FR-EXP-04** (Must): An entry that relates to a case study links to it.
- **FR-EXP-05** (Must): The titles, organizations, and dates on this page match the résumé exactly. Both are checked against each other at every content review.

## ABT: About (`/about`)

- **FR-ABT-01** (Must): The page covers a short bio, engineering approach, background, interests, and current professional direction.
- **FR-ABT-02** (Must): The page links to `/experience`, the résumé, and `/contact`.
- **FR-ABT-03** (Could): A portrait photo, if the owner chooses to include one. It must have meaningful alt text.

## RES: Résumé

- **FR-RES-01** (Must): The résumé is served at `/afran-anas-resume.pdf` and linked from the header, the footer, `/experience`, and `/contact`.
- **FR-RES-02** (Must): Each link to the résumé states the format and file size, for example "Résumé (PDF, 120 KB)".
- **FR-RES-03** (Must): The PDF is text-based, so its text can be selected and parsed by applicant tracking systems. It has its document title set, is 1 MB or smaller, and contains no personal data the owner hasn't chosen to publish, such as a home address.
- **FR-RES-04** (Should): The PDF shows the month it was last updated.

## CON: Contact (`/contact`)

- **FR-CON-01** (Must): The page shows the email address both as a `mailto:` link and as visible text that can be copied. It also links to LinkedIn and GitHub.
- **FR-CON-02** (Should): A "Copy email" button copies the address and confirms the copy in a way screen readers announce. Without JavaScript the button is not rendered, and the visible address remains (FR-GLB-06).
- **FR-CON-03** (Must): The page states which inquiries are welcome, the expected response time, and the owner's timezone. TODO(owner): supply all three (Q2, Q5).
- **FR-CON-04** (Must): There is no contact form at launch. A form may be added only through an accepted ADR, which must also define input validation, abuse prevention, and delivery monitoring. See [scope](../00-foundation/scope-and-boundaries.md#deferred).

## 404: Not found and redirects

- **FR-404-01** (Must): Unknown routes return HTTP status 404, with a page that has the standard header and footer, a short message, and links to `/`, `/projects`, and `/contact`.
- **FR-404-02** (Must): A project slug that has been renamed permanently redirects to its new slug.

## META: Metadata and sharing

- **FR-META-01** (Must): Every page has its own `<title>` and meta description.
  - Home: `Afran Anas — Software Engineer (Backend · AI · Full-Stack)`.
  - Other pages: `{Page or project title} — Afran Anas`.
- **FR-META-02** (Must): Every indexable page has a canonical URL. Filtered views of `/projects` use `/projects` as their canonical URL.
- **FR-META-03** (Must): Every page has Open Graph and Twitter card metadata with a 1200×630 preview image. Case studies use the project's own title and summary.
- **FR-META-04** (Must): `sitemap-index.xml` lists every indexable route and nothing else. It excludes drafts, `/privacy`, and the 404 page. `robots.txt` points to the sitemap.
- **FR-META-05** (Must): Preview and non-production deployments are excluded from search indexing.
- **FR-META-06** (Should): The home and about pages include `Person` structured data (schema.org) whose values match the visible content.
- **FR-META-07** (Should): Case studies have their own preview image.

## PRV: Privacy

- **FR-PRV-01** (Must): `/privacy` states, in plain language:
  - what the analytics collect (aggregate page views, referrers, country, device type, and performance metrics),
  - that no cookies or device storage are used,
  - what the hosting provider logs,
  - how contact emails are handled,
  - how to ask questions about privacy.

  The page shows its last-updated date. It is linked from the footer and has `noindex` set.
- **FR-PRV-02** (Must): The analytics beacon is included only in production builds. Preview and local builds make no third-party requests.
- **FR-PRV-03** (Must): The site sets no cookies and writes nothing to `localStorage`, `sessionStorage`, or IndexedDB.
