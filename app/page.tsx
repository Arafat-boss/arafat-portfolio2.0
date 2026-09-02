import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TechSkills from "./components/TechSkills";
import SelectedWork from "./components/SelectedWork";
import ProjectGallery from "./components/ProjectGallery";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import StatsCounter from "./components/StatsCounter";
import { servicesData, processStepsData } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/siteConfig";

export default function Home() {
  const { personal, socialLinks } = siteConfig;

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 selection:bg-zinc-900 selection:text-white dark:text-white dark:selection:bg-white dark:selection:text-black">
      {/* RESPONSIVE NAVBAR */}
      <Navbar />

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
        className="border-y border-black/10 bg-black/[0.015] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.015] scroll-mt-20 gsap-fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="mb-12 sm:mb-16">
            <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-zinc-500 dark:text-white/30">
              What I Do
            </p>

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
                className="gsap-stagger-item rounded-2xl border border-black/10 bg-[#fdfdfd] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-black/25 hover:shadow-lg dark:border-white/10 dark:bg-[#080808] dark:hover:border-white/25 dark:hover:shadow-none"
              >
                <div className="mb-6 sm:mb-10 font-mono text-xs text-zinc-400 dark:text-white/25">
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 gsap-fade-up">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-zinc-500 dark:text-white/30">
              My Process
            </p>

            <h2 className="split text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Simple.
              <br />
              <span className="text-zinc-400 dark:text-white/35">
                Transparent.
              </span>
              <br />
              Effective.
            </h2>
          </div>

          <div className="gsap-stagger-group divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
            {processStepsData.map((step) => (
              <div
                key={step.number}
                className="gsap-stagger-item grid gap-2 sm:gap-4 py-5 sm:py-7 grid-cols-1 sm:grid-cols-[60px_180px_1fr] transition-all duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] px-2 rounded-xl"
              >
                <span className="font-mono text-xs text-zinc-400 dark:text-white/25">
                  {step.number}
                </span>

                <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed sm:leading-6 text-zinc-600 dark:text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS FROM USA CLIENTS */}
      <Testimonials />

      {/* CONTACT SECTION (HAVE A PROJECT IN MIND?) */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-black/10 transition-colors duration-300 dark:border-white/10 gsap-fade-up">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 py-8 text-xs sm:text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-white/30">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>

          <div className="flex flex-wrap gap-4 sm:gap-6 font-medium">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-zinc-900 dark:hover:text-white"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}