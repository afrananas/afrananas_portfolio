# ADR-005: Cloudflare Workers static assets, deployed from GitHub Actions

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

[ADR-001](ADR-001-rendering-strategy.md) produces a folder of static files. The host must provide:

- a custom domain with automatic HTTPS (NFR-SEC-03),
- custom response headers for CSP and HSTS (NFR-SEC-02),
- path redirects (FR-404-02),
- a real 404 status for unknown paths (FR-404-01),
- a preview URL per change,
- instant rollback (NFR-REL-04),
- all within free tiers (C2).

Production must only ever receive commits that passed every quality gate.

## Decision drivers

- Requirement coverage: headers, redirects, 404, previews, rollback
- Cost (C2)
- Making sure gates can't be bypassed
- Portability of configuration

## Options considered

**Host:**

1. **Cloudflare Workers with static assets (assets only, no Worker script).** Supports `_headers`, `_redirects`, 404-page handling, preview URLs, and rollbacks. Static asset requests are free. Cloudflare is putting its investment into Workers rather than Pages.
2. **Cloudflare Pages.** The same features, and it also accepts DNS managed elsewhere. It is the older product, and Cloudflare provides migration paths from Pages to Workers.
3. **Netlify.** The same file formats. The free tier is credit-based.
4. **Vercel.** The Hobby tier is limited to non-commercial use, which conflicts with possible freelance use (A2).
5. **GitHub Pages.** Has no custom headers and no preview deployments. Fails NFR-SEC-02.

**Deployment trigger:**

- (a) The host's Git integration builds each push.
- (b) GitHub Actions runs every gate, then deploys the already-tested `dist/` with `wrangler`.

## Decision

**Host option 1 with trigger (b).**

- Pull requests: the gates run, then `wrangler versions upload` publishes a **preview version** whose URL is posted to the pull request. This version doesn't serve production traffic.
- Pushes to `main`: the gates run, then `wrangler deploy` publishes to production, then the smoke test runs ([CI/CD](../../04-engineering/ci-cd.md)).
- `wrangler.jsonc` contains an `assets` block (`directory: ./dist`, `not_found_handling: "404-page"`) and no `main` script.
- Headers and redirects live in `public/_headers` and `public/_redirects`. Netlify and Cloudflare Pages use the same formats, so the configuration can move between hosts.
- DNS is on Cloudflare (assumption A1), because Workers custom domains need Cloudflare-managed DNS.

Why the trigger is (b): with the host's own Git integration, the host builds independently of CI, so a push to `main` could deploy even while CI is red. Branch protection reduces that risk but does not remove it. With (b), the artifact that passed the gates is the one that gets deployed.

## Consequences

### Positive

- Every requirement is covered at zero cost.
- Production can't receive a commit that hasn't passed the gates. The tested build is the deployed build.
- Rollback is instant through Cloudflare's version history.

### Negative

- Two repository secrets to manage (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`).
- The workflow YAML is more involved than a host's Git integration.
- The custom domain requires Cloudflare DNS (A1).

### Risks and mitigations

- *Risk:* the API token leaks. *Mitigation:* the token is scoped to Workers edit for one account, stored only as a GitHub secret, never available to workflows triggered by forks, and rotated every year ([security model](../security-model.md#secrets)).
- *Risk:* Workers features differ from those documented when this was decided. *Mitigation:* the walking skeleton (Phase 3) verifies headers, redirects, the 404 status, preview URLs, and rollback before any feature work starts. If any of them fails, fall back to option 2 with the same files.

## Revisit conditions

- Assumption A1 turns out to be false (DNS can't move to Cloudflare). Switch to option 2.
- Cloudflare changes free-tier terms for static assets.
