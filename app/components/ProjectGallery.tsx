"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { GalleryItem } from "@/lib/types/project";

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "SaaS Platform & Cloud Analytics",
    description: "Next.js 15, TypeScript & Tailwind CSS full-stack web application with responsive dashboard architecture.",
    src: "/gellary/3rd mocup.webp",
    category: "Next.js / React",
    number: "01",
  },
  {
    id: "gal-2",
    title: "Architectural Studio & Portfolio",
    description: "Modern Squarespace 7.1 website built with Fluid Engine, custom CSS grid layouts, and typography.",
    src: "/gellary/4th mocup.webp",
    category: "Squarespace",
    number: "02",
  },
  {
    id: "gal-3",
    title: "Creative Studio & Brand Experience",
    description: "High-impact Wix Studio site featuring custom smooth scroll animations and dynamic Velo interactions.",
    src: "/gellary/6th mocup.webp",
    category: "Wix Studio",
    number: "03",
  },
  {
    id: "gal-4",
    title: "FinTech Banking & Wealth Suite",
    description: "React & Next.js financial management dashboard with live metrics and dark mode interface.",
    src: "/gellary/7th mocup.webp",
    category: "Next.js / React",
    number: "04",
  },
  {
    id: "gal-5",
    title: "Hospitality & Restaurant Reservation",
    description: "Squarespace website with custom menu layouts, OpenTable booking, and mobile ordering.",
    src: "/gellary/8th mocup.webp",
    category: "Squarespace",
    number: "05",
  },
  {
    id: "gal-6",
    title: "AI Knowledge & Education Platform",
    description: "Full-Stack React web application with clean UI cards and optimized video streaming.",
    src: "/gellary/9th mocup.webp",
    category: "Next.js / React",
    number: "06",
  },
  {
    id: "gal-7",
    title: "Modern Business Portfolio & CMS",
    description: "Wix Studio custom build with interactive work showcase and responsive client inquiry form.",
    src: "/gellary/10th mocup.webp",
    category: "Wix Studio",
    number: "07",
  },
  {
    id: "gal-8",
    title: "Luxury Lifestyle & E-Commerce Store",
    description: "Wix E-Commerce store with custom product filtering and automated inventory sync.",
    src: "/gellary/11.webp",
    category: "Wix Studio",
    number: "08",
  },
  {
    id: "gal-9",
    title: "Real Estate & Property Showcase",
    description: "Modern Next.js real estate portal with virtual tours and lead generation forms.",
    src: "/gellary/14.webp",
    category: "Next.js / React",
    number: "09",
  },
];

