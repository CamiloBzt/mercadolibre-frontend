import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'MercadoLibre',
    default: 'MercadoLibre - Buscar productos',
  },
  description: 'Encuentra productos en MercadoLibre de forma rápida y segura',
  keywords: ['mercadolibre', 'productos', 'compras', 'ecommerce'],
  authors: [{ name: 'MercadoLibre' }],
  creator: 'MercadoLibre',
  publisher: 'MercadoLibre',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mercadolibre.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://mercadolibre.com',
    title: 'MercadoLibre - Buscar productos',
    description: 'Encuentra productos en MercadoLibre de forma rápida y segura',
    siteName: 'MercadoLibre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MercadoLibre - Buscar productos',
    description: 'Encuentra productos en MercadoLibre de forma rápida y segura',
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
