import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'JelTech - Digital Canvas',
  description: 'Transform your ideas into digital reality with our innovative web solutions.',
  openGraph: {
    title: 'JelTech - Digital Canvas',
    description: 'Transform your ideas into digital reality with our innovative web solutions.',
    type: 'website',
    url: 'https://jeltech.com',
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
