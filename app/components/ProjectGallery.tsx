"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface GalleryItem {
  id: string;
  src: string;
  number: string;
  title: string;
  category: string;
  description: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: "img-1",
    src: "/gellary/3rd mocup.png",
    number: "01",
    title: "Collaborative Study Platform",
    category: "EdTech & MERN Ecosystem",
    description:
      "A comprehensive three-role ecosystem for Students, Tutors, and Admins featuring real-time session scheduling, JWT authentication, and interactive dashboards.",
  },
  {
    id: "img-2",
    src: "/gellary/4th mocup.png",
    number: "02",
    title: "Volunteer for Bangladesh",
    category: "Social Impact & Community",
    description:
      "A community volunteering management portal where organizations post volunteer needs, request help, and coordinate social initiatives seamlessly.",
  },
  {
    id: "img-3",
    src: "/gellary/6th mocup.png",
    number: "03",
    title: "Game Reviews Hub",
    category: "Gaming & Entertainment",
    description:
      "Interactive gaming platform where users explore curated video game reviews, submit ratings, build custom wishlists, and manage gamer profiles.",
  },
  {
    id: "img-4",
    src: "/gellary/7th mocup.png",
    number: "04",
    title: "SaaS Analytics & Cloud Dashboard",
    category: "Dashboard & Data Viz",
    description:
      "Real-time cloud analytics dashboard with data visualizations, live activity metrics, user telemetry, and refined dark-mode aesthetics.",
  },
  {
    id: "img-5",
    src: "/gellary/8th mocup.png",
    number: "05",
    title: "Mobile-First Commerce Suite",
    category: "E-Commerce Platform",
    description:
      "Optimized cross-device commerce experience with touch-friendly interactions, dynamic product catalog, fast load times, and fluid screen transitions.",
  },
  {
    id: "img-6",
    src: "/gellary/9th mocup.png",
    number: "06",
    title: "Interactive Services Portal",
    category: "Full-Stack Portal",
    description:
      "Dynamic service portal offering seamless user authentication, role management, order lifecycle tracking, and streamlined workflows.",
  },
  {
    id: "img-7",
    src: "/gellary/10th mocup.png",
    number: "07",
    title: "Full-Stack Cloud Architecture",
    category: "MERN Stack Application",
    description:
      "End-to-end full-stack application structure combining robust backend Node.js APIs, secure MongoDB database models, and modern frontend interface.",
  },
  {
    id: "img-8",
    src: "/gellary/11.png",
    number: "08",
    title: "Enterprise Software Interface",
    category: "Enterprise Solution",
    description:
      "Clean enterprise software mockup highlighting usability, modular components, data grids, and scalable frontend system design.",
  },
  {
    id: "img-9",
    src: "/gellary/14.png",
    number: "09",
    title: "High-Impact Digital Showcase",
    category: "Creative & Brand",
    description:
      "High-impact landing page experience with sleek micro-interactions, dark aesthetic, smooth typography, and engaging presentation.",
  },
  {
    id: "img-10",
    src: "/gellary/15.jpg",
    number: "10",
    title: "Modern Product Design System",
    category: "Product Design",
    description:
      "Thoughtfully crafted product interface emphasizing clean aesthetics, seamless navigation, design tokens, and visual clarity.",
  },
];

