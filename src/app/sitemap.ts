import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travio.co.uk';

  const routes = [
    '',
    '/about',
    '/app',
    '/blog',
    '/contact',
    '/get-quote',
    '/how-it-works',
    '/pricing',
    '/theft-risk-score',
    '/products/s5-protection',
    '/products/s7-protection',
    '/products/remote-immobilisation',
    '/vehicles/supercars',
    '/vehicles/luxury-suvs',
    '/vehicles/motorhomes-caravans',
    '/vehicles/motorcycles'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
