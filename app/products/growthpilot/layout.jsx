import { buildPageMetadata, siteUrl } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'GrowthPilot AI — Marketing Intelligence Platform | JelTech',
  description:
    'GrowthPilot AI is JelTech’s flagship marketing platform in development, engineered to automate SEO, Meta ad campaigns, and omnichannel lead triage for small businesses.',
  path: '/products/growthpilot',
  image: '/assets/products/growthpilot_preview.svg',
  imageAlt: 'GrowthPilot AI interactive prototype workspace preview',
  keywords: [
    'GrowthPilot AI',
    'marketing intelligence',
    'SEO intelligence',
    'Meta ads manager',
    'omnichannel lead management',
    'small business marketing',
    'JelTech AI software',
  ],
});

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GrowthPilot AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web-based',
  url: 'https://growth.jeltech.net',
  description:
    'An AI-powered marketing intelligence platform in active development by JelTech, designed to automate SEO auditing, Meta ad optimization, and omnichannel customer communication for small businesses.',
  softwareVersion: 'Interactive Prototype',
  creator: {
    '@type': 'Organization',
    name: 'JelTech',
    url: siteUrl,
  },
};

export default function GrowthPilotLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {children}
    </>
  );
}
