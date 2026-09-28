"use client";

import { useState, useRef } from "react";
import { siteConfig } from "@/lib/data/siteConfig";

export default function Footer() {
  const { personal, socialLinks } = siteConfig;
  const currentYear = new Date().getFullYear();

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#f4f6fa] dark:bg-[#060608] dark:border-white/10 transition-colors duration-300 pb-20 sm:pb-24 md:pb-0">
      {/* AMBIENT BACKGROUND GLOW (SOFT & SUBTLE) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-52 bg-gradient-to-t from-indigo-500/5 via-blue-500/2 to-transparent dark:from-indigo-950/20 dark:via-blue-950/10 dark:to-transparent blur-2xl -z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* UPPER ROW: COPYRIGHT & LINKS */}
        <div className="flex flex-col gap-4 pt-10 pb-6 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-800 dark:text-zinc-300">
              © {currentYear} {personal.name}.
            </span>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-zinc-500 dark:text-zinc-500">All rights reserved.</span>
          </div>

          {/* Right: Social & Quick Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-xs sm:text-sm">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {social.name}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white cursor-pointer ml-1"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* GIGANTIC BRAND TYPOGRAPHY BANNER WITH 40% BOTTOM FADE & SOFT TONED SPOTLIGHT */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={handleMouseLeave}
        onClick={scrollToTop}
        title="Click to scroll to top"
        className="relative w-full h-[15vw] sm:h-[14vw] md:h-[13vw] lg:h-[12.5vw] min-h-[110px] sm:min-h-[140px] md:min-h-[160px] overflow-hidden select-none cursor-pointer mt-2 sm:mt-4 md:mt-6"
      >
        {/* WRAPPER WITH LINEAR BOTTOM 40% TRANSPARENT GRADIENT MASK */}
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0) 100%)",
          }}
        >
          {/* BASE MUTED WATERMARK LAYER (SOFT TONED) */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none">
            <span
              className="w-full text-center font-black tracking-[-0.04em] uppercase leading-[0.82] text-[18vw] sm:text-[17vw] md:text-[16vw] lg:text-[15.5vw] text-zinc-900/[0.07] dark:text-white/[0.09] whitespace-nowrap transition-colors duration-300"
              style={{
                fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
              }}
            >
              ARAFAT
            </span>
          </div>

          {/* SPOTLIGHT RADIAL MASK LAYER - SOFT & REFINED LIGHTING */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.68 : 0,
              maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
            }}
          >
            <div className="flex h-full w-full items-end justify-center">
              <span
                className="w-full text-center font-black tracking-[-0.04em] uppercase leading-[0.82] text-[18vw] sm:text-[17vw] md:text-[16vw] lg:text-[15.5vw] whitespace-nowrap text-transparent bg-clip-text animate-spectrum-drift"
                style={{
                  fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
                  backgroundImage:
                    "linear-gradient(90deg, #df6b82, #d59556, #58b492, #539ed2, #8375cf, #cf68b1, #df6b82)",
                  backgroundSize: "200% 100%",
                }}
              >
                ARAFAT
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
