import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AbkhaziaTrip - Туры в Абхазию",
  description:
    "Сервис подбора туров в Абхазию: туры, отели, поддержка менеджера и прозрачные условия.",
  metadataBase: new URL("https://abkhaziatrip.ru"),
  openGraph: {
    title: "AbkhaziaTrip - Туры в Абхазию",
    description:
      "Подбор туров в Абхазию с прозрачной ценой, поддержкой менеджера и контролем статуса заявки.",
    url: "https://abkhaziatrip.ru",
    siteName: "AbkhaziaTrip",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-pine-900">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
