// The one place the build environment is read (docs/03-architecture/routing-and-page-model.md).
import { CF_WEB_ANALYTICS_TOKEN, SITE_ENV } from 'astro:env/server';
import { analyticsTokenFor, parseSiteEnv } from './env';

export const siteEnv = parseSiteEnv(SITE_ENV);
export const isProduction = siteEnv === 'production';
export const analyticsToken = analyticsTokenFor(siteEnv, CF_WEB_ANALYTICS_TOKEN);
