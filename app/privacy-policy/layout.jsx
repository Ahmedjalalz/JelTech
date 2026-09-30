import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | JelTech',
  description:
    'Learn how JelTech collects, uses, protects, and handles your personal information and project data.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
