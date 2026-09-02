import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSketch,
  SiWebflow,
  SiFramer,
  SiNotion,
  SiHtml5,
  SiCss,
  SiRedux,
  SiBootstrap,
  SiFirebase,
  SiJsonwebtokens,
  SiMongoose,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiDocker,
  SiPython,
  SiCplusplus,
  SiSass,
  SiGraphql,
  SiMysql,
  SiRedis,
  SiLinux,
  SiVite,
  SiWebpack,
  SiNpm,
  SiYarn,
  SiPnpm,
  SiSupabase,
  SiSanity,
  SiStrapi,
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";

interface IconProps {
  name: string;
  className?: string;
  color?: string;
}

export function SkillIcon({ name, className = "h-7 w-7", color }: IconProps) {
  const normalized = (name || "").toLowerCase().replace(/[\s_.-]+/g, "");

  switch (normalized) {
    case "react":
    case "reactjs":
    case "reactnative":
      return <SiReact className={className} style={{ color: color || "#61DAFB" }} />;

    case "next":
    case "nextjs":
    case "nextdotjs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11.5" className="fill-black dark:fill-white" />
          <path
            d="M17.1 17.6L9.3 7.5H7.5V16.5H9V9.6L16 18.4C16.4 18.2 16.8 17.9 17.1 17.6Z"
            className="fill-white dark:fill-black"
          />
          <rect x="15" y="7.5" width="1.5" height="8.5" className="fill-white dark:fill-black" />
        </svg>
      );

    case "ts":
    case "typescript":
      return <SiTypescript className={className} style={{ color: color || "#3178C6" }} />;

    case "js":
    case "javascript":
      return <SiJavascript className={className} style={{ color: color || "#F7DF1E" }} />;

    case "tailwind":
    case "tailwindcss":
      return <SiTailwindcss className={className} style={{ color: color || "#06B6D4" }} />;

    case "node":
    case "nodejs":
    case "nodedotjs":
      return <SiNodedotjs className={className} style={{ color: color || "#5FA04E" }} />;

    case "express":
    case "expressjs":
      return <SiExpress className={`${className} text-zinc-800 dark:text-zinc-100`} style={color ? { color } : undefined} />;

    case "mongodb":
    case "mongo":
      return <SiMongodb className={className} style={{ color: color || "#47A248" }} />;

    case "figma":
      return (
        <svg viewBox="0 0 38 57" className={className} fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );

    case "sketch":
      return <SiSketch className={className} style={{ color: color || "#F7B500" }} />;

    case "adobexd":
    case "xd":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#470137" stroke="#FF61F6" strokeWidth="1" />
          <text x="12" y="15.5" fill="#FF61F6" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle">
            Xd
          </text>
        </svg>
      );

    case "photoshop":
    case "ps":
    case "adobephotoshop":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#001E36" stroke="#31A8FF" strokeWidth="1" />
          <text x="12" y="15.5" fill="#31A8FF" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle">
            Ps
          </text>
        </svg>
      );

    case "illustrator":
    case "ai":
    case "adobeillustrator":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#330000" stroke="#FF9A00" strokeWidth="1" />
          <text x="12" y="15.5" fill="#FF9A00" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle">
            Ai
          </text>
        </svg>
      );

    case "webflow":
      return <SiWebflow className={className} style={{ color: color || "#146EF5" }} />;

    case "framer":
      return <SiFramer className={`${className} text-black dark:text-white`} style={{ color: color || "#0055FF" }} />;

    case "notion":
      return <SiNotion className={`${className} text-black dark:text-white`} style={color ? { color } : undefined} />;

    case "html":
    case "html5":
      return <SiHtml5 className={className} style={{ color: color || "#E34F26" }} />;

    case "css":
    case "css3":
      return <SiCss className={className} style={{ color: color || "#1572B6" }} />;

    case "redux":
      return <SiRedux className={className} style={{ color: color || "#764ABC" }} />;

    case "bootstrap":
      return <SiBootstrap className={className} style={{ color: color || "#7952B3" }} />;

    case "firebase":
      return <SiFirebase className={className} style={{ color: color || "#FFCA28" }} />;

    case "restapi":
    case "api":
    case "rest":
      return <TbApi className={className} style={{ color: color || "#00BAE2" }} />;

    case "jwt":
    case "jsonwebtokens":
      return <SiJsonwebtokens className={className} style={{ color: color || "#D63AFF" }} />;

    case "mongoose":
      return <SiMongoose className={className} style={{ color: color || "#880000" }} />;

    case "postgresql":
    case "postgres":
      return <SiPostgresql className={className} style={{ color: color || "#4169E1" }} />;

    case "prisma":
      return <SiPrisma className={`${className} text-zinc-800 dark:text-zinc-100`} style={color ? { color } : undefined} />;

    case "git":
      return <SiGit className={className} style={{ color: color || "#F05032" }} />;

    case "github":
      return <SiGithub className={`${className} text-black dark:text-white`} style={color ? { color } : undefined} />;

    case "vscode":
    case "visualstudiocode":
      return <TbBrandVscode className={className} style={{ color: color || "#007ACC" }} />;

    case "postman":
      return <SiPostman className={className} style={{ color: color || "#FF6C37" }} />;

    case "vercel":
      return <SiVercel className={`${className} text-black dark:text-white`} style={color ? { color } : undefined} />;

    case "docker":
      return <SiDocker className={className} style={{ color: color || "#2496ED" }} />;

    case "python":
      return <SiPython className={className} style={{ color: color || "#3776AB" }} />;

    case "c++":
    case "cpp":
    case "cplusplus":
      return <SiCplusplus className={className} style={{ color: color || "#00599C" }} />;

    case "sass":
    case "scss":
      return <SiSass className={className} style={{ color: color || "#CC6699" }} />;

    case "graphql":
      return <SiGraphql className={className} style={{ color: color || "#E10098" }} />;

    case "mysql":
      return <SiMysql className={className} style={{ color: color || "#4479A1" }} />;

    case "redis":
      return <SiRedis className={className} style={{ color: color || "#DC382D" }} />;

    case "aws":
    case "amazon":
    case "amazonwebservices":
      return <FaAws className={className} style={{ color: color || "#FF9900" }} />;

    case "linux":
      return <SiLinux className={className} style={{ color: color || "#FCC624" }} />;

    case "vite":
      return <SiVite className={className} style={{ color: color || "#646CFF" }} />;

    case "webpack":
      return <SiWebpack className={className} style={{ color: color || "#8DD6F9" }} />;

    case "npm":
      return <SiNpm className={className} style={{ color: color || "#CB3837" }} />;

    case "yarn":
      return <SiYarn className={className} style={{ color: color || "#2C8EBB" }} />;

    case "pnpm":
      return <SiPnpm className={className} style={{ color: color || "#F69220" }} />;

    case "supabase":
      return <SiSupabase className={className} style={{ color: color || "#3FCF8E" }} />;

    case "sanity":
      return <SiSanity className={className} style={{ color: color || "#F03E2F" }} />;

    case "strapi":
      return <SiStrapi className={className} style={{ color: color || "#2F2E8B" }} />;

    default:
      return <SiReact className={className} style={{ color: color || "#6366F1" }} />;
  }
}
