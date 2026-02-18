import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TITLE } from '@/lib/seo';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          backgroundImage: 'linear-gradient(120deg, #020617 0%, #0f172a 45%, #1e293b 100%)',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(148, 163, 184, 0.4)',
            borderRadius: '999px',
            padding: '10px 18px',
            fontSize: 28,
            marginBottom: 24,
            opacity: 0.95,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 980,
            marginBottom: 22,
          }}
        >
          {SITE_TITLE}
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.35,
            color: '#cbd5e1',
            maxWidth: 980,
          }}
        >
          Strategy, design, and development for ambitious products.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
