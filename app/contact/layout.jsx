import { buildPageMetadata, siteUrl } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Contact JelTech | Software Engineering & Product Inquiries',
  description:
    'Get in touch with the JelTech team to discuss bespoke software engineering, interactive web applications, or GrowthPilot AI early access partnership.',
  path: '/contact',
  keywords: [
    'Contact JelTech',
    'hire software developers',
    'software agency contact',
    'custom web application inquiry',
    'GrowthPilot AI early access',
  ],
});

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact JelTech',
  url: `${siteUrl}/contact`,
  description:
    'Get in touch with the JelTech team to discuss bespoke software engineering, interactive web applications, or GrowthPilot AI early access partnership.',
  mainEntity: {
    '@type': 'Organization',
    name: 'JelTech',
    url: siteUrl,
    email: 'Contact@jeltech.net',
    telephone: '+92 314 3394966',
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      {children}
    </>
  );
}