// TasteSkill-style 3D curved conveyor formula (Flows smoothly from TOP to BOTTOM with compact cards)
function get3DCardStyle(d: number) {
  if (d < -2.6 || d > 2.8) {
    return {
      display: "none",
      transform: "translate3d(-50%, -50%, -2000px) scale(0)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
    };
  }

  let x = 0;
  let y = 0;
  let z = 0;
  let scale = 0.85;
  let opacity = 1;
  let rotX = 2;
  let rotY = 0;
  let zIndex = 50;

  if (d <= 0) {
    // Incoming phase from top-left background downwards into focal point
    const t = Math.max(0, Math.min(1, (d + 2.4) / 2.4));
    x = -8;
    y = -220 + (220 - 28) * Math.pow(t, 1.2);
    z = -750 + (750 + 220) * t;
    scale = 0.42 + (0.92 - 0.42) * t;
    opacity = t < 0.15 ? (t / 0.15) * 0.75 : 0.75 + (1 - 0.75) * ((t - 0.15) / 0.85);
    rotX = 3.5 - (3.5 - 1.8) * t;
    rotY = -2.5 + (2.5 - 0.5) * t;
    zIndex = Math.round(20 + 80 * t);
  } else if (d <= 0.85) {
    // Focal active card transitioning down towards mid-right
    const t = d / 0.85;
    x = -8 + (48 - -8) * t;
    y = -28 + (58 - -28) * t;
    z = 220 - (220 - 110) * t;
    scale = 0.92 - (0.92 - 0.82) * t;
    opacity = 1.0 - (1.0 - 0.92) * t;
    rotX = 1.8 + (2.0 - 1.8) * t;
    rotY = -0.5 + (0.5 - -0.5) * t;
    zIndex = Math.round(100 - 12 * t);
  } else {
    // Exit phase down into bottom-right distance
    const t = Math.max(0, Math.min(1, (d - 0.85) / 1.6));
    x = 48 + (240 - 48) * t;
    y = 58 + (72 - 58) * t;
    z = 110 - (110 - -780) * t;
    scale = 0.82 - (0.82 - 0.38) * t;
    opacity = Math.max(0, 0.92 * (1 - Math.pow(t, 1.25)));
    rotX = 2.0 + (3.5 - 2.0) * t;
    rotY = 0.5 + (2.5 - 0.5) * t;
    zIndex = Math.round(88 - 68 * t);
  }

  return {
    display: "block",
    transform: `translate3d(calc(-50% + ${x.toFixed(1)}%), calc(-50% + ${y.toFixed(1)}%), ${z.toFixed(0)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    opacity: Math.max(0, Math.min(1, opacity)),
    zIndex: Math.max(1, zIndex),
    pointerEvents: (Math.abs(d) <= 0.9 ? "auto" : "none") as "auto" | "none",
  };
}

export default function ProjectGallery() {
  const [galleryList] = useState<GalleryItem[]>(defaultGalleryItems);
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  // Animation & Drag Progress
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 60FPS Continuous Smooth Animation Loop (Flowing TOP to BOTTOM)
  useEffect(() => {
    let animId: number;
    let lastTimestamp = performance.now();

    const updateFrame = (now: number) => {
      const deltaSec = Math.min(0.1, (now - lastTimestamp) / 1000);
      lastTimestamp = now;

      if (!isDraggingRef.current) {
        // Apply inertia friction
        if (Math.abs(velocityRef.current) > 0.001) {
          progressRef.current += velocityRef.current;
          velocityRef.current *= 0.92;
        }

        // Moves from TOP to BOTTOM smoothly (progress decreases)
        const autoSpeed = isHoveredRef.current ? 0.03 : 0.18;
        progressRef.current -= autoSpeed * deltaSec;
      }

      // Keep progress bounded cleanly to loop infinitely
      const count = galleryList.length;
      if (progressRef.current < 0) {
        progressRef.current += count;
      } else if (progressRef.current >= count) {
        progressRef.current -= count;
      }

      setProgress(progressRef.current);
      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [galleryList.length]);

  // Pointer / Touch Handlers for 3D Stage
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    dragStartProgressRef.current = progressRef.current;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const diffY = e.clientY - dragStartYRef.current;
    const deltaY = e.clientY - lastYRef.current;

    velocityRef.current = -(deltaY / 220);
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;

    // Dragging down advances cards down
    progressRef.current = dragStartProgressRef.current - diffY / 220;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Lightbox Modal Keyboard & Navigation
  const currentModalIndex = modalItem
    ? galleryList.findIndex((i) => i.id === modalItem.id)
    : -1;

  const handleModalPrev = useCallback(() => {
    if (currentModalIndex === -1) return;
    const nextIdx = currentModalIndex > 0 ? currentModalIndex - 1 : galleryList.length - 1;
    setModalItem(galleryList[nextIdx]);
  }, [currentModalIndex, galleryList]);

  const handleModalNext = useCallback(() => {
    if (currentModalIndex === -1) return;
    const nextIdx = currentModalIndex < galleryList.length - 1 ? currentModalIndex + 1 : 0;
    setModalItem(galleryList[nextIdx]);
  }, [currentModalIndex, galleryList]);

  const handleModalClose = useCallback(() => {
    setModalItem(null);
  }, []);

  useEffect(() => {
    if (!modalItem) return;
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
  }, [modalItem, handleModalClose, handleModalPrev, handleModalNext]);

  const totalItems = galleryList.length;

  return (
    <section
      id="gallery"
      className="relative w-full py-16 sm:py-20 lg:py-24 transition-colors duration-300 scroll-mt-20 overflow-hidden gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TASTESKILL-STYLE 2-COLUMN HERO BANNER */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10">
          
          {/* LEFT COLUMN: HERO TYPOGRAPHY & INTERACTIVE CONTROLS */}
          <div className="flex flex-col justify-center z-10">
            {/* Pill Badge */}
            <a
              href="#projects"
              className="group/pill mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/15 dark:bg-indigo-500/15 dark:text-indigo-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              <span>Visual Project Archive</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/pill:translate-x-0.5"
              >
                <path d="M5 12h14"></path>
                <path d="m13 5 7 7-7 7"></path>
              </svg>
            </a>

            {/* Main Headline */}
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.05]">
              Project Showcase
            </h2>

            {/* Sub-headline */}
            <p className="mt-3 text-xl font-normal leading-snug tracking-tight text-zinc-700 sm:text-2xl sm:leading-tight dark:text-zinc-200">
              Modern Web Design & Full-Stack Development
            </p>

            {/* Accent statement */}
            <p className="mt-2 text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
              Wix Studio • Squarespace • React & Next.js
            </p>

            {/* Description */}
            <p className="mt-4 max-w-lg text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-white/60">
              Explore bespoke client builds, high-converting stores, fluid animated portfolios, and scalable full-stack web applications crafted with obsessive attention to detail.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="btn-neumorphic !py-3 !text-sm !px-6 rounded-xl flex items-center justify-center gap-2 group"
              >
                <span>Explore Selected Work</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white/60 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-800 backdrop-blur-md transition-all hover:border-black/30 hover:bg-white hover:shadow-sm dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
              >
                <span>Start a Project</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m13 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: COMPACT 3D CURVED CONVEYOR SHOWCASE */}
          <div className="relative flex w-full flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] lg:h-[70vh] lg:max-h-[660px]">
            
            {/* MOBILE VIEW (lg:hidden): Continuous Smooth Horizontal Flow */}
            <div className="w-screen max-w-[100vw] overflow-hidden -mx-4 sm:-mx-6 lg:hidden" aria-hidden="true">
              <div className="flex w-max gap-3 sm:gap-4 animate-marquee-up [animation-duration:35s] will-change-transform py-2">
                {galleryList.concat(galleryList).map((item, idx) => (
                  <div
                    key={`mob-${item.id}-${idx}`}
                    onClick={() => setModalItem(item)}
                    className="flex-none w-[240px] sm:w-[300px] overflow-hidden rounded-2xl border border-black/10 bg-white/85 p-2 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-[#111114]/90 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                      <img
                        src={encodeURI(item.src)}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-2 px-1 pb-1">
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP 3D CURVED CAROUSEL (lg:block): Compact cards flowing TOP to BOTTOM */}
            <div
              className="relative mx-auto hidden w-full h-full touch-pan-y select-none lg:block"
              style={{ perspective: "2800px" }}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* 3D Transform Stage with subtle perspective tilt */}
              <div
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(2.5deg) rotateY(-3.5deg)",
                }}
              >
                {galleryList.map((item, i) => {
                  let d = ((i - progress) % totalItems + totalItems) % totalItems;
                  if (d > totalItems / 2) {
                    d = d - totalItems;
                  }

                  const style3d = get3DCardStyle(d);

                  return (
                    <figure
                      key={`stage3d-${item.id}`}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "50%",
                        maxWidth: "460px",
                        willChange: "transform, opacity",
                        transition: isDraggingRef.current
                          ? "none"
                          : "opacity 0.2s ease-out",
                        ...style3d,
                      }}
                      className="group/card"
                      onClick={() => {
                        if (Math.abs(d) <= 0.9) {
                          setModalItem(item);
                        }
                      }}
                    >
                      {/* Browser Mockup Window Frame (Compact & Refined) */}
                      <div className="overflow-hidden rounded-[16px] border border-black/15 bg-white/90 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 group-hover/card:border-indigo-500/50 group-hover/card:shadow-[0_24px_55px_-12px_rgba(99,102,241,0.35)] dark:border-white/15 dark:bg-[#111114]/90 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)]">
                        
                        {/* Traffic light header bar */}
                        <div className="flex items-center justify-between border-b border-black/[0.08] bg-black/[0.02] px-3 py-2 dark:border-white/[0.08] dark:bg-white/[0.02]">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="font-mono text-[10px] font-semibold text-zinc-500 dark:text-white/40 truncate max-w-[120px]">
                            {item.category}
                          </span>
                          <span className="font-mono text-[9px] text-zinc-400 dark:text-white/30">
                            /{item.number}
                          </span>
                        </div>

                        {/* Screenshot image container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 dark:bg-black/40">
                          <img
                            src={encodeURI(item.src)}
                            alt={item.title}
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/card:opacity-100">
                            <span className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-zinc-900 shadow-xl backdrop-blur-md transition-transform duration-200 group-hover/card:scale-105">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                                <path d="M15 3h6v6" />
                                <path d="M10 14 21 3" />
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              </svg>
                              <span>Inspect Project</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Footer Bar */}
                        <div className="p-2.5 sm:p-3 bg-white/50 dark:bg-[#111114]/50 border-t border-black/[0.04] dark:border-white/[0.04]">
                          <h4 className="text-xs font-bold text-zinc-900 transition-colors group-hover/card:text-indigo-600 dark:text-white dark:group-hover/card:text-indigo-400 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </figure>
                  );
                })}
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {mounted &&
        modalItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-xl transition-opacity duration-300"
            onClick={handleModalClose}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0f0f13] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
                    {modalItem.category}
                  </span>
                  <span className="font-mono text-xs text-white/50">
                    {modalItem.number} / {String(galleryList.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={encodeURI(modalItem.src)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <span>Open Full Image</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>

                  <button
                    onClick={handleModalClose}
                    aria-label="Close modal"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Image Display */}
              <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/60 p-3 sm:p-6 min-h-[220px] max-h-[55vh] sm:max-h-[62vh]">
                <img
                  src={encodeURI(modalItem.src)}
                  alt={modalItem.title}
                  decoding="async"
                  className="max-h-[50vh] sm:max-h-[58vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-all duration-300 mx-auto"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalPrev();
                  }}
                  aria-label="Previous Mockup"
                  className="absolute left-3 sm:left-4 top-1/2 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/75 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-black/95 active:scale-95 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNext();
                  }}
                  aria-label="Next Mockup"
                  className="absolute right-3 sm:right-4 top-1/2 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/75 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-black/95 active:scale-95 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 bg-[#121216] px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {modalItem.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-xs sm:text-sm text-white/60 leading-relaxed">
                      {modalItem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1 sm:pt-0">
                    <button
                      onClick={handleModalPrev}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={handleModalNext}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
