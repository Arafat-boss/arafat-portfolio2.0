export type ProjectMockupType = "mobile" | "dashboard" | "landing";

export type ProjectFilterTag =
  | "mern"
  | "webapp"
  | "social"
  | "saas"
  | "ecommerce"
  | "design";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  filterTag?: ProjectFilterTag;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  imageSrc?: string;
  themeGradient?: string;
  mockupType?: ProjectMockupType;
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  number: string;
  title: string;
  category: string;
  filterTag: ProjectFilterTag;
  description: string;
}
