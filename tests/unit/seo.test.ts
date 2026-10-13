import { describe, expect, it } from 'vitest';
import { buildTitle, robotsTxt } from '../../src/lib/seo';

describe('FR-META-01: buildTitle', () => {
  it('home', () =>
    expect(buildTitle()).toBe('Afran Anas — Software Engineer (Backend · AI · Full-Stack)'));
  it('other pages', () => expect(buildTitle('Projects')).toBe('Projects — Afran Anas'));
});

describe('FR-META-05: robotsTxt', () => {
  it('production allows crawling', () => expect(robotsTxt(true)).toBe('User-agent: *\nAllow: /\n'));
  it('other environments disallow everything', () =>
    expect(robotsTxt(false)).toBe('User-agent: *\nDisallow: /\n'));
});
