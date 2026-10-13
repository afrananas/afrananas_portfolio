# CLAUDE.md

Guidance for AI coding agents working in this repository. The documentation in `docs/` is the specification. Read the relevant documents before changing anything.

## Project

This is the portfolio site of Afran Anas (Software Engineer — Backend · AI · Full-Stack). It is a statically generated Astro site in TypeScript, using native CSS and MDX/YAML content collections. It deploys to Cloudflare Workers static assets through GitHub Actions. There is no backend.

- What and why: `docs/00-foundation/`, `docs/01-product/`
- How it looks: `docs/02-design/`
- How it's built: `docs/03-architecture/` (the ADRs in `adr/` are binding)
- How to work: `docs/04-engineering/`, `docs/05-delivery/definition-of-done.md`
- Current status: `docs/05-delivery/implementation-roadmap.md`

## Commands

Full list in `docs/06-operations/local-development.md`:

```
npm ci              install (never `npm install` in CI)
npm run dev         dev server
npm run verify      format:check → lint → check → check:css → test → build → test:build → test:e2e
npm test            unit + content tests
npm run test:e2e    Playwright + axe against the built site served by wrangler dev
npm run test:e2e:fallback   macOS 12: astro preview + installed Chrome (CI stays authoritative)
```

## Rules

1. **Never invent content.** No fabricated projects, metrics, employers, dates, testimonials, or bio facts. Every claim needs an evidence-ledger entry (`docs/07-project-case-studies/evidence-and-metrics.md`). If a fact is missing, leave a `TODO(owner)` and ask.
2. **Requirements drive the code.** Reference requirement IDs (`FR-*`, `NFR-*`) in tests (in the title) and in commits. Behavior that isn't in the requirements needs a requirements change first.
3. **ADRs are binding.** Don't add a UI framework, CSS framework, CMS, server, form, or tracking without a new ADR (`docs/03-architecture/adr/README.md`).
4. **Progressive enhancement.** All content and links work without JavaScript. Scripts only enhance (FR-GLB-06).
5. **Design tokens only.** No raw colors or font values outside `src/styles/tokens.css`.
6. **Accessibility is a gate.** WCAG 2.2 AA, axe clean, keyboard operable. See `docs/02-design/accessibility.md`.
7. **No inline `<script>`, no `target="_blank"`, no cookies or web storage.** These follow from the CSP and privacy rules.
8. **Minimal dependencies.** Follow the dependency rule in `docs/04-engineering/coding-standards.md#dependencies`.
9. **Docs change with behavior** in the same change (NFR-MAINT-06). Don't edit accepted ADRs. Supersede them instead.
10. **Git:** work on a branch (`feat/`, `fix/`, `content/`, `docs/`, `chore/`), use Conventional Commits, never push to `main`, and don't commit or push unless asked.
11. **Never weaken a gate** (thresholds, skipped tests, lint suppressions without a reason) to make CI pass.
