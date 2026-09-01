"use client";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  imageSrc?: string; // Optional custom image URL to be provided by user
  themeGradient: string;
  mockupType: "mobile" | "dashboard" | "landing";
}

const projectsData: ProjectItem[] = [
  {
    id: "study-platform",
    number: "01",
    title: "Collaborative Study Platform",
    category: "EdTech & Collaboration",
    subtitle: "MERN Stack Application",
    description:
      "Three-role ecosystem: Student, Tutor, and Admin Dashboard. Includes real-time session booking, material sharing, interactive dashboards, and secure JWT auth.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    link: "https://collaborative-study-plat-312b7.web.app/",
    github: "https://github.com/",
    themeGradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
    mockupType: "mobile",
  },
  {
    id: "volunteer-platform",
    number: "02",
    title: "Volunteer for Bangladesh",
    category: "Social Impact & Community",
    subtitle: "Community Volunteering App",
    description:
      "A comprehensive volunteer management platform where organizations can post needs, request volunteers, and coordinate community initiatives seamlessly.",
    tags: ["React.js", "Express.js", "MongoDB", "Node.js", "Tailwind CSS"],
    link: "https://assignment-11-eabb3.web.app/",
    github: "https://github.com/",
    themeGradient: "from-indigo-500/20 via-blue-500/10 to-cyan-500/20",
    mockupType: "dashboard",
  },
  {
    id: "game-reviews",
    number: "03",
    title: "Game Reviews Hub",
    category: "Entertainment & Gaming",
    subtitle: "Interactive Gamer Hub",
    description:
      "Interactive game review platform where gamers can explore curated game reviews, publish ratings, edit reviews, and manage personal wishlists.",
    tags: ["React.js", "Firebase", "JavaScript", "Tailwind CSS"],
    link: "https://assignment-game-review.web.app/",
    github: "https://github.com/",
    themeGradient: "from-slate-500/20 via-zinc-500/10 to-indigo-500/20",
    mockupType: "landing",
  },
];

