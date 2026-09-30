import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Terms & Conditions | JelTech',
  description:
    'Review the terms, conditions, and service agreements governing software development, design, and digital consulting at JelTech.',
  path: '/terms-and-conditions',
});

export default function TermsAndConditionsLayout({ children }) {
  return children;
}
