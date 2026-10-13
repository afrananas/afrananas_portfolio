# Backup and recovery

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

There is no database and no runtime state. **Git is the backup**: the source, content, configuration, and documentation are all versioned, and the build output can be regenerated. This document lists what lives outside Git and how to recover from losing each dependency.

## Inventory

| Asset | Source of truth | Copies | Recovery |
|---|---|---|---|
| Code, content, docs, configuration, résumé PDF | GitHub repository | Every local clone (full history) | Push a clone to any Git host |
| Résumé editable source (A7) | Owner's files | TODO(owner): name the backup location (cloud drive, second device) | Restore from that backup. If it's lost, rebuild from the PDF and the experience entries. |
| Diagram sources | Repository (next to the SVG) | Clones | — |
| Cloudflare settings (Worker, custom domain, redirect rule, analytics) | Cloudflare account | `wrangler.jsonc` in Git, plus the [runbook](deployment-runbook.md) | Re-create them from the runbook |
| DNS records | Cloudflare DNS | The [DNS records table](deployment-runbook.md#dns-records), plus a BIND export after each change | Re-import, or re-create from the table |
| GitHub settings (rulesets, environments, variables) | GitHub | Listed in the [runbook](deployment-runbook.md#one-time-setup) | Re-create from the runbook |
| Secrets (`CLOUDFLARE_API_TOKEN`) | GitHub secret | **None, on purpose** | Issue a new token. Tokens are never backed up. |
| Analytics history | Cloudflare | None | Accepted loss. It's not critical. |
| Account recovery codes | Owner | Offline copy (printed or in a password manager) | — |
| Inbound-contact log | Owner's private note | Owner's normal backups | — |

## Recovery objectives

| Objective | Target | Basis |
|---|---|---|
| RPO (data loss) | The last push to GitHub | Nothing is stored outside Git that can't be rebuilt |
| RTO, bad deploy | ≤ 5 minutes | Cloudflare rollback (NFR-REL-04) |
| RTO, host lost | ≤ 1 day | Redeploy `dist/` to a compatible host |
| RTO, GitHub lost | ≤ 1 day | Push a clone elsewhere and re-create CI |

## Scenarios

| # | Scenario | Recovery |
|---|---|---|
| R1 | A bad deployment | [Runbook rollback](deployment-runbook.md#rollback) |
| R2 | Accidental deletion on `main` (a file or content) | `git revert` or restore from history in a pull request. Rewriting history is never needed. |
| R3 | Cloudflare Workers unavailable for a long time, or the account is lost | Build locally with `SITE_ENV=production`. Deploy `dist/` to **Cloudflare Pages** (same account, if it's available) or **Netlify**. Both read the same `_headers` and `_redirects`. Point DNS at the new host. Then write an ADR superseding ADR-005. |
| R4 | GitHub account or repository lost | Create a new remote from the most recent clone, re-create the secrets, variables, rulesets, and environment from the runbook, and update the links in `profile.ts` and the docs. |
| R5 | Domain lost (expired or hijacked) | Prevention: auto-renew, registrar lock, MFA (T6). If it still happens: contact the registrar's recovery process immediately. In the meantime, update profile links to point at the `workers.dev` URL. |
| R6 | Cloudflare API token leaked | Revoke it in Cloudflare, issue a new one, update the GitHub secret, and check the Cloudflare audit log for unexpected deploys ([incident response](../03-architecture/security-model.md#incident-response)). |
| R7 | Owner's laptop lost | Nothing is lost that isn't in Git. Revoke `wrangler login` sessions from the Cloudflare dashboard. Re-clone on the new machine. |

## Tests

- Once a year, during the yearly review, do a **clean-machine rebuild**: fresh clone, `npm ci`, `npm run verify`, and a successful build. This proves the repository alone is enough.
- Before launch (WS-6), and after that whenever the hosting setup changes, do a **rollback drill**.
