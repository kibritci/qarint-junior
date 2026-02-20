import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/layout/Header";

export const metadata: Metadata = {
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
    locale: "en_US",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex-1 bg-gray-50/50 pb-20 md:pb-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
