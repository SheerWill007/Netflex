import type { Metadata } from 'next';
import { Bebas_Neue, Roboto } from 'next/font/google';
import '@/styles/globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Netflix Clone - Watch Movies & TV Shows',
  description: 'A full-stack Netflix clone built with Next.js, TypeScript, and Express',
  icons: {
    icon: '/netflix.png',
    apple: '/netflix.png',
  },
  manifest: '/manifest.json',
  themeColor: '#141414',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
