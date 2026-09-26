"use client";

import { useEffect, useState } from "react";
import Dock, { DockItemData } from "./Dock";
import {
  VscHome,
  VscCode,
  VscArchive,
  VscFolder,
  VscMail,
  VscFilePdf,
} from "react-icons/vsc";
import { siteConfig } from "@/lib/data/siteConfig";

export default function MobileDock() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme =
      saved ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(initialTheme);
    setMounted(true);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "dark" | "light" }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: nextTheme } })
    );
  };

  if (!mounted) return null;

  const items: DockItemData[] = [
    {
      icon: <VscHome className="h-5 w-5" />,
      label: "Home",
      href: "#hero",
    },
    {
      icon: <VscCode className="h-5 w-5" />,
      label: "Skills",
      href: "#skills",
    },
    {
      icon: <VscFolder className="h-5 w-5" />,
      label: "Projects",
      href: "#projects",
    },
    {
      icon: <VscArchive className="h-5 w-5" />,
      label: "Gallery",
      href: "#gallery",
    },
    {
      icon: <VscMail className="h-5 w-5" />,
      label: "Contact",
      href: "#contact",
    },
    {
      icon: <VscFilePdf className="h-5 w-5" />,
      label: "Resume",
      onClick: () => {
        window.open(siteConfig.personal.resumeUrl, "_blank", "noopener,noreferrer");
      },
    },
    {
      icon: (
        <span className="text-sm">
          {theme === "dark" ? "☀️" : "🌙"}
        </span>
      ),
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
  ];

  return (
    <aside
      aria-label="Mobile navigation dock"
      className="fixed bottom-3 sm:bottom-4 inset-x-0 z-50 flex justify-center pointer-events-none md:hidden px-3"
    >
      <div className="pointer-events-auto">
        <Dock
          items={items}
          panelHeight={54}
          baseItemSize={40}
          magnification={56}
          distance={120}
        />
      </div>
    </aside>
  );
}
