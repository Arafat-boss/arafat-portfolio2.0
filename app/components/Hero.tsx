"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Set initial state for card before 40% scroll
        gsap.set(".bio-card", {
          x: 180,
          y: 40,
          opacity: 0,
          scale: 0.88,
          rotate: 3,
          pointerEvents: "none",
        });

        // Pin hero image and reveal bio card starting at 40% scroll
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-image-wrap",
            start: "top 18%",
            end: "+=750",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        scrollTl
          .fromTo(
            ".hero-image",
            { scale: 1.15, filter: "grayscale(0.8)" },
            { scale: 1, filter: "grayscale(0)", ease: "none", duration: 1 },
            0
          )
          .to(
            ".bio-card",
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              pointerEvents: "auto",
              ease: "power2.out",
              duration: 0.4,
            },
            0.6 // Starts precisely at 60% scroll
          );
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile Bio Card entrance on scroll
        gsap.fromTo(
          ".mobile-bio-card",
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".mobile-bio-card",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // =========================
      // Hero Intro Animation
      // =========================

      // Available badge
      tl.from(".hero-badge", {
        y: 30,
        opacity: 0,
        duration: 0.7,
      })

        // MERN Stack Developer
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )

        // Main heading
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )

        // Description
        .from(
          ".hero-description",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )

        // Buttons
        .from(
          ".hero-buttons",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        );

      // =========================
      // Tech Stack SplitText
      // =========================
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          const techBadges = gsap.utils.toArray<HTMLElement>(".tech-badge");

          techBadges.forEach((badge) => {
            try {
              const split = SplitText.create(badge, {
                type: "words",
                wordsClass: "word++",
              });

              gsap.from(split.words, {
                y: -100,
                opacity: 0,
                rotation: "random(-80, 80)",
                stagger: 0.1,
                duration: 1,
                ease: "back",
              });
            } catch {
              // Fallback if SplitText is not available
              gsap.from(badge, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
              });
            }
          });
        });
      }
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section ref={heroRef} id="hero" className="relative overflow-hidden pt-20 scroll-mt-20">
      <div id="about" className="absolute top-0 pointer-events-none" />
      <div className="absolute left-1/2 top-20 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] dark:bg-white/[0.04] blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-start gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 lg:grid-cols-[1.15fr_.85fr]">
        {/* LEFT CONTENT */}
        <div className="hero-copy relative z-10">
          {/* Badge */}
          <div className="hero-badge mb-5 sm:mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for freelance projects
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle mb-4 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500 dark:text-white/40">
            MD. ARAFAT SARKER • MERN STACK DEVELOPER
          </p>

          {/* Title */}
          <h1 className="hero-title max-w-4xl text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:tracking-[-0.04em] text-zinc-900 sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl dark:text-white">
            <span className="block">I build</span>
            <span className="block text-zinc-400 dark:text-white/40">
              digital products
            </span>
            <span className="block">that work.</span>
          </h1>

          {/* Description */}
          <p className="hero-description mt-6 sm:mt-8 max-w-2xl text-sm leading-relaxed sm:text-lg sm:leading-7 text-zinc-600 dark:text-white/55">
            Analytical, self-motivating and confident Full-Stack Developer specializing in React.js, Next.js, Node.js, Express.js and MongoDB. I thrive on building beautiful, robust and conversion-focused web experiences.
          </p>

          {/* Buttons */}
          <div className="hero-buttons mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#projects"
              className="btn-neumorphic text-sm !py-3 sm:!py-3.5"
            >
              <span>View My Work</span>
              <span>→</span>
            </a>

            <a
              href="#contact"
              className="btn-neumorphic text-sm !py-3 sm:!py-3.5"
            >
              <span>Start a Project</span>
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mt-12 flex flex-wrap gap-3">
            {[
              "React.js",
              "Next.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "TypeScript",
              "Tailwind CSS",
              "Firebase",
            ].map((tech) => (
              <span
                key={tech}
                className="tech-badge rounded-full border border-black/10 bg-black/[0.02] px-4 py-2 text-xs font-medium text-zinc-700 transition hover:border-black/25 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60 dark:hover:border-white/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* MOBILE HERO IMAGE (< lg) - FULL VISIBLE HEAD & PORTRAIT */}
          <div className="relative mt-8 sm:mt-10 flex items-center justify-center overflow-hidden rounded-3xl lg:hidden">
            <img
              src="https://i.ibb.co.com/DHtbRXZS/imaget.png"
              alt="MD. ARAFAT SARKER"
              className="h-auto max-h-[460px] sm:max-h-[520px] w-auto max-w-full object-contain object-top drop-shadow-xl"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#edf0f5] via-[#edf0f5]/60 to-transparent dark:from-[#080808] dark:via-[#080808]/60 dark:to-transparent" />
          </div>

          {/* MOBILE BIO CARD (< lg) */}
          <div className="mobile-bio-card mt-6 block rounded-3xl border border-black/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111]/95 dark:shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                A little about me
              </span>
              <span className="rounded-full bg-black/5 px-2.5 py-1 font-mono text-[11px] text-zinc-500 dark:bg-white/5 dark:text-white/40">
                Full-Stack
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Turning ideas into{" "}
              <span className="text-zinc-400 dark:text-white/40">real products.</span>
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-white/60">
              <p>
                Hello, I&apos;m a Front-end Developer, interested in developing beautiful and robust web applications. Having knowledge in React.js, MongoDB, Express.js, and Node.js, I thrive on creating simple user experiences.
              </p>
              <p>
                I like to work collaboratively by nature, and I enjoy working as a team both professionally to deliver scalable, high-performance digital products.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-zinc-600 dark:text-white/55">
              <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                3+ years experience
              </span>
              <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                Remote friendly
              </span>
              <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                Clean Architecture
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (DESKTOP) */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-10 rounded-full bg-cyan-500/[0.03] dark:bg-white/[0.03] blur-3xl" />

          <div className="hero-image-wrap relative mb-0">
            {/* Image Container with smooth bottom feathering mask & gradient overlay */}
            <div className="relative overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
              <img
                src="https://i.ibb.co.com/DHtbRXZS/imaget.png"
                alt="Arafat's featured work"
                className="hero-image block aspect-[920/640] h-[520px] lg:h-[560px] xl:h-[600px] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fcfcfc] via-[#fcfcfc]/70 to-transparent dark:from-[#080808] dark:via-[#080808]/70 dark:to-transparent" />
            </div>

            {/* DESKTOP BIO CARD - POSITIONED ON THE LEFT OF THE IMAGE WITH INCREASED WIDTH */}
            <div className="bio-card absolute right-full mr-5 lg:mr-7 top-1/2 z-20 w-[540px] lg:w-[620px] xl:w-[700px] 2xl:w-[750px] -translate-y-1/2 rounded-3xl border border-black/10 bg-white/95 p-7 shadow-2xl backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0c0e]/95 dark:shadow-black/70 lg:p-8">
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    A little about me
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-black/5 bg-black/[0.02] px-3 py-1 font-mono text-xs text-zinc-500 dark:border-white/5 dark:bg-white/[0.03] dark:text-white/40">
                    Full-Stack • MERN
                  </span>
                  <span
                    className="text-2xl font-light text-zinc-400 dark:text-white/30"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Turning ideas into{" "}
                <span className="text-zinc-400 dark:text-white/35">
                  real products.
                </span>
              </h2>

              {/* 2-Column Content Grid */}
              <div className="mt-5 grid gap-6 md:grid-cols-[1.25fr_1fr]">
                {/* Left Col: Narrative Story */}
                <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-white/60 sm:text-[14.5px] sm:leading-7">
                  <p>
                    Hello, I&apos;m a Front-end Developer, interested in developing beautiful and robust web applications. Having knowledge in React.js, MongoDB, Express.js, and Node.js, I thrive on creating simple user experiences.
                  </p>
                  <p>
                    I like to work collaboratively by nature, and I enjoy working as a team both professionally to deliver scalable, high-performance digital products.
                  </p>
                  <p className="text-xs font-mono text-zinc-500 dark:text-white/45 pt-1">
                    📧 mmarafatu@gmail.com &bull; 📱 +8801703512784
                  </p>
                </div>

                {/* Right Col: Pillars & Badges */}
                <div className="flex flex-col justify-between gap-3.5">
                  <div className="space-y-2.5">
                    <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-white/30">
                        Design & Frontend
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-white/80">
                        Responsive UI, Next.js, React, Tailwind & GSAP animations
                      </p>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-white/30">
                        Backend & Systems
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-white/80">
                        Node.js, Express, MongoDB, REST APIs & Authentication
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-zinc-600 dark:text-white/55">
                    <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                      3+ years exp
                    </span>
                    <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                      Remote friendly
                    </span>
                    <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                      Clean Architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
