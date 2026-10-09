import { buildPageMetadata, siteUrl } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'About JelTech | Software Engineering & AI Products',
  description:
    'Learn about JelTech’s engineering mission, multidisciplinary team, and dual focus on high-performance digital solutions and AI-driven software products.',
  path: '/about',
  keywords: [
    'About JelTech',
    'software engineering team',
    'AI product development',
    'digital canvas',
    'web development studio',
  ],
});

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About JelTech',
  url: `${siteUrl}/about`,
  description:
    'Learn about JelTech’s engineering mission, multidisciplinary team, and dual focus on high-performance digital solutions and AI-driven software products.',
  publisher: {
    '@type': 'Organization',
    name: 'JelTech',
    url: siteUrl,
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      {children}
    </>
  );
}
