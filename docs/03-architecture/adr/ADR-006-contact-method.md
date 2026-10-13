# ADR-006: Direct contact links, no contact form

- Status: Accepted
- Date: 2026-10-13
- Decision owners: Project owner

## Context

Visitors need a reliable way to reach the owner (P7, G4). Recruiters and hiring managers usually prefer email or LinkedIn, because those fit their existing tools. A form needs an endpoint, input validation, abuse prevention, delivery monitoring, and a privacy statement for what it stores. That conflicts with [ADR-001](ADR-001-rendering-strategy.md) and constraint C1.

## Decision drivers

- Reliability: a message must not be lost silently
- Operational burden (C1)
- Security and abuse risk
- Recruiter convenience

## Options considered

1. **Direct links:** `mailto:`, the address as visible text, a copy button, LinkedIn, and GitHub.
2. **A form sent to a third-party form service.**
3. **A form handled by a serverless function** that sends email through an API.
4. **A scheduling link** (for example a calendar booking page).

## Decision

**Option 1.**

- The address is shown as plain text and as a `mailto:` link. A progressive-enhancement copy button helps visitors whose devices have no mail client set up.
- Use a **dedicated address** for the portfolio, with the email provider's spam filtering. That way spam is contained, and the address can be rotated without affecting a personal inbox.
- The address is not obfuscated. Obfuscation hurts accessibility and copying, and protects little against modern harvesters. The cost is some spam, accepted on purpose.

Options 2 and 3 add a dependency, an abuse surface, and silent failure modes (a form that "succeeds" but never delivers) in exchange for a small convenience gain. Option 4 could be added later as an extra link if freelance work becomes a goal (A2).

## Consequences

### Positive

- No endpoint, no stored personal data, and nothing to monitor.
- Messages arrive in a normal inbox with full history.

### Negative

- Visitors without a configured mail client must copy the address.
- The address will attract some spam.

### Risks and mitigations

- *Risk:* spam volume becomes a burden. *Mitigation:* use provider filtering, and rotate the dedicated address if needed. Rotating it means changing one value in `profile.ts`.

## Revisit conditions

- There is evidence of lost contacts. For example, people say they couldn't reach the owner, or `/contact` gets views but no messages arrive.
- Freelance work becomes a goal (A2) and needs a structured intake.

Any form must come with a new ADR covering validation, rate limiting, CAPTCHA-free abuse prevention, delivery monitoring, and privacy (FR-CON-04).
