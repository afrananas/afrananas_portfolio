import { existsSync, globSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Checks over dist/ — run after `npm run build` with the same SITE_ENV.
const isProduction = process.env.SITE_ENV === 'production';
const pages = globSync('dist/**/*.html').map((file) => ({
  file,
  html: readFileSync(file, 'utf8'),
}));

describe('build output', () => {
  it('has pages', () => expect(pages.length).toBeGreaterThan(0));

  it('CSP: no inline executable scripts (security-model.md)', () => {
    for (const { file, html } of pages) {
      const inline = [...html.matchAll(/<script\b([^>]*)>/g)]
        .map((m) => m[1] ?? '')
        .filter((attrs) => !/\bsrc=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs));
      expect(inline, file).toEqual([]);
    }
  });

  it('every page has lang="en", one h1, a title and a description', () => {
    for (const { file, html } of pages) {
      expect(html, file).toMatch(/<html lang="en"/);
      expect(html.match(/<h1\b/g) ?? [], file).toHaveLength(1);
      expect(html, file).toMatch(/<title>[^<]+<\/title>/);
      expect(html, file).toMatch(/<meta name="description" content="[^"]{70,160}"/);
    }
  });

  it('FR-META-05: noindex everywhere outside production; only 404 is noindex in production', () => {
    for (const { file, html } of pages) {
      const noindex = html.includes('<meta name="robots" content="noindex, nofollow">');
      expect(noindex, file).toBe(!isProduction || file.endsWith('404.html'));
    }
  });

  it('FR-PRV-02: analytics beacon only in production builds', () => {
    for (const { file, html } of pages) {
      if (!isProduction) expect(html, file).not.toContain('cloudflareinsights');
    }
  });

  it('robots.txt matches the environment', () => {
    const robots = readFileSync('dist/robots.txt', 'utf8');
    expect(robots).toContain(isProduction ? 'Allow: /' : 'Disallow: /');
  });

  it('host config files are shipped', () => {
    expect(existsSync('dist/_headers')).toBe(true);
    expect(existsSync('dist/_redirects')).toBe(true);
  });
});
