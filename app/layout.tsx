import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "./components/GSAPProvider";
import ParticleBackground from "./components/ParticleBackground";
import ButtonExplosion from "./components/ButtonExplosion";
import Preloader from "./components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arafat | Full-Stack MERN Developer",
  description: "Portfolio of Arafat - Full-Stack MERN Developer specializing in React, Next.js, Node.js, Express, and MongoDB.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#edf0f5] text-slate-900"
      >
        <Preloader />
        <GSAPProvider>
          <ParticleBackground />
          <ButtonExplosion />
          {children}
        </GSAPProvider>
      </body>
    </html>
  );
}
