# Definition of done

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

This is the minimum standard for merging any change. The [pull request template](../../.github/pull_request_template.md) repeats this checklist. An item that doesn't apply is marked N/A with a reason. It is not left unchecked.

## Every change

- [ ] Every CI gate is green ([quality gates](../04-engineering/quality-gates.md#gate-2-pull-request-required-status-checks-on-main)). No gate was weakened, skipped, or suppressed without a reason.
- [ ] The pull request is one concern, with a Conventional Commit title and linked requirement IDs or ADRs ([git workflow](../04-engineering/git-workflow.md)).
- [ ] The diff has been self-reviewed in the order: correctness, accessibility, requirements match, simplicity, naming.
- [ ] Documentation that describes the changed behavior is updated **in this pull request** (NFR-MAINT-06), including requirements, specifications, and ADR status.
- [ ] No secrets, `.env` files, or generated output are committed.

## Code changes

- [ ] Behavior matches the requirement's [acceptance criteria](../01-product/acceptance-criteria.md). New logic has a unit test, and new browser behavior has an E2E test, with requirement IDs in the test titles.
- [ ] Works with JavaScript disabled (FR-GLB-06).
- [ ] Keyboard-operable with visible focus. axe is clean, and the new UI was checked at 360 px and 1280 px.
- [ ] Uses design tokens only, with no raw values (ADR-004).
- [ ] No new dependency, or the dependency is justified in the pull request description ([coding standards](../04-engineering/coding-standards.md#dependencies)).
- [ ] Lighthouse budgets still pass. The page-weight change is noted if it is larger than 5 KB.
- [ ] The preview deployment was opened and the change checked there, on a phone-sized viewport too.

## Content changes

- [ ] Frontmatter passes the schema (the build is green). The content rules pass, including the required headings and subsections.
- [ ] Every quantitative claim has a baseline, conditions, an evidence link, and a ledger entry ([claims policy](../01-product/content-strategy.md#claims-policy)).
- [ ] Contribution scope is accurate. "I" and "we" are used correctly. Team size and context are correct.
- [ ] No confidential information. Third-party names are used only where allowed.
- [ ] Images have meaningful `alt` text. Diagrams have a text description, and their editable source is committed.
- [ ] Every external link was opened and works.
- [ ] Spelling and grammar checked. Voice follows the [content strategy](../01-product/content-strategy.md#voice-and-tone).
- [ ] If experience changed: the résumé PDF is updated and matches (FR-EXP-05).
- [ ] Read in full on the preview deployment, on desktop and on a phone.

## Documentation-only changes

- [ ] Links resolve (internal relative links and anchors).
- [ ] Numeric thresholds are stated only in the [NFRs](../01-product/non-functional-requirements.md), and other documents refer to them.
- [ ] The status and "Last updated" lines are updated.

## Infrastructure and CI changes

- [ ] Permissions are least-privilege. Actions are pinned to a SHA. No secret is exposed to fork pull requests (NFR-SEC-06).
- [ ] The [runbook](../06-operations/deployment-runbook.md) and the [environment configuration](../06-operations/environment-configuration.md) reflect the change.
- [ ] The change was verified on a preview, or it is reversible and the revert path is written in the pull request.
