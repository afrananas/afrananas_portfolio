# Environment configuration

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

The site is static, so every variable is read **at build time**. Nothing is read at runtime. Variables are declared and validated in Astro's `env.schema` in `astro.config.mjs`, so a typo or a missing required value fails the build. They are read in exactly one module, `src/lib/env.ts` ([routing](../03-architecture/routing-and-page-model.md#environment-specific-behavior)).

## Build variables

| Variable | Values | Default | Public or secret | Purpose |
|---|---|---|---|---|
| `SITE_ENV` | `development` \| `preview` \| `production` | `development` | Public | Controls drafts, `noindex`, `robots.txt`, and analytics inclusion |
| `CF_WEB_ANALYTICS_TOKEN` | string | empty | **Public**, because it appears in page HTML | Cloudflare Web Analytics site token. Used only when `SITE_ENV=production` ([ADR-007](../03-architecture/adr/ADR-007-analytics.md)). |

The production origin (`site`) is a constant in `astro.config.mjs`, not a variable. It never varies by environment, because preview builds also canonicalize to production ([SEO architecture](../03-architecture/seo-and-metadata-architecture.md#head-composition)).

## Deployment credentials (CI only)

| Name | Kind | Where | Used by |
|---|---|---|---|
| `CLOUDFLARE_API_TOKEN` | **Secret** | GitHub → Settings → Secrets → Actions (repository secret). Production deploys use the `production` environment. | `wrangler` in the `preview` and `deploy` jobs |
| `CLOUDFLARE_ACCOUNT_ID` | Identifier | GitHub → Actions **variables** | Same |
| `CF_WEB_ANALYTICS_TOKEN` | Public value | GitHub → Actions **variables** | The `build` job |

The token is created with Cloudflare's "Edit Cloudflare Workers" template, restricted to this account. The steps are in the [runbook](deployment-runbook.md#one-time-setup). It is rotated every year ([maintenance](maintenance.md)).

## Where each environment gets its values

| Environment | `SITE_ENV` | Analytics token | Source |
|---|---|---|---|
| Local development | `development` (default) | Unset | `.env` (optional, git-ignored) |
| Local production check | `production` | Unset, so no beacon | Shell: `SITE_ENV=production npm run build` |
| CI `build` (both pull requests and `main`) | `production` | Repository variable | Workflow `env:` |
| Pull request preview build | `preview` | Not passed | Workflow `env:` |

## Rules

1. **Nothing secret is ever needed to build.** If a feature needs a build-time secret, it needs an ADR first.
2. A `PUBLIC_` prefix would expose a value to client scripts. No variable currently needs that. Client scripts get what they need from server-rendered `data-*` attributes.
3. `.env*` files are git-ignored except `.env.example`, which lists every variable with an empty or default value and a comment.
4. When adding a variable, update `env.schema`, `.env.example`, this table, and the CI workflow in the same pull request ([definition of done](../05-delivery/definition-of-done.md#infrastructure-and-ci-changes)).
