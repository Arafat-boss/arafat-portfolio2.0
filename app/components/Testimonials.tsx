"use client";

import { useEffect, useState } from "react";
import {
  Testimonial,
  column1Testimonials,
  column2Testimonials,
  column3Testimonials,
} from "@/lib/data/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="group relative rounded-2xl border border-black/[0.08] bg-white/80 p-5 shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-white hover:shadow-xl dark:border-white/[0.08] dark:bg-[#111114]/85 dark:hover:border-white/25 dark:hover:bg-[#16161a] dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      {/* Header: User Info & Verification */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10">
            <img
              src={item.avatar}
              alt={item.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="truncate text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                {item.name}
              </h4>
              {item.verified && (
                <svg
                  className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </div>
            <p className="truncate font-mono text-[11px] text-zinc-500 dark:text-white/40">
              {item.handle}
            </p>
          </div>
        </div>

        {/* X / Twitter or Quote Icon */}
        <div className="flex-shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-700 dark:text-white/30 dark:group-hover:text-white/70">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>

      {/* Review Content */}
      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-white/75 font-normal">
        {item.content}
      </p>

      {/* Footer: Rating, Role & Location */}
      <div className="mt-4 flex items-center justify-between border-t border-black/[0.05] pt-3 text-[11px] dark:border-white/[0.05]">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: item.rating }).map((_, i) => (
            <span key={i} className="text-xs">
              ★
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-500 dark:text-white/40">
          <span>{item.countryFlag}</span>
          <span className="truncate">{item.company}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [col1, setCol1] = useState<Testimonial[]>(column1Testimonials);
  const [col2, setCol2] = useState<Testimonial[]>(column2Testimonials);
  const [col3, setCol3] = useState<Testimonial[]>(column3Testimonials);

  // Fetch optional MongoDB dynamic testimonials and distribute across columns
  useEffect(() => {
    async function fetchDbReviews() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const dbItems: Testimonial[] = json.data.map((item: any, idx: number) => ({
              id: item._id || item.id || `db-${idx}`,
              name: item.name || "Satisfied Client",
              handle: `@${(item.name || "client").toLowerCase().replace(/[\s_.-]+/g, "")}`,
              role: item.role || "Client",
              company: item.company || "Enterprise",
              location: item.location || "USA",
              countryFlag: "🇺🇸",
              avatar:
                item.avatar ||
                `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
              content: item.quote || item.content || "Great experience working with Arafat!",
              rating: item.rating || 5,
              projectType: "Full-Stack Project",
              verified: true,
            }));

            // Merge into columns
            const c1 = [...column1Testimonials];
            const c2 = [...column2Testimonials];
            const c3 = [...column3Testimonials];

            dbItems.forEach((item, index) => {
              if (index % 3 === 0) c1.unshift(item);
              else if (index % 3 === 1) c2.unshift(item);
              else c3.unshift(item);
            });

            setCol1(c1);
            setCol2(c2);
            setCol3(c3);
          }
        }
      } catch (err) {
        // Fallbacks already configured
      }
    }
    fetchDbReviews();
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-24 transition-colors duration-300 scroll-mt-20 overflow-hidden gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 mb-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Client Reviews & Feedback
          </div>
          <h2 className="split text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            Trusted by founders &{" "}
            <span className="text-zinc-400 dark:text-white/40">teams worldwide.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-white/50">
            Real feedback from clients, founders, and engineering leads across the globe.
          </p>
        </div>

        {/* 3-Column Vertical Auto-Scrolling Wall */}
        <div className="relative h-[600px] sm:h-[680px] lg:h-[720px] overflow-hidden rounded-3xl border border-black/10 bg-black/[0.015] p-3 sm:p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.015]">
          {/* Top Fade Gradient Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 sm:h-36 bg-gradient-to-b from-[#edf0f5] via-[#edf0f5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/85 dark:to-transparent" />

          {/* Bottom Fade Gradient Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-36 bg-gradient-to-t from-[#edf0f5] via-[#edf0f5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/85 dark:to-transparent" />

          {/* 3 Columns Grid */}
          <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* COLUMN 1: Auto Scrolls UP */}
            <div className="marquee-column relative h-full overflow-hidden">
              <div className="animate-marquee-up flex flex-col gap-4 sm:gap-6">
                {/* 1st copy */}
                {col1.map((item) => (
                  <TestimonialCard key={`col1-orig-${item.id}`} item={item} />
                ))}
                {/* 2nd copy for seamless infinite loop */}
                {col1.map((item) => (
                  <TestimonialCard key={`col1-dup-${item.id}`} item={item} />
                ))}
              </div>
            </div>

            {/* COLUMN 2: Auto Scrolls DOWN */}
            <div className="marquee-column relative h-full overflow-hidden hidden md:block">
              <div className="animate-marquee-down flex flex-col gap-4 sm:gap-6">
                {/* 1st copy */}
                {col2.map((item) => (
                  <TestimonialCard key={`col2-orig-${item.id}`} item={item} />
                ))}
                {/* 2nd copy for seamless infinite loop */}
                {col2.map((item) => (
                  <TestimonialCard key={`col2-dup-${item.id}`} item={item} />
                ))}
              </div>
            </div>

            {/* COLUMN 3: Auto Scrolls UP (Slow & Staggered) */}
            <div className="marquee-column relative h-full overflow-hidden hidden lg:block">
              <div className="animate-marquee-up-slow flex flex-col gap-4 sm:gap-6">
                {/* 1st copy */}
                {col3.map((item) => (
                  <TestimonialCard key={`col3-orig-${item.id}`} item={item} />
                ))}
                {/* 2nd copy for seamless infinite loop */}
                {col3.map((item) => (
                  <TestimonialCard key={`col3-dup-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
