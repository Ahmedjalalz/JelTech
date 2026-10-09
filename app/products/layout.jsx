import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Our Products | JelTech Software Initiatives',
  description:
    'Discover JelTech’s in-house AI-powered software products, including GrowthPilot AI and People Power Hub.',
  path: '/products',
});

export default function ProductsLayout({ children }) {
  return children;
}
