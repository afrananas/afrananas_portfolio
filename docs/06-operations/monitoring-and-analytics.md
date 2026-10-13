# Monitoring and analytics

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

A static site needs very little monitoring. The things that can go wrong are: the host or the domain goes down, a deploy breaks the site, links rot, dependencies get vulnerabilities, and content goes stale. Each one has a check below, and nothing needs a human to watch a dashboard (C1).

## What is monitored

| Concern | Tool | Signal | Alert route | Requirement |
|---|---|---|---|---|
| Availability | External uptime monitor (free tier) | HTTP status and keyword on `/` and `/afran-anas-resume.pdf` | Email (and push, if the tool offers it) | NFR-REL-05 |
| Deploy health | Production smoke test in CI | The `deploy` job is red | GitHub Actions failure email | Gate 3 |
| Build and gate failures | GitHub Actions | Red checks | GitHub notification email | Gate 2 |
| Broken external links | Weekly `links.yml` | An issue labelled `broken-links` | GitHub issue notification | NFR-REL-03 |
| Vulnerable dependencies | Dependabot alerts and monthly pull requests | Alert or pull request | GitHub notification | NFR-SEC-04 |
| Leaked secrets | GitHub secret scanning | Alert or a blocked push | GitHub notification | NFR-SEC-01 |
| Real-user performance | Cloudflare Web Analytics, Core Web Vitals | p75 LCP, INP, and CLS | Reviewed monthly, no automatic alert | NFR-PERF-01 to 03 |
| Traffic and outcome proxies | Cloudflare Web Analytics | Visits and page views by path, referrers | Reviewed monthly | G3, G4 |
| Domain expiry | Registrar auto-renew plus a calendar reminder | Renewal notice | Email and calendar | T6 |
| Content staleness | The quarterly review | Checklist | Calendar | NFR-CONT-01 |

**Not monitored, on purpose:** server logs, error tracking (there's no server, and client scripts fail back to plain HTML), and synthetic multi-step journeys (E2E covers them before each deploy).

## Uptime

- Use a reputable monitor's free tier with 5-minute checks. **Monitors:**
  - `GET https://<domain>/`, expecting 200 and the keyword "Afran Anas".
  - `GET https://<domain>/afran-anas-resume.pdf`, expecting 200.
- **Alert** after 2 consecutive failures, which means an outage of about 10 minutes (NFR-REL-05).
- A public status page isn't needed.
- Test the alert path once at setup by pausing a monitor or pointing it at a 404, and once a year after that.

## Analytics

Configuration and privacy rules are in [ADR-007](../03-architecture/adr/ADR-007-analytics.md). The beacon only runs in production.

**Monthly review** (about 15 minutes, logged in the [maintenance log](maintenance.md#log)):
1. Core Web Vitals at p75 for LCP, INP, and CLS. If any is outside "good", find the cause with the debug view, which shows the top elements affecting each metric, and file an issue.
2. Top referrers: are LinkedIn, GitHub, and résumé links bringing visits?
3. The G3 proxy (case-study views per visit) and the G4 proxy (`/contact` views per visit).
4. Compare with the manual inbound-contact log, which is the primary G4 signal.
5. After 60 days, set the outcome targets in [goals](../00-foundation/goals-and-success-criteria.md#outcome-metrics).

**Inbound-contact log:** a private note kept outside the repository, because it contains personal data. Record the date, the channel, and how they found the site. Only aggregate counts are copied into the maintenance log.

## Contact delivery

There is no form, so there is no delivery pipeline to monitor ([ADR-006](../03-architecture/adr/ADR-006-contact-method.md)). Once a quarter, send a test email to the published address from an outside account, to confirm the address still receives mail and isn't being filtered as spam.
