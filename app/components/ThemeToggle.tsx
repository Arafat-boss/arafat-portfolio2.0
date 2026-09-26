"use client";

import { useEffect, useState, useCallback } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  const updateStateFromDOM = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    // Initial sync
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    updateStateFromDOM();
    setMounted(true);

    // Listen to custom theme-change events from other components/toggles
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "dark" | "light" }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      } else {
        updateStateFromDOM();
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [updateStateFromDOM]);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme: "dark" | "light" = isCurrentlyDark ? "light" : "dark";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore
    }

    setTheme(nextTheme);

    // Dispatch custom event for particle canvas & components
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: nextTheme } })
    );
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-black/10 dark:border-white/10" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/5 text-zinc-700 transition-all duration-300 hover:border-black/25 hover:bg-black/10 hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
    >
      {theme === "dark" ? (
        // Sun Icon for Dark Mode (Click to switch to light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-amber-300 transition-transform duration-300 group-hover:rotate-90"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        // Moon Icon for Light Mode (Click to switch to dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-zinc-900 transition-transform duration-300 group-hover:-rotate-45"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
