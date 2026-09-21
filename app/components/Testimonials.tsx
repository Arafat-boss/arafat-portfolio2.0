"use client";

import { useEffect, useState } from "react";
import {
  Testimonial,
  column1Testimonials,
  column2Testimonials,
  column3Testimonials,
} from "@/lib/data/testimonials";

function FiverrLogo() {
  return (
    <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 transition-all duration-200 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.14] dark:border-emerald-400/25 dark:bg-emerald-400/[0.08] dark:text-emerald-400 flex-shrink-0">
      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <circle cx="21" cy="4" r="2" />
        <path d="M16.4 8.5c-.8 0-1.4.3-1.8.8V8.6h-2.2v11.2h2.3v-5.9c0-1.1.6-1.8 1.6-1.8.2 0 .4 0 .6.1l.6-2.2c-.3-.1-.7-.1-1.1-.1zM9.5 8.5c-.8 0-1.4.3-1.8.8V8.6H5.5v11.2h2.3v-5.9c0-1.1.6-1.8 1.6-1.8.2 0 .4 0 .6.1l.6-2.2c-.4-.1-.7-.1-1.1-.1zM3.4 8.6H1.2v11.2h2.2V8.6zM2.3 4.2C1.5 4.2.9 4.8.9 5.6s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" />
      </svg>
      <span className="tracking-tight font-sans text-[11.5px] font-semibold">
        fiverr<span className="text-emerald-500 font-bold">.</span>
      </span>
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="group relative rounded-2xl border border-black/[0.08] bg-white/80 p-5 shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-white hover:shadow-xl dark:border-white/[0.08] dark:bg-[#111114]/85 dark:hover:border-white/25 dark:hover:bg-[#16161a] dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      {/* Header: Initials Badge, Name, Country & Fiverr Logo */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Pure Initials Badge (No Client Photos) */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-gradient-to-br from-black/[0.03] to-black/[0.08] text-xs font-bold tracking-wider text-zinc-800 shadow-inner dark:border-white/10 dark:from-white/[0.04] dark:to-white/[0.1] dark:text-zinc-100 font-mono">
            {item.initials}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
              {item.name}
            </h4>
            <p className="truncate text-[11px] text-zinc-500 dark:text-white/50 flex items-center gap-1.5 mt-0.5 font-medium">
              <span>{item.countryFlag}</span>
              <span>{item.location}</span>
            </p>
          </div>
        </div>

        {/* Official Fiverr Brand Badge */}
        <FiverrLogo />
      </div>

      {/* Review Content */}
      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-white/75 font-normal">
        &ldquo;{item.content}&rdquo;
      </p>

      {/* Footer: 5-Star Rating, Project Type & Order Time */}
      <div className="mt-4 flex items-center justify-between border-t border-black/[0.05] pt-3 text-[11px] dark:border-white/[0.05]">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: item.rating }).map((_, i) => (
              <span key={i} className="text-xs">
                ★
              </span>
            ))}
          </div>
          <span className="font-bold text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
            5.0
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10.5px] text-zinc-500 dark:text-white/40">
          <span className="truncate max-w-[150px]">{item.projectType}</span>
          {item.duration && (
            <>
              <span>•</span>
              <span className="whitespace-nowrap">{item.duration}</span>
            </>
          )}
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
            const dbItems: Testimonial[] = json.data.map((item: any, idx: number) => {
              const clientName = item.name || "Satisfied Client";
              const initials = clientName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return {
                id: item._id || item.id || `db-${idx}`,
                name: clientName,
                initials: initials || "CL",
                role: item.role || "Client",
                company: item.company || "Enterprise",
                location: item.location || "United States",
                countryFlag: "🇺🇸",
                content: item.quote || item.content || "Great experience working with Arafat!",
                rating: item.rating || 5,
                projectType: item.projectType || "Full-Stack Project",
                duration: "Verified Order",
                verified: true,
              };
            });

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
        // Fallbacks already in place
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
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Fiverr Client Reviews
          </div>
          <h2 className="split text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            Trusted by clients &{" "}
            <span className="text-zinc-400 dark:text-white/40">founders worldwide.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-white/50">
            Real 5.0★ feedback from global clients on Fiverr and direct collaborations.
          </p>
        </div>

        {/* 3-Column Vertical Slow Auto-Scrolling Wall */}
        <div className="relative h-[600px] sm:h-[680px] lg:h-[720px] overflow-hidden rounded-3xl border border-black/10 bg-black/[0.015] p-3 sm:p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.015]">
          {/* Top Fade Gradient Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 sm:h-36 bg-gradient-to-b from-[#edf0f5] via-[#edf0f5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/85 dark:to-transparent" />

          {/* Bottom Fade Gradient Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-36 bg-gradient-to-t from-[#edf0f5] via-[#edf0f5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/85 dark:to-transparent" />

          {/* 3 Columns Grid */}
          <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* COLUMN 1: Auto Scrolls UP (Slow 80s) */}
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

            {/* COLUMN 2: Auto Scrolls DOWN (Slow 86s) */}
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

            {/* COLUMN 3: Auto Scrolls UP (Slow 95s) */}
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
