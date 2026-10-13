# Sitemap and navigation

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Routes

| Route | Page | Purpose | Primary audience | Indexed |
|---|---|---|---|---|
| `/` | Home | States the professional identity, shows selected work, and directs visitors to case studies and contact. | Recruiters | Yes |
| `/about` | About | Engineering approach, background, interests, and current direction. | All | Yes |
| `/projects` | Projects | A curated collection of projects backed by evidence, filterable by focus area. | Recruiters, hiring managers | Yes |
| `/projects/[slug]` | Case study | Problem, role, architecture, decisions, testing, results, and limitations for one project. | Hiring managers | Yes |
| `/engineering` | Engineering | Technical writing, architecture diagrams, engineering principles, and experiments. | Hiring managers, peers | Yes |
| `/experience` | Experience | Education, work experience, research, and open source, each verifiable. | Recruiters | Yes |
| `/contact` | Contact | Contact methods, the kinds of inquiries welcome, and expected response time. | All | Yes |
| `/privacy` | Privacy | What data is collected and why. Linked from the footer only. | All | No |
| any unknown path | Not found | Returns HTTP 404 and links back to the main pages. | All | No |

### Non-page resources

| Path | Purpose |
|---|---|
| `/afran-anas-resume.pdf` | The résumé. The URL never changes. The filename includes the owner's name so the file is easy to identify after a recruiter downloads it. |
| `/sitemap-index.xml` | Lists every indexable route. Excludes drafts, filtered views, `/privacy`, and the 404 page. |
| `/robots.txt` | Allows crawling in production and points to the sitemap. Preview deployments are not indexed. |

## Hierarchy

```
/                       Home
├── /projects           Projects
│   └── /projects/[slug]    Case study (one per published project)
├── /engineering        Engineering
├── /experience         Experience
├── /about              About
├── /contact            Contact
└── /privacy            Privacy (footer link only)
```

Navigation is at most two levels deep. Every page is reachable within two clicks from the homepage.

## Global navigation

**Header (on every page)**
- The owner's name, linking to `/`.
- Primary links, in this order: **Projects · Engineering · Experience · About · Contact**. The order matches the recruiter's priorities: work first, then depth, then background.
- **Résumé**, styled as a secondary action rather than a plain nav link.
- The link for the current section is marked as current for assistive technology and is visually distinct by more than color alone. On a case-study page, **Projects** is the current section.
- On narrow screens the links collapse into a menu button. The breakpoint is defined in [responsive design](../02-design/responsive-design.md#breakpoints).

**Footer (on every page)**
- Email, GitHub, LinkedIn, and the résumé.
- The source repository ([public](https://github.com/afrananas/afrananas_portfolio)).
- Privacy (`/privacy`).

**Skip link:** the first focusable element on every page jumps to the main content.

## In-page navigation

- **Case study:** a breadcrumb (`Projects / {Project title}`), previous and next project links that follow the order of the projects list, and a contact call to action at the end. Long case studies get a table of contents (FR-CS-09).
- **Projects:** focus-area filter controls. The filter state is kept in the URL (`/projects?area=computer-vision`) so a filtered view can be shared and works with the browser's back button. Filtered views use `/projects` as their canonical URL.
- **Breadcrumbs** appear only on case studies. Every other page is one level below Home, so a breadcrumb there would add nothing.

## Cross-links

| From | Links to | Why |
|---|---|---|
| Home | Featured case studies, `/projects`, `/contact`, résumé | Move recruiters to evidence and to contact |
| Projects | Every case study | Primary route to depth |
| Case study | Previous/next case study, `/projects`, related Engineering items, `/contact` | Keep engaged readers moving and give them a next step |
| Engineering | The case studies each item refers to | Connect principles to the work that applied them |
| Experience | Case studies related to each role, résumé | Connect each role to its evidence |
| About | `/experience`, `/engineering`, `/contact` | Background leads to evidence and to contact |
| Contact | Résumé, profiles | Give visitors a full picture before they get in touch |
| Not found | `/`, `/projects`, `/contact` | Help visitors who followed a broken link |

## URL conventions

- Lowercase, with words separated by hyphens. No file extensions on page routes.
- Project slugs come from the project name (for example `video-analytics-pipeline`) and contain no dates.
- **Slugs never change after publication.** If a project must be renamed, the old slug permanently redirects to the new one (FR-404-02).
- Focus-area filter values use the same convention (`backend`, `ai-ml`, `computer-vision`, `genai-rag`, `full-stack`). The list is fixed in [project content schema](project-content-schema.md#focus-areas).
- No trailing slashes: `/about`, not `/about/`. A request with a trailing slash redirects to the version without one. The mechanics are in [routing and page model](../03-architecture/routing-and-page-model.md).
