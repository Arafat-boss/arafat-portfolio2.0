"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/lib/data/siteConfig";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { navLinks, personal } = siteConfig;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-[#edf0f5]/85 backdrop-blur-md dark:border-white/5 dark:bg-[#080808]/85"
          : "border-b border-transparent bg-transparent backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <a
          href="#hero"
          className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 transition hover:opacity-80 dark:text-white uppercase"
        >
          {personal.shortName}<span className="text-zinc-400 dark:text-white/40">.</span>
        </a>

        {/* DESKTOP NAV LINKS (HIDDEN ON MOBILE/TABLET) */}
        <div className="hidden items-center gap-6 lg:gap-8 text-sm font-medium text-zinc-600 md:flex dark:text-white/60">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-zinc-900 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Resume Button */}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-neumorphic text-xs !px-3 sm:!px-4 !py-1.5 sm:!py-2 inline-flex items-center gap-1.5"
          >
            <span>Resume</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-zinc-700 transition hover:bg-black/10 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-white cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN / SLIDE-DOWN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 sm:top-20 z-40 flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex-col justify-between border-b border-black/10 bg-white/95 p-6 backdrop-blur-2xl transition-all duration-300 md:hidden dark:border-white/10 dark:bg-[#0c0c0e]/95"
        >
          <div className="flex flex-col space-y-4 pt-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-white/40">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-zinc-800 transition hover:bg-black/5 hover:text-indigo-600 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-black/10 pt-4 pb-6 dark:border-white/10 flex flex-col gap-2.5">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => setMobileMenuOpen(false)}
              className="btn-neumorphic w-full !py-3 !text-sm inline-flex items-center justify-center gap-2"
            >
              <span>Download Resume</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 py-2.5 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition hover:bg-black/10 dark:hover:bg-white/10"
            >
              Get In Touch 🚀
            </a>
            <p className="mt-2 text-center text-xs text-zinc-400 dark:text-white/40">
              {personal.name} • {personal.role}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
