// Pure environment rules, unit-tested. Read the actual value via src/lib/site.ts.
export type SiteEnv = 'development' | 'preview' | 'production';

/** Unknown or missing values fall back to development, so nothing is indexed by accident. */
export function parseSiteEnv(value: string | undefined): SiteEnv {
  return value === 'production' || value === 'preview' ? value : 'development';
}

/** Analytics only in production, and only when a token is configured (ADR-007, FR-PRV-02). */
export function analyticsTokenFor(env: SiteEnv, token: string | undefined): string | undefined {
  return env === 'production' && token ? token : undefined;
}
