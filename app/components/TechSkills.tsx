"use client";

import { useState } from "react";

export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Design" | "Languages";
  level: "Expert" | "Intermediate" | "Junior";
  color: string;
  icon: string;
  isFeatured?: boolean;
}

// Comprehensive list of skills organized with featured items for the 1-row view
const skillsList: SkillItem[] = [
  // Primary Featured Row Skills (Matches user's modern stack + design tools)
  { id: "react", name: "React.js", category: "Frontend", level: "Expert", color: "#61DAFB", icon: "react", isFeatured: true },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: "Expert", color: "#ffffff", icon: "nextjs", isFeatured: true },
  { id: "ts", name: "TypeScript", category: "Languages", level: "Intermediate", color: "#3178C6", icon: "ts", isFeatured: true },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: "Expert", color: "#06B6D4", icon: "tailwind", isFeatured: true },
  { id: "nodejs", name: "Node.js", category: "Backend", level: "Expert", color: "#339933", icon: "nodejs", isFeatured: true },
  { id: "express", name: "Express.js", category: "Backend", level: "Expert", color: "#68A063", icon: "express", isFeatured: true },
  { id: "mongodb", name: "MongoDB", category: "Database", level: "Expert", color: "#47A248", icon: "mongodb", isFeatured: true },
  { id: "figma", name: "Figma", category: "Design", level: "Intermediate", color: "#F24E1E", icon: "figma", isFeatured: true },

  // Remaining Skills (Revealed when expanding "More")
  { id: "js", name: "JavaScript", category: "Languages", level: "Expert", color: "#F7DF1E", icon: "js" },
  { id: "html", name: "HTML5", category: "Languages", level: "Expert", color: "#E34F26", icon: "html" },
  { id: "css", name: "CSS3", category: "Languages", level: "Expert", color: "#1572B6", icon: "css" },
  { id: "redux", name: "Redux", category: "Frontend", level: "Intermediate", color: "#764ABC", icon: "redux" },
  { id: "bootstrap", name: "Bootstrap 5", category: "Frontend", level: "Expert", color: "#7952B3", icon: "bootstrap" },
  { id: "firebase", name: "Firebase", category: "Frontend", level: "Expert", color: "#FFCA28", icon: "firebase" },
  { id: "restapi", name: "REST API", category: "Backend", level: "Expert", color: "#00BAE2", icon: "restapi" },
  { id: "jwt", name: "JWT Auth", category: "Backend", level: "Expert", color: "#D63AFF", icon: "jwt" },
  { id: "mongoose", name: "Mongoose", category: "Database", level: "Expert", color: "#E23237", icon: "mongoose" },
  { id: "postgresql", name: "PostgreSQL", category: "Database", level: "Intermediate", color: "#4169E1", icon: "postgresql" },
  { id: "prisma", name: "Prisma ORM", category: "Database", level: "Intermediate", color: "#5A67D8", icon: "prisma" },
  { id: "git", name: "Git", category: "Tools", level: "Expert", color: "#F05032", icon: "git" },
  { id: "github", name: "GitHub", category: "Tools", level: "Expert", color: "#A855F7", icon: "github" },
  { id: "vscode", name: "VS Code", category: "Tools", level: "Expert", color: "#007ACC", icon: "vscode" },
  { id: "postman", name: "Postman", category: "Tools", level: "Expert", color: "#FF6C37", icon: "postman" },
  { id: "vercel", name: "Vercel", category: "Tools", level: "Expert", color: "#ffffff", icon: "vercel" },
  { id: "docker", name: "Docker", category: "Tools", level: "Junior", color: "#2496ED", icon: "docker" },
  { id: "sketch", name: "Sketch", category: "Design", level: "Intermediate", color: "#FDB300", icon: "sketch" },
  { id: "adobexd", name: "Adobe XD", category: "Design", level: "Intermediate", color: "#FF61F6", icon: "adobexd" },
  { id: "photoshop", name: "Photoshop", category: "Design", level: "Intermediate", color: "#31A8FF", icon: "photoshop" },
  { id: "illustrator", name: "Illustrator", category: "Design", level: "Junior", color: "#FF9A00", icon: "illustrator" },
  { id: "webflow", name: "Webflow", category: "Design", level: "Intermediate", color: "#146EF5", icon: "webflow" },
  { id: "framer", name: "Framer", category: "Design", level: "Intermediate", color: "#0055FF", icon: "framer" },
  { id: "notion", name: "Notion", category: "Tools", level: "Expert", color: "#000000", icon: "notion" },
];

