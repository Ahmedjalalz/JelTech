import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy | JelTech',
  description:
    'Review how JelTech collects, uses, and safeguards your personal and project information across our software engineering services and digital products.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
