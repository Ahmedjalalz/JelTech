import { siteUrl } from '@/lib/seo';

const routes = [
  {
    path: '/',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/about',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/contact',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/products',
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  {
    path: '/products/growthpilot',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/start-project',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/privacy-policy',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  {
    path: '/terms-and-conditions',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
];

export default function sitemap() {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
