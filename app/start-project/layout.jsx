import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Start a Project | JelTech Software Studio',
  description:
    'Share your project goals with JelTech. We build bespoke software, interactive web applications, and AI integrations with transparent timelines and dedicated engineering.',
  path: '/start-project',
  keywords: [
    'Start a project',
    'hire developers',
    'custom web development quote',
    'software proposal',
    'JelTech client onboarding',
  ],
});

export default function StartProjectLayout({ children }) {
  return children;
}
