import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Terms & Conditions | JelTech',
  description:
    'Review the terms, conditions, and service agreements governing custom software development, web applications, and digital product services at JelTech.',
  path: '/terms-and-conditions',
});

export default function TermsAndConditionsLayout({ children }) {
  return children;
}
