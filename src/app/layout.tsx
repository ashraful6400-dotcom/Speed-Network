import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SpeedNetworkBD | Premium High-Speed Broadband Internet Provider',
  description: 'Connect to SpeedNetworkBD, Bangladesh\'s leading premium optical fiber broadband ISP. Experience ultra-stable internet with zero lag, dedicated BDIX speeds, and 24/7 technical support.',
  keywords: 'internet provider dhaka, broadband bangladesh, high speed fiber dhaka, speednetworkbd, ISP dhaka, dedicated fiber banani gulshan',
  openGraph: {
    title: 'SpeedNetworkBD | Premium Broadband Internet',
    description: 'Connect to SpeedNetworkBD, Bangladesh\'s leading premium optical fiber broadband ISP.',
    type: 'website',
    locale: 'en_BD',
    siteName: 'SpeedNetworkBD',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-light dark:bg-brand-deep text-brand-text-light dark:text-brand-text-dark">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
