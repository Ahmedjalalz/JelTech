export const SITE_NAME = 'JelTech';
export const SITE_TITLE = 'JelTech | Software Development & AI Products';
export const SITE_DESCRIPTION =
  'JelTech builds modern software and digital solutions for businesses while developing GrowthPilot AI, an AI-powered marketing intelligence platform.';

const FALLBACK_SITE_URL = 'https://www.jeltech.net';

const resolveSiteUrl = () => {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL;

  try {
    const parsed = new URL(rawSiteUrl);
    if (parsed.hostname === 'jeltech.net') {
      return 'https://www.jeltech.net';
    }
    return parsed.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const siteUrl = resolveSiteUrl();
export const siteUrlObject = new URL(siteUrl);

// Served from public/assets so social crawlers can fetch the actual image.
export const defaultOgImage = '/assets/JT-logo_bg.png';
export const defaultTwitterImage = defaultOgImage;

const buildSocialImage = (imagePath = defaultOgImage, altText = `${SITE_NAME} | Software Development & AI Products`) => ({
  url: imagePath,
  width: 1200,
  height: 630,
  type: imagePath.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
  alt: altText,
});

export const buildPageMetadata = ({
  title,
  description,
  path = '/',
  image = defaultOgImage,
  imageAlt,
  keywords,
}) => {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;
  const fullCanonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;
  const resolvedTitleString = title || SITE_TITLE;
  const normalizedTitle = resolvedTitleString.includes(SITE_NAME)
    ? resolvedTitleString
    : `${resolvedTitleString} | ${SITE_NAME}`;

  return {
    title: {
      absolute: normalizedTitle,
    },
    description: description || SITE_DESCRIPTION,
    keywords,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title: normalizedTitle,
      description: description || SITE_DESCRIPTION,
      type: 'website',
      url: fullCanonicalUrl,
      siteName: SITE_NAME,
      images: [buildSocialImage(image, imageAlt || normalizedTitle)],
    },
    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description: description || SITE_DESCRIPTION,
      images: [image],
    },
  };
};
