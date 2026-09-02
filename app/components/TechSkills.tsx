"use client";

import { useState, useEffect } from "react";
import { SkillItem } from "@/lib/types/skill";
import { SkillIcon } from "./Icons";

const categories = ["All", "Languages", "Frontend", "Backend", "Database", "Tools", "Design"];

export default function TechSkills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Live dynamic fetch directly from MongoDB 'skills' collection
  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setSkills(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching skills from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  const featuredSkills = skills.filter((s) => s.isFeatured);
  const remainingSkillsCount = Math.max(0, skills.length - featuredSkills.length);

  const expandedSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="border-b border-black/10 bg-black/[0.015] py-16 sm:py-20 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.015] scroll-mt-20 gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80 sm:p-8 md:p-10">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                TOOLS & SKILLS
              </p>
              <h2 className="split mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Technologies I Use
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:border-white/5 dark:bg-white/[0.04] dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{skills.length > 0 ? `${skills.length}+ Tools & Frameworks` : "Loading Stack..."}</span>
            </div>
          </div>

          {/* FULL-WIDTH RESPONSIVE DISPLAY */}
          <div className="mt-8 flex flex-col gap-6">
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-2xl border border-black/5 bg-black/[0.03] dark:border-white/5 dark:bg-white/[0.03]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                {featuredSkills.map((skill) => {
                  const isHovered = hoveredSkill?.id === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-none ${
                        isHovered
                          ? "border-indigo-500/40 bg-indigo-50/50 shadow-md dark:border-indigo-400/30 dark:bg-indigo-950/20"
                          : "border-black/[0.06] bg-white/90 hover:border-black/20 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <SkillIcon name={skill.icon} color={skill.color} className="h-8 w-8" />
                      </div>

                      <span className="mt-2.5 text-xs font-semibold text-zinc-900 dark:text-white">
                        {skill.name}
                      </span>

                      <span className="text-[10px] text-zinc-400 dark:text-white/40">
                        {skill.level}
                      </span>
                    </div>
                  );
                })}

                {remainingSkillsCount > 0 && !isExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500 hover:bg-indigo-500/10 cursor-pointer dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                      <span className="text-sm font-bold">+{remainingSkillsCount}</span>
                    </div>
                    <span className="mt-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      More Stack
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-white/40">
                      Click to expand
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* EXPANDED VIEW */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[1400px] opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 border-t border-black/5 pt-6 pb-4 dark:border-white/5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                        : "bg-black/5 text-zinc-600 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 pt-2">
                {expandedSkills.map((skill) => {
                  const isHovered = hoveredSkill?.id === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                        isHovered
                          ? "border-indigo-500/40 bg-indigo-50/50 dark:border-indigo-400/30 dark:bg-indigo-950/20"
                          : "border-black/[0.05] bg-white/70 hover:border-black/15 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/15"
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center transition-transform duration-200 group-hover:scale-110">
                        <SkillIcon name={skill.icon} color={skill.color} className="h-6 w-6" />
                      </div>

                      <span className="mt-2 text-xs font-medium text-zinc-900 dark:text-white line-clamp-1">
                        {skill.name}
                      </span>

                      <span className="text-[9px] text-zinc-400 dark:text-white/30">
                        {skill.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hover Status Indicator */}
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-black/5 pt-4 dark:border-white/5">
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              {hoveredSkill ? (
                <span>
                  Selected: <strong className="text-zinc-900 dark:text-white">{hoveredSkill.name}</strong> ({hoveredSkill.level}) • {hoveredSkill.category}
                </span>
              ) : (
                <span className="text-xs">Hover over any tech icon or click &quot;More&quot; to expand the full stack</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400 self-end sm:self-auto cursor-pointer"
            >
              {isExpanded ? "Collapse view ↑" : `View all ${skills.length} skills ↓`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
