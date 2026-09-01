"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const handleComplete = () => {
      if (!preloaderRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "";
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -25,
        duration: 0.8,
        ease: "power2.inOut",
      }).to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.3"
      );
    };

    // Extended display duration as requested (2.8 seconds)
    const timer = setTimeout(() => {
      if (document.readyState === "complete") {
        handleComplete();
      } else {
        window.addEventListener("load", handleComplete, { once: true });
      }
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505] text-white selection:bg-white selection:text-black"
      aria-label="Loading Arafat's Portfolio"
    >
      <style>{`
        @keyframes loaderUmbralBW {
          0%, 100% {
            stop-color: rgba(255, 255, 255, 0.08);
          }
          50% {
            stop-color: rgba(255, 255, 255, 0.7);
          }
        }

        @keyframes loaderParticles {
          0%, 100% {
            transform: translateY(16px);
          }
          50% {
            transform: translateY(4px);
          }
        }

        .loader-particles {
          animation: loaderParticles 3.5s ease-in-out infinite;
        }

        .loader-animated-stop {
          animation: loaderUmbralBW 3.5s infinite;
        }
      `}</style>

      {/* Ambient monochrome glow */}
      <div className="absolute h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[140px]" />
      <div className="absolute h-64 w-64 rounded-full bg-white/[0.02] blur-[100px]" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Animated Custom Isometric 3D Monolith SVG Loader (Black & White Theme) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="210"
          width="210"
          viewBox="0 0 200 200"
          className="drop-shadow-[0_0_30px_rgba(255,255,255,0.22)]"
        >
          <g style={{ order: -1 }}>
            {/* Base platform */}
            <polygon
              transform="rotate(45 100 100)"
              strokeWidth="1.5"
              stroke="rgba(255,255,255,0.15)"
              fill="#171717"
              points="70,70 150,50 130,130 50,150"
            />

            {/* Diamond top plate with Monochrome Gradient */}
            <polygon
              strokeWidth="1.5"
              stroke="rgba(255,255,255,0.2)"
              fill="url(#gradienteBW)"
              points="100,70 150,100 100,130 50,100"
            />

            <defs>
              <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradienteBW">
                <stop style={{ stopColor: "#0a0a0a", stopOpacity: 1 }} offset="20%" />
                <stop style={{ stopColor: "#262626", stopOpacity: 1 }} offset="60%" />
              </linearGradient>
            </defs>

            {/* Left Accent Facet (Silver/Charcoal) */}
            <polygon
              transform="translate(20, 31)"
              strokeWidth="1.5"
              stroke="rgba(255,255,255,0.3)"
              fill="#525252"
              points="80,50 80,75 80,99 40,75"
            />

            {/* Gradient Beam Light Left (White Glow) */}
            <polygon
              transform="translate(20, 31)"
              strokeWidth="1"
              stroke=""
              fill="url(#gradienteBW2)"
              points="40,-40 80,-40 80,99 40,75"
            />

            <defs>
              <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradienteBW2">
                <stop style={{ stopColor: "rgba(255,255,255,0)", stopOpacity: 1 }} offset="20%" />
                <stop
                  className="loader-animated-stop"
                  style={{ stopColor: "rgba(255,255,255,0.5)", stopOpacity: 1 }}
                  offset="100%"
                />
              </linearGradient>
            </defs>

            {/* Right Accent Facet (Platinum) */}
            <polygon
              transform="rotate(180 100 100) translate(20, 20)"
              strokeWidth="1.5"
              stroke="rgba(255,255,255,0.4)"
              fill="#737373"
              points="80,50 80,75 80,99 40,75"
            />

            {/* Gradient Beam Light Right (White Glow) */}
            <polygon
              transform="rotate(0 100 100) translate(60, 20)"
              strokeWidth="1"
              stroke=""
              fill="url(#gradienteBW3)"
              points="40,-40 80,-40 80,85 40,110.2"
            />

            <defs>
              <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradienteBW3">
                <stop style={{ stopColor: "rgba(255,255,255,0)", stopOpacity: 1 }} offset="20%" />
                <stop
                  className="loader-animated-stop"
                  style={{ stopColor: "rgba(255,255,255,0.5)", stopOpacity: 1 }}
                  offset="100%"
                />
              </linearGradient>
            </defs>

            {/* Floating Particle Blocks (White, Platinum, Light Silver) */}
            <polygon
              transform="rotate(45 100 100) translate(80, 95)"
              strokeWidth="1"
              stroke="rgba(255,255,255,0.8)"
              fill="#ffffff"
              points="5,0 5,5 0,5 0,0"
              className="loader-particles"
            />
            <polygon
              transform="rotate(45 100 100) translate(80, 55)"
              strokeWidth="1"
              stroke="rgba(255,255,255,0.6)"
              fill="#d4d4d4"
              points="6,0 6,6 0,6 0,0"
              className="loader-particles"
              style={{ animationDelay: "0.5s" }}
            />
            <polygon
              transform="rotate(45 100 100) translate(70, 80)"
              strokeWidth="1"
              stroke="rgba(255,255,255,0.9)"
              fill="#ffffff"
              points="3,0 3,3 0,3 0,0"
              className="loader-particles"
              style={{ animationDelay: "1s" }}
            />

            {/* Lower Shadow Pedestal (Deep Obsidian / Black) */}
            <polygon
              strokeWidth="1"
              stroke="rgba(255,255,255,0.08)"
              fill="#121212"
              points="29.5,99.8 100,142 100,172 29.5,130"
            />
            <polygon
              transform="translate(50, 92)"
              strokeWidth="1"
              stroke="rgba(255,255,255,0.08)"
              fill="#0d0d0d"
              points="50,50 120.5,8 120.5,35 50,80"
            />
          </g>
        </svg>

        {/* Brand label & Shimmering Monochrome Loading Bar */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            ARAFAT<span className="text-white">.</span>
          </p>

          <div className="relative h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-1/2 animate-[shimmer_1.8s_infinite] rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
