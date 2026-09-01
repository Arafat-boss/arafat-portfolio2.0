"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function ButtonExplosion() {
  useEffect(() => {
    // Create dedicated explosion layer in DOM
    const container = document.createElement("div");
    container.className = "button-explosion-container";
    container.style.cssText =
      "position:fixed; left:0; top:0; width:100%; height:100%; overflow:hidden; z-index:99999; pointer-events:none;";
    document.body.appendChild(container);

    const colors = [
      "rgba(255, 255, 255, 0.95)",
      "rgba(255, 255, 255, 0.8)",
      "rgba(240, 240, 240, 0.9)",
      "rgba(200, 200, 200, 0.7)",
      "rgba(74, 222, 128, 0.85)", // Subtle emerald match for "Available" badge
    ];

    const triggerExplosion = (originX: number, originY: number) => {
      const dotQuantity = 24;
      const dotSizeMin = 4;
      const dotSizeMax = 12;

      for (let i = 0; i < dotQuantity; i++) {
        const dot = document.createElement("div");
        const size = gsap.utils.random(dotSizeMin, dotSizeMax);
        const color = colors[Math.floor(Math.random() * colors.length)];

        dot.style.cssText = `
          position: absolute;
          left: ${originX}px;
          top: ${originY}px;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          box-shadow: 0 0 10px ${color};
          pointer-events: none;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
        `;

        container.appendChild(dot);

        // Physics calculations (radiant explosion with gravity & velocity spread)
        const angle = Math.random() * Math.PI * 2;
        const velocity = gsap.utils.random(60, 160);
        const destinationX = Math.cos(angle) * velocity;
        const destinationY = Math.sin(angle) * velocity + gsap.utils.random(20, 60); // gravity effect

        const tl = gsap.timeline({
          onComplete: () => {
            if (dot.parentNode === container) {
              container.removeChild(dot);
            }
          },
        });

        tl.to(dot, {
          x: destinationX,
          y: destinationY,
          scale: gsap.utils.random(0.2, 0.5),
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(0.6, 1.0),
          ease: "power2.out",
        }).to(
          dot,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power1.in",
          },
          "-=0.35"
        );
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element is a button, link, badge, or has button styling/role
      const clickable = target.closest(
        "button, a, .rounded-full, .tech-badge, [role='button'], [data-explode]"
      );

      if (clickable) {
        const rect = clickable.getBoundingClientRect();
        // Trigger explosion from exact click position or center of element
        const originX = e.clientX || rect.left + rect.width / 2;
        const originY = e.clientY || rect.top + rect.height / 2;

        triggerExplosion(originX, originY);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
      if (container.parentNode) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return null;
}
