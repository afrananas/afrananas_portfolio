# Deployment runbook

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This runbook explains how the site reaches production, how to check it, and how to undo a bad deployment. The deployment architecture is described in [ADR-005](../03-architecture/adr/ADR-005-hosting-and-deployment.md) and [CI/CD](../04-engineering/ci-cd.md).

| Item | Value |
|---|---|
| Worker name | `afrananas-portfolio` |
| Production URL | `https://<domain>`. TODO(owner): fill in after Q4. |
| Preview URLs | `*.workers.dev` version URLs, posted on each pull request |
| Deploys from | GitHub Actions `ci.yml`, job `deploy`, on push to `main` |

## One-time setup

Do these steps in order during M3. Tick them off in the M3 pull request.

**Accounts and protection (NFR-SEC-05)**
1. Turn on MFA (passkey or hardware key) for the email account first, then GitHub, then Cloudflare. Store the recovery codes offline.

**GitHub repository** ([security model](../03-architecture/security-model.md#repository-settings-public-repository))
2. Under Settings → Code security, turn on secret scanning, push protection, Dependabot alerts and security updates, and private vulnerability reporting.
3. Under Settings → Actions → General, set workflow permissions to "Read repository contents". Under "Allow actions", allow GitHub-authored actions plus the SHA-pinned actions the workflows list.
4. Under Settings → Environments, create `production`, limited to deployments from the `main` branch.
5. Under Settings → Rules, create a ruleset on `main`: require a pull request, require the `ci` status checks, block force pushes, block deletion.
6. Set the repository description, the website (once a domain exists), and topics such as `portfolio`, `astro`, `typescript`.

**Cloudflare**
7. Create the account and turn on MFA.
8. **Domain (Q4, A1):** register the domain with Cloudflare Registrar. If it's registered elsewhere, add it to Cloudflare and change its nameservers to Cloudflare's. Turn on auto-renew and the registrar lock.
9. Create the API token with the **Edit Cloudflare Workers** template, limited to this account, with no zone access unless the custom-domain step needs it. Store it as the `CLOUDFLARE_API_TOKEN` GitHub secret, and store the account ID as the `CLOUDFLARE_ACCOUNT_ID` variable.
10. Do the first deploy through CI, by merging the M3 pull request. Confirm the Worker exists and serves on `workers.dev`.
11. Attach the custom domain to the Worker, either with a `routes` entry with `custom_domain: true` in `wrangler.jsonc` or through the dashboard. Prefer the config file, so the setup is recorded in Git.
12. Turn on Web Analytics: add the site and copy the token into the `CF_WEB_ANALYTICS_TOKEN` GitHub variable. Choose the manual JavaScript snippet, not automatic injection, so the beacon is controlled by `SITE_ENV`.

**Monitoring and search**
13. Create the uptime monitor ([monitoring](monitoring-and-analytics.md#uptime)).
14. Google Search Console: verify the domain with a DNS TXT record and submit `https://<domain>/sitemap-index.xml`.

## Domain and HTTPS

| Setting | Value |
|---|---|
| Canonical host | Apex (`<domain>`) |
| `www.<domain>` | A proxied DNS record, plus a **redirect rule**: `www.<domain>/*` → `https://<domain>/${1}`, 301, keeping the query string |
| SSL/TLS | Certificates are issued automatically for the custom domain. "Always Use HTTPS" is on. Minimum TLS version 1.2. |
| HSTS | Sent by `_headers` ([security model](../03-architecture/security-model.md#http-headers)). Don't also turn on Cloudflare's HSTS setting, so there's one source of truth. |

### DNS records

Fill this in after setup. It is the recovery reference for [backup and recovery](backup-and-recovery.md).

| Type | Name | Content | Proxied | Purpose |
|---|---|---|---|---|
| (managed by Workers custom domain) | `<domain>` | Worker `afrananas-portfolio` | Yes | Production |
| AAAA | `www` | `100::` | Yes | Redirect target only |
| TXT | `<domain>` | `google-site-verification=…` | — | Search Console |
| MX, TXT (SPF, DMARC) | — | TODO(owner): only if the portfolio email address uses this domain | — | Email |

## Standard deployment

1. Merge a pull request to `main` after the gates pass and the preview has been checked.
2. `ci.yml` runs every gate again on the merge commit, deploys the tested `dist/` with `wrangler deploy`, and runs the production smoke test.
3. Check the result in the Actions tab. A green `deploy` job means the change is live and the smoke test passed.

Typical time from merging to live is about 5–8 minutes.

## Verification

The smoke test covers this automatically ([Gate 3](../04-engineering/quality-gates.md#gate-3-production-merge-to-main)). After a significant change, also check by hand:
- the changed page on a phone,
- a hard refresh to confirm the new assets loaded,
- that no new errors appear in the DevTools console.

## Rollback

Target: production restored in 5 minutes or less (NFR-REL-04).

1. **Restore service right away** using either option:
   - Cloudflare dashboard → Workers & Pages → `afrananas-portfolio` → Deployments → choose the last good version → **Rollback**.
   - From a terminal that is logged in with `wrangler login`: run `npx wrangler deployments list`, then `npx wrangler rollback <version-id>`.
2. Run `npm run smoke -- https://<domain>` against production.
3. **Make the fix permanent:** `git revert <bad-merge-sha>` on a branch, open a pull request, and merge it. This puts `main` back in line with production. Never rewrite `main`'s history.
4. Record what happened in the [maintenance log](maintenance.md#log).

A rollback through Cloudflare doesn't change Git. Until the revert merges, the next merge to `main` will redeploy the bad change together with the new work, so do step 3 straight away.

## Manual deploy

Use this only when CI is unavailable and a fix is urgent.

```sh
git switch main && git pull                  # a commit that is green in CI, or verified locally
npm ci
npm run verify                               # every local gate must pass
SITE_ENV=production CF_WEB_ANALYTICS_TOKEN=<token> npm run build
npx wrangler login                           # interactive, owner account
npx wrangler deploy
npm run smoke -- https://<domain>
```

Record the manual deploy in the maintenance log, and re-run CI on `main` once it's available.

## Incidents

| Symptom | First step |
|---|---|
| Uptime alert: site down | Check the Cloudflare status page. If Cloudflare is fine, check the last deploy and roll back. |
| Smoke test failed after a deploy | Roll back, then reproduce locally with `npm run serve` |
| Defacement or unexpected content | Follow the security [incident response](../03-architecture/security-model.md#incident-response) |
| Domain doesn't resolve | Check the registrar (expiry or lock), then Cloudflare DNS and the custom-domain attachment |
| Certificate error | Check the Custom Domains status in the Cloudflare dashboard. Certificates renew automatically. |
