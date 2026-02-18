export const SITE_NAME = 'JelTech';
export const SITE_TITLE = 'JelTech - Digital Canvas';
export const SITE_DESCRIPTION = 'Transform your ideas into digital reality with our innovative web and mobile solutions.';

const FALLBACK_SITE_URL = 'https://jeltech.com';

const resolveSiteUrl = () => {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL;

  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const siteUrl = resolveSiteUrl();
export const siteUrlObject = new URL(siteUrl);

export const defaultOgImage = '/opengraph-image';
export const defaultTwitterImage = '/twitter-image';

const buildSocialImage = () => ({
  url: defaultOgImage,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} social preview image`,
});

export const buildPageMetadata = ({ title, description, path = '/' }) => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: path,
    siteName: SITE_NAME,
    images: [buildSocialImage()],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [defaultTwitterImage],
  },
});
