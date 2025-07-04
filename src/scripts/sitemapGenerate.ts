// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import path from 'path';
import { citiesList } from './citiesList';

const staticRoutes = ['/', '/europe'];
const baseUrl = 'https://theliferank.com';

const allRoutes = [
  ...staticRoutes,
  ...citiesList.map((city) => `/healthcare/${city}`),
  ...citiesList.map((city) => `/budget/${city}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated in /public');
