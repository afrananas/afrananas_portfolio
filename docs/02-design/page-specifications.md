# Page specifications

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

For each page, this document gives its sections in order, the content and components in each, and its interactions. The behavior rules are in [functional requirements](../01-product/functional-requirements.md). The components are described in [component guidelines](../04-engineering/component-guidelines.md#inventory).

The wireframes show structure and hierarchy only. They are not visual designs. Spacing and type come from the [visual design system](visual-design-system.md).

## Global shell (every page)

| Region | Content | Component | Requirement |
|---|---|---|---|
| Skip link | "Skip to content" | `SkipLink` | FR-GLB-03 |
| Header (sticky) | Name → `/` · nav links · Résumé | `SiteHeader`, `NavMenu`, `ResumeLink` | FR-GLB-01, 02, 04 |
| `main` | Page content, with `id="main"` and `tabindex="-1"` | — | — |
| Footer | Email · GitHub · LinkedIn · Résumé · Source · Privacy · © year and name | `SiteFooter` | FR-GLB-05 |

Every page has exactly one `h1`.

## Home (`/`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Hero | `h1` with the name (display size). The positioning line (mono, muted). A one-sentence summary. The availability statement, which can be hidden. Primary CTA "View projects" and secondary CTA "Contact". | `CallToAction` |
| 2 | Selected work (`#selected-work`) | `h2` "Selected work". The featured `ProjectCard`s in `featuredOrder`. A link "All projects →". | `ProjectCard` |
| 3 | Focus areas | `h2`. The five focus areas, each with one line describing the kind of work, as text only (FR-HOME-04). | — |
| 4 | Approach | `h2`. 2–3 short engineering principles (taken from the Engineering page). Links to `/engineering` and `/about`. | — |
| 5 | Contact band | One line and a "Contact" CTA. | `CallToAction` |

```
Mobile (360)                         Desktop (1280)
┌──────────────────────┐             ┌──────────────────────────────────────────────────┐
│ Afran Anas     [Menu]│             │ Afran Anas   Projects Engineering Experience     │
├──────────────────────┤             │              About Contact          [Résumé PDF] │
│ AFRAN ANAS           │             ├──────────────────────────────────────────────────┤
│ Software Engineer —  │             │                                                  │
│ Backend · AI ·       │             │  AFRAN ANAS                                      │
│ Full-Stack           │             │  Software Engineer — Backend · AI · Full-Stack   │
│ One-sentence summary │             │  One-sentence summary of what I build.           │
│ ...                  │             │  ● Open to backend and applied-AI roles          │
│ [View projects]      │             │  [View projects]  [Contact]                      │
│ [Contact]            │             │                                                  │
├──────────────────────┤ ← fold      │  Selected work                                   │
│ Selected work        │             │  ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│ ┌──────────────────┐ │             │  │ Title      │ │ Title      │ │ Title      │    │
│ │ Title            │ │             │  │ Summary    │ │ Summary    │ │ Summary    │    │
│ │ Summary          │ │             │  │ Role·2025  │ │ Role·2024  │ │ Role·2024  │    │
│ │ Role · 2025      │ │             │  │ CV Backend │ │ GenAI      │ │ Full-stack │    │
│ │ CV · Backend     │ │             │  │ Python …   │ │ …          │ │ …          │    │
│ │ Python PyTorch … │ │             │  └────────────┘ └────────────┘ └────────────┘    │
│ └──────────────────┘ │             │  All projects →                                  │
│ ...                  │             │  Focus areas · Approach · Contact band           │
└──────────────────────┘             └──────────────────────────────────────────────────┘
```

## Projects (`/projects`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Intro | `h1` "Projects". One sentence on how the projects were selected. | — |
| 2 | Filter | A group labelled "Filter by focus area", with "All" and one chip per area. A live region reports "N projects" (FR-PRJ-06). Rendered only when JavaScript runs (FR-PRJ-07). | `ProjectFilter` |
| 3 | List | A grid of `ProjectCard`s, each also showing its context label. | `ProjectCard` |

```
Mobile (360)                         Desktop (1280)
┌──────────────────────┐             ┌──────────────────────────────────────────────────┐
│ Projects             │             │ Projects                                         │
│ Selection note       │             │ Selection note                                   │
│ [All✓][Backend][AI/ML│             │ Filter by focus area:                            │
│ ][Computer vision]…  │ (wraps)     │ [✓ All] [Backend] [AI/ML] [Computer vision] …    │
│ 6 projects           │             │ 6 projects                                       │
│ ┌──────────────────┐ │             │ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│ │ ProjectCard      │ │             │ │ ProjectCard│ │ ProjectCard│ │ ProjectCard│     │
│ └──────────────────┘ │             │ └────────────┘ └────────────┘ └────────────┘     │
│ ┌──────────────────┐ │             │ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│ │ ProjectCard      │ │             │ │ …          │ │ …          │ │ …          │     │
└──────────────────────┘             └──────────────────────────────────────────────────┘
```

**Interaction:** choosing a chip sets `aria-pressed`, hides the cards that don't match with the `hidden` attribute, updates `?area=` with `history.pushState`, and updates the live region. A `popstate` event (Back) restores the filter from the URL. Focus stays on the chip that was chosen.

## Case study (`/projects/[slug]`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Breadcrumb | `Projects / {title}` | `Breadcrumb` |
| 2 | Title | `h1` title. Areas. "Updated {date}". | — |
| 3 | Summary block | A definition list containing Problem, Role, Contribution, Context and team, Timeframe, Stack (mono), Outcome, and Links (repository, demo, paper) or the source note. | `CaseStudySummary` |
| 4 | Cover (optional) | Image with a caption. | `Figure` |
| 5 | Table of contents | Shown if there are ≥ 6 sections (FR-CS-09). It sits inline before the body on mobile and in a sticky side column from 1200 px. | `TableOfContents` |
| 6 | Body | The `h2` sections in FR-CS-03 order. Results render through `ResultList`, which shows the metric, value, baseline, conditions, and evidence link. | `Diagram`, `Figure`, `Callout`, `ResultList` |
| 7 | Contact CTA | A sentence suited to the project and the "Contact" CTA (FR-CS-11). | `CallToAction` |
| 8 | Pager | ← Previous project · All projects · Next project → | `ProjectPager` |

```
Mobile (360)                         Desktop (1280)
┌──────────────────────┐             ┌──────────────────────────────────────────────────┐
│ Projects / Title     │             │ Projects / Title                                 │
│ Title (h1)           │             │ Title (h1)                       ┌─────────────┐ │
│ CV · Backend         │             │ CV · Backend · Updated Oct 2026  │ On this page│ │
│ Updated Oct 2026     │             │ ┌──────────────────────────────┐ │ Problem     │ │
│ ┌──────────────────┐ │             │ │ Problem   …                  │ │ Role…       │ │
│ │ Problem  …       │ │             │ │ Role      Backend lead       │ │ Architecture│ │
│ │ Role     …       │ │             │ │ Team      Team of 3          │ │ …           │ │
│ │ Team     …       │ │             │ │ When      Feb–Aug 2025       │ │ (sticky)    │ │
│ │ Stack    …       │ │             │ │ Stack     Python PyTorch …   │ └─────────────┘ │
│ │ Outcome  …       │ │             │ │ Outcome   …                  │                 │
│ │ Repo ↗ Demo ↗    │ │             │ │ Repo ↗  Demo ↗               │                 │
│ └──────────────────┘ │             │ └──────────────────────────────┘                 │
│ ▸ On this page       │             │ ## Problem                                       │
│ ## Problem           │             │ prose (≤ 68ch) …                                 │
│ prose …              │             │ ## Architecture                                  │
│ ## Architecture      │             │ [ diagram ] Figure 1 — caption                   │
│ [diagram ⇆ scroll]   │             │ ▸ Text description                               │
│ ▸ Text description   │             │ …                                                │
│ …                    │             │ Results: metric · value · vs baseline · evidence↗│
│ [Contact]            │             │ [Contact]                                        │
│ ← Prev  All  Next →  │             │ ← Previous project   All projects   Next →       │
└──────────────────────┘             └──────────────────────────────────────────────────┘
```

## Engineering (`/engineering`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Intro | `h1` "Engineering". What the page contains. | — |
| 2 | Principles | `h2`. 4–7 principles, each a heading and a short paragraph, plus a link to a project where it was applied. | — |
| 3 | Write-ups, diagrams, experiments | `h2` per kind, with only the non-empty kinds shown. Each item: title, date, summary, related projects, and the content inline (a disclosure for long items) or a link. | `EngineeringItem` |

The route is built only if FR-ENG-01 is met.

## Experience (`/experience`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Intro | `h1`. One line, plus "Download résumé (PDF, N KB)". | `ResumeLink` |
| 2–5 | Experience · Education · Research and publications · Open source | An `h2` per non-empty section. Entries are newest first. | `ExperienceEntry` |

`ExperienceEntry`: title and organization (`h3`), a dates and type line (mono, muted), 1–3 highlights, evidence links, and links to related case studies.

## About (`/about`)

The sections are: `h1` "About", short bio, how I work, background, interests, what's next, and links (Experience, Résumé, Contact). There's an optional portrait floated at desktop widths and stacked on mobile. The prose comes from `src/content/pages/about.mdx`.

## Contact (`/contact`)

| # | Section | Content | Components |
|---|---|---|---|
| 1 | Intro | `h1` "Contact". Welcome inquiry types. Response time. Timezone. | — |
| 2 | Methods | Email as a `mailto:` link and visible text, plus `CopyEmailButton`. LinkedIn. GitHub. | `ContactMethods`, `CopyEmailButton` |
| 3 | Résumé | `ResumeLink` | `ResumeLink` |

There is no form (FR-CON-04).

## Privacy (`/privacy`)

`h1`, then plain-language statements covering every item in FR-PRV-01, then "Last updated". The prose comes from `src/content/pages/privacy.mdx`. It has `noindex` set.

## Not found (404)

`h1` "Page not found". One sentence. Links to Home, Projects, and Contact (FR-404-01). It has `noindex` set and makes no automatic redirect.
