"use client";

import { useRef, useState, useEffect } from "react";
import { TestimonialItem } from "@/lib/types/testimonial";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Live dynamic fetch directly from MongoDB 'testimonials' collection
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setTestimonials(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching testimonials from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        scrollContainerRef.current.clientWidth > 500
          ? 360
          : scrollContainerRef.current.clientWidth * 0.88;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        scrollContainerRef.current.clientWidth > 500
          ? 360
          : scrollContainerRef.current.clientWidth * 0.88;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 transition-colors duration-300 scroll-mt-20 gsap-fade-up">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white/70 p-4 sm:p-8 md:p-10 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80">
          <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                TESTIMONIALS
              </p>
              <h2 className="split mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                What Clients Say
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-full border border-black/[0.06] bg-white/80 text-zinc-700 shadow-xs backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:bg-white/[0.1]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-full border border-black/[0.06] bg-white/80 text-zinc-700 shadow-xs backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200 dark:hover:bg-white/[0.1]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial Cards Horizontal Slider */}
          <div
            ref={scrollContainerRef}
            className="flex w-full gap-3.5 sm:gap-6 overflow-x-auto overflow-y-visible px-0.5 py-3 sm:py-5 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 w-[300px] flex-shrink-0 animate-pulse rounded-2xl border border-black/5 bg-black/[0.03] dark:border-white/5 dark:bg-white/[0.03]"
                />
              ))
            ) : testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div
                  key={item.id}
                  className="group relative z-0 flex w-[calc(100vw-64px)] max-w-[340px] sm:w-[320px] md:w-[360px] flex-shrink-0 flex-col justify-between rounded-2xl border border-black/[0.04] bg-white/85 p-5 sm:p-6 shadow-xs backdrop-blur-xl transition-all duration-300 hover:z-20 hover:-translate-y-1.5 hover:border-black/[0.08] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] dark:border-white/[0.06] dark:bg-white/[0.035] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.06] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.65)] snap-start"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex gap-1 text-amber-400">
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i} className="text-xs">
                            {star}
                          </span>
                        ))}
                      </div>

                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-black/10 dark:text-white/10 transition-colors duration-300 group-hover:text-indigo-500/20"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="text-xs sm:text-sm font-normal leading-relaxed sm:leading-6 text-zinc-600 dark:text-white/70 italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-black/[0.04] pt-4 dark:border-white/[0.04]">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover object-center ring-2 ring-indigo-500/20 shadow-sm"
                    />
                    <div className="min-w-0">
                      <h4 className="truncate text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.role}, <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.company}</span>
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-white/30 font-mono mt-0.5">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6 text-xs text-zinc-400">No testimonials yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
