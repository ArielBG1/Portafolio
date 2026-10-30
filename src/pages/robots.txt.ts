import type { APIRoute } from 'astro';

// Se genera en el build a partir de `site` (astro.config.mjs), así la URL del sitemap siempre coincide con el dominio.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl.href}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