function SkillIcon({ type }: { type: string }) {
  switch (type) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#61DAFB]">
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth="1.3">
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-black dark:text-white">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.82 14.887L9.843 7.842h-1.68V16.15h1.56V10.15l6.097 7.857a8.428 8.428 0 0 0 .999-.12zM14.5 7.842h1.56v5.27l-1.56-2.01V7.842z" />
        </svg>
      );
    case "ts":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-[#3178C6]">
          <rect width="20" height="20" x="2" y="2" rx="4" fill="#3178C6" />
          <path fill="#fff" d="M11.5 8.5H6.5v2h1.8v6.2h1.8v-6.2h1.4v-2zm6.2 2.8c-.1-.6-.5-1.1-1.7-1.6-.5-.2-1-.3-1.2-.6-.1-.1-.1-.2-.1-.3 0-.6.5-.9 1.2-.9.6 0 1 .2 1.3.6l1.1-.8c-.5-.7-1.3-1-2.5-1-1.6 0-2.7.9-2.7 2.3 0 .9.5 1.5 1.5 1.9.6.2 1.2.4 1.4.7.1.1.1.3.1.4 0 .7-.6 1-1.4 1-1 0-1.6-.5-2-1.1l-1.2.7c.6.9 1.5 1.5 3.2 1.5 1.9 0 3-.9 3-2.5 0-.1 0-.2-.1-.3v-.1z" />
        </svg>
      );
    case "js":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <rect width="20" height="20" x="2" y="2" rx="4" fill="#F7DF1E" />
          <path fill="#000" d="M19.5 16.7c-.1-.8-.7-1.5-2.3-2.2-.5-.3-1.2-.4-1.4-.8-.1-.1-.1-.3-.1-.5 0-.7.6-1.1 1.4-1.1.8 0 1.3.3 1.6.8l1.3-1c-.6-.9-1.6-1.3-3-1.3-1.9 0-3.2 1.1-3.2 2.9 0 1.1.6 1.9 1.8 2.4.7.3 1.5.5 1.7.9.1.2.1.4.1.5 0 .8-.7 1.3-1.7 1.3-1.3 0-2-.6-2.4-1.3l-1.4.9c.7 1.2 1.9 1.8 3.8 1.8 2.3 0 3.7-1.2 3.7-3.1v-.1h-.1zm-7.6 1.8h1.8V9.5h-1.8v7.4c0 1.1-.5 1.5-1.4 1.5-.4 0-.8-.1-1-.2l-.4 1.4c.4.2.9.3 1.7.3 1.6 0 2.2-.9 2.2-2.3v-1.1h-.1z" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" fill="#06B6D4" className="h-7 w-7">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" fill="#339933" className="h-7 w-7">
          <path d="M12 2a1.5 1.5 0 0 0-.75.2l-8 4.62A1.5 1.5 0 0 0 2.5 8.12v9.24a1.5 1.5 0 0 0 .75 1.3l8 4.62a1.5 1.5 0 0 0 1.5 0l8-4.62a1.5 1.5 0 0 0 .75-1.3V8.12a1.5 1.5 0 0 0-.75-1.3l-8-4.62A1.5 1.5 0 0 0 12 2zm0 2.3l7 4.04v8.08l-7 4.04-7-4.04V8.34l7-4.04zm-.5 3.7a1 1 0 0 0-1 1v4.5a1 1 0 0 0 2 0v-4.5a1 1 0 0 0-1-1zm3 2a1 1 0 0 0-1 1v2.5a1 1 0 0 0 2 0V11a1 1 0 0 0-1-1z" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-zinc-700 dark:text-zinc-200">
          <path d="M2.5 7h4l2.2 3.6L11 7h4l-4.2 6.2 4.6 6.8h-4.2L9.2 16l-2 4H3.1l4.2-6.5L2.5 7zm13 8c0-2.8 2-4.8 4.8-4.8s4.7 2 4.7 4.8h-7.2c.2 1.6 1.4 2.6 3 2.6 1 0 1.8-.4 2.3-1l1.5 1.1c-.8 1.2-2.2 2-3.8 2-2.8 0-5.3-2.1-5.3-4.7zm7.2-1.1c-.2-1.4-1.3-2.4-2.5-2.4s-2.3 1-2.5 2.4h5z" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" fill="#47A248" className="h-7 w-7">
          <path d="M12 1.5c-.3 0-.6.1-.8.4-1.2 1.4-6.2 7.7-6.2 13.1 0 4.6 3.1 7.5 7 7.5s7-2.9 7-7.5c0-5.4-5-11.7-6.2-13.1-.2-.3-.5-.4-.8-.4zm0 2.8c.8 1.5 5 7.6 5 11.7 0 3.3-2 5.5-5 5.5V4.3zm-1 0v17.2c-3 0-5-2.2-5-5.5 0-4.1 4.2-10.2 5-11.7z" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path d="M8 2h4v4H8V2z" fill="#F24E1E" />
          <path d="M12 2h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4V2z" fill="#FF7262" />
          <path d="M8 6h4v4H8V6z" fill="#A259FF" />
          <path d="M12 6h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4V6z" fill="#1ABCFE" />
          <path d="M8 10h4v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4z" fill="#0ACF83" />
        </svg>
      );
    case "sketch":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path d="M12 2L4 7.5l2.5 13.5L12 22l5.5-1L20 7.5 12 2z" fill="#FDB300" />
          <path d="M12 2L6.5 7.5h11L12 2z" fill="#FED843" />
          <path d="M6.5 7.5L12 22l-5.5-1-2.5-13.5h5.5z" fill="#EA6C00" />
          <path d="M17.5 7.5L12 22l5.5-1 2.5-13.5h-5.5z" fill="#EA6C00" />
          <path d="M6.5 7.5L12 22l5.5-14.5h-11z" fill="#FDAD00" />
        </svg>
      );
    case "adobexd":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <rect width="20" height="20" x="2" y="2" rx="4.5" fill="#470137" />
          <path fill="#FF61F6" d="M6.8 7.5h2.2l1.9 3.2 1.9-3.2H15l-2.9 4.8 3.1 5.2h-2.3l-2.1-3.6-2.1 3.6H6.5l3.2-5.2L6.8 7.5zm9 0h1.8v10h-1.8v-10zm2 0h1.8c2.4 0 3.9 1.6 3.9 5s-1.5 5-3.9 5h-1.8v-10zm1.8 8.2c1.3 0 2.1-.9 2.1-3.2s-.8-3.2-2.1-3.2v6.4z" />
        </svg>
      );
    case "photoshop":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <rect width="20" height="20" x="2" y="2" rx="4.5" fill="#001E36" />
          <path fill="#31A8FF" d="M6.5 7h4.2c2.1 0 3.4 1.1 3.4 2.8 0 1.3-.8 2.2-1.9 2.5 1.5.3 2.4 1.4 2.4 2.9 0 2-1.5 3.3-3.8 3.3H6.5V7zm2.1 2v3h2.1c1 0 1.7-.5 1.7-1.5s-.7-1.5-1.7-1.5H8.6zm0 4.8v3.2h2.3c1.2 0 1.9-.6 1.9-1.6 0-1-.7-1.6-1.9-1.6H8.6zm7.2 2.8c.4.3.9.5 1.6.5.9 0 1.4-.4 1.4-1 0-.6-.5-.9-1.5-1.2-1.4-.4-2.3-1-2.3-2.3 0-1.5 1.2-2.6 3-2.6 1 0 1.8.3 2.3.7l-.6 1.5c-.4-.3-.9-.5-1.6-.5-.8 0-1.3.4-1.3.9 0 .6.5.8 1.5 1.1 1.5.4 2.3 1.1 2.3 2.4 0 1.6-1.3 2.7-3.2 2.7-1.1 0-2.1-.4-2.7-.9l1.1-1.3z" />
        </svg>
      );
    case "illustrator":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <rect width="20" height="20" x="2" y="2" rx="4.5" fill="#330000" />
          <path fill="#FF9A00" d="M7 16l2.8-8h1.4L14 16h-1.6l-.7-2.2H9.3L8.6 16H7zm2.8-3.6h2.4L11 8.8h-.1l-1.1 3.6zm6.7-4.4c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9zm-.8 8V10h1.6v6h-1.6z" />
        </svg>
      );
    case "webflow":
      return (
        <svg viewBox="0 0 24 24" fill="#146EF5" className="h-7 w-7">
          <path d="M19.9 8.2l-3.3 9.3h-3.4l2.1-5.7h-.1l-2.4 5.7h-3.4L6.1 8.2h3.4l1.6 5.6h.1l1.7-5.6h3.6l-1.9 5.5h.1l1.9-5.5h3.4z" />
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-black dark:text-white">
          <path d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v4z" />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-black dark:text-white">
          <path d="M4.46 3.65c.67.54.91.54 2.14.44l10.9-1.02c.79-.08 1.48.24 1.7.97.05.16 1.48 10.63 1.48 10.63.19 1.43-.24 2.13-1.65 2.27l-12.7 1.05c-.97.08-1.46-.38-1.65-1.43L3.19 4.97c-.19-1.05.3-1.86 1.27-1.32zm3.32 3.65v8.71l6.98-7.94v8.27l2.09-.16V6.98l-7.07 8.04V7.47l-2-.17z" />
        </svg>
      );
    case "html":
      return (
        <svg viewBox="0 0 24 24" fill="#E34F26" className="h-7 w-7">
          <path d="M2.5 1.5h19l-1.7 19.3L12 23.5l-7.8-2.7L2.5 1.5zm14.2 5.8H7.3l.2 2.5h8.9l-.5 6.1-3.9 1.1-3.9-1.1-.2-2.5H6.2l.4 4.3L12 19l5.4-1.5.7-7.9H7.1L6.9 7.3h10l-.2 0z" />
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 24 24" fill="#1572B6" className="h-7 w-7">
          <path d="M2.5 1.5h19l-1.7 19.3L12 23.5l-7.8-2.7L2.5 1.5zm14.4 5.8H6.9l.2 2.5h8.9l-.3 3.1H7.4l.2 2.5h8l-.5 5.8L12 20.3l-3.1-.8-.2-2.3H6.2l.4 4.5L12 22.8l5.4-1.5 1.3-14z" />
        </svg>
      );
    case "redux":
      return (
        <svg viewBox="0 0 24 24" fill="#764ABC" className="h-7 w-7">
          <path d="M16.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8.5 4.5c0-4.14-3.36-7.5-7.5-7.5-.9 0-1.76.16-2.55.45l1.09 1.89c.47-.16.97-.24 1.46-.24 2.98 0 5.4 2.42 5.4 5.4s-2.42 5.4-5.4 5.4c-.49 0-.99-.08-1.46-.24l-1.09 1.89c.79.29 1.65.45 2.55.45 4.14 0 7.5-3.36 7.5-7.5zm-17 0c0 4.14 3.36 7.5 7.5 7.5.9 0 1.76-.16 2.55-.45l-1.09-1.89c-.47.16-.97.24-1.46.24-2.98 0-5.4-2.42-5.4-5.4s2.42-5.4 5.4-5.4c.49 0 .99.08 1.46.24l1.09-1.89c-.79-.29-1.65-.45-2.55-.45-4.14 0-7.5 3.36-7.5 7.5z" />
        </svg>
      );
    case "bootstrap":
      return (
        <svg viewBox="0 0 24 24" fill="#7952B3" className="h-7 w-7">
          <path d="M5.4 2A3.4 3.4 0 0 0 2 5.4v13.2A3.4 3.4 0 0 0 5.4 22h13.2a3.4 3.4 0 0 0 3.4-3.4V5.4A3.4 3.4 0 0 0 18.6 2H5.4zm3.95 4.5h4.15c2.08 0 3.4 1.13 3.4 2.8 0 1.25-.8 2.2-1.95 2.5 1.5.3 2.45 1.4 2.45 2.9 0 2-1.5 3.3-3.8 3.3H9.35V6.5zm2.1 2v3h2c1 0 1.7-.55 1.7-1.5s-.7-1.5-1.7-1.5h-2zm0 4.8v3.2h2.2c1.2 0 1.9-.6 1.9-1.6 0-1-.7-1.6-1.9-1.6h-2.2z" />
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" fill="#FFCA28" className="h-7 w-7">
          <path d="M4 16.5l2.4-14.7a.6.6 0 0 1 1.1-.3l3.8 7.1L4 16.5zm16 0L17.8 4a.6.6 0 0 0-1.1-.2L4 16.5l7 4a2 2 0 0 0 2 0l7-4zm-2.2 1.4L13 10a.6.6 0 0 0-1-.1L4 16.5l7 4a2 2 0 0 0 2 0l4.8-2.6z" />
        </svg>
      );
    case "restapi":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#00BAE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "jwt":
      return (
        <svg viewBox="0 0 24 24" fill="#D63AFF" className="h-7 w-7">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z" />
        </svg>
      );
    case "mongoose":
      return (
        <svg viewBox="0 0 24 24" fill="#E23237" className="h-7 w-7">
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.5 4.1v6.8L12 19.3l-7.5-4.2V8.3L12 4.2zM7.5 9.5v5l4.5-2.5v-5l-4.5 2.5zm9 0l-4.5-2.5v5l4.5 2.5v-5z" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" fill="#4169E1" className="h-7 w-7">
          <path d="M12.16 2.01c-3.15 0-5.32 1.56-6.42 3.82-.44.9-.66 1.94-.7 3.08-.05 1.38.32 2.65.94 3.73-.25.86-.34 1.83-.24 2.89.15 1.56.78 2.94 1.82 3.97a7.6 7.6 0 0 0 5.43 2.15c2.3 0 4.3-.9 5.74-2.4 1.45-1.5 2.2-3.48 2.2-5.74 0-3.3-1.63-6.2-4.32-8.08-1.28-.9-2.82-1.42-4.45-1.42zm-.16 1.84c1.33 0 2.57.43 3.6 1.15 2.28 1.6 3.65 4.08 3.65 6.91 0 1.9-.62 3.53-1.8 4.77-1.18 1.23-2.8 1.97-4.68 1.97a6.2 6.2 0 0 1-4.43-1.74c-.84-.83-1.34-1.92-1.46-3.15-.07-.76-.02-1.5.17-2.18l.28-1-.88-.58a5.1 5.1 0 0 1-.95-3.08c.03-.92.21-1.73.56-2.43.88-1.8 2.6-3 5.94-3zm-1.8 4.2c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2zm3.6 0c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2z" />
        </svg>
      );
    case "prisma":
      return (
        <svg viewBox="0 0 24 24" fill="#5A67D8" className="h-7 w-7">
          <path d="M12.7 2.3a1 1 0 0 0-1.4 0L3.4 10.2a1 1 0 0 0 0 1.4l7.9 7.9a1 1 0 0 0 1.4 0l7.9-7.9a1 1 0 0 0 0-1.4L12.7 2.3zm-.7 3.1l5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" fill="#F05032" className="h-7 w-7">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4l3.1 3.1c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l3 3c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.9-2.9v5.1c.2.2.4.4.4.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.4-.9v-5.2c-.2-.2-.4-.5-.4-.9 0-.5.2-1 .6-1.3L8 5.4 2.4 11c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.6.6-1.5 0-2.1z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-black dark:text-white">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" fill="#007ACC" className="h-7 w-7">
          <path d="M17.5 2L7 11.5 3 8 1.5 9.5 5 12l-3.5 2.5L3 16l4-3.5L17.5 22l5-2.5V4.5L17.5 2zm1.5 5v10l-6-5 6-5z" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" fill="#FF6C37" className="h-7 w-7">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 6.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zm-5.6 7.8l-1.8-1.8 4.2-4.2 1.8 1.8-4.2 4.2zm6.6-1.4l-1.8 1.8-1.8-1.8 1.8-1.8 1.8 1.8z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-black dark:text-white">
          <path d="M12 2L2 20h20L12 2z" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" fill="#2496ED" className="h-7 w-7">
          <path d="M13.98 10.02h2.04V8h-2.04v2.02zm-2.73 0h2.04V8h-2.04v2.02zm-2.72 0h2.04V8H8.53v2.02zm-2.73 0h2.04V8H5.8v2.02zm8.18-2.72h2.04V5.28h-2.04V7.3zm-2.73 0h2.04V5.28h-2.04V7.3zm-2.72 0h2.04V5.28H8.53V7.3zm8.18 5.45c-.47-.28-1.52-.39-2.33-.2-.14-.7-.57-1.32-1.07-1.8H3.07c-.4.88-.34 2.65-.28 3.5.21 2.92 2.37 5.25 5.56 5.25 4.3 0 7.82-2.58 8.87-6.04.56.04 1.76.08 2.27-.9.03-.06.05-.12.06-.18a2.53 2.53 0 0 0-2.37-.63z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        </svg>
      );
  }
}

