"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const GREETINGS = [
  { text: "Welcome", style: "font-['Great_Vibes',cursive] font-normal tracking-wide text-[22px] sm:text-[25px]" },
  { text: "স্বাগতম", style: "font-['Galada',cursive] font-normal tracking-wide text-[18px] sm:text-[21px]" },
  { text: "Bienvenido", style: "font-['Alex_Brush',cursive] font-normal tracking-wide text-[22px] sm:text-[25px]" },
  { text: "Bienvenue", style: "font-['Parisienne',cursive] font-normal tracking-wide text-[20px] sm:text-[23px]" },
  { text: "Benvenuto", style: "font-['Allura',cursive] font-normal tracking-wider text-[22px] sm:text-[25px]" },
  { text: "ようこそ", style: "font-['Yuji_Boku',serif] font-normal tracking-widest text-[17px] sm:text-[19px]" },
  { text: "Willkommen", style: "font-['Satisfy',cursive] font-normal tracking-wide text-[18px] sm:text-[20px]" },
  { text: "Bem-vindo", style: "font-['Sacramento',cursive] font-bold tracking-wide text-[22px] sm:text-[25px]" },
  { text: "欢迎", style: "font-['Ma_Shan_Zheng',cursive] font-normal tracking-widest text-[18px] sm:text-[21px]" },
  { text: "स्वागतम्", style: "font-['Kalam',cursive] font-bold tracking-wide text-[18px] sm:text-[20px]" },
  { text: "أهلاً وسهلاً", style: "font-['Aref_Ruqaa',serif] font-bold tracking-normal text-[19px] sm:text-[22px]" },
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < GREETINGS.length) {
        setIndex(currentIndex);
      } else {
        clearInterval(interval);
        handleExit();
      }
    }, 260);

    const handleExit = () => {
      if (!preloaderRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "";
        },
      });

      // Smooth elegant upward curtain lift (Apple / Luxury Portfolio style)
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        duration: 0.35,
        ease: "power2.in",
      }).to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
    };

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  const currentGreeting = GREETINGS[index] || GREETINGS[0];

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black text-white selection:bg-white selection:text-black will-change-transform"
      aria-label="Loading portfolio"
    >
      {/* Ambient monochromatic glow */}
      <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-white/[0.03] blur-[140px]" />

      {/* Center Multilingual Greeting Container */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 will-change-transform"
      >
        {/* Animated Greeting Word with Unique Typography Style per Language */}
        <div className="flex items-center justify-center min-h-[40px] sm:min-h-[46px] py-1">
          <h1
            key={currentGreeting.text}
            className={`text-white select-none flex items-center gap-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] animate-[fadeIn_0.15s_ease-out] ${currentGreeting.style}`}
          >
            <span>{currentGreeting.text}</span>
            <span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          </h1>
        </div>

        {/* Minimal Black & White Progress Bar */}
        <div className="mt-4 sm:mt-5 h-[2px] w-24 sm:w-28 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-250 ease-out"
            style={{
              width: `${((index + 1) / GREETINGS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
