import { Providers } from './providers';
import './globals.css';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  buildPageMetadata,
  siteUrl,
  siteUrlObject,
} from '@/lib/seo';

const homeMetadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}/assets/jt-logo-letters.png`,
  email: 'Contact@jeltech.net',
  telephone: '+92 314 3394966',
  sameAs: [
    'https://www.instagram.com/jeltech.official',
    'https://x.com/jeltechofficial',
    'https://www.linkedin.com/company/jeltech-group',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
};

export const metadata = {
  metadataBase: siteUrlObject,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'JelTech',
    'web development',
    'mobile app development',
    'custom software',
    'UI UX design',
    'SEO services',
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  manifest: '/manifest.webmanifest',
  alternates: homeMetadata.alternates,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/favicon.ico',
    icon: '/assets/jt-logo-letters.png',
    apple: '/assets/jt-logo-letters.png',
  },
  openGraph: homeMetadata.openGraph,
  twitter: homeMetadata.twitter,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