// High-fidelity vector UI mockup renderers when image is not yet loaded
function ProjectMockup({ project }: { project: ProjectItem }) {
  if (project.imageSrc) {
    return (
      <img
        src={project.imageSrc}
        alt={project.title}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  // Visual Mockup Illustration based on project type
  switch (project.mockupType) {
    case "mobile":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-2.5 p-4">
          {/* Mobile Screen 1 */}
          <div className="h-44 w-24 rounded-2xl border border-white/40 bg-white/70 p-2 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 dark:border-white/15 dark:bg-white/[0.08]">
            <div className="mb-2 h-1.5 w-6 rounded-full bg-violet-400/60" />
            <div className="mb-2 h-10 w-full rounded-lg bg-violet-500/15 p-1.5">
              <div className="h-2 w-10 rounded bg-violet-500/40" />
              <div className="mt-1 h-1.5 w-6 rounded bg-violet-500/20" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-full rounded bg-black/5 dark:bg-white/10" />
              <div className="h-4 w-full rounded bg-black/5 dark:bg-white/10" />
              <div className="h-4 w-full rounded bg-black/5 dark:bg-white/10" />
            </div>
          </div>
          {/* Mobile Screen 2 (Centered, Primary) */}
          <div className="z-10 h-48 w-28 rounded-2xl border border-white/60 bg-white/90 p-2.5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:-translate-y-3 dark:border-white/20 dark:bg-[#18181b]/95">
            <div className="mb-2 flex items-center justify-between">
              <div className="h-2 w-8 rounded-full bg-indigo-500" />
              <div className="h-2 w-2 rounded-full bg-indigo-400" />
            </div>
            <div className="mb-2 h-12 w-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 text-white shadow-sm">
              <div className="h-2 w-10 rounded bg-white/70" />
              <div className="mt-1.5 h-3 w-14 rounded bg-white/90" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-8 rounded-lg bg-indigo-500/10 p-1" />
              <div className="h-8 rounded-lg bg-purple-500/10 p-1" />
            </div>
            <div className="mt-2 h-5 w-full rounded-lg bg-indigo-600/20" />
          </div>
          {/* Mobile Screen 3 */}
          <div className="h-44 w-24 rounded-2xl border border-white/40 bg-white/70 p-2 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 dark:border-white/15 dark:bg-white/[0.08]">
            <div className="mb-2 h-1.5 w-8 rounded-full bg-purple-400/60" />
            <div className="space-y-1.5">
              <div className="h-6 w-full rounded-lg bg-purple-500/15" />
              <div className="h-6 w-full rounded-lg bg-purple-500/15" />
              <div className="h-6 w-full rounded-lg bg-purple-500/15" />
            </div>
          </div>
        </div>
      );

    case "dashboard":
      return (
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-[280px] rounded-2xl border border-white/50 bg-white/85 p-3 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 dark:border-white/15 dark:bg-[#18181b]/95">
            {/* Top Navbar */}
            <div className="mb-2.5 flex items-center justify-between border-b border-black/5 pb-2 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <div className="h-2 w-12 rounded bg-black/15 dark:bg-white/20" />
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/20 dark:bg-white/20" />
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="mb-2.5 grid grid-cols-3 gap-1.5">
              <div className="rounded-lg bg-indigo-500/10 p-1.5 text-center">
                <div className="mx-auto h-1.5 w-6 rounded bg-indigo-500/40" />
                <div className="mx-auto mt-1 h-2.5 w-8 rounded bg-indigo-600" />
              </div>
              <div className="rounded-lg bg-blue-500/10 p-1.5 text-center">
                <div className="mx-auto h-1.5 w-6 rounded bg-blue-500/40" />
                <div className="mx-auto mt-1 h-2.5 w-8 rounded bg-blue-600" />
              </div>
              <div className="rounded-lg bg-cyan-500/10 p-1.5 text-center">
                <div className="mx-auto h-1.5 w-6 rounded bg-cyan-500/40" />
                <div className="mx-auto mt-1 h-2.5 w-8 rounded bg-cyan-600" />
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-16 w-full rounded-xl bg-gradient-to-t from-indigo-500/20 via-indigo-500/5 to-transparent p-2">
              <div className="flex h-full items-end justify-between gap-1">
                <div className="h-[40%] w-3 rounded-t bg-indigo-400/60" />
                <div className="h-[70%] w-3 rounded-t bg-indigo-500/80" />
                <div className="h-[55%] w-3 rounded-t bg-indigo-400/60" />
                <div className="h-[90%] w-3 rounded-t bg-indigo-600" />
                <div className="h-[65%] w-3 rounded-t bg-indigo-500/70" />
                <div className="h-[80%] w-3 rounded-t bg-indigo-600" />
                <div className="h-[45%] w-3 rounded-t bg-indigo-400/60" />
              </div>
            </div>
          </div>
        </div>
      );

    case "landing":
    default:
      return (
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-[280px] rounded-2xl border border-white/50 bg-white/85 p-3 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 dark:border-white/15 dark:bg-[#18181b]/95">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <div className="h-2 w-10 rounded bg-indigo-600" />
              <div className="flex gap-1.5">
                <div className="h-1.5 w-6 rounded bg-black/10 dark:bg-white/20" />
                <div className="h-1.5 w-6 rounded bg-black/10 dark:bg-white/20" />
              </div>
            </div>

            {/* Hero Banner inside mockup */}
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-zinc-100 to-indigo-50/50 p-2 dark:from-white/5 dark:to-indigo-900/20">
              <div className="flex-1">
                <div className="h-2.5 w-16 rounded bg-zinc-800 dark:bg-white" />
                <div className="mt-1 h-1.5 w-20 rounded bg-zinc-400 dark:bg-zinc-500" />
                <div className="mt-2 h-3.5 w-12 rounded-full bg-indigo-600" />
              </div>
              <div className="h-12 w-14 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <span className="text-sm">🎮</span>
              </div>
            </div>

            {/* Content cards grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-10 rounded-lg bg-black/5 p-1 dark:bg-white/5" />
              <div className="h-10 rounded-lg bg-black/5 p-1 dark:bg-white/5" />
            </div>
          </div>
        </div>
      );
  }
}

export default function SelectedWork() {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 transition-colors duration-300 scroll-mt-20 gsap-fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* FROSTED GLASS CONTAINER CARD (MATCHING USER REFERENCE DESIGN) */}
        <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80 sm:p-8 md:p-10">
          {/* Header Title & "View All Projects" Pill Button */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="split text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Selected Work
              </h2>
            </div>

            {/* Top Right "View All Projects" Button */}
            <a
              href="https://github.com/Arafat-boss"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neumorphic self-start text-xs !px-4 !py-2 sm:self-auto"
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

          {/* 3-COLUMN PROJECTS GRID (MATCHING REFERENCE CARDS) */}
          <div className="gsap-stagger-group grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-stagger-item group relative flex flex-col overflow-hidden rounded-[24px] border border-black/[0.04] bg-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-black/[0.08] hover:shadow-[0_16px_35px_-8px_rgba(0,0,0,0.08)] dark:border-white/[0.06] dark:bg-white/[0.035] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.06] dark:hover:shadow-[0_16px_35px_-8px_rgba(0,0,0,0.6)]"
              >
                {/* Visual Showcase Preview Area */}
                <div
                  className={`relative flex h-60 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.themeGradient} p-4 transition-transform duration-500`}
                >
                  <ProjectMockup project={project} />
                </div>

                {/* Bottom Frosted Glass Floating Info Bar (Subtle 1px Border + Soft Shadow) */}
                <div className="p-3">
                  <div className="flex items-center justify-between rounded-2xl border border-black/[0.03] bg-white/90 p-4 shadow-xs backdrop-blur-xl transition-all duration-300 group-hover:border-black/[0.06] group-hover:bg-white group-hover:shadow-sm dark:border-white/[0.05] dark:bg-white/[0.04] dark:group-hover:border-white/[0.08] dark:group-hover:bg-white/[0.07]">
                    {/* Project Title & Category */}
                    <div className="min-w-0 pr-3">
                      <h3 className="truncate text-sm font-bold text-zinc-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-base">
                        {project.title}
                      </h3>
                      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Circular Action Button with ↗ Arrow */}
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.04] bg-black/5 text-zinc-700 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white dark:border-white/[0.06] dark:bg-white/10 dark:text-zinc-200 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
