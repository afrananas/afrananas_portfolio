# Component guidelines

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Inventory

This is the complete set of components the [page specifications](../02-design/page-specifications.md) need. Adding a component that isn't listed requires adding it here.

| Component | Purpose | Script | Used on |
|---|---|---|---|
| `BaseLayout` (layout) | Document shell, `<head>` from `PageMeta`, header, footer, `main`, analytics | — | All pages |
| `CaseStudyLayout` (layout) | Breadcrumb, title, summary, table of contents, body, CTA, pager | — | `/projects/[slug]` |
| `SkipLink` | "Skip to content" | — | BaseLayout |
| `SiteHeader` | Name, `NavMenu`, `ResumeLink` | — | BaseLayout |
| `NavMenu` | Primary nav, current-section marker, mobile menu | ✅ | SiteHeader |
| `SiteFooter` | Contact links, source, privacy, © | — | BaseLayout |
| `ResumeLink` | Résumé link with its size label (FR-RES-02) | — | Header, footer, experience, contact, about |
| `ExternalLink` | Link with an external indicator and hidden text (FR-GLB-07) | — | Everywhere |
| `CallToAction` | Primary or secondary button-styled link | — | Home, case study, about |
| `ProjectCard` | The card fields from FR-HOME-03 and FR-PRJ-03 | — | Home, `/projects` |
| `ProjectFilter` | Area chips, URL sync, live count | ✅ | `/projects` |
| `CaseStudySummary` | The summary `dl` (FR-CS-02) | — | CaseStudyLayout |
| `ResultList` | Results with baseline, conditions, and evidence (FR-CS-06) | — | Case-study MDX |
| `TableOfContents` | "On this page" nav (FR-CS-09) | — | CaseStudyLayout |
| `Breadcrumb` | `Projects / {title}` | — | CaseStudyLayout |
| `ProjectPager` | Previous, all, next (FR-CS-10) | — | CaseStudyLayout |
| `Figure` | Image with caption | — | MDX |
| `Diagram` | SVG with alt, caption, and a required text description (FR-CS-07) | — | MDX |
| `Callout` | A note or limitation aside (`note` \| `limitation`) | — | MDX |
| `ScrollRegion` | Focusable, labelled overflow wrapper | — | Code, diagrams, tables |
| `EngineeringItem` | An item on the engineering page | — | `/engineering` |
| `ExperienceEntry` | An experience entry | — | `/experience` |
| `ContactMethods` | Email (link and text), profiles | — | `/contact` |
| `CopyEmailButton` | Copies the email, announces success (FR-CON-02) | ✅ | ContactMethods |
| `Icon` | Inline SVG by name | — | Everywhere |

Code blocks are not a component. Shiki renders them at build time. Astro's Shiki output already makes `<pre>` focusable with `tabindex="0"`. A Shiki transformer, configured in `astro.config`, adds `role="region"` and an `aria-label` taken from the code fence's language or title (FR-CS-08). The walking skeleton confirms that transformers work with the configured Markdown processor.

## Props

- Every component declares `interface Props` in its frontmatter. Required props have no `?`.
- Pass **data, not presentation decisions**: `<ProjectCard project={entry} />`, not twelve separate string props.
- Use **slots** for content: `<CallToAction href="/contact">Email me</CallToAction>`.
- Avoid boolean-prop explosions. Use one `variant: 'primary' | 'secondary'` rather than `primary`, `outlined`, `large`, and so on.
- Accessibility-critical props are required and typed, so they can't be forgotten: `Diagram.description: string`, `Figure.alt: string`, `ScrollRegion.label: string`.
- Don't spread unknown attributes (`{...rest}`) except on `ExternalLink` and `CallToAction`, which forward `class` and `aria-*`.

## Composition

- Pages compose layouts, layouts compose components, and components compose smaller components. Data flows down through props only.
- Components don't fetch data or read the environment ([repository structure](repository-structure.md#responsibilities-and-rules)).
- A component that needs derived data receives the result. For example, `ProjectPager` receives `{ prev, next }` instead of computing neighbors itself.

## Styling

- Each component has a scoped `<style>` that uses tokens only ([coding standards](coding-standards.md#css)).
- A component sets its own internal layout. Its outer spacing is the parent's job, so components don't set their own outer margins.
- States follow the [component states table](../02-design/visual-design-system.md#component-states).

## Accessibility per component

| Component | Must |
|---|---|
| `NavMenu` | The button has `aria-controls`, `aria-expanded`, and an accessible name. Escape closes the menu and returns focus. Links are visible without JavaScript. `aria-current` is set on the current section. |
| `ProjectFilter` | A `role="group"` with a label. `<button aria-pressed>` chips. The live region exists from the first render. The filter is `hidden` until its script runs. |
| `CopyEmailButton` | A real `<button>`, `hidden` until its script runs, with a live-region confirmation. Focus is not moved. |
| `ProjectCard` | An `article` with a title link. A stretched-link pattern makes the whole card clickable while the link's name stays the title. |
| `Diagram` | `alt` and a `<details>` text description. Wrapped in `ScrollRegion` when it's too wide. |
| `ScrollRegion` | `tabindex="0"`, `role="region"`, `aria-label`, and a visible focus ring |
| `ExternalLink` | An icon with `aria-hidden` and a visually hidden " (external)" |
| `TableOfContents` | `nav aria-label="On this page"` |

## Client script pattern

```astro
<div data-filter hidden>…server-rendered chips…</div>
<script>
  import { parseAreaParam } from '../lib/areas';
  // FR-PRJ-07: the filter UI is hidden in HTML and only revealed when this runs.
  try {
    const root = document.querySelector<HTMLElement>('[data-filter]');
    if (root) { /* wire up chips, apply parseAreaParam(location.search), listen to popstate */ root.hidden = false; }
  } catch (error) {
    console.error('ProjectFilter enhancement failed', error); // the page stays in its no-JS state
  }
</script>
```

## When not to abstract

- Wait until something is used three times. Two similar blocks of markup are fine.
- Don't build a generic `Card`, `Stack`, or `Grid` component. CSS does that job.
- Don't make a component for markup that appears once, such as the home hero, which belongs in the page.
- Don't add props "for later". Add them when a second caller needs them.
