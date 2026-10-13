# Git workflow

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Model

**Trunk-based development with short-lived branches and pull requests**, even though there is only one contributor. Pull requests are what trigger the gates and preview deployments ([CI/CD](ci-cd.md)), and the history doubles as evidence of how the work was done.

- `main` is always deployable. Every commit on `main` is in production, or about to be.
- Direct pushes to `main` are blocked by a branch ruleset ([security model](../03-architecture/security-model.md#repository-settings-public-repository)). The single exception is the initial commit, which already exists.
- Branches live for hours or a few days. If a branch would live longer, split the work.

## Branch names

`<type>/<short-kebab-description>`

| Type | Use |
|---|---|
| `feat/` | New user-visible behavior: `feat/project-filter` |
| `fix/` | Bug fix: `fix/menu-escape-focus` |
| `content/` | Content-only change: `content/video-analytics-case-study` |
| `docs/` | Documentation only |
| `chore/` | Tooling, dependencies, configuration |
| `refactor/` | No behavior change |
| `test/` | Tests only |

## Commits

The format is [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <imperative summary, ≤ 72 chars>

<optional body: why, not what>

Refs: FR-PRJ-04, ADR-004
```

- Types are the same as the branch types, plus `perf` and `ci`.
- Each commit is a single, coherent change that builds and passes tests on its own. That makes `git revert` safe.
- Reference requirement IDs and ADRs in the footer when they apply.
- Never commit generated output (`dist/`, `.astro/`), secrets, or `.env` files.

## Pull requests

- One concern per pull request. The target size is under about 400 changed lines, not counting content and lockfiles.
- The [template](../../.github/pull_request_template.md) is required. It covers the summary, linked requirements, how it was verified, the preview URL, the DoD checklist, and documentation updates.
- **Merge method: squash.** The pull request title becomes the commit message, so it must follow the commit format above.
- Delete the branch after merging.
- Draft pull requests are fine for early preview deployments.

## Releases and tags

- Every merge to `main` deploys. There are no release branches.
- **v1.0.0** is tagged at launch. After that, tag a minor version for each user-visible feature batch and a patch for fixes, using `git tag -a vX.Y.Z -m "…"`. GitHub release notes are generated from pull request titles.
- Content-only updates don't need tags.

## Rollback-friendly changes

- Prefer additive changes. A renamed slug keeps a redirect (FR-404-02).
- To roll back production, first use the host rollback (fast), then `git revert` the bad merge on `main` (permanent). Never rewrite `main`'s history ([runbook](../06-operations/deployment-runbook.md#rollback)).
- Dependency upgrades get their own pull requests, so a revert doesn't take features with it.

## Working with AI agents

AI coding agents follow [`CLAUDE.md`](../../CLAUDE.md). They work on a branch, never push to `main`, and never commit or push unless they are asked to. Their output goes through the same pull request, gates, and self-review as any other change.
