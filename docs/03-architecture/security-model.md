# Security model

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This is a static site with no server, accounts, forms, or stored user data ([ADR-001](adr/ADR-001-rendering-strategy.md), [ADR-006](adr/ADR-006-contact-method.md)). So the realistic threats are not application exploits. They are **account takeover, supply-chain compromise, leaked deploy credentials, and domain loss**, any of which would let an attacker change what the site says about its owner. The controls below are sized to those threats.

## Assets

| Asset | Why it matters |
|---|---|
| The integrity of the published content | Defacement or false claims damage professional reputation |
| The domain | Losing it means losing the site and every link that points to it |
| The GitHub account and repository | The source of truth, and the route into CI |
| The Cloudflare account and API token | Direct control over what gets served |
| The owner's email account | Used to recover every other account |
| Visitor privacy | A legal and trust obligation (NFR-PRIV-*) |

## Threat model

| # | Threat | Likelihood | Impact | Controls |
|---|---|---|---|---|
| T1 | Takeover of the GitHub, Cloudflare, registrar, or email account | Medium | High | Multi-factor authentication (passkeys or hardware keys) on all four (NFR-SEC-05). Recovery codes stored offline. Email is the root account, so it is protected first. |
| T2 | Malicious or compromised npm package running at build time | Medium | High | A minimal dependency set (NFR-MAINT-05). Committed lockfile and `npm ci`. Dependabot with grouped, reviewed updates. `npm audit` in CI. Install scripts run only for packages approved in `package.json` → `allowScripts` (npm 11). Currently that's `workerd` (Cloudflare's runtime) and `esbuild` (Vite's bundler). Both scripts only verify the platform binary, or download it if it's missing. `fsevents` is denied, because it works from its prebuilt binary. A new install script needs review and approval in a pull request. |
| T3 | Compromised third-party GitHub Action | Low–Medium | High | Actions pinned to a full commit SHA. Minimal `permissions:`. Deploy secrets only in deploy jobs on `main` and same-repository pull requests (NFR-SEC-06). |
| T4 | Cloudflare API token leaked | Low | High | Token scoped to editing Workers on one account. Stored only as a GitHub secret. Never echoed in logs. Rotated every year and immediately if exposure is suspected. |
| T5 | A secret committed to the public repository | Medium | Medium–High | There are almost no secrets. GitHub secret scanning and push protection are on. `.env*` is git-ignored, except `.env.example`. |
| T6 | Domain expiry or hijack | Low | High | Auto-renew, registrar lock, MFA on the registrar, and a renewal reminder 60 days before expiry. |
| T7 | XSS through content | Very low | Medium | No user-generated content. MDX is authored only by the owner and reviewed in pull requests. Raw `<script>` in content is forbidden. A strict `script-src`. |
| T8 | Clickjacking or framing | Low | Low | `frame-ancestors 'none'` and `X-Frame-Options: DENY` |
| T9 | Third-party script compromise (analytics) | Low | Medium | One third-party origin, production only, allowed explicitly in the CSP. Removing it is a one-line change. |
| T10 | Email harvesting and spam | High | Low | A dedicated address and provider filtering. Accepted risk ([ADR-006](adr/ADR-006-contact-method.md)). |
| T11 | Malicious pull request from a fork reaching secrets | Low | High | Fork pull requests run gates without secrets and get no preview deployment. `pull_request_target` is never used. |

## HTTP headers

These are defined in `public/_headers` and served on every response (NFR-SEC-02). The smoke test checks them on production after each deploy.

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

HTML gets no explicit `Cache-Control`. The host's default revalidation applies, so a deploy is visible immediately.

HSTS `preload` is **not** set at launch. Consider adding it after 3 months with no HTTPS problems, because preload is hard to undo.

### Content Security Policy

| Directive | Rationale |
|---|---|
| `script-src 'self' https://static.cloudflareinsights.com` | Only bundled first-party modules and the analytics beacon can run. **No inline executable scripts.** A build-output test fails if any `<script>` without `src` exists, apart from `type="application/ld+json"` data blocks. If Astro inlines a small script, the walking skeleton finds it, and the build is configured to emit external files instead. |
| `style-src 'self' 'unsafe-inline'` | **Accepted risk.** Shiki writes inline `style` attributes on highlighted code, and Astro may inline small stylesheets and `@font-face` rules. The site has no untrusted input that could inject styles, so the remaining risk (CSS-based data exfiltration) has no attack path. Revisit if user-supplied content is ever added. |
| `connect-src 'self' https://cloudflareinsights.com` | The analytics beacon's reporting endpoint |
| `form-action 'none'` | There are no forms (FR-CON-04). A form ADR must update this. |
| `frame-ancestors 'none'` | No framing. This only works as a header, not a `<meta>` tag. |
| *(no `upgrade-insecure-requests`)* | Left out on purpose, 2026-10-14. Every sub-resource is same-origin or an explicit `https://` URL, and production is HTTPS-only through HSTS, so the directive adds nothing. It did break testing: WebKit applied it to the plain-HTTP local test server (`wrangler dev` on `http://127.0.0.1`), rewrote font requests to `https://` so they hung, and failed every WebKit E2E test in CI. |

Astro's built-in `security.csp` option, which emits per-page hashes in a `<meta>` tag, is **not** used. Hash-based `style-src` would disable `'unsafe-inline'` in modern browsers and break Shiki's style attributes, and a header CSP is needed anyway for `frame-ancestors`. One header policy is simpler to reason about.

E2E tests fail on any `securitypolicyviolation` event or CSP console error, so a CSP regression is caught before merge. This works locally because `wrangler dev` serves `_headers` ([testing strategy](../04-engineering/testing-strategy.md)).

## Secrets

| Secret | Where | Scope | Rotation |
|---|---|---|---|
| `CLOUDFLARE_API_TOKEN` | GitHub Actions secret | Workers edit on one account | Every year, or immediately on suspicion |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions secret. It's an identifier, not sensitive, but stored as a secret for simplicity. | — | — |
| `CF_WEB_ANALYTICS_TOKEN` | GitHub Actions variable. **Public by design**, because it appears in page HTML. | Only allows sending beacons | Not needed |

Rules:

- The repository holds **no** secrets, and builds need none. Only deploy steps use the API token.
- `.env.example` documents the variable names with empty values ([environment configuration](../06-operations/environment-configuration.md)).

## Dependencies and supply chain

- `npm ci` only, with the lockfile committed (NFR-REL-01).
- CI runs `npm audit --audit-level=high` as a gate. A finding that doesn't apply (for example, a dev-only issue that isn't reachable) can be allowed only with a dated comment in the pull request and a follow-up issue (NFR-SEC-04).
- Dependabot opens monthly grouped pull requests for npm and GitHub Actions. They go through the same gates as any other change and are never auto-merged.
- Adding a dependency follows [the dependency rule](../04-engineering/coding-standards.md#dependencies).

## Repository settings (public repository)

| Setting | Value |
|---|---|
| Secret scanning and push protection | On |
| Dependabot alerts and security updates | On |
| Private vulnerability reporting | On (see [`SECURITY.md`](../../SECURITY.md)) |
| Branch ruleset on `main` | Require a pull request, require the CI status checks, block force pushes and deletion |
| Actions permissions | Read-only `GITHUB_TOKEN` by default. Allow only GitHub-authored actions and actions pinned by SHA. |
| Fork pull request workflows | Require approval for first-time contributors |

These are applied once during Phase 3 setup ([deployment runbook](../06-operations/deployment-runbook.md#one-time-setup)).

## Content

- MDX is treated as code: it is reviewed in pull requests and authored only by the owner.
- `<script>`, `<iframe>`, and inline event-handler attributes in content files are rejected by the content test.
- External embeds are not allowed in v1 ([scope](../00-foundation/scope-and-boundaries.md#out-of-scope)).

## Privacy

What is collected and why is in [system context](system-context.md#data-flows) and on `/privacy` (FR-PRV-01). There are no cookies and no device storage (FR-PRV-03). Fonts and assets are first-party, so no third-party requests happen except the analytics beacon in production.

## Incident response

If the site has been defaced, a token has leaked, or an account has been compromised:

1. **Contain.** Roll back the deployment ([runbook](../06-operations/deployment-runbook.md#rollback)), revoke the affected tokens, and lock or recover the account.
2. **Assess.** Review the GitHub audit log, the Cloudflare audit log, and recent commits and deploys.
3. **Recover.** Restore from Git history, rotate every credential connected to the compromised one, and redeploy through CI.
4. **Record.** Add an entry to the [maintenance log](../06-operations/maintenance.md#log) with the cause and the fix. Update this document if a control was missing.
