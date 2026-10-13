# Target audience

> Status: Accepted · Owner: Afran Anas · Last updated: 2026-10-13

## Priority

| Priority | Audience | Why |
|---|---|---|
| Primary | Recruiters | Usually the first person to look at a candidate, and the one who decides whether the candidate goes forward. |
| Primary | Hiring managers and engineering leads | Assess technical depth and make the hiring decision. |
| Secondary | Engineering peers | Read the technical content, share it, and refer people. |
| Secondary | Potential clients | Active only if freelance or contract work is wanted (open question Q5). |
| Secondary | Collaborators and researchers | Interested in AI/CV research, open source, and joint work. |

**When needs conflict:** top-level pages (Home, Projects, Experience) are designed first for recruiters, who need to scan quickly. Case studies and the Engineering page are designed first for hiring managers, who need depth. Each case study opens with a summary block so recruiters can still get what they need from it.

## Audiences

### Recruiters

- **Goal:** decide quickly whether Afran matches an open role and is worth passing on.
- **Context:** usually arrive from LinkedIn, an application, or a résumé link, often on a phone, and often reviewing many candidates in one sitting. They spend 30 seconds to 2 minutes on a first visit.
- **Technical depth:** varies. They recognize technology names but don't judge architecture.
- **Questions:** What role is this person targeting? What are their focus areas? What experience level? Where are they based, and are they available? Where is the résumé? How do I reach them?
- **They need:** the role and focus areas visible in the first screen, a recognizable stack named against real projects, the résumé one click away, and contact details that are easy to find.
- **They leave when:** the role is unclear, the page loads slowly or breaks on mobile, there's no résumé, or the text is buried in jargon.

### Hiring managers and engineering leads

- **Goal:** judge whether Afran can design, build, and own systems that resemble their team's work.
- **Context:** mostly on desktop, either before or after an interview. They spend 5–20 minutes and read one or two case studies in depth.
- **Technical depth:** high.
- **Questions:** What did Afran personally do, compared with the team? Why was this architecture chosen? How was it tested? Are the results real, and how were they measured? Can I see the code? What would Afran do differently?
- **They need:** architecture diagrams, explicit trade-offs, testing methodology, results with baselines, stated limitations, and links to source code.
- **They leave when:** claims are vague or inflated, numbers have no methodology, team work is presented as solo work, or the site has quality problems (slow, inaccessible, broken links) that contradict what it claims.

### Engineering peers

- **Goal:** learn something, compare approaches, or check out someone they were referred to.
- **Context:** arrive from shared links, GitHub, or search.
- **They need:** substantive technical writing, reproducible experiments, and readable code samples.
- **Key pages:** Engineering and case studies.

### Potential clients (conditional on Q5)

- **Goal:** find out whether Afran can deliver a specific outcome reliably, and how to start working together.
- **Technical depth:** low to medium.
- **They need:** outcomes stated in business terms, evidence of reliability and clear communication, and a clear way to make contact that explains what kinds of work are accepted.
- **Key pages:** Home, case studies (summary blocks), Contact.

### Collaborators and researchers

- **Goal:** judge whether research methodology is sound and find areas of overlap.
- **They need:** dataset provenance, evaluation methodology, baselines, reproducibility notes, and links to papers and repositories.
- **Key pages:** AI/CV case studies, Experience (research and publications), Engineering.

## Entry points

| Source | Likely landing page | Likely audience |
|---|---|---|
| Link on the résumé | `/` | Recruiters, hiring managers |
| LinkedIn profile | `/` | Recruiters |
| GitHub profile or README | `/`, `/projects/[slug]` | Hiring managers, peers |
| A link shared directly | `/projects/[slug]`, `/engineering` | Peers, hiring managers |
| Search for the owner's name | `/`, `/about` | All |

Every page can be the first page a visitor sees. Each page must therefore show who Afran is (through the header) and offer a route to projects and to contact.

## Design implications

1. The homepage answers the recruiter's questions within the first screen.
2. Each case study is layered: a summary block first, then the detailed sections.
3. The résumé and contact details can be reached from every page.
4. Mobile users get the same content and functions as desktop users. Nothing is removed on small screens.
5. Site quality is part of what the hiring-manager audience assesses.
