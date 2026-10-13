import { expect, expectNoA11yViolations, hostBehaviorUnavailable, test } from './fixtures';

const routes = ['/', '/no-such-page'];

test('FR-HOME-01: name and positioning are visible without scrolling', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Afran Anas' })).toBeInViewport();
  await expect(page.getByText('Software Engineer — Backend · AI · Full-Stack')).toBeInViewport();
});

test('FR-GLB-03: skip link is the first focus stop and moves focus to main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('FR-META-01: home title follows the template', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Afran Anas — Software Engineer (Backend · AI · Full-Stack)');
});

test('FR-404-01: unknown paths return 404 with a way home', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute(
    'href',
    '/',
  );
});

test('FR-GLB-07: no link opens a new tab', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('a[target="_blank"]')).toHaveCount(0);
  }
});

test('NFR-A11Y-02: no axe violations', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expectNoA11yViolations(page);
  }
});

test.describe('host behavior (wrangler dev / production)', () => {
  test.skip(hostBehaviorUnavailable, 'needs _headers/_redirects (runs in CI and smoke tests)');

  test('NFR-SEC-02: security headers are served', async ({ request }) => {
    const headers = (await request.get('/')).headers();
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['permissions-policy']).toContain('camera=()');
  });

  test('FR-404-02: _redirects rules return 301', async ({ request }) => {
    const response = await request.get('/home', { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(new URL(response.headers()['location'] ?? '', 'http://x').pathname).toBe('/');
  });
});
