// Post-deploy smoke test (docs/04-engineering/quality-gates.md#gate-3-production-merge-to-main).
// Usage: node scripts/smoke.mjs <base-url> [--env=production|preview]
const [base, ...flags] = process.argv.slice(2);
const env = flags.find((f) => f.startsWith('--env='))?.split('=')[1] ?? 'production';
if (!base) {
  console.error('Usage: node scripts/smoke.mjs <base-url> [--env=production|preview]');
  process.exit(2);
}

const url = (path) => new URL(path, base).toString();
const get = (path) => fetch(url(path), { redirect: 'manual' });
const results = [];
const check = async (name, fn) => {
  try {
    const detail = await fn();
    results.push({ ok: true, name, detail });
  } catch (err) {
    results.push({ ok: false, name, detail: err.message });
  }
};
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

// A fresh deploy can take a few seconds to propagate.
for (let i = 0; i < 12; i++) {
  const res = await get('/').catch(() => null);
  if (res?.ok) break;
  await new Promise((r) => setTimeout(r, 5000));
}

const home = await get('/');
const html = await home.text();

await check('GET / → 200 with the owner name', async () => {
  assert(home.status === 200, `status ${home.status}`);
  assert(html.includes('Afran Anas'), 'name missing');
});

await check('unknown path → 404 (FR-404-01)', async () => {
  const res = await get('/no-such-page-smoke');
  assert(res.status === 404, `status ${res.status}`);
});

await check('_redirects: /home → 301 / (FR-404-02)', async () => {
  const res = await get('/home');
  assert(res.status === 301, `status ${res.status}`);
  assert(
    new URL(res.headers.get('location'), base).pathname === '/',
    `location ${res.headers.get('location')}`,
  );
});

await check('HTML handling: /index.html redirects to /', async () => {
  const res = await get('/index.html');
  assert(res.status >= 300 && res.status < 400, `status ${res.status}`);
  return `status ${res.status} → ${res.headers.get('location')}`;
});

await check('security headers (NFR-SEC-02)', async () => {
  const h = home.headers;
  const missing = [
    ['content-security-policy', (v) => v.includes("frame-ancestors 'none'")],
    ['x-content-type-options', (v) => v === 'nosniff'],
    ['referrer-policy', (v) => v === 'strict-origin-when-cross-origin'],
    ['permissions-policy', (v) => v.includes('camera=()')],
    ['x-frame-options', (v) => v === 'DENY'],
    ['cross-origin-opener-policy', (v) => v === 'same-origin'],
    ...(base.startsWith('https:')
      ? [['strict-transport-security', (v) => /max-age=(\d+)/.exec(v)?.[1] >= 31536000]]
      : []),
  ].filter(([name, ok]) => !(h.get(name) && ok(h.get(name))));
  assert(missing.length === 0, `missing/wrong: ${missing.map(([n]) => n).join(', ')}`);
});

await check('hashed assets are immutable (NFR-PERF-06)', async () => {
  const asset = /\/_astro\/[^"')\s]+/.exec(html)?.[0];
  assert(asset, 'no /_astro/ asset referenced');
  const res = await get(asset);
  assert(res.status === 200, `status ${res.status} for ${asset}`);
  assert(
    /immutable/.test(res.headers.get('cache-control') ?? ''),
    `cache-control ${res.headers.get('cache-control')}`,
  );
});

await check(`robots.txt and noindex match env=${env} (FR-META-05)`, async () => {
  const robots = await (await get('/robots.txt')).text();
  const noindex = html.includes('noindex');
  if (env === 'production') {
    assert(robots.includes('Allow: /'), 'robots.txt does not allow crawling');
    assert(!noindex, 'home page is noindex');
  } else {
    assert(robots.includes('Disallow: /'), 'robots.txt allows crawling');
    assert(noindex, 'home page is indexable');
  }
});

for (const r of results)
  console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.detail ? `  (${r.detail})` : ''}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\nsmoke ${base} env=${env}: ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
