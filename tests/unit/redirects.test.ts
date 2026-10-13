import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// FR-404-02: every _redirects rule is well-formed, unique, points at a live route and doesn't shadow one.
const rules = readFileSync('public/_redirects', 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split(/\s+/));

// ponytail: top-level pages only; extend with content routes when collections land (M4).
const liveRoutes = new Set(
  readdirSync('src/pages')
    .filter((f) => f.endsWith('.astro') && f !== '404.astro')
    .map((f) => (f === 'index.astro' ? '/' : `/${f.replace(/\.astro$/, '')}`)),
);

describe('public/_redirects', () => {
  it('has the form "<from> <to> 301"', () => {
    for (const rule of rules) {
      expect(rule).toHaveLength(3);
      expect(rule[0]).toMatch(/^\/[a-z0-9/-]*$/);
      expect(rule[2]).toBe('301');
    }
  });

  it('sources are unique and not live routes', () => {
    const sources = rules.map(([from]) => from);
    expect(new Set(sources).size).toBe(sources.length);
    for (const from of sources) expect(liveRoutes.has(from!)).toBe(false);
  });

  it('targets are live routes', () => {
    for (const [, to] of rules) expect(liveRoutes.has(to!)).toBe(true);
  });
});
