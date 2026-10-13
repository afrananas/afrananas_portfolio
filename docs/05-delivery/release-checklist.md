# Release checklist

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

Complete this before **v1.0.0** and before every tagged release after it. Copy the checklist into the release's tracking issue, tick the items there, and link that issue from the [maintenance log](../06-operations/maintenance.md#log).

## 1. Content

- [ ] At least 3 published case studies (G2). Every featured project has `featuredOrder` set.
- [ ] Every case study meets the content section of the [definition of done](definition-of-done.md#content-changes).
- [ ] Every result has a ledger entry, and every ledger evidence link was opened and works ([evidence ledger](../07-project-case-studies/evidence-and-metrics.md)).
- [ ] The `fixture-draft` project is still a draft and isn't in the production output (FR-PRJ-01).
- [ ] `profile.ts` has the real email, LinkedIn, availability, timezone, and response time. No `TODO`, placeholder, or `example` strings are left in `src/` (`grep -rniE "todo|placeholder|lorem|example\.com" src/` returns nothing).
- [ ] The résumé PDF is current. It matches `/experience` exactly (FR-EXP-05), is text-based, is ≤ 1 MB, and has its title metadata set (FR-RES-03).
- [ ] `/privacy` matches what is actually collected (NFR-PRIV-03).
- [ ] The G1 first-impression test has been run and recorded (launch only).

## 2. Accessibility (manual, NFR-A11Y-03 to 05)

Follow the [manual test procedure](../02-design/accessibility.md#manual-test-procedure) and record the browser and assistive-technology versions.

- [ ] Keyboard-only pass of every route
- [ ] VoiceOver with macOS Safari: F1 and F2
- [ ] VoiceOver with iOS Safari: F1
- [ ] 200% zoom and 320 px reflow
- [ ] Reduced motion and grayscale

## 3. Performance

- [ ] Lighthouse CI is green on the release commit (NFR-PERF-01 to 05)
- [ ] A Lighthouse run against **production** for `/` and one case study (mobile), with the results recorded in the [evidence ledger](../07-project-case-studies/evidence-and-metrics.md#site-performance-records) and labelled as lab data
- [ ] After launch, in Cloudflare Web Analytics: Core Web Vitals reviewed once there is data (G5 field data)

## 4. SEO and sharing

- [ ] Each route's title and description has been read and makes sense (FR-META-01)
- [ ] Previews checked with the LinkedIn Post Inspector and one other Open Graph previewer for `/` and one case study (FR-META-03)
- [ ] Production `robots.txt` allows crawling, and the sitemap URL loads (FR-META-04)
- [ ] Google Search Console is verified and the sitemap submitted (launch only)

## 5. Security and privacy

- [ ] The smoke test checks the production headers (NFR-SEC-02). Also checked with an external header scanner (for example securityheaders.com), with the result recorded.
- [ ] `npm audit --audit-level=high` is clean, or has a dated exception (NFR-SEC-04)
- [ ] MFA is confirmed on GitHub, Cloudflare, the registrar, and email (NFR-SEC-05)
- [ ] The repository settings match the [security model](../03-architecture/security-model.md#repository-settings-public-repository)
- [ ] No third-party requests except Cloudflare Web Analytics, checked in the DevTools network panel on production (NFR-PRIV-02)

## 6. Links and assets

- [ ] The internal link check is green (CI)
- [ ] The external link check was run by hand (`links.yml` with `workflow_dispatch`) and is green
- [ ] The favicon, Open Graph image, and résumé all load in production

## 7. Deployment

- [ ] HTTPS works on the apex domain. `www` and `http://` return 301 to `https://<apex>` ([runbook](../06-operations/deployment-runbook.md#domain-and-https))
- [ ] The production smoke test is green
- [ ] The rollback procedure has been tested at least once (WS-6, launch only)
- [ ] The uptime monitor is active and a test alert was received
- [ ] The release is tagged (`vX.Y.Z`) and the GitHub release notes are generated

## 8. After release (within 24 hours)

- [ ] The full recruiter flow (F1) checked on a real phone on a cellular connection
- [ ] No errors in the uptime monitor, and analytics is receiving data
- [ ] The README status, the [roadmap](implementation-roadmap.md) status, and the maintenance log are updated
