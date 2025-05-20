import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import CursorFollower from "../components/common/CursorFollower";
import Footer from "../components/Footer";
import GoUpBtn from "../components/common/GoUpBtn";
import Lenis from "../components/common/Lenis";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "../context/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const powerGrotesk = localFont({
  src: "../fonts/PowerGrotesk-Regular.woff",
  variable: "--font-power-grotesk",
  weight: "100 200 300 400 500 600 700 800 900",
});

const doto = localFont({
  src: "../fonts/Doto-VariableFont_ROND,wght.ttf",
  variable: "--font-doto",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Paweł Bilski",
  description: "Frontend Developer / Software Engineer",
  openGraph: {
    title: "Paweł Bilski",
    description: "Frontend Developer / Software Engineer",
    siteName: "Paweł Bilski",
    url: "https://pawelbilski.com",
    images: [
      {
        url: "https://next-portfolio-beta-ecru.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Paweł Bilski - Frontend Developer",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${powerGrotesk.variable} ${doto.variable} flex flex-col`}
      >
        <Lenis>
          <CursorFollower />
          <ThemeProvider>
            <Header locale={locale} />
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
            <GoUpBtn />
            <Footer />
          </ThemeProvider>
        </Lenis>
        <Analytics />
      </body>
    </html>
  );
}
