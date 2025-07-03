import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Liyana Nour Extrait',
  description: 'KI-gestützter E-Commerce für luxuriöse Parfums',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}