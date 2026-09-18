"use client";

import { useState, useEffect } from "react";
import { ProjectItem } from "@/lib/types/project";
import { siteConfig } from "@/lib/data/siteConfig";

const fallbackBanners: Record<string, string> = {
  "study-platform": "/projects/study-platform-live.png",
  "volunteer-platform": "/projects/volunteer-platform-live.png",
  "game-reviews": "/projects/game-reviews-live.png",
};

export default function SelectedWork() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const githubLink = siteConfig.socialLinks.find((s) => s.name === "GitHub")?.url || "https://github.com/Arafat-boss";

  // Live dynamic fetch directly from MongoDB 'project' collection
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects?type=featured");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching projects from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 transition-colors duration-300 scroll-mt-20 gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80 sm:p-7 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                PORTFOLIO
              </p>
              <h2 className="split mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Selected Work
              </h2>
            </div>

            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neumorphic self-start text-xs !px-4 !py-2 sm:self-auto rounded-lg"
            >
              <span>View All Projects</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* 3-COLUMN PROJECTS GRID */}
          <div className="gsap-stagger-group grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-xl border border-black/5 bg-black/[0.03] dark:border-white/5 dark:bg-white/[0.03]"
                />
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => {
                const bannerSrc = project.imageSrc || fallbackBanners[project.id] || "/gellary/3rd mocup.png";

                return (
                  <a
                    key={project.id}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gsap-stagger-item group relative flex flex-col overflow-hidden rounded-xl border border-black/[0.07] bg-white/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-lg dark:border-white/[0.08] dark:bg-[#121216]/90 dark:hover:border-indigo-400/40 dark:hover:shadow-[0_16px_35px_-8px_rgba(0,0,0,0.7)]"
                  >
                    {/* ACTUAL WEBSITE BANNER IMAGE CONTAINER */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 border-b border-black/[0.06] dark:border-white/[0.06] dark:bg-black/30">
                      <img
                        src={encodeURI(bannerSrc)}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Subtle hover overlay with live badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-3">
                        <span className="text-[11px] font-semibold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md">
                          Live Preview ↗
                        </span>
                        {project.category && (
                          <span className="text-[10px] font-mono text-white/80 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-md">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CARD FOOTER INFO */}
                    <div className="p-3.5 sm:p-4">
                      <div className="flex items-center justify-between rounded-lg border border-black/[0.04] bg-black/[0.02] p-3 backdrop-blur-xl transition-all duration-300 group-hover:border-black/[0.08] group-hover:bg-black/[0.04] dark:border-white/[0.05] dark:bg-white/[0.03] dark:group-hover:border-white/[0.1] dark:group-hover:bg-white/[0.06]">
                        <div className="min-w-0 pr-2.5">
                          <h3 className="truncate text-sm font-bold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-base">
                            {project.title}
                          </h3>
                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {project.subtitle || project.category}
                          </p>
                        </div>

                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-zinc-700 shadow-xs transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white dark:border-white/[0.08] dark:bg-white/10 dark:text-zinc-200 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <p className="col-span-3 text-center py-10 text-xs text-zinc-400">No projects found in database.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

