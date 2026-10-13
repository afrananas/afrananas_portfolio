// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

// Spec: docs/03-architecture/ (routing, SEO, ADR-002/004/007).
// `site` (production origin) is set once the domain exists (Q4); canonical URLs and the
// sitemap depend on it and arrive with it (M5).
export default defineConfig({
  trailingSlash: 'never',
  build: { format: 'file' },
  env: {
    schema: {
      SITE_ENV: envField.enum({
        context: 'server',
        access: 'public',
        values: ['development', 'preview', 'production'],
        default: 'development',
      }),
      // Public by design: it appears in page HTML (ADR-007).
      CF_WEB_ANALYTICS_TOKEN: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
