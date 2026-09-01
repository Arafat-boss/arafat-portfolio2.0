"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
}

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Small delay to ensure DOM and fonts are ready
    const timer = setTimeout(() => {
      // 1. Initial State for SplitText
      gsap.set(".split", { opacity: 1 });

      // 2. Animate SplitText Headings
      const splitElements = gsap.utils.toArray<HTMLElement>(".split");
      splitElements.forEach((el) => {
        try {
          SplitText.create(el, {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit: (self: any) => {
              return gsap.from(self.lines, {
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
                duration: 0.8,
                yPercent: 100,
                opacity: 0,
                stagger: 0.08,
                ease: "expo.out",
                clearProps: "transform,opacity",
              });
            },
          });
        } catch {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "expo.out",
          });
        }
      });

      // 3. Global Fade-Up Elements (Single elements)
      const fadeUpElements = gsap.utils.toArray<HTMLElement>(".gsap-fade-up");
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 4. Global Fade-In Elements (Subtle scale + opacity)
      const fadeInElements = gsap.utils.toArray<HTMLElement>(".gsap-fade-in");
      fadeInElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            scale: 0.96,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 5. Staggered Card Groups
      const staggerContainers = gsap.utils.toArray<HTMLElement>(".gsap-stagger-group");
      staggerContainers.forEach((group) => {
        const items = group.querySelectorAll(".gsap-stagger-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              y: 40,
              opacity: 0,
              scale: 0.97,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // 6. Interactive Replay on Button Clicks
      const buttons = document.querySelectorAll("button, a.btn-neumorphic");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Micro-scale bounce on click
          gsap.fromTo(
            btn,
            { scale: 0.95 },
            { scale: 1, duration: 0.35, ease: "elastic.out(1.2, 0.4)" }
          );
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}