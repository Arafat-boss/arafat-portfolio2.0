"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlineHome,
  HiOutlineCodeBracket,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: "hero", label: "Home", href: "#hero", icon: HiOutlineHome },
  { id: "skills", label: "Skills", href: "#skills", icon: HiOutlineCodeBracket },
  { id: "projects", label: "Work", href: "#projects", icon: HiOutlineBriefcase },
  { id: "gallery", label: "Gallery", href: "#gallery", icon: HiOutlineSparkles },
  { id: "contact", label: "Contact", href: "#contact", icon: HiOutlineChatBubbleLeftRight },
];

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.5,
};

export default function CurvedBottomBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingFromClick = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize active tab with scroll position smoothly
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (isScrollingFromClick.current) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // If at very bottom of page, activate Contact
        if (scrollY + windowHeight >= docHeight - 120) {
          setActiveIndex(TABS.length - 1);
          return;
        }

        // If at very top, activate Home
        if (scrollY < 120) {
          setActiveIndex(0);
          return;
        }

        const scrollPosition = scrollY + 200;
        const sectionIds = TABS.map((t) => t.id);

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveIndex(i);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleTabClick = (index: number, href: string) => {
    setActiveIndex(index);
    isScrollingFromClick.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const yOffset = -70;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    // Reset user scroll lock after smooth scroll settles
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingFromClick.current = false;
    }, 900);
  };

  const ActiveIcon = TABS[activeIndex].icon;

  return (
    <aside
      aria-label="Mobile Navigation"
      className="fixed bottom-3 inset-x-3 z-50 flex justify-center pointer-events-none md:hidden"
    >
      <div className="relative w-full max-w-[360px] pointer-events-auto select-none">
        
        {/* COMPACT ELEVATED FLOATING ACTIVE ICON BUBBLE */}
        <motion.div
          className="absolute -top-3.5 z-20 flex items-center justify-center pointer-events-none"
          animate={{
            left: `${(activeIndex + 0.5) * 20}%`,
          }}
          transition={SPRING_CONFIG}
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-zinc-950/95 text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)] ring-2 ring-black/10 backdrop-blur-xl transition-all duration-300 dark:bg-white/95 dark:text-zinc-950 dark:shadow-[0_6px_18px_rgba(255,255,255,0.22)] dark:ring-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.6, opacity: 0, y: 2 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: -2 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <ActiveIcon className="h-4 w-4 stroke-[2.2]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* MAIN COMPACT CURVED NAVIGATION BAR CONTAINER */}
        <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-white/50 px-2 pt-2 pb-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-black/50 dark:shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
          
          {/* SLIDING SCOOPED NOTCH OVERLAY */}
          <motion.div
            className="absolute top-0 pointer-events-none h-4.5 w-16 -translate-x-1/2 z-10"
            animate={{
              left: `${(activeIndex + 0.5) * 20}%`,
            }}
            transition={SPRING_CONFIG}
          >
            {/* SVG SCOOPED INVERTED CURVE */}
            <svg
              viewBox="0 0 64 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              {/* Subtle accent border line */}
              <path
                d="M0 0 C12 0 16 18 32 18 C48 18 52 0 64 0"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-black/15 dark:text-white/15 transition-colors duration-300"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* TAB BUTTONS ROW */}
          <div className="relative z-10 grid grid-cols-5 items-center">
            {TABS.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index, tab.href)}
                  type="button"
                  aria-label={tab.label}
                  className="group relative flex flex-col items-center justify-center py-0.5 outline-none transition-all cursor-pointer"
                >
                  {/* ICON */}
                  <div
                    className={`flex h-5 w-5 items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "opacity-0 scale-50 pointer-events-none"
                        : "opacity-75 group-hover:opacity-100 group-hover:scale-110 text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 stroke-[1.8]" />
                  </div>

                  {/* LABEL TEXT */}
                  <span
                    className={`mt-0.5 text-[9.5px] tracking-tight transition-all duration-200 ${
                      isActive
                        ? "font-bold text-black dark:text-white scale-105"
                        : "font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BOTTOM HOME PILL BAR */}
          <div className="mt-1 flex justify-center">
            <div className="h-0.5 w-20 rounded-full bg-black/10 dark:bg-white/10 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </aside>
  );
}
