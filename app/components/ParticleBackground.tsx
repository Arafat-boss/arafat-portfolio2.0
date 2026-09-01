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
      radius: 220, // Light aura reveal radius
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

    // Initialize particles with very low base opacity
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
        // Very low base alpha (subtle/soft until mouse hover light illuminates it)
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

      // Draw subtle luminous connection lines between nearby particles when inside the mouse light
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
              if (pDist < 100) {
                const lineAlpha = (1 - pDist / 100) * (1 - dist1 / mouse.radius) * (currentlyDark ? 0.25 : 0.15);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = currentlyDark
                  ? `rgba(255, 255, 255, ${lineAlpha})`
                  : `rgba(0, 0, 0, ${lineAlpha})`;
                ctx.lineWidth = 0.6;
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

        // ILLUMINATION EFFECT: Brighten significantly when within the mouse light beam
        if (distMouse < mouse.radius && distMouse > 0) {
          isLitByMouse = true;
          // Smooth non-linear falloff
          const lightIntensity = Math.pow(1 - distMouse / mouse.radius, 1.3);

          // Particles light up clearly under cursor light
          pAlpha = p.baseAlpha + lightIntensity * (currentlyDark ? 0.85 : 0.7);

          // Subtle interactive magnetic push away from the cursor core
          const pushForce = Math.max(0, 1 - distMouse / 90);
          p.x += (dxMouse / distMouse) * pushForce * 0.8;
          p.y += (dyMouse / distMouse) * pushForce * 0.8;
        }

        // Particle color
        const particleColor = currentlyDark
          ? `rgba(255, 255, 255, ${pAlpha})`
          : `rgba(15, 23, 42, ${pAlpha})`;

        ctx.beginPath();
        // Slightly enlarge particle when illuminated by light
        const renderRadius = isLitByMouse ? p.radius * 1.35 : p.radius;
        ctx.arc(p.x, p.y, renderRadius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;

        if (isLitByMouse) {
          // Luminous flashlight glow around illuminated particles
          ctx.shadowBlur = currentlyDark ? 10 : 5;
          ctx.shadowColor = currentlyDark
            ? `rgba(255, 255, 255, ${pAlpha * 0.8})`
            : `rgba(0, 0, 0, 0.3)`;
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
      {/* Ambient background glows (Pure Luxury Monochrome) */}
      <div className="absolute left-1/2 top-1/4 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[160px] dark:bg-white/[0.015]" />
      <div className="absolute right-10 bottom-24 h-[650px] w-[650px] rounded-full bg-white/[0.015] blur-[150px] dark:bg-white/[0.01]" />

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

      {/* INTERACTIVE MOUSE SPOTLIGHT / FLASHLIGHT AURA */}
      {mousePos.x > 0 && mousePos.y > 0 && (
        <div
          className="pointer-events-none absolute h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out will-change-transform"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: isDark
              ? `radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%)`
              : `radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.018) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* CANVAS PARTICLES (Very subtle idle opacity, brightly lit by mouse hover spotlight) */}
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-100"
      />

      {/* Soft Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] dark:block hidden" />
    </div>
  );
}