# Routing and page model

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

The product-level route list is in [sitemap and navigation](../01-product/sitemap-and-navigation.md). This document covers how those routes are implemented and served.

## URL policy

- **No trailing slashes.** The canonical form is `/about`. The root is `/`.
- Astro configuration: `trailingSlash: 'never'` and `build.format: 'file'`. Astro recommends this pairing so the development server and the build behave the same way. Each route is emitted as `<route>.html`.
- The host serves `about.html` at `/about` and redirects `/about/` and `/about.html` to `/about`. This uses Cloudflare's asset HTML handling: the default `auto-trailing-slash` behavior with file-format output. The behavior is **verified by the walking skeleton** and asserted by smoke tests. If the host behaves differently, adjust `html_handling` in `wrangler.jsonc` rather than the URL policy.
- The canonical host is the **apex domain**. `www` redirects to the apex with a 301, using a Cloudflare redirect rule ([runbook](../06-operations/deployment-runbook.md#domain-and-https)).

## Route table

| URL | Source file | Data | Output file | Status | Indexed |
|---|---|---|---|---|---|
| `/` | `src/pages/index.astro` | profile, featured projects, principles excerpt | `index.html` | 200 | Yes |
| `/about` | `src/pages/about.astro` | `pages/about.mdx`, profile | `about.html` | 200 | Yes |
| `/projects` | `src/pages/projects/index.astro` | published projects | `projects.html` | 200 | Yes |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | one project, its neighbors, related engineering items | `projects/<slug>.html` | 200 | Yes |
| `/engineering` | `src/pages/engineering.astro` | `pages/engineering-principles.mdx`, engineering items | `engineering.html` (only if FR-ENG-01 is met) | 200 | Yes |
| `/experience` | `src/pages/experience.astro` | experience entries | `experience.html` | 200 | Yes |
| `/contact` | `src/pages/contact.astro` | `pages/contact.mdx`, profile | `contact.html` | 200 | Yes |
| `/privacy` | `src/pages/privacy.astro` | `pages/privacy.mdx` | `privacy.html` | 200 | No (`noindex`) |
| any unknown path | `src/pages/404.astro` | — | `404.html` | **404** | No (`noindex`) |
| `/robots.txt` | `src/pages/robots.txt.ts` (endpoint) | `SITE_ENV` | `robots.txt` | 200 | — |
| `/sitemap-index.xml`, `/sitemap-0.xml` | `@astrojs/sitemap` | indexable routes | generated | 200 | — |
| `/afran-anas-resume.pdf` | `public/afran-anas-resume.pdf` | — | copied | 200 | Yes |

The sitemap integration outputs `sitemap-index.xml`, which points to `sitemap-0.xml`. `robots.txt` points to the index (FR-META-04).

### Dynamic project routes

```ts
// src/pages/projects/[slug].astro (shape, not final code)
export async function getStaticPaths() {
  const projects = await getPublishedProjects(); // src/lib/projects.ts — drafts excluded in production
  return projects.map((project) => ({ params: { slug: project.data.slug }, props: { project } }));
}
```

- Only slugs returned here exist. Every other `/projects/*` path falls through to the 404 page (FR-CS-01).
- Neighbors for the pager come from the same sorted list that `/projects` uses (`src/lib/projects.ts`, FR-CS-10).

## 404 handling

- `wrangler.jsonc` → `assets.not_found_handling: "404-page"`. The host serves the nearest `404.html` with status **404** (FR-404-01).
- The 404 page is fully static and has `<meta name="robots" content="noindex">`. It never redirects.

## Redirects

- File: `public/_redirects`, which is copied to `dist/`. Each line has the form `<from> <to> 301`.
- **Renaming a project slug** (FR-404-02) needs three changes in the same pull request:
  1. Rename the folder and the `slug`.
  2. Add `/projects/<old> /projects/<new> 301` to `_redirects`.
  3. Add a ledger note to the [maintenance log](../06-operations/maintenance.md#log).
- A unit test parses `_redirects` and checks the format, that every source is unique, that every target is an existing route, and that no source collides with a live route.
- Host-level redirects (`www` to apex, HTTP to HTTPS) live in Cloudflare zone settings, not in `_redirects`. They are documented in the runbook.

## Environment-specific behavior

| Behavior | `development` | `preview` | `production` |
|---|---|---|---|
| Drafts rendered (with a "Draft" banner) | Yes | Yes | **No** |
| `<meta name="robots" content="noindex, nofollow">` on every page | Yes | Yes | Only `/privacy` and 404 |
| `robots.txt` | `Disallow: /` | `Disallow: /` | `Allow: /` plus `Sitemap:` |
| Analytics beacon | No | No | Yes |

`SITE_ENV` is read once, in `src/lib/env.ts`, which exports typed flags such as `isProduction` and `showDrafts`. Nothing else reads the environment ([environment configuration](../06-operations/environment-configuration.md)).

## Non-canonical hosts

Preview URLs (`*.workers.dev`) serve preview builds, so they are `noindex`. If the production `workers.dev` URL stays enabled, it serves the production build, and its canonical tags point to the apex domain. The walking skeleton checks whether the production `workers.dev` route can be turned off while preview URLs keep working. If it can, it is turned off.