export default function TechSkills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories = ["All", "Languages", "Frontend", "Backend", "Database", "Tools", "Design"];

  // Top featured skills displayed in the 1-row view
  const featuredSkills = skillsList.filter((s) => s.isFeatured);
  const remainingSkillsCount = skillsList.length - featuredSkills.length;

  // Filtered skills for expanded accordion view
  const expandedSkills =
    activeCategory === "All"
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="border-b border-black/10 bg-black/[0.015] py-20 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.015] scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* FROSTED GLASS CONTAINER CARD (MATCHING USER REFERENCE DESIGN) */}
        <div className="relative rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#0d0d0f]/80 sm:p-8 md:p-10">
          {/* Header Subtitle & Title */}
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                TOOLS & SKILLS
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                Technologies I Use
              </h2>
            </div>

            {/* Quick stats indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:border-white/5 dark:bg-white/[0.04] dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{skillsList.length}+ Tools & Frameworks</span>
            </div>
          </div>

          {/* FULL-WIDTH RESPONSIVE DISPLAY (FILLS 100% WIDTH WITH NO EMPTY SPACE ON RIGHT) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 w-full gap-2.5 sm:gap-3.5 py-4">
            {featuredSkills.map((skill) => {
              const glowColor = `${skill.color}33`;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative z-0 flex h-[88px] sm:h-[96px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:z-30 hover:-translate-y-1.5 hover:scale-105 hover:border-black/20 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/25 dark:hover:bg-white/[0.08]"
                  style={{
                    boxShadow: hoveredSkill?.id === skill.id ? `0 14px 28px -4px ${glowColor}` : undefined,
                  }}
                >
                  {/* Skill Icon */}
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <SkillIcon type={skill.icon} />
                  </div>

                  {/* Skill Name */}
                  <span className="mt-1.5 text-center text-[10px] sm:text-[11px] font-medium tracking-tight text-zinc-600 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white truncate px-1 w-full">
                    {skill.name.split(" ")[0]}
                  </span>
                </div>
              );
            })}

            {/* 3-DOT MORE BUTTON (EXPAND / COLLAPSE - FILLS ITS GRID COLUMN) */}
            <button
              type="button"
              id="skills-more-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`group relative z-0 flex h-[88px] sm:h-[96px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 hover:z-30 hover:-translate-y-1.5 hover:scale-105 active:scale-95 ${
                isExpanded
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 shadow-md dark:border-indigo-400 dark:bg-indigo-400/10 dark:text-indigo-400"
                  : "border-black/10 bg-white/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] text-zinc-700 hover:border-indigo-400/60 hover:bg-indigo-50/50 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-indigo-400/40 dark:hover:bg-white/[0.08]"
              }`}
            >
              {/* 3-Dot Icon or Collapse Chevron */}
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {isExpanded ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 transition-transform duration-300"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                )}
              </div>

              {/* Label & Badge */}
              <span className="mt-1 text-center text-[10px] sm:text-[11px] font-semibold tracking-tight">
                {isExpanded ? "Less" : "More"}
              </span>
              {!isExpanded && (
                <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                  +{remainingSkillsCount}
                </span>
              )}
            </button>
          </div>

          {/* EXPANDED ACCORDION VIEW (SMOOTH SLIDE DOWN) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "mt-4 max-h-[1400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-black/10 pt-6 dark:border-white/10">
              {/* Category Filter Pills & Search */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 select-none ${
                        activeCategory === cat
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 bg-black/[0.02] text-zinc-600 hover:border-black/25 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60 dark:hover:border-white/30"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="cursor-pointer text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  ✕ Close panel
                </button>
              </div>

              {/* Full Skills Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 p-1 sm:p-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {expandedSkills.map((skill) => {
                  const glowColor = `${skill.color}33`;
                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group relative z-0 flex h-[92px] sm:h-[96px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/80 p-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:z-30 hover:-translate-y-1.5 hover:scale-105 hover:border-black/20 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
                      style={{
                        boxShadow: hoveredSkill?.id === skill.id ? `0 10px 20px -3px ${glowColor}` : undefined,
                      }}
                    >
                      {/* Icon */}
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <SkillIcon type={skill.icon} />
                      </div>

                      {/* Name */}
                      <span className="mt-1.5 w-full truncate text-center text-[10px] sm:text-[11px] font-medium tracking-tight text-zinc-600 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
                        {skill.name}
                      </span>

                      {/* Level Badge */}
                      <span
                        className="mt-0.5 text-[8px] sm:text-[9px] font-semibold opacity-70"
                        style={{ color: skill.color }}
                      >
                        {skill.level}
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
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400 self-end sm:self-auto"
            >
              {isExpanded ? "Collapse view ↑" : `View all ${skillsList.length} skills ↓`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
