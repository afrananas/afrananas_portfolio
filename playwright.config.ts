import { defineConfig, devices } from '@playwright/test';

// CI (authoritative): `wrangler dev` serves dist/ with real _headers, _redirects and 404
// handling, on Playwright's bundled Chromium + WebKit.
// Fallback for machines that can't run workerd or the bundled browsers (e.g. macOS 12):
// `npm run test:e2e:fallback` → `astro preview` + installed Chrome; host-behavior tests skip.
const fallback = process.env.E2E_SERVER === 'preview';
const channel = process.env.E2E_CHANNEL; // e.g. 'chrome'
const port = 8788;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, // flaky tests get quarantined, not retried (testing-strategy.md)
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], channel } },
    {
      name: 'chromium-mobile',
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 360, height: 640 } },
    },
    { name: 'webkit-mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: fallback ? `npx astro preview --port ${port} --host 127.0.0.1` : `npm run serve`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
