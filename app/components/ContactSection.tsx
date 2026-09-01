"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web Application",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "Full-Stack Web Application",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-20 transition-colors duration-300 scroll-mt-20 overflow-hidden gsap-fade-up">
      {/* COLOR GRADIENT AURA & MESH */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[950px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-pink-500/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CONTAINER CARD */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white/60 p-4 sm:p-8 md:p-12 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#0c0c0e]/80">
          {/* LARGE ROTATING 3D GLASS ORB & GYROSCOPIC ORBITAL RINGS */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex h-[280px] w-[280px] sm:h-[480px] sm:w-[480px] lg:h-[680px] lg:w-[680px] items-center justify-center opacity-15 sm:opacity-20 dark:opacity-25 transition-opacity duration-700">
            {/* Ambient luminous fluid aura */}
            <div className="absolute h-[240px] w-[240px] sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px] rounded-full bg-gradient-to-tr from-indigo-500/25 via-violet-400/20 to-pink-400/25 blur-2xl sm:blur-3xl animate-pulse" />

            {/* Big Glass Orb Core */}
            <div className="relative flex h-[200px] w-[200px] sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px] items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-4 sm:p-8 shadow-2xl backdrop-blur-md">
              {/* Inner Glowing Nucleus */}
              <div className="h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-gradient-to-tr from-indigo-500/40 via-violet-500/35 to-pink-400/40 blur-xl animate-pulse" />

              {/* 3D Spinning Orbital Rings (Clockwise) */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="absolute h-full w-full text-indigo-500/60 animate-spin"
                style={{ animationDuration: "24s" }}
              >
                <ellipse cx="50" cy="50" rx="46" ry="18" strokeDasharray="6 4" transform="rotate(35 50 50)" />
                <ellipse cx="50" cy="50" rx="46" ry="18" strokeDasharray="8 3" transform="rotate(-35 50 50)" />
                <ellipse cx="50" cy="50" rx="42" ry="24" transform="rotate(75 50 50)" />
              </svg>

              {/* 3D Counter-Spinning Inner Rings (Counter-Clockwise) */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="absolute h-[80%] w-[80%] text-violet-500/50 animate-spin"
                style={{ animationDuration: "16s", animationDirection: "reverse" }}
              >
                <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(15 50 50)" />
                <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-70 50 50)" />
                <circle cx="50" cy="50" r="28" strokeDasharray="4 4" strokeWidth="0.8" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-center">
            {/* LEFT COLUMN: CONTACT DETAILS (BLACK IN LIGHT BG, WHITE IN DARK BG) */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                  LET&apos;S CONNECT
                </p>

                <h2 className="split mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  Have a project in mind?
                </h2>
                <p className="mt-2 text-base font-medium text-zinc-600 dark:text-white/80">
                  Let&apos;s create something amazing together.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="mt-8 space-y-4">
                {/* Email */}
                <a
                  href="mailto:mmarafatu@gmail.com"
                  className="group flex items-center gap-3.5 text-xs text-zinc-700 transition-colors hover:text-zinc-900 dark:text-white/90 dark:hover:text-white sm:text-sm"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-800 shadow-xs backdrop-blur-md transition-transform duration-200 group-hover:scale-105 dark:border-white/20 dark:bg-white/10 dark:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="font-medium">mmarafatu@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+8801703512784"
                  className="group flex items-center gap-3.5 text-xs text-zinc-700 transition-colors hover:text-zinc-900 dark:text-white/90 dark:hover:text-white sm:text-sm"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-800 shadow-xs backdrop-blur-md transition-transform duration-200 group-hover:scale-105 dark:border-white/20 dark:bg-white/10 dark:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="font-medium">+880 1703-512784</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 text-xs text-zinc-700 dark:text-white/90 sm:text-sm">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-800 shadow-xs backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="font-medium">Dhaka, Bangladesh • Global Remote (US EST/PST)</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FROSTED GLASS FORM */}
            <div className="relative rounded-[22px] border border-black/10 bg-white/70 p-6 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-black/10 bg-white/90 px-4 py-3 text-xs font-medium text-zinc-900 placeholder:text-zinc-400 backdrop-blur-md focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-indigo-400 dark:focus:bg-black/40"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email"
                      className="w-full rounded-xl border border-black/10 bg-white/90 px-4 py-3 text-xs font-medium text-zinc-900 placeholder:text-zinc-400 backdrop-blur-md focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-indigo-400 dark:focus:bg-black/40"
                    />
                  </div>
                </div>

                {/* Row 2: Project Type Dropdown */}
                <div className="relative">
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-black/10 bg-white/90 px-4 py-3 pr-10 text-xs font-medium text-zinc-900 backdrop-blur-md focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#18181b] dark:text-white dark:focus:border-indigo-400"
                  >
                    <option value="Full-Stack Web Application" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">Full-Stack Web Application</option>
                    <option value="Frontend (Next.js / React.js)" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">Frontend (Next.js / React.js)</option>
                    <option value="Backend API & Database" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">Backend API & Database</option>
                    <option value="MERN Stack MVP" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">MERN Stack MVP</option>
                    <option value="UI/UX Design to Code" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">UI/UX Design to Code</option>
                    <option value="Other Inquiries" className="bg-white text-zinc-900 dark:bg-[#18181b] dark:text-white">Other Inquiries</option>
                  </select>

                  {/* Dropdown Chevron Icon */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-white/50">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message"
                    className="w-full resize-none rounded-xl border border-black/10 bg-white/90 px-4 py-3 text-xs font-medium text-zinc-900 placeholder:text-zinc-400 backdrop-blur-md focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-indigo-400 dark:focus:bg-black/40"
                  />
                </div>

                {/* Row 4: Full-Width Submit Button */}
                <div className="space-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neumorphic w-full !py-3.5 !text-sm group disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <p className="animate-fade-in text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ✓ Message sent successfully! I will get back to you shortly.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
