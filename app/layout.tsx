import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import CursorFollower from "./utils/CursorFollower";
import Footer from "./components/Footer";
import Lenis from "./utils/Lenis";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const powerGrotesk = localFont({
  src: "./fonts/PowerGrotesk-Regular.woff",
  variable: "--font-power-grotesk",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Paweł Bilski",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${powerGrotesk.variable} bg-secondBackground font-mainFont antialiased`}
      >
        {" "}
        {/* <Lenis> */}
        <Header />
        {children}
        <CursorFollower />
        {/* <Footer /> */}
        {/* </Lenis> */}
      </body>
    </html>
  );
}
