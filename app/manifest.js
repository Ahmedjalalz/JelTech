import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from '@/lib/seo';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/assets/jt-logo-letters.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/jt-logo-letters.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    id: siteUrl,
  };
}