export default function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const selectedImage = selectedIndex !== null ? GALLERY_IMAGES[selectedIndex] : null;

  // GSAP ScrollTrigger Horizontal Pinning Setup
  useGSAP(
    () => {
      if (!sectionRef.current || !stripRef.current) return;

      const sec = sectionRef.current;
      const pinWrap = stripRef.current;

      const getScrollLength = () => {
        const pinWrapWidth = pinWrap.scrollWidth;
        // Padding offset so the last card has good right margin on screen
        const offset = window.innerWidth < 640 ? 40 : 100;
        return Math.max(0, pinWrapWidth - window.innerWidth + offset);
      };

      const tween = gsap.to(pinWrap, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.max(window.innerWidth * 2, pinWrap.scrollWidth)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const currentProgress = Math.round(self.progress * 100);
            setProgress(currentProgress);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Recalculate on window resize & image load
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  // Lightbox Modal Navigation
  const handleModalPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : GALLERY_IMAGES.length - 1));
  }, [selectedIndex]);

  const handleModalNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < GALLERY_IMAGES.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex]);

  const handleModalClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleModalClose();
      if (e.key === "ArrowLeft") handleModalPrev();
      if (e.key === "ArrowRight") handleModalNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex, handleModalClose, handleModalPrev, handleModalNext]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="horiz-gallery-wrapper relative min-h-screen w-full overflow-hidden bg-transparent py-12 md:py-16 transition-colors duration-300 scroll-mt-0 flex flex-col justify-between"
    >
      {/* SECTION HEADER BAR */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60 mb-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Visual Showcase
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Project <span className="text-zinc-400 dark:text-white/40">Gallery.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-white/50">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Scroll to explore</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 animate-bounce">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="rounded-full border border-black/10 bg-white/80 px-3 py-1 dark:border-white/10 dark:bg-white/5 font-semibold text-zinc-800 dark:text-zinc-200">
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL PINNED GALLERY STRIP */}
      <div className="my-auto w-full overflow-visible py-4 sm:py-6">
        <div
          ref={stripRef}
          className="horiz-gallery-strip flex items-center gap-5 sm:gap-8 px-4 sm:px-8 lg:px-12 w-max will-change-transform"
        >
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-black/20 hover:shadow-2xl dark:border-white/10 dark:bg-[#0f0f12]/80 dark:hover:border-white/25 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] w-[290px] xs:w-[340px] sm:w-[440px] md:w-[500px] lg:w-[560px]"
            >
              {/* CARD TOP INFO */}
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-white/30">
                  / {item.number}
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  {item.category}
                </span>
              </div>

              {/* IMAGE CONTAINER WITH HOVER OVERLAY */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] sm:rounded-[20px] bg-black/5 dark:bg-white/5">
                <img
                  src={encodeURI(item.src)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* HOVER OVERLAY WITH EXPAND ICON */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/40 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* CARD BOTTOM INFO */}
              <div className="mt-3.5 px-1">
                <h3 className="truncate text-base sm:text-lg font-bold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
          <p className="text-xs text-zinc-500 dark:text-white/40">
            Showing {GALLERY_IMAGES.length} Project Mockups • High Resolution Vector Previews
          </p>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">01</span>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                ref={progressBarRef}
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-indigo-600 transition-[width] duration-100 ease-out dark:bg-indigo-400"
              />
            </div>
            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">
              {String(GALLERY_IMAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP MODAL */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-xl transition-opacity duration-300"
          onClick={handleModalClose}
        >
          {/* POPUP CONTAINER */}
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/15 bg-[#0f0f12] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full bg-indigo-500/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-indigo-400">
                  {selectedImage.category}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-white/50">
                  {selectedImage.number} / {GALLERY_IMAGES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(selectedImage.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span>Open Full Image</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>

                {/* CLOSE BUTTON */}
                <button
                  onClick={handleModalClose}
                  aria-label="Close modal"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MAIN IMAGE DISPLAY AREA */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 p-2 sm:p-6 min-h-[240px] max-h-[52vh] sm:max-h-[64vh]">
              <img
                src={encodeURI(selectedImage.src)}
                alt={selectedImage.title}
                className="max-h-[48vh] sm:max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
              />

              {/* PREVIOUS BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-2 sm:left-4 top-1/2 flex h-8 w-8 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/90 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 sm:h-5 sm:w-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* NEXT BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalNext();
                }}
                aria-label="Next Image"
                className="absolute right-2 sm:right-4 top-1/2 flex h-8 w-8 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/90 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 sm:h-5 sm:w-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* BOTTOM DETAILS */}
            <div className="border-t border-white/10 bg-[#121216] px-4 py-3 sm:px-6 sm:py-5">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-bold text-white sm:text-lg">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 max-w-2xl text-xs sm:text-sm text-white/60 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 sm:pt-0">
                  <button
                    onClick={handleModalPrev}
                    className="rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
