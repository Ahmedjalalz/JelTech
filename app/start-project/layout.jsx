import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Start Your Project',
  description:
    'Share your project goals with JelTech and receive a clear plan for design, development, launch, and support.',
  path: '/start-project',
});

export default function StartProjectLayout({ children }) {
  return children;
}
