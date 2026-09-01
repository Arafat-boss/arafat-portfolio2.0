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
    category: "EdTech & MERN",
    description:
      "Three-role ecosystem for Students, Tutors, and Admins with real-time session booking and interactive dashboards.",
  },
  {
    id: "img-2",
    src: "/gellary/4th mocup.png",
    number: "02",
    title: "Volunteer for Bangladesh",
    category: "Social Impact",
    description:
      "Community volunteering portal where organizations post volunteer needs and coordinate initiatives seamlessly.",
  },
  {
    id: "img-3",
    src: "/gellary/6th mocup.png",
    number: "03",
    title: "Game Reviews Hub",
    category: "Gaming & Web App",
    description:
      "Interactive gaming platform where gamers explore curated game reviews, submit ratings, and manage wishlists.",
  },
  {
    id: "img-4",
    src: "/gellary/7th mocup.png",
    number: "04",
    title: "SaaS Analytics & Cloud Dashboard",
    category: "Dashboard & Data Viz",
    description:
      "Real-time analytics dashboard with live metrics, data telemetry, and refined dark-mode aesthetics.",
  },
  {
    id: "img-5",
    src: "/gellary/8th mocup.png",
    number: "05",
    title: "Mobile-First Commerce Suite",
    category: "E-Commerce",
    description:
      "Optimized cross-device commerce experience with touch-friendly interactions and swift screen transitions.",
  },
  {
    id: "img-6",
    src: "/gellary/9th mocup.png",
    number: "06",
    title: "Interactive Services Portal",
    category: "Full-Stack Portal",
    description:
      "Dynamic service portal offering seamless user authentication, role management, and streamlined workflows.",
  },
  {
    id: "img-7",
    src: "/gellary/10th mocup.png",
    number: "07",
    title: "Full-Stack Cloud Architecture",
    category: "MERN Stack",
    description:
      "End-to-end full-stack application structure combining robust backend Node.js APIs and modern frontend UI.",
  },
  {
    id: "img-8",
    src: "/gellary/11.png",
    number: "08",
    title: "Enterprise Software Interface",
    category: "Enterprise UI",
    description:
      "Clean enterprise software mockup highlighting usability, modular components, and scalable frontend design.",
  },
  {
    id: "img-9",
    src: "/gellary/14.png",
    number: "09",
    title: "High-Impact Digital Showcase",
    category: "Creative & Brand",
    description:
      "High-impact landing page experience with sleek micro-interactions, dark aesthetic, and engaging layout.",
  },
  {
    id: "img-10",
    src: "/gellary/15.jpg",
    number: "10",
    title: "Modern Product Design System",
    category: "Product Design",
    description:
      "Thoughtfully crafted product interface emphasizing clean aesthetics, seamless navigation, and visual clarity.",
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
        const offset = window.innerWidth < 640 ? 24 : 60;
        return Math.max(0, pinWrapWidth - window.innerWidth + offset);
      };

      const tween = gsap.to(pinWrap, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollLength() + window.innerHeight * 0.5}`,
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
      className="horiz-gallery-wrapper relative h-[100dvh] min-h-[520px] max-h-[820px] w-full overflow-hidden bg-transparent py-4 sm:py-6 lg:py-7 transition-colors duration-300 scroll-mt-0 flex flex-col justify-between"
    >
      {/* SECTION HEADER BAR (COMPACT & RESPONSIVE) */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Visual Showcase
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Project <span className="text-zinc-400 dark:text-white/40">Gallery.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-white/50">
            <div className="hidden xs:flex items-center gap-1.5">
              <span>Scroll</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="rounded-full border border-black/10 bg-white/80 px-2.5 py-0.5 dark:border-white/10 dark:bg-white/5 font-semibold text-zinc-800 dark:text-zinc-200">
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL PINNED GALLERY STRIP (COMPACT RESPONSIVE CARDS) */}
      <div className="my-auto w-full overflow-visible py-2 sm:py-3">
        <div
          ref={stripRef}
          className="horiz-gallery-strip flex items-center gap-3.5 sm:gap-5 md:gap-6 px-4 sm:px-6 lg:px-8 w-max will-change-transform"
        >
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[18px] sm:rounded-[22px] border border-black/10 bg-white/85 p-2.5 sm:p-3 shadow-xs backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-black/20 hover:shadow-xl dark:border-white/10 dark:bg-[#0f0f12]/85 dark:hover:border-white/25 dark:hover:shadow-[0_16px_35px_-10px_rgba(0,0,0,0.8)] w-[240px] xs:w-[280px] sm:w-[340px] md:w-[390px] lg:w-[440px]"
            >
              {/* CARD TOP INFO */}
              <div className="mb-2 flex items-center justify-between px-0.5">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-zinc-400 dark:text-white/30">
                  / {item.number}
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 truncate max-w-[130px] sm:max-w-none">
                  {item.category}
                </span>
              </div>

              {/* IMAGE CONTAINER WITH HOVER OVERLAY */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] sm:rounded-[16px] bg-black/5 dark:bg-white/5">
                <img
                  src={encodeURI(item.src)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* HOVER OVERLAY WITH EXPAND ICON */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 bg-white/95 text-zinc-900 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="h-4 w-4 sm:h-5 sm:w-5"
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
              <div className="mt-2.5 px-0.5">
                <h3 className="truncate text-xs sm:text-sm md:text-base font-bold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {item.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 sm:line-clamp-2 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR (COMPACT) */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-2 sm:pt-3 dark:border-white/10">
          <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-white/40 truncate">
            {GALLERY_IMAGES.length} Project Mockups • Vector Previews
          </p>

          <div className="flex items-center gap-2 sm:gap-3 w-32 sm:w-52">
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-white/30">01</span>
            <div className="relative h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                ref={progressBarRef}
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-indigo-600 transition-[width] duration-75 ease-out dark:bg-indigo-400"
              />
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400 dark:text-white/30">
              {String(GALLERY_IMAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP MODAL */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2.5 sm:p-5 backdrop-blur-xl transition-opacity duration-300"
          onClick={handleModalClose}
        >
          {/* POPUP CONTAINER */}
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[20px] sm:rounded-[26px] border border-white/15 bg-[#0f0f12] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5 sm:px-5 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/20 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-indigo-400">
                  {selectedImage.category}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-white/50">
                  {selectedImage.number} / {GALLERY_IMAGES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(selectedImage.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span>Open Original</span>
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
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MAIN IMAGE DISPLAY AREA */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/50 p-2 sm:p-4 min-h-[200px] max-h-[48vh] sm:max-h-[58vh]">
              <img
                src={encodeURI(selectedImage.src)}
                alt={selectedImage.title}
                className="max-h-[44vh] sm:max-h-[54vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all duration-300"
              />

              {/* PREVIOUS BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-2 sm:left-3 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/90 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
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
                className="absolute right-2 sm:right-3 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/90 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* BOTTOM DETAILS */}
            <div className="border-t border-white/10 bg-[#121216] px-3.5 py-2.5 sm:px-5 sm:py-3.5">
              <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xs sm:text-base font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-0.5 max-w-xl text-[11px] sm:text-xs text-white/60 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                  <button
                    onClick={handleModalPrev}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white/80 transition hover:bg-white/10"
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
