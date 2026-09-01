"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: "img-1",
    src: "/gellary/3rd mocup.png",
    title: "Modern Web Application Showcase",
    category: "Full-Stack Web App",
    description:
      "Interactive modern web interface featuring clean visual hierarchy, responsive layout, and intuitive user workflows.",
  },
  {
    id: "img-2",
    src: "/gellary/4th mocup.png",
    title: "Creative Platform & UI Experience",
    category: "UI/UX & Frontend",
    description:
      "High-fidelity platform design with elegant typography, subtle gradient accents, and component-driven architecture.",
  },
  {
    id: "img-3",
    src: "/gellary/6th mocup.png",
    title: "E-Commerce & Digital Storefront",
    category: "E-Commerce",
    description:
      "Conversion-focused storefront with modern product displays, smooth filtering, and responsive checkout layout.",
  },
  {
    id: "img-4",
    src: "/gellary/7th mocup.png",
    title: "SaaS Analytics & Cloud Dashboard",
    category: "Dashboard & Analytics",
    description:
      "Real-time cloud analytics dashboard with data visualizations, live activity metrics, and refined dark theme.",
  },
  {
    id: "img-5",
    src: "/gellary/8th mocup.png",
    title: "Mobile-First Application Concept",
    category: "Mobile & Responsive",
    description:
      "Optimized cross-device experience with touch-friendly interactions, swift load times, and fluid screen transitions.",
  },
  {
    id: "img-6",
    src: "/gellary/9th mocup.png",
    title: "Interactive Web Services Portal",
    category: "Full-Stack Portal",
    description:
      "Dynamic service portal offering seamless user authentication, role management, and streamlined workflows.",
  },
  {
    id: "img-7",
    src: "/gellary/10th mocup.png",
    title: "Full-Stack Architecture Showcase",
    category: "MERN Stack",
    description:
      "End-to-end full-stack application structure combining robust backend APIs, secure database models, and modern frontend.",
  },
  {
    id: "img-8",
    src: "/gellary/11.png",
    title: "Enterprise Web Interface",
    category: "Enterprise Solution",
    description:
      "Clean enterprise software mockup highlighting usability, modular components, and scalable frontend design.",
  },
  {
    id: "img-9",
    src: "/gellary/14.png",
    title: "Brand Showcase & Landing Experience",
    category: "Brand & Creative",
    description:
      "High-impact landing page experience with sleek micro-interactions, dark aesthetic, and engaging presentation.",
  },
  {
    id: "img-10",
    src: "/gellary/15.jpg",
    title: "Digital Product Concept & System",
    category: "Product Design",
    description:
      "Thoughtfully crafted product interface emphasizing clean aesthetics, seamless navigation, and visual clarity.",
  },
];

export default function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const selectedImage = selectedIndex !== null ? GALLERY_IMAGES[selectedIndex] : null;

  // Scroll to slide index in carousel
  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveSlide(index);
    }
  }, []);

  const handleCarouselPrev = () => {
    const nextIndex = activeSlide > 0 ? activeSlide - 1 : GALLERY_IMAGES.length - 1;
    scrollToIndex(nextIndex);
  };

  const handleCarouselNext = () => {
    const nextIndex = activeSlide < GALLERY_IMAGES.length - 1 ? activeSlide + 1 : 0;
    scrollToIndex(nextIndex);
  };

  // Update active slide on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 400;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < GALLERY_IMAGES.length) {
      setActiveSlide(newIndex);
    }
  };

  // Autoplay carousel every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered || selectedIndex !== null) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, selectedIndex, scrollToIndex]);

  // Lightbox Modal Controls
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
    <section id="gallery" className="py-24 transition-colors duration-300 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* SECTION HEADER WITH CAROUSEL CONTROLS */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-white/40">
              Visual Showcase
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Project <span className="text-zinc-400 dark:text-white/40">Gallery.</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-white/50">
              Swipe or click arrows to explore project mockups. Click on any slide for high-resolution preview.
            </p>
          </div>

          {/* CAROUSEL PREV / NEXT BUTTONS */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="font-mono text-xs text-zinc-500 dark:text-white/40 mr-2">
              {String(activeSlide + 1).padStart(2, "0")} / {String(GALLERY_IMAGES.length).padStart(2, "0")}
            </span>
            <button
              onClick={handleCarouselPrev}
              aria-label="Previous Slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-zinc-800 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:border-black/25 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/25"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleCarouselNext}
              aria-label="Next Slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-zinc-800 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:border-black/25 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/25"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory"
        >
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[24px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[calc(50%-12px)] snap-start bg-transparent"
            >
              {/* IMAGE CONTAINER (BORDERLESS & 100% FULL BLEED IMAGE) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px]">
                <img
                  src={encodeURI(item.src)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* HOVER OVERLAY WITH EXPAND ICON */}
                <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="h-6 w-6"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CAROUSEL PAGINATION PILLS / INDICATORS */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {GALLERY_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "w-8 bg-zinc-900 dark:bg-white"
                  : "w-2 bg-black/20 hover:bg-black/40 dark:bg-white/20 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP MODAL */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-xl transition-opacity duration-300"
          onClick={handleModalClose}
        >
          {/* POPUP CONTAINER */}
          <div
            className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/15 bg-[#0f0f12] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full bg-indigo-500/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-indigo-400">
                  {selectedImage.category}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-white/50">
                  {selectedIndex + 1} / {GALLERY_IMAGES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(selectedImage.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MAIN IMAGE DISPLAY AREA */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 p-2 sm:p-6 min-h-[220px] max-h-[50vh] sm:max-h-[62vh]">
              <img
                src={encodeURI(selectedImage.src)}
                alt={selectedImage.title}
                className="max-h-[46vh] sm:max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
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

            {/* BOTTOM DETAILS & SHORT DESCRIPTION */}
            <div className="border-t border-white/10 bg-[#121216] px-4 py-3 sm:px-6 sm:py-5">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-bold text-white sm:text-lg">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 max-w-2xl text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 sm:line-clamp-none">
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
