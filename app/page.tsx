import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import CurvedBottomBar from "./components/CurvedBottomBar";
import TechSkills from "./components/TechSkills";
import SelectedWork from "./components/SelectedWork";
import ProjectGallery from "./components/ProjectGallery";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import StatsCounter from "./components/StatsCounter";
import Footer from "./components/Footer";
import { servicesData, processStepsData } from "@/lib/data/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-zinc-900 selection:bg-zinc-900 selection:text-white dark:text-white dark:selection:bg-white dark:selection:text-black">
      {/* RESPONSIVE NAVBAR */}
      <Navbar />

      {/* MOBILE CURVED / SCOOPED BOTTOM TAB BAR */}
      <CurvedBottomBar />

      {/* HERO SECTION */}
      <Hero />

      {/* STATS (Auto Count-Up Animation) */}
      <StatsCounter />

      {/* DETAILED TECH SKILLS & PROFICIENCIES */}
      <TechSkills />

      {/* SELECTED WORK & PROJECTS */}
      <SelectedWork />

      {/* PROJECT GALLERY (FULL ARCHIVE & FILTERING CAROUSEL) */}
      <ProjectGallery />

      {/* SERVICES */}
      <section
        id="services"
        className="py-16 sm:py-24 lg:py-28 transition-colors duration-300 scroll-mt-20 gsap-fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 mb-3 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>What I Do</span>
            </div>

            <h2 className="split text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Services built around{" "}
              <span className="text-zinc-400 dark:text-white/35">
                your goals.
              </span>
            </h2>
          </div>

          <div className="gsap-stagger-group grid gap-5 grid-cols-1 md:grid-cols-2">
            {servicesData.map((service) => (
              <div
                key={service.number}
                className="gsap-stagger-item rounded-xl border border-black/10 bg-white/90 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-black/25 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#0c0c0e]/90 dark:hover:border-white/25 dark:hover:shadow-none"
              >
                <div className="mb-5 sm:mb-8 font-mono text-xs text-zinc-400 dark:text-white/25">
                  / {service.number}
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm leading-relaxed sm:leading-7 text-zinc-600 dark:text-white/40">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-black/10 bg-white py-16 sm:py-24 lg:py-28 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0c0f] gsap-fade-up">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Left Header */}
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 mb-3 sm:mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>My Workflow</span>
              </div>

              <h2 className="split text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white leading-[1.1]">
                Simple.
                <br />
                <span className="text-zinc-400 dark:text-white/35">
                  Transparent.
                </span>
                <br />
                Effective.
              </h2>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-white/50 max-w-md">
                A structured engineering approach designed for high velocity, crystal-clear communication, and pixel-perfect results at every stage.
              </p>

              <div className="mt-8 hidden sm:block">
                <a
                  href="#contact"
                  className="btn-neumorphic text-xs !px-5 !py-2.5 rounded-lg inline-flex items-center gap-2"
                >
                  <span>Start a Project</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: 4 Styled Interactive Cards */}
            <div className="gsap-stagger-group space-y-4">
              {processStepsData.map((step, idx) => {
                const icons = [
                  // 01 Discover
                  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>,
                  // 02 Plan
                  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>,
                  // 03 Develop
                  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>,
                  // 04 Launch
                  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  </svg>,
                ];

                return (
                  <div
                    key={step.number}
                    className="gsap-stagger-item group relative flex items-start gap-4 sm:gap-5 rounded-xl border border-black/10 bg-[#fdfdfd] dark:bg-[#121216]/90 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_20px_45px_-15px_rgba(99,102,241,0.15)] dark:border-white/10 dark:hover:border-indigo-400/40 dark:hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8)]"
                  >
                    {/* Icon Badge */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.03] text-zinc-700 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500/30 group-hover:bg-indigo-50/60 group-hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:group-hover:border-indigo-400/30 dark:group-hover:bg-indigo-950/40 dark:group-hover:text-indigo-400">
                      {icons[idx]}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {step.title}
                        </h3>
                        <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-white/30 rounded-md bg-black/[0.03] dark:bg-white/[0.04] px-2 py-0.5">
                          /{step.number}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-white/55">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS FROM USA CLIENTS */}
      <Testimonials />

      {/* CONTACT SECTION (HAVE A PROJECT IN MIND?) */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}