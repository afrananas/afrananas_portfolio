# ADR-007: Cloudflare Web Analytics (no cookies), production only

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

The outcome goals G3 and G4 and field performance data (NFR-PERF-01 to 03) need some measurement. The privacy constraints are: no cookies, no device storage, no cross-site tracking, and no consent banner (NFR-PRIV-01, A6). Cost is limited to zero (C2), and any script must fit a 10 KB third-party budget (NFR-PERF-05).

## Decision drivers

- Privacy: no cookies, no personal profiles, no consent banner
- Field Core Web Vitals data (LCP, INP, CLS)
- Cost
- Script weight and performance impact
- Enough data to judge G3 and G4

## Options considered

1. **No analytics.** Rely only on the manual inbound log.
2. **Cloudflare Web Analytics.** Free and cookieless. Reports page views and visits by path, referrers, countries, and devices, plus Core Web Vitals including INP from real users. **It does not support custom events.**
3. **A privacy-focused tool with events** (for example Plausible or Umami Cloud). Cookieless and supports events, but most plans are paid or have limits.
4. **Google Analytics 4.** Free, but uses cookies, needs a consent banner, sends data to an advertising company, and has a heavier script.

## Decision

**Option 2, included only in production builds** (FR-PRV-02).

- The beacon `<script>` is added by the base layout only when `SITE_ENV=production` and `CF_WEB_ANALYTICS_TOKEN` is set ([environment configuration](../../06-operations/environment-configuration.md)).
- The CSP allows exactly the beacon's script origin and reporting endpoint ([security model](../security-model.md#content-security-policy)).
- G3 and G4 are measured with path-based proxies, plus the manual inbound log as the primary signal ([goals](../../00-foundation/goals-and-success-criteria.md#outcome-metrics)).

Option 1 would give no field performance data and no traffic signal at all. Option 3 costs money for event data that the proxies approximate. Option 4 breaks the privacy constraints.

## Consequences

### Positive

- Real-user Core Web Vitals at zero cost, with no cookies and no consent banner.
- One small third-party script, loaded with `defer`, outside the critical rendering path.

### Negative

- No event tracking, so email clicks and résumé downloads can't be measured directly.
- Vitals coverage is limited to browsers that support the measurement APIs.

### Risks and mitigations

- *Risk:* a privacy notice that is wrong. *Mitigation:* NFR-PRIV-03 requires reviewing `/privacy` whenever analytics changes.
- *Risk:* analytics breaks the CSP or slows pages. *Mitigation:* the smoke test checks for CSP violations, and Lighthouse runs in CI. The beacon is never on the critical path.

## Revisit conditions

- After the 60-day baseline, the proxies are too coarse to judge G3 and G4. Switch to option 3 with a new ADR, keeping the same privacy constraints.
- Cloudflare changes the product's privacy properties or pricing.
