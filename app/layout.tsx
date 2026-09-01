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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
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
