"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { siteConfig } from "@/lib/data/siteConfig";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { personal } = siteConfig;

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
        )

        // Social / Profile links
        .fromTo(
          ".hero-social-link",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            clearProps: "all",
          },
          "-=0.3"
        );
    },
    {
      scope: heroRef,
    }
  );

  const heroSocials = [
    {
      name: "GitHub",
      tooltip: "GitHub Profile",
      url: "https://github.com/Arafat-boss",
      icon: (
        <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      tooltip: "LinkedIn Profile",
      url: "https://www.linkedin.com/in/md-arafat-sarker/",
      icon: (
        <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      tooltip: "Facebook Profile",
      url: "https://www.facebook.com/Arraf.Ja/",
      icon: (
        <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Resume",
      tooltip: "Download Resume",
      url: personal.resumeUrl || "https://drive.google.com/uc?export=download&id=1JWrzIuntfLVd3K_1Lgi8jWN9c9kIX56y",
      isDownload: true,
      icon: (
        <svg className="h-5 w-5 stroke-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 18 15 15" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={heroRef} id="hero" className="relative overflow-hidden pt-20 scroll-mt-20">
      <div id="about" className="absolute top-0 pointer-events-none" />
      <div className="absolute left-1/2 top-20 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] dark:bg-white/[0.04] blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-start gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 lg:grid-cols-[1.15fr_.85fr]">
        {/* LEFT CONTENT */}
        <div className="hero-copy relative z-10">
          {/* Badge */}
          <div className="hero-badge mb-5 sm:mb-7 inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
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
              className="btn-neumorphic text-sm !py-3 sm:!py-3.5 rounded-lg"
            >
              <span>View My Work</span>
              <span>→</span>
            </a>

            <a
              href="#contact"
              className="btn-neumorphic text-sm !py-3 sm:!py-3.5 rounded-lg"
            >
              <span>Start a Project</span>
            </a>
          </div>

          {/* Social Media & Resume Action Buttons (GitHub, LinkedIn, Facebook, Resume) */}
          <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-3.5">
            {heroSocials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                {...(item.isDownload ? { download: "MD_Arafat_Sarker_Resume.pdf" } : {})}
                aria-label={item.tooltip}
                title={item.tooltip}
                className="hero-social-link btn-neumorphic-icon group transition-all duration-300 text-zinc-700 hover:text-zinc-950 hover:border-black/25 dark:text-zinc-300 dark:hover:text-white dark:hover:border-white/35 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]"
              >
                {item.icon}

                {/* Floating Tooltip */}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100 dark:bg-white dark:text-zinc-900 z-30">
                  {item.tooltip}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
                </span>
              </a>
            ))}
          </div>

          {/* MOBILE HERO IMAGE (< lg) - FULL VISIBLE HEAD & PORTRAIT */}
          <div className="relative mt-8 sm:mt-10 flex items-center justify-center overflow-hidden rounded-xl lg:hidden">
            <img
              src="https://i.ibb.co.com/DHtbRXZS/imaget.png"
              alt="MD. ARAFAT SARKER"
              className="h-auto max-h-[460px] sm:max-h-[520px] w-auto max-w-full object-contain object-top drop-shadow-xl"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#edf0f5] via-[#edf0f5]/60 to-transparent dark:from-[#080808] dark:via-[#080808]/60 dark:to-transparent" />
          </div>

          {/* MOBILE BIO CARD (< lg) */}
          <div className="mobile-bio-card mt-6 block rounded-xl border border-black/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111]/95 dark:shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                A little about me
              </span>
              <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[11px] text-zinc-500 dark:bg-white/5 dark:text-white/40">
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
              <span className="rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                3+ years experience
              </span>
              <span className="rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                Remote friendly
              </span>
              <span className="rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.02]">
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
            <div className="relative overflow-hidden rounded-xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
              <img
                src="https://i.ibb.co.com/DHtbRXZS/imaget.png"
                alt="Arafat's featured work"
                className="hero-image block aspect-[920/640] h-[520px] lg:h-[560px] xl:h-[600px] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fcfcfc] via-[#fcfcfc]/70 to-transparent dark:from-[#080808] dark:via-[#080808]/70 dark:to-transparent" />
            </div>

            {/* DESKTOP BIO CARD - POSITIONED ON THE LEFT OF THE IMAGE WITH CRISP SLEEK RADII */}
            <div className="bio-card absolute right-full mr-5 lg:mr-7 top-1/2 z-20 w-[540px] lg:w-[620px] xl:w-[700px] 2xl:w-[750px] -translate-y-1/2 rounded-xl border border-black/10 bg-white/95 p-7 shadow-2xl backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0c0e]/95 dark:shadow-black/70 lg:p-8">
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    A little about me
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-black/5 bg-black/[0.02] px-3 py-1 font-mono text-xs text-zinc-500 dark:border-white/5 dark:bg-white/[0.03] dark:text-white/40">
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
                    📧 {personal.email} &bull; 📱 {personal.phone}
                  </p>
                </div>

                {/* Right Col: Pillars & Badges */}
                <div className="flex flex-col justify-between gap-3.5">
                  <div className="space-y-2.5">
                    <div className="rounded-lg border border-black/5 bg-black/[0.02] p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-white/30">
                        Design & Frontend
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-white/80">
                        Responsive UI, Next.js, React, Tailwind & GSAP animations
                      </p>
                    </div>

                    <div className="rounded-lg border border-black/5 bg-black/[0.02] p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-white/30">
                        Backend & Systems
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-zinc-800 dark:text-white/80">
                        Node.js, Express, MongoDB, REST APIs & Authentication
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-zinc-600 dark:text-white/55">
                    <span className="rounded-md border border-black/10 bg-black/[0.02] px-2.5 py-1 dark:border-white/10 dark:bg-white/[0.02]">
                      3+ years exp
                    </span>
                    <span className="rounded-md border border-black/10 bg-black/[0.02] px-2.5 py-1 dark:border-white/10 dark:bg-white/[0.02]">
                      Remote friendly
                    </span>
                    <span className="rounded-md border border-black/10 bg-black/[0.02] px-2.5 py-1 dark:border-white/10 dark:bg-white/[0.02]">
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
