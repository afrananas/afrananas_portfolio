# Security policy

This repository contains the source of a static personal website. It has no server, accounts, or stored user data.

## Reporting a vulnerability

Please report security issues **privately** using GitHub's [private vulnerability reporting](https://github.com/afrananas/afrananas_portfolio/security/advisories/new). Don't open a public issue.

Useful things to include:

- the affected URL or file,
- steps to reproduce,
- the impact you expect.

You'll get an acknowledgement within 7 days.

## Scope

In scope:

- the deployed site and its HTTP headers,
- the build and CI configuration in this repository,
- any exposed credentials.

Out of scope:

- issues that require a compromised visitor device,
- denial of service,
- findings from automated scanners with no demonstrated impact.

The security model is documented in [`docs/03-architecture/security-model.md`](docs/03-architecture/security-model.md).
