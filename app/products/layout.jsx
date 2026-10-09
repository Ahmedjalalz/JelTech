import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Software Products & AI Initiatives | JelTech',
  description:
    'Explore JelTech’s proprietary software products, featuring GrowthPilot AI for marketing intelligence and People Power Hub for workforce analytics.',
  path: '/products',
  keywords: [
    'JelTech products',
    'GrowthPilot AI',
    'People Power Hub',
    'AI marketing software',
    'HR intelligence software',
    'software initiatives',
  ],
});

export default function ProductsLayout({ children }) {
  return children;
}
