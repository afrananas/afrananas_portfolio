# Maintenance

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

The site's credibility depends on it staying accurate, secure, and fast. This schedule keeps it that way in about **2 hours a month**.

## Schedule

| Frequency | Task | Time | Procedure |
|---|---|---|---|
| Every change | CI gates | Automatic | [Quality gates](../04-engineering/quality-gates.md) |
| Weekly | Triage `broken-links` issues, if any were opened | 5 min | [Links](#links) |
| Monthly | Merge Dependabot pull requests. Review security alerts. Review analytics and Core Web Vitals. | 30–60 min | [Dependencies](#dependencies), [monitoring](monitoring-and-analytics.md#analytics) |
| Quarterly | Content and claims review. Résumé reconciliation. Performance re-check. Test email to the contact address. | 1–2 h | [Quarterly review](#quarterly-review) |
| Yearly | Security review. Token rotation. Clean-machine rebuild. Uptime alert test. Domain renewal check. Documentation review. | 2–3 h | [Yearly review](#yearly-review) |
| On event | A new project ships, the job changes, a framework major release, an incident | — | The matching procedure below |

Put recurring calendar reminders in place for the monthly, quarterly, and yearly tasks.

## Dependencies

- Dependabot pull requests (monthly, grouped) go through the full gates. Before merging, read the changelog for anything marked as breaking. Never auto-merge.
- Security updates (Dependabot alerts) are handled as they arrive. A high or critical alert is fixed within 7 days, or gets a dated exception explaining why it isn't reachable (NFR-SEC-04).
- Remove dependencies that are no longer used. Each year, check the dependency list against [technology stack](../03-architecture/technology-stack.md).

### Framework upgrades

Astro major versions come out about once a year.

1. Read the official upgrade guide in full.
2. On a branch `chore/astro-vN`, upgrade Astro and its official integrations together.
3. Re-check every API listed in the architecture documents, especially content collections, the Fonts API, Shiki configuration, and `env.schema`. Update the documents where anything changed.
4. Run the full gates, then compare the preview with production page by page.
5. Merge on its own, never together with features. Update the version in [technology stack](../03-architecture/technology-stack.md).

Node.js: move to the next LTS line within 6 months of its LTS date, by updating `.nvmrc`, `engines`, and CI.

## Links

- When the weekly job opens an issue, fix the link (update it, or link to an archived copy). If it's a claim's evidence link that broke, also check the claim still stands (NFR-CONT-01).
- Hosts that block bots are listed in `.lycheeignore` with a reason. Check those links by hand every quarter.

## Quarterly review

- [ ] Every published claim has been re-verified against its ledger entry. Unreachable evidence is fixed, or the claim is removed ([claims policy](../01-product/content-strategy.md#claims-policy)).
- [ ] The availability statement, the About "what's next" section, and the home summary are still true.
- [ ] The résumé matches `/experience` (FR-EXP-05). Its last-updated month is current.
- [ ] Project shortlist: is there a new project to add, or an old one to retire? Retiring means setting it to draft. Its URL then returns 404, so if other sites link to it, consider keeping it published instead.
- [ ] Lighthouse against production on `/`, `/projects`, and one case study, recorded in the evidence ledger.
- [ ] `/privacy` still matches reality (NFR-PRIV-03).
- [ ] Test email to the contact address is received.
- [ ] `.lycheeignore` links checked by hand.
- [ ] An entry is added to the log below.

## Yearly review

- [ ] Rotate `CLOUDFLARE_API_TOKEN` (R6 procedure, without the incident part).
- [ ] Confirm MFA and recovery codes on all four accounts (NFR-SEC-05).
- [ ] Domain auto-renew is on, the expiry date has been checked, and the calendar reminder is set.
- [ ] Clean-machine rebuild test ([backup and recovery](backup-and-recovery.md#tests)).
- [ ] Uptime alert test.
- [ ] Repository settings are still as listed in the [security model](../03-architecture/security-model.md#repository-settings-public-repository).
- [ ] Read through the documentation: delete anything that is no longer true. Check every ADR's revisit conditions.
- [ ] Consider whether to turn on HSTS `preload` (only if every subdomain is HTTPS).

## Event-driven tasks

| Event | Do |
|---|---|
| A significant project ships | Write a case study (flow F5). Add ledger entries. Consider making it featured. |
| Job, title, or availability changes | Update `profile.ts`, the experience entries, and the résumé in one pull request. Update the About page. |
| Incident | Follow the runbook. Add a log entry with the cause and the fix. Update the documentation that was missing a control. |
| A slug is renamed | Add the redirect ([routing](../03-architecture/routing-and-page-model.md#redirects)) and a log entry. |

## Log

Add entries newest first. Keep each one to a line. Link to a pull request or issue for detail.

| Date | Type | Summary | Link |
|---|---|---|---|
| 2026-10-13 | Docs | Pre-implementation documentation completed; ADR-001 to ADR-007 accepted | — |
