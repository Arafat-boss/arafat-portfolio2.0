"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  depth: number;
  phase: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isDark, setIsDark] = useState(true);
  const [gridScrollOffset, setGridScrollOffset] = useState(0);

  useEffect(() => {
    // Theme sync
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateThemeState();
    const handleThemeChange = () => updateThemeState();
    window.addEventListener("theme-change", handleThemeChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & spotlight radius
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 230, // Light aura reveal radius
    };

    // Scroll state tracking
    let lastScrollY = window.scrollY;
    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      targetScrollVelocity = delta * 0.12;
      setGridScrollOffset(currentScroll * 0.08);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize particles with delicate base opacity
    const particleCount = Math.min(Math.floor((width * height) / 15000), 85);
    const particles: FloatingParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const depth = Math.random() * 0.8 + 0.3;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2 * depth,
        vy: -(Math.random() * 0.18 + 0.06) * depth,
        radius: (Math.random() * 1.6 + 0.9) * Math.min(depth, 1.2),
        baseAlpha: Math.random() * 0.06 + 0.04,
        depth,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.008;

      currentScrollVelocity += (targetScrollVelocity - currentScrollVelocity) * 0.06;
      targetScrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);
      const currentlyDark = document.documentElement.classList.contains("dark");

      // Draw subtle luminous purple connection lines between nearby particles when inside the mouse light
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dx1 = p1.x - mouse.x;
        const dy1 = p1.y - mouse.y;
        const dist1 = Math.hypot(dx1, dy1);

        if (dist1 < mouse.radius) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx2 = p2.x - mouse.x;
            const dy2 = p2.y - mouse.y;
            const dist2 = Math.hypot(dx2, dy2);

            if (dist2 < mouse.radius) {
              const pDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
              if (pDist < 105) {
                const lineAlpha = (1 - pDist / 105) * (1 - dist1 / mouse.radius) * (currentlyDark ? 0.35 : 0.25);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = currentlyDark
                  ? `rgba(192, 132, 252, ${lineAlpha})` // Soft glowing purple (dark mode)
                  : `rgba(168, 85, 247, ${lineAlpha})`; // Elegant light purple (light mode)
                ctx.lineWidth = 0.7;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle floating motion + slow scroll parallax
        p.x += p.vx + Math.sin(time + p.phase) * 0.15 * p.depth;
        p.y += p.vy - currentScrollVelocity * p.depth;

        // Wrap boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        // Distance from mouse flashlight
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        let pAlpha = p.baseAlpha;
        let isLitByMouse = false;

        // ILLUMINATION EFFECT: Brighten significantly with purple glow when within the mouse light beam
        if (distMouse < mouse.radius && distMouse > 0) {
          isLitByMouse = true;
          const lightIntensity = Math.pow(1 - distMouse / mouse.radius, 1.25);

          pAlpha = p.baseAlpha + lightIntensity * (currentlyDark ? 0.9 : 0.75);

          // Subtle interactive magnetic push away from the cursor core
          const pushForce = Math.max(0, 1 - distMouse / 90);
          p.x += (dxMouse / distMouse) * pushForce * 0.8;
          p.y += (dyMouse / distMouse) * pushForce * 0.8;
        }

        // Particle color (Light purple hue under cursor spotlight)
        const particleColor = currentlyDark
          ? isLitByMouse
            ? `rgba(216, 180, 254, ${pAlpha})` // Soft lavender purple
            : `rgba(255, 255, 255, ${pAlpha})`
          : isLitByMouse
            ? `rgba(147, 51, 234, ${pAlpha})` // Light purple
            : `rgba(140, 140, 160, ${pAlpha})`;

        ctx.beginPath();
        const renderRadius = isLitByMouse ? p.radius * 1.35 : p.radius;
        ctx.arc(p.x, p.y, renderRadius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;

        if (isLitByMouse) {
          // Luminous purple glow around illuminated particles
          ctx.shadowBlur = currentlyDark ? 12 : 8;
          ctx.shadowColor = currentlyDark
            ? `rgba(192, 132, 252, ${pAlpha * 0.9})`
            : `rgba(168, 85, 247, 0.55)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Ambient background glows (Soft Purple & Violet Tones) */}
      <div className="absolute left-1/2 top-1/4 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.035] blur-[160px] dark:bg-purple-500/[0.025]" />
      <div className="absolute right-10 bottom-24 h-[650px] w-[650px] rounded-full bg-indigo-500/[0.03] blur-[150px] dark:bg-indigo-500/[0.02]" />

      {/* MATRIX TECH GRID WITH PARALLAX */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] transition-opacity duration-300 will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px),
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          backgroundPosition: `0 ${gridScrollOffset}px, 0 ${gridScrollOffset}px, 0 ${gridScrollOffset}px, 0 ${gridScrollOffset}px`,
          color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.8)",
        }}
      />

      {/* INTERACTIVE MOUSE SPOTLIGHT / LIGHT PURPLE AURA */}
      {mousePos.x > 0 && mousePos.y > 0 && (
        <div
          className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out will-change-transform"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: isDark
              ? `radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(147, 51, 234, 0.06) 40%, rgba(126, 34, 206, 0.02) 60%, transparent 75%)`
              : `radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(192, 132, 252, 0.06) 40%, rgba(216, 180, 254, 0.02) 60%, transparent 75%)`,
          }}
        />
      )}

      {/* CANVAS PARTICLES (Delicate idle state, illuminated with soft purple glow by mouse hover) */}
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-100"
      />

      {/* Soft Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] dark:block hidden" />
    </div>
  );
}