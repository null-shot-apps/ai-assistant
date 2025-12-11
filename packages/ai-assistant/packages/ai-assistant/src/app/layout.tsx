import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI DeFi Finance Assistant',
  description: 'AI-powered personal finance assistant for DeFi investments and automated payments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

