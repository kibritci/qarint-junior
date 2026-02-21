import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavigationProgress from "./components/layout/NavigationProgress";
import CookieBanner from "@/components/legal/CookieBanner";
import dynamic from 'next/dynamic';

const RiveMascot = dynamic(() => import('@/components/rive/RiveMascot'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-20 left-4 z-30 md:bottom-6 md:left-6 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center" aria-hidden>
      <span className="text-4xl md:text-5xl">🦁</span>
    </div>
  ),
});
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ParentalLockWrapper from "./components/providers/ParentalLockWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
  az: "az_AZ",
  es: "es_ES",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ogLocale = OG_LOCALE[locale] ?? "en_US";

  return {
    title: {
      default: "Qarint Junior – Learn English Through Games",
      template: "%s | Qarint Junior",
    },
    description:
      "Fun and safe English learning platform for children. Mini-games, vocabulary practice, and Cambridge YLE–aligned content.",
    keywords: [
      "English for kids",
      "learn English",
      "children games",
      "Cambridge YLE",
      "vocabulary",
      "language learning",
      "educational games",
    ],
    metadataBase: new URL("https://qarint.games"),
    openGraph: {
      title: "Qarint Junior – Learn English Through Games",
      description:
        "Play fun mini-games, build vocabulary, and learn English — designed for children.",
      url: "https://qarint.games",
      siteName: "Qarint Junior",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Qarint Junior – Learn English Through Games",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Qarint Junior – Learn English Through Games",
      description:
        "Fun mini-games and vocabulary practice for children. Play, learn, grow.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={nunito.variable} suppressHydrationWarning>
      <body className={nunito.className}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NavigationProgress />
            <ParentalLockWrapper>
              <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                <Header />
                <main className="flex-1 bg-gray-50/50 dark:bg-gray-900/80 pb-20 md:pb-0">{children}</main>
                <Footer />
                <CookieBanner />
                <RiveMascot />
              </div>
            </ParentalLockWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
