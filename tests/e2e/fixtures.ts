import AxeBuilder from '@axe-core/playwright';
import { test as base, expect, type Page } from '@playwright/test';

/** True when the server is not host-faithful (astro preview): skip _headers/_redirects tests. */
export const hostBehaviorUnavailable = process.env.E2E_SERVER === 'preview';

/**
 * Every test fails on console errors, page errors or CSP violations
 * (docs/04-engineering/testing-strategy.md#e2e-flows).
 */
export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page }, use) => {
      const problems: string[] = [];
      page.on('console', (msg) => {
        // Resource failures are judged by the response listener below, which can tell an
        // intentional document 404 (e.g. visiting /no-such-page) from a missing font or script.
        if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
          problems.push(`console: ${msg.text()}`);
        }
      });
      page.on('response', (response) => {
        if (response.status() >= 400 && response.request().resourceType() !== 'document') {
          problems.push(`subresource ${response.status()}: ${response.url()}`);
        }
      });
      page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
      await page.addInitScript(() => {
        document.addEventListener('securitypolicyviolation', (e) =>
          console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`),
        );
      });
      await use(problems);
      expect(problems, 'console errors / CSP violations').toEqual([]);
    },
    { auto: true },
  ],
});

/** NFR-A11Y-02: zero axe violations against WCAG 2.2 AA tags. */
export async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}

export { expect };
