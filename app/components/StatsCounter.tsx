"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const statsData = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Commitment" },
];

export default function StatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-num-val");

      statNumbers.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute("data-target") || "0");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });

      // Subtle entrance fade & slide for the stat cards
      gsap.from(".stat-box", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="border-y border-black/10 transition-colors duration-300 dark:border-white/10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat-box px-3 sm:px-5 py-8 sm:py-10 lg:py-14 text-center ${
              index % 2 === 0 ? "border-r border-black/10 dark:border-white/10 lg:border-r-0" : ""
            } ${
              index < 2 ? "border-b border-black/10 dark:border-white/10 lg:border-b-0" : ""
            } ${
              index > 0 ? "lg:border-l lg:border-black/10 dark:lg:border-white/10" : ""
            }`}
          >
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl xl:text-5xl dark:text-white">
              <span className="stat-num-val" data-target={stat.value}>
                0
              </span>
              <span>{stat.suffix}</span>
            </div>
            <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 dark:text-white/35">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
