export const SITE_NAME = 'JelTech';
export const SITE_TITLE = 'JelTech - Digital Canvas';
export const SITE_DESCRIPTION = 'Transform your ideas into digital reality with our innovative web and mobile solutions.';

const FALLBACK_SITE_URL = 'https://jeltech.net';

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

// Served from public/assets so social crawlers can fetch the actual logo image.
export const defaultOgImage = '/assets/JT-logo_bg.png';
export const defaultTwitterImage = defaultOgImage;

const buildSocialImage = () => ({
  url: defaultOgImage,
  width: 1080,
  height: 1080,
  type: 'image/png',
  alt: `${SITE_NAME} logo`,
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
