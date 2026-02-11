import { Providers } from './providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://jeltech.com'),
  title: 'JelTech - Digital Canvas',
  description: 'Transform your ideas into digital reality with our innovative web solutions.',
  icons: {
    icon: '/assets/jt-logo-icon.png',
    apple: '/assets/jt-logo-icon.png',
  },
  openGraph: {
    title: 'JelTech - Digital Canvas',
    description: 'Transform your ideas into digital reality with our innovative web solutions.',
    type: 'website',
    url: 'https://jeltech.com',
    images: [
      {
        url: '/assets/jt-logo-full.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JelTech - Digital Canvas',
    description: 'Transform your ideas into digital reality with our innovative web solutions.',
    images: ['/assets/jt-logo-full.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
