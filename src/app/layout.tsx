import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WorkSync | Personalized Project Management',
  description: 'Organize, prioritize, track, and complete tasks with high velocity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
