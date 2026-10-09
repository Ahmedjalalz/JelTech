import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'About JelTech | Digital Canvas & Software',
  description:
    'Learn about JelTech, our engineering philosophy, our team, and how we craft distinctive digital experiences and intelligent software products.',
  path: '/about',
});

export default function AboutLayout({ children }) {
  return children;
}
