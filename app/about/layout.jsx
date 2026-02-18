import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'About JelTech',
  description:
    'Learn about JelTech, our team, and how we build modern digital products that drive business growth.',
  path: '/about',
});

export default function AboutLayout({ children }) {
  return children;
}
