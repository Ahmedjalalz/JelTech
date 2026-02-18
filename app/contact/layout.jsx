import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Contact JelTech',
  description:
    'Get in touch with JelTech to discuss your website, app, or custom software project and request a tailored quote.',
  path: '/contact',
});

export default function ContactLayout({ children }) {
  return children;
}
