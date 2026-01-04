import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'

export const metadata: Metadata = {
  title: {
    default: "ProductivityTech.io",
    template: "%s | ProductivityTech.io",
  },
  description: "Productivity tools, apps, and resources to help you work smarter",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ProductivityTech.io',
    title: 'ProductivityTech.io',
    description: 'Productivity tools, apps, and resources to help you work smarter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProductivityTech.io',
    description: 'Productivity tools, apps, and resources to help you work smarter',
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolvedTheme = theme === 'dark' || (!theme && systemPrefersDark) ? 'dark' : 'light';
                  document.documentElement.classList.add(resolvedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ConditionalHeader />
          <main className="flex-grow pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

