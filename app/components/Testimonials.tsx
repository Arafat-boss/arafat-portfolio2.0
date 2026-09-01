"use client";

import { useRef } from "react";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  quote: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Engineering Director",
    company: "NextWave Tech",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote:
      "Working with Arafat was a smooth and inspiring experience. His mastery of React, Next.js, and complex backend APIs helped us scale seamlessly to thousands of users.",
  },
  {
    id: "2",
    name: "David Miller",
    role: "Founder & CEO",
    company: "Apex Digital Labs",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote:
      "Arafat not only built our frontend from scratch but also solved our database latency bottlenecks. Outstanding communication, clean code, and high-speed execution.",
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Head of Product",
    company: "FinVibe Solutions",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote:
      "The UI polish and animations Arafat brought to our SaaS product blew our investors away. He turned complex financial workflows into elegant, intuitive screens.",
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Aetheria Cloud",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote:
      "Arafat is one of the most reliable full-stack developers I've worked with. He writes clean, modular MERN code and always meets production deadlines early.",
  },
  {
    id: "5",
    name: "Chloe Bennett",
    role: "Creative Director",
    company: "Studio Lumina",
    location: "Chicago, IL",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    quote:
      "From Figma design handoff to a buttery-smooth responsive website, Arafat handled everything flawlessly. His eye for typography and detail is second to none.",
  },
  {
    id: "6",
    name: "Jason Torres",
    role: "Lead Architect",
    company: "OmniStack Inc.",
    location: "Boston, MA",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    quote:
      "Incredible technical depth in Node.js and MongoDB. He optimized our REST APIs and reduced response times by over 40%. A true professional in every way.",
  },
  {
    id: "7",
    name: "Sophia Martinez",
    role: "Co-Founder",
    company: "Metrix Analytics",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    quote:
      "Arafat built our analytics dashboard with fluid micro-interactions and bulletproof API integration. Flawless communication across US timezones.",
  },
  {
    id: "8",
    name: "Rachel Green",
    role: "Managing Director",
    company: "Pulse Media",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    quote:
      "Delivered beyond our expectations! The code quality, documentation, and responsiveness made this project one of our smoothest releases ever.",
  },
  {
    id: "9",
    name: "Brandon Cole",
    role: "VP of Technology",
    company: "Elevate Commerce",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    quote:
      "Arafat restructured our database schema and refactored our Next.js frontend with stellar efficiency. Truly top-tier engineering talent.",
  },
  {
    id: "10",
    name: "Olivia Harris",
    role: "Principal Product Manager",
    company: "NovaStream",
    location: "San Diego, CA",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80",
    quote:
      "Super intuitive UI, robust authentication, and spotless code. Arafat exceeded all milestones on our product roadmap. Highly recommended!",
  },
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section id="testimonials" className="py-16 sm:py-20 transition-colors duration-300 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* FROSTED GLASS CONTAINER CARD (MATCHING USER REFERENCE DESIGN) */}
        <div className="relative rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white/70 p-4 sm:p-8 md:p-10 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80">
          {/* Header Subtitle, Title & Carousel Nav Buttons */}
          <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                TESTIMONIALS
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                What Clients Say
              </h2>
            </div>

            {/* Carousel Arrow Buttons */}
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

          {/* Testimonial Cards Horizontal Slider with COMPLETELY HIDDEN SCROLLBAR & FULL HEADROOM */}
          <div
            ref={scrollContainerRef}
            className="flex w-full gap-3.5 sm:gap-6 overflow-x-auto overflow-y-visible px-0.5 py-3 sm:py-5 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="group relative z-0 flex w-[calc(100vw-64px)] max-w-[340px] sm:w-[320px] md:w-[360px] flex-shrink-0 flex-col justify-between rounded-2xl border border-black/[0.04] bg-white/85 p-5 sm:p-6 shadow-xs backdrop-blur-xl transition-all duration-300 hover:z-20 hover:-translate-y-1.5 hover:border-black/[0.08] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] dark:border-white/[0.06] dark:bg-white/[0.035] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.06] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.65)] snap-start"
              >
                {/* Quote Text & Quotation Icon */}
                <div>
                  <div className="flex items-center justify-between pb-3">
                    {/* 5-star rating */}
                    <div className="flex gap-1 text-amber-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-xs">
                          {star}
                        </span>
                      ))}
                    </div>

                    {/* Quotation Mark SVG */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-indigo-400/50 dark:text-indigo-400/40"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-sm">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Client Profile (Clean Text Typography Without Images) */}
                <div className="mt-5 border-t border-black/5 pt-3.5 dark:border-white/5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-xs font-bold text-zinc-900 dark:text-white sm:text-sm">
                        {item.name}
                      </h3>
                      <p className="truncate text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.role}, {item.company}
                      </p>
                    </div>

                    <span className="flex-shrink-0 rounded-full bg-indigo-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
