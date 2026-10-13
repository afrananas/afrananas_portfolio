import { profile } from '../data/profile';

/** FR-META-01: home gets the full positioning; every other page is `{title} — Afran Anas`. */
export function buildTitle(pageTitle?: string): string {
  return pageTitle
    ? `${pageTitle} — ${profile.name}`
    : `${profile.name} — ${profile.role} (${profile.specialties})`;
}

/** robots.txt body (docs/03-architecture/seo-and-metadata-architecture.md). Sitemap line arrives with `site` (M5). */
export function robotsTxt(isProduction: boolean): string {
  return `User-agent: *\n${isProduction ? 'Allow: /' : 'Disallow: /'}\n`;
}
