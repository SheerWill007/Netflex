import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Bebas_Neue, Roboto } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import BrowseProvider from '@/components/BrowseProvider';
import Navbar, { NavCategory, NavNotification } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchCategories } from '@/lib/api';
import { clerkEnabled } from '@/lib/auth';
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
  title: 'Netflex — Free classic films and series',
  description:
    'Stream public-domain and openly licensed movies and TV series for free: classic horror, film noir, silent comedy, Blender open movies and more.',
  icons: {
    icon: '/netflex.png',
    apple: '/netflex.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#141414',
};

// Pages read from the Express API at request time, so nothing is fetched during `next build`.
export const dynamic = 'force-dynamic';

async function loadNav(): Promise<{ categories: NavCategory[]; notifications: NavNotification[] }> {
  try {
    const categories = await fetchCategories();
    const notifications = categories
      .flatMap((c) => c.movies.slice(0, 1).map((m) => ({ id: m.id, title: m.title, note: `Now streaming in ${c.name}` })))
      .slice(0, 3);
    return { categories: categories.map(({ id, name }) => ({ id, name })), notifications };
  } catch {
    return { categories: [], notifications: [] };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await loadNav();

  const page = (
    <html lang="en" className={`${bebasNeue.variable} ${roboto.variable}`}>
      <body>
        <BrowseProvider>
          <Suspense fallback={<div className="nav-placeholder" />}>
            <Navbar categories={nav.categories} notifications={nav.notifications} />
          </Suspense>
          <main className="page">{children}</main>
          <Footer />
        </BrowseProvider>
      </body>
    </html>
  );

  return clerkEnabled ? <ClerkProvider>{page}</ClerkProvider> : page;
}
