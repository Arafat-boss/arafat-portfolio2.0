export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools"
  | "Design"
  | "Languages";

export type SkillLevel = "Expert" | "Intermediate" | "Junior";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  color: string;
  icon: string;
  isFeatured?: boolean;
}
