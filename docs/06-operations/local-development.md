# Local development

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

> The scaffold is created in the Phase 3 walking skeleton ([M3](../05-delivery/milestone-plan.md#m3-walking-skeleton)). The commands below are the **contract** that the scaffold must implement. Once it exists, check them and remove this note.

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 24 LTS, the version in `.nvmrc` | `nvm install` / `fnm use`, or Volta |
| npm | 11.x (ships with Node 24) | — |
| Git | Any recent version | — |
| Playwright browsers | Match the lockfile | `npx playwright install chromium webkit` |
| (optional) lychee | Latest | `brew install lychee`, for running the link check locally |

Recommended editor extensions (VS Code): Astro (`astro-build.astro-vscode`), ESLint, and Prettier, with format-on-save turned on.

## First-time setup

```sh
git clone https://github.com/afrananas/afrananas_portfolio.git
cd afrananas_portfolio
nvm use                       # reads .nvmrc
npm ci                        # exact versions from the lockfile; never `npm install` in CI
npx playwright install chromium webkit
cp .env.example .env          # optional: all values have safe defaults for development
npm run dev                   # http://localhost:4321
```

No secrets or accounts are needed to develop, build, or test. Only deployment needs Cloudflare credentials ([environment configuration](environment-configuration.md)).

## Scripts

| Script | Runs | Use |
|---|---|---|
| `dev` | `astro dev` | Development server with hot reload. Drafts are shown. |
| `build` | `astro build` | Optimized build into `dist/`. `SITE_ENV` defaults to `development` (drafts shown, `noindex`) unless set. CI sets `production`. |
| `serve` | `wrangler dev` on `dist/` (port 8788) | Serves the build with real `_headers`, `_redirects`, and 404 handling |
| `check` | `astro check` | Type check |
| `lint` | `eslint .` | Lint |
| `format` / `format:check` | `prettier --write .` / `--check .` | Format |
| `check:css` | `node scripts/check-css-tokens.mjs` | Token discipline (ADR-004) |
| `test` | `vitest run` | Unit and content tests |
| `test:build` | `vitest run tests/build` | Build-output tests. Needs `dist/`. |
| `test:e2e` | `playwright test` | E2E and axe. Playwright's `webServer` builds and serves. |
| `lhci` | `lhci autorun` | Lighthouse budgets against `serve` |
| `smoke` | `node scripts/smoke.mjs <url>` | Post-deploy checks against any URL |
| `verify` | format:check → lint → check → check:css → test → build → test:build → test:e2e | **Run before every push.** Mirrors CI ([quality gates](../04-engineering/quality-gates.md#gate-1-local-before-pushing)). |

To check the production configuration locally:

```sh
SITE_ENV=production npm run build && npm run serve
```

The analytics beacon is left out unless `CF_WEB_ANALYTICS_TOKEN` is also set.

## Typical workflows

- **Feature:** branch, then `npm run dev`, write the test with the requirement ID, implement, `npm run verify`, push, open a pull request, check the preview. See [git workflow](../04-engineering/git-workflow.md).
- **Content:** follow [flow F5](../02-design/user-flows.md#f5-owner-publishes-a-project). Start from the [case-study template](../07-project-case-studies/case-study-template.md). Schema errors show in the `npm run dev` terminal and in the browser overlay.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `astro build` fails with "… does not match schema" | Invalid frontmatter | The message names the file and field. Check it against the [project content schema](../01-product/project-content-schema.md). |
| Content changes don't show in `dev` | Stale content cache | Stop the server, delete `.astro/`, and restart |
| `npm ci` fails with `EBADENGINE` | Wrong Node version | `nvm use` |
| Playwright says "Executable doesn't exist" | Browsers not installed, or the version changed | `npx playwright install chromium webkit` |
| E2E fails with a CSP violation | An inline script or a new third-party origin | Move the script into a component `<script>` module, or justify the origin in the [security model](../03-architecture/security-model.md#content-security-policy) |
| `check:css` fails | A raw color or size in a component | Use a token, or add the token to `tokens.css` and document it in the [visual design system](../02-design/visual-design-system.md) |
| `serve` exits immediately | No `dist/` | `npm run build` first |
| Lighthouse score varies between runs | Load on the machine | Compare medians of 3 runs. Close other applications. CI is what counts. |
