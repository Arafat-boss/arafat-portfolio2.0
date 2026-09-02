"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GalleryItem } from "@/lib/types/project";

export default function ProjectGallery() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);

  // Live dynamic fetch directly from MongoDB 'Gellary' collection
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/projects?type=gallery");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setGalleryList(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching gallery from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Drag / Touch state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, galleryList.length - visibleCount);

  // Keep currentIndex in bounds when items or screen size changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || isHovered || isDragging || maxIndex === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoplay, isHovered, isDragging, maxIndex, handleNext]);

  // Pointer / Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.clientX);
    if (Math.abs(e.clientX - dragStartX) > 6) {
      hasDraggedRef.current = true;
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const diff = dragCurrentX - dragStartX;
    const threshold = 40;

    if (diff < -threshold) {
      handleNext();
    } else if (diff > threshold) {
      handlePrev();
    }

    setIsDragging(false);
    setDragStartX(0);
    setDragCurrentX(0);
  };

  const handleCardClick = (item: GalleryItem) => {
    if (hasDraggedRef.current) return;
    setModalItem(item);
  };

  // Lightbox Modal Keyboard & Navigation
  const modalIndex = modalItem ? galleryList.findIndex((i) => i.id === modalItem.id) : -1;

  const handleModalPrev = useCallback(() => {
    if (modalIndex === -1) return;
    const nextIdx = modalIndex > 0 ? modalIndex - 1 : galleryList.length - 1;
    setModalItem(galleryList[nextIdx]);
  }, [modalIndex, galleryList]);

  const handleModalNext = useCallback(() => {
    if (modalIndex === -1) return;
    const nextIdx = modalIndex < galleryList.length - 1 ? modalIndex + 1 : 0;
    setModalItem(galleryList[nextIdx]);
  }, [modalIndex, galleryList]);

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

  // Active progress calculation
  const progressPercent =
    galleryList.length > 0
      ? Math.min(100, Math.round(((currentIndex + visibleCount) / galleryList.length) * 100))
      : 0;

  const stepPercent = 100 / visibleCount;
  const dragDelta = isDragging ? dragCurrentX - dragStartX : 0;
  const containerWidth = containerRef.current?.offsetWidth || 1;
  const dragPercent = (dragDelta / containerWidth) * 100;
  const translateX = -currentIndex * stepPercent + (isDragging ? dragPercent : 0);

  return (
    <section
      id="gallery"
      className="relative w-full border-t border-black/10 bg-black/[0.015] py-16 sm:py-24 lg:py-28 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.015] scroll-mt-20 gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP HEADER & CONTROLS */}
        <div className="mb-8 sm:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 mb-3">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              Interactive Gallery Carousel
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Project <span className="text-zinc-400 dark:text-white/35">Showcase.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-white/50 max-w-xl">
              Explore high-fidelity mockups and visual designs across web, mobile, and full-stack projects.
            </p>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAutoplay((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                isAutoplay
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "border-black/10 bg-black/[0.03] text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60"
              }`}
              title={isAutoplay ? "Pause Autoplay" : "Enable Autoplay"}
            >
              {isAutoplay ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span>Auto Playing</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span>Paused</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-black/25 hover:bg-black/[0.02] hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-[#121216] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-black/25 hover:bg-black/[0.02] hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-[#121216] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL TRACK WRAPPER */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {loading ? (
            <div className="flex gap-4 py-4">
              {Array.from({ length: visibleCount }).map((_, i) => (
                <div
                  key={i}
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                  className="px-2.5"
                >
                  <div className="h-64 animate-pulse rounded-2xl border border-black/5 bg-black/[0.03] dark:border-white/5 dark:bg-white/[0.03]" />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform py-4"
              style={{
                transform: `translateX(${translateX}%)`,
                transitionDuration: isDragging ? "0ms" : "500ms",
              }}
            >
              {galleryList.map((item, idx) => {
                const isCurrent = idx >= currentIndex && idx < currentIndex + visibleCount;

                return (
                  <div
                    key={item.id}
                    style={{
                      flex: `0 0 ${100 / visibleCount}%`,
                    }}
                    className="px-2.5 sm:px-3"
                  >
                    <div
                      onClick={() => handleCardClick(item)}
                      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-black/20 hover:shadow-xl dark:border-white/10 dark:bg-[#0f0f13]/85 dark:hover:border-white/25 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] ${
                        isCurrent ? "opacity-100" : "opacity-90"
                      }`}
                    >
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-white/30">
                          / {item.number}
                        </span>
                        <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                          {item.category}
                        </span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/5 dark:bg-white/5">
                        <img
                          src={encodeURI(item.src)}
                          alt={item.title}
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                          <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 bg-white/95 text-zinc-900 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
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

                      <div className="mt-3 flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-3.5 flex items-center justify-between border-t border-black/5 pt-2.5 dark:border-white/5">
                          <span className="text-[11px] font-medium text-zinc-400 dark:text-white/40">
                            Click to preview
                          </span>
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition-transform duration-200 group-hover:translate-x-1">
                            Inspect →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM PAGINATION & PROGRESS CONTROLS */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 pt-5 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-white/40">
            <span>
              Showing {String(galleryList.length > 0 ? currentIndex + 1 : 0).padStart(2, "0")} -{" "}
              {String(Math.min(currentIndex + visibleCount, galleryList.length)).padStart(2, "0")}
            </span>
            <span>/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {String(galleryList.length).padStart(2, "0")} Mockups
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
              const isActive = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-7 bg-indigo-600 dark:bg-indigo-400"
                      : "w-2 bg-black/15 hover:bg-black/30 dark:bg-white/15 dark:hover:bg-white/30"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-40 sm:w-48">
            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">0%</span>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out dark:bg-indigo-400"
              />
            </div>
            <span className="font-mono text-xs text-zinc-400 dark:text-white/30">100%</span>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX POPUP MODAL */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-xl transition-opacity duration-300"
          onClick={handleModalClose}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/15 bg-[#0f0f13] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
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
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span>Open Full High-Res</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>

                <button
                  onClick={handleModalClose}
                  aria-label="Close modal"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/60 p-3 sm:p-6 min-h-[220px] max-h-[55vh] sm:max-h-[62vh]">
              <img
                src={encodeURI(modalItem.src)}
                alt={modalItem.title}
                className="max-h-[50vh] sm:max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-4 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/95 active:scale-95 cursor-pointer"
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
                aria-label="Next Image"
                className="absolute right-3 sm:right-4 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-black/95 active:scale-95 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 sm:h-5 sm:w-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

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
        </div>
      )}
    </section>
  );
}
