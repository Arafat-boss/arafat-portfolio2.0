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
  SiWordpress,
  SiWix,
  SiSquarespace,
  SiShopify,
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";
import { FaAws, FaWix } from "react-icons/fa6";

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

    case "wordpress":
    case "wp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11.5" fill="#21759B" />
          <path
            d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"
            fill="#ffffff"
          />
        </svg>
      );

    case "wix":
      return (
        <FaWix
          className={`${className} text-zinc-900 dark:text-white`}
          style={color ? { color } : undefined}
        />
      );

    case "squarespace":
    case "squerspace":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11.5" className="fill-black dark:fill-white" />
          <path
            d="M22.655 8.719c-1.802-1.801-4.726-1.801-6.564 0l-7.351 7.35c-.45.45-.45 1.2 0 1.65.45.449 1.2.449 1.65 0l7.351-7.351c.899-.899 2.362-.899 3.264 0 .9.9.9 2.364 0 3.264l-7.239 7.239c.9.899 2.362.899 3.263 0l5.589-5.589c1.836-1.838 1.836-4.763.037-6.563zm-2.475 2.437c-.451-.45-1.201-.45-1.65 0l-7.354 7.389c-.9.899-2.361.899-3.262 0-.45-.45-1.2-.45-1.65 0s-.45 1.2 0 1.649c1.801 1.801 4.726 1.801 6.564 0l7.351-7.35c.449-.487.449-1.239.001-1.688zm-2.439-7.35c-1.801-1.801-4.726-1.801-6.564 0l-7.351 7.351c-.45.449-.45 1.199 0 1.649s1.2.45 1.65 0l7.395-7.351c.9-.899 2.371-.899 3.27 0 .451.45 1.201.45 1.65 0 .421-.487.421-1.199-.029-1.649h-.021zm-2.475 2.437c-.45-.45-1.2-.45-1.65 0l-7.351 7.389c-.899.9-2.363.9-3.265 0-.9-.899-.9-2.363 0-3.264l7.239-7.239c-.9-.9-2.362-.9-3.263 0L1.35 8.719c-1.8 1.8-1.8 4.725 0 6.563 1.801 1.801 4.725 1.801 6.564 0l7.35-7.351c.451-.488.451-1.238 0-1.688h.002z"
            className="fill-white dark:fill-black"
            transform="translate(3, 3) scale(0.75)"
          />
        </svg>
      );

    case "shopify":
      return <SiShopify className={className} style={{ color: color || "#7AB55C" }} />;

    default:
      return <SiReact className={className} style={{ color: color || "#6366F1" }} />;
  }
}
