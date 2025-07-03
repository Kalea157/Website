'use client';

import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Liyana Nour Extrait',
  description: 'KI-gestützter E-Commerce für luxuriöse Parfums',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}