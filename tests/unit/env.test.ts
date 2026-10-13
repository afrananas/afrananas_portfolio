import { describe, expect, it } from 'vitest';
import { analyticsTokenFor, parseSiteEnv } from '../../src/lib/env';

describe('parseSiteEnv', () => {
  it.each([
    ['production', 'production'],
    ['preview', 'preview'],
    ['development', 'development'],
    [undefined, 'development'],
    ['', 'development'],
    ['Production', 'development'],
  ] as const)('%s → %s', (input, expected) => {
    expect(parseSiteEnv(input)).toBe(expected);
  });
});

describe('FR-PRV-02: analytics only in production with a token', () => {
  it('production + token → token', () =>
    expect(analyticsTokenFor('production', 'abc')).toBe('abc'));
  it('production without token → none', () =>
    expect(analyticsTokenFor('production', undefined)).toBeUndefined());
  it('production + empty token → none', () =>
    expect(analyticsTokenFor('production', '')).toBeUndefined());
  it('preview + token → none', () => expect(analyticsTokenFor('preview', 'abc')).toBeUndefined());
  it('development + token → none', () =>
    expect(analyticsTokenFor('development', 'abc')).toBeUndefined());
});
