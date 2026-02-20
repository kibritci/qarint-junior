import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

export const metadata: Metadata = {
  title: "Qarint Junior - Gamified English Learning",
  description: "Fun and safe English learning platform for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="flex-1 bg-gray-50/50">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
