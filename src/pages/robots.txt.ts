import type { APIRoute } from 'astro';
import { robotsTxt } from '../lib/seo';
import { isProduction } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(robotsTxt(isProduction), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
